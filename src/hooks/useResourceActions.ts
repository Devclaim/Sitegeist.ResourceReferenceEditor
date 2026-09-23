import React from 'react';
import backend from '@neos-project/neos-ui-backend-connector';
import {actions} from '@neos-project/neos-ui-redux-store';

import {loadUsage} from '../api/endpoints';
import {applyOwnPendingChange, forwardFeedbacks} from '../api/feedback';
import {syncEditingWorkspace} from '../api/workspace';
import {useRegistries} from '../context/Registries';
import {creationElementsFor, emptyValueFor, missingCreationProperties} from '../domain/nodeTypes';
import {CreationDialogValues, openCreationDialog} from '../api/creationDialog';
import {MovePosition} from '../domain/order';
import {applySaveHooks} from '../domain/saveHooks';
import {RESOURCE_WORKSPACE_NAME, inWorkspace} from '../domain/workspace';
import {EditorProps, ResourceNode, ResourceUsage} from '../types';
import {InspectedResource} from './useInspectedResource';
import {References} from './useReferences';
import {ResourceCollection} from './useResourceCollection';
import {Selection} from './useSelection';

/** Where a new node goes, when it is not a resource in the collection itself. */
export type CreationTarget = {
    parentContextPath: string;
    nodeTypeName: string;
};

export type ResourceActions = {
    /** Asks for the node's values, then creates it. */
    create: (target?: CreationTarget) => Promise<void>;
    duplicate: (resources: ResourceNode[]) => Promise<void>;
    setHidden: (resources: ResourceNode[], hidden: boolean) => Promise<void>;
    /** Opens the delete warning and fills it with what references the resources. */
    requestRemoval: (resources: ResourceNode[]) => Promise<void>;
    remove: (resources: ResourceNode[]) => Promise<void>;
    /** Moves a resource before or after one of its siblings. */
    move: (
        resource: ResourceNode,
        target: ResourceNode,
        position: MovePosition,
        /** The node both sit below - `null` for resources of the collection itself. */
        parentContextPath: string | null
    ) => Promise<void>;
    cancelRemoval: () => void;
    pendingRemoval: ResourceNode[] | null;
    /** `null` while the reference counts are still being fetched. */
    pendingRemovalUsage: Record<string, ResourceUsage> | null;
};

/**
 * Everything that changes resources. All of it goes through the Neos UI change
 * endpoint with the same change types the content tree uses, so the server side
 * behaves exactly as it does for content - see the README for why the editor talks
 * to that endpoint directly instead of going through the redux actions.
 */
export const useResourceActions = (
    props: EditorProps,
    collection: ResourceCollection,
    references: References,
    selection: Selection,
    inspected: InspectedResource,
    openDialog: () => void,
    /** Opens a node and reads its children again, after one was created below it. */
    revealChildren: (contextPath: string) => Promise<ResourceNode[]>,
    /** Applies a move to the children the list has read on its own. */
    reorderChildren: (moving: string, target: string, position: MovePosition) => void
): ResourceActions => {
    const {store, nodeTypesRegistry, saveHooksRegistry, t} = useRegistries();
    const creation = props.options.resourceCreation;

    const [pendingRemoval, setPendingRemoval] = React.useState<ResourceNode[] | null>(null);
    const [pendingRemovalUsage, setPendingRemovalUsage] =
        React.useState<Record<string, ResourceUsage> | null>(null);

    /**
     * Asks for the resource's values with Neos' own node creation dialog and creates
     * it from them. A resource type that asks for nothing is created right away.
     */
    const create = async (target?: CreationTarget): Promise<void> => {
        openDialog();
        collection.setError(null);

        const nodeTypeName = target?.nodeTypeName ?? creation.type;
        const nodeType = nodeTypesRegistry.getNodeType(nodeTypeName);
        const elements = creationElementsFor(nodeType);

        // Only the configured resource type is checked against the constructor
        // arguments the PHP side resolved. For a child node type that list does not
        // exist - OPGM promotes required arguments into the creation dialog by
        // itself, which is what the dialog then asks for.
        if (!target) {
            const missing = missingCreationProperties(creation, elements);

            if (missing.length > 0) {
                collection.setError(t(
                    'error.creationBlocked',
                    '{type} cannot be created here: {properties} must be provided on creation. '
                    + 'Give these properties a default value, make them nullable, or promote '
                    + 'them to the creation dialog (showInCreationDialog).',
                    {type: nodeTypeName, properties: missing.join(', ')}
                ));

                return;
            }
        }

        const parentContextPath = target?.parentContextPath
            ?? (collection.container ?? (await collection.reload()).container).contextPath;

        if (elements.length === 0) {
            await confirmCreation({}, nodeTypeName, parentContextPath, !target);

            return;
        }

        const values = await openCreationDialog(store, nodeType, nodeTypeName, parentContextPath);

        if (values === null) {
            return;
        }

        await confirmCreation(values, nodeTypeName, parentContextPath, !target);
    };

    /**
     * Creates the resource from what the dialog collected and opens it in the
     * inspector. Node type default values are applied by the server.
     */
    const confirmCreation = async (
        values: CreationDialogValues,
        nodeTypeName: string,
        parentContextPath: string,
        /** A resource in the collection is referenced right away; a child is not. */
        isResourceOfTheCollection: boolean
    ): Promise<void> => {
        const data: Record<string, unknown> = {};

        // Editors may hand work over that can only run before the value is sent -
        // the image editor creates its variant this way - so the hooks the dialog
        // collected run here.
        for (const [propertyName, element] of Object.entries(values)) {
            data[propertyName] = await applySaveHooks(element.value, element.hooks, saveHooksRegistry);
        }

        // A required argument the editor left untouched is sent as an empty value of
        // the right type: the entity rejects null, and the dialog has had its say.
        if (isResourceOfTheCollection) {
            for (const property of creation.requiredProperties ?? []) {
                if (data[property.name] === undefined || data[property.name] === null) {
                    data[property.name] = emptyValueFor(property.type);
                }
            }
        }

        await collection.run(async () => {
            const response = await backend.get().endpoints.change([{
                type: 'Neos.Neos.Ui:CreateInto',
                subject: parentContextPath,
                payload: {nodeType: nodeTypeName, data}
            }]);

            forwardFeedbacks(store, response);

            const created = (response?.feedbacks ?? []).find(
                (feedback: any) => feedback?.type === 'Neos.Neos.Ui:NodeCreated'
            )?.payload;

            if (!created?.identifier) {
                throw new Error(t('error.creationFailed', 'The resource could not be created.'));
            }

            if (isResourceOfTheCollection) {
                // The resource was created in live; the document's own workspace
                // only sees it once it has caught up, and the reference is about
                // to be written there. A child that is not referenced does not
                // need this - the dialog always reads resources from live itself.
                await syncEditingWorkspace(store);
                references.add(created.identifier);
                applyOwnPendingChange(store, props.identifier);
            }

            collection.touch();

            // A child is not part of the collection listing - it is found among the
            // children of the node it went into, which is opened to show it. Both
            // are read at the same time.
            const [{resources}, children] = await Promise.all([
                collection.reload(),
                isResourceOfTheCollection ? Promise.resolve(null) : revealChildren(parentContextPath)
            ]);
            const siblings = children ?? resources;

            const createdResource = siblings.find(
                resource => resource.identifier === created.identifier
            );

            if (createdResource) {
                await inspected.inspect(createdResource);
            }
        }, 'create');
    };

    /**
     * Copies resources into the same collection - the "new one, mostly like this one"
     * case. The clipboard has no part in this: the collection is the only place a
     * resource can live, so there is nothing to choose a paste target from.
     */
    const duplicate = async (resourcesToCopy: ResourceNode[]): Promise<void> => {
        if (resourcesToCopy.length === 0) {
            return;
        }

        await collection.run(async () => {
            const container = collection.container ?? (await collection.reload()).container;
            const response = await backend.get().endpoints.change(
                resourcesToCopy.map(resource => ({
                    type: 'Neos.Neos.Ui:CopyInto',
                    subject: inWorkspace(resource.contextPath, RESOURCE_WORKSPACE_NAME),
                    payload: {parentContextPath: container.contextPath}
                }))
            );

            forwardFeedbacks(store, response);

            const createdIdentifiers = (response?.feedbacks ?? [])
                .filter((feedback: any) => feedback?.type === 'Neos.Neos.Ui:NodeCreated')
                .map((feedback: any) => feedback?.payload?.identifier)
                .filter(Boolean);

            // Nothing here is referenced by the document and nothing on the canvas
            // depends on it, so the personal workspace does not need to catch up
            // with live for this - the dialog reads resources from live directly.
            collection.touch();

            const {resources} = await collection.reload();
            const lastCopy = resources.find(
                resource => resource.identifier === createdIdentifiers[createdIdentifiers.length - 1]
            );

            selection.leave();

            if (lastCopy) {
                await inspected.inspect(lastCopy);
            }
        }, 'duplicate');
    };

    /**
     * Hides resources instead of deleting them - the safe way to retire one, because
     * documents that still reference it keep a reference that resolves.
     */
    const setHidden = async (resourcesToChange: ResourceNode[], hidden: boolean): Promise<void> => {
        if (resourcesToChange.length === 0) {
            return;
        }

        await collection.run(async () => {
            const response = await backend.get().endpoints.change(
                resourcesToChange.map(resource => ({
                    type: 'Neos.Neos.Ui:Property',
                    subject: inWorkspace(resource.contextPath, RESOURCE_WORKSPACE_NAME),
                    payload: {propertyName: '_hidden', value: hidden}
                }))
            );

            forwardFeedbacks(store, response);

            // Already known - applied directly, before the workspace sync below,
            // instead of asking the server to read the whole collection back.
            resourcesToChange.forEach(resource => collection.patch(resource.contextPath, {hidden}));

            // The visibility group of the inspector shows the same flag.
            if (inspected.node && resourcesToChange.some(
                resource => resource.contextPath === inspected.node.contextPath
            )) {
                inspected.patchProperty('_hidden', hidden);
            }

            await syncEditingWorkspace(store);
            collection.touch();
            store.dispatch(actions.UI.ContentCanvas.reload());
        }, 'hide');
    };

    const requestRemoval = async (resourcesToRemove: ResourceNode[]): Promise<void> => {
        if (resourcesToRemove.length === 0) {
            return;
        }

        setPendingRemovalUsage(null);
        setPendingRemoval(resourcesToRemove);

        try {
            setPendingRemovalUsage(await loadUsage(
                store,
                props.neos?.routes,
                resourcesToRemove.map(resource => resource.identifier)
            ));
        } catch (exception) {
            setPendingRemovalUsage({});
        }
    };

    const cancelRemoval = (): void => setPendingRemoval(null);

    /**
     * Removes resources the way the content tree does: a soft removal, which tags the
     * subtree as removed instead of deleting history. References to the removed nodes
     * are dropped from the edited property, because they would resolve to nothing.
     */
    const remove = async (resourcesToRemove: ResourceNode[]): Promise<void> => {
        setPendingRemoval(null);

        await collection.run(async () => {
            const response = await backend.get().endpoints.change(
                resourcesToRemove.map(resource => ({
                    type: 'Neos.Neos.Ui:RemoveNode',
                    subject: inWorkspace(resource.contextPath, RESOURCE_WORKSPACE_NAME),
                    payload: {}
                }))
            );

            forwardFeedbacks(store, response);
            collection.touch();
            references.drop(resourcesToRemove.map(resource => resource.identifier));

            const removedContextPaths = resourcesToRemove.map(resource => resource.contextPath);
            selection.forget(removedContextPaths);

            if (selection.selection.length > 0 && resourcesToRemove.length >= selection.selection.length) {
                selection.leave();
            }

            if (inspected.node && removedContextPaths.includes(inspected.node.contextPath)) {
                inspected.forget();
            }

            await collection.reload();
        }, 'delete');
    };

    /**
     * Reorders resources the way the content tree does - with the Neos UI's own move
     * changes. The list shows the new order at once, and is read again only if the
     * server refused it.
     */
    const move = async (
        resource: ResourceNode,
        target: ResourceNode,
        position: MovePosition,
        parentContextPath: string | null
    ): Promise<void> => {
        if (resource.contextPath === target.contextPath) {
            return;
        }

        collection.reorder(resource.contextPath, target.contextPath, position);
        reorderChildren(resource.contextPath, target.contextPath, position);

        await collection.run(async () => {
            try {
                const response = await backend.get().endpoints.change([{
                    type: position === 'before' ? 'Neos.Neos.Ui:MoveBefore' : 'Neos.Neos.Ui:MoveAfter',
                    subject: inWorkspace(resource.contextPath, RESOURCE_WORKSPACE_NAME),
                    payload: {
                        siblingDomAddress: {
                            contextPath: inWorkspace(target.contextPath, RESOURCE_WORKSPACE_NAME)
                        }
                    }
                }]);

                forwardFeedbacks(store, response);

                // A move the server does not apply - a constraint of the parent, for
                // instance - answers without an error, just without node info.
                const wasMoved = (response?.feedbacks ?? []).some(
                    (feedback: any) => feedback?.type === 'Neos.Neos.Ui:UpdateNodeInfo'
                );

                if (!wasMoved) {
                    throw new Error(t('error.moveFailed', 'The resource could not be moved.'));
                }
            } catch (exception) {
                // The order shown is not the stored one any more - put it back.
                await Promise.all([
                    collection.reload(),
                    parentContextPath ? revealChildren(parentContextPath) : Promise.resolve([])
                ]);

                throw exception;
            }
        }, 'move');
    };

    return {
        create,
        move,
        duplicate,
        setHidden,
        requestRemoval,
        remove,
        cancelRemoval,
        pendingRemoval,
        pendingRemovalUsage
    };
};
