import React from 'react';
import backend from '@neos-project/neos-ui-backend-connector';
import {actions} from '@neos-project/neos-ui-redux-store';

import {loadUsage} from '../api/endpoints';
import {applyOwnPendingChange, forwardFeedbacks} from '../api/feedback';
import {syncEditingWorkspace} from '../api/workspace';
import {useRegistries} from '../context/Registries';
import {creationElementsFor, emptyValueFor, missingCreationProperties} from '../domain/nodeTypes';
import {CreationDialogValues, openCreationDialog} from '../api/creationDialog';
import {applySaveHooks} from '../domain/saveHooks';
import {RESOURCE_WORKSPACE_NAME, inWorkspace} from '../domain/workspace';
import {EditorProps, ResourceNode, ResourceUsage} from '../types';
import {InspectedResource} from './useInspectedResource';
import {References} from './useReferences';
import {ResourceCollection} from './useResourceCollection';
import {Selection} from './useSelection';

export type ResourceActions = {
    /** Asks for the resource's values, then creates it. */
    create: () => Promise<void>;
    duplicate: (resources: ResourceNode[]) => Promise<void>;
    setHidden: (resources: ResourceNode[], hidden: boolean) => Promise<void>;
    /** Opens the delete warning and fills it with what references the resources. */
    requestRemoval: (resources: ResourceNode[]) => Promise<void>;
    remove: (resources: ResourceNode[]) => Promise<void>;
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
    openDialog: () => void
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
    const create = async (): Promise<void> => {
        openDialog();
        collection.setError(null);

        const nodeType = nodeTypesRegistry.getNodeType(creation.type);
        const elements = creationElementsFor(nodeType);
        const missing = missingCreationProperties(creation, elements);

        if (missing.length > 0) {
            collection.setError(t(
                'error.creationBlocked',
                '{type} cannot be created here: {properties} must be provided on creation. '
                + 'Give these properties a default value, make them nullable, or promote '
                + 'them to the creation dialog (showInCreationDialog).',
                {type: creation.type, properties: missing.join(', ')}
            ));

            return;
        }

        if (elements.length === 0) {
            await confirmCreation({});

            return;
        }

        const container = collection.container ?? (await collection.reload()).container;
        const values = await openCreationDialog(store, nodeType, creation.type, container.contextPath);

        if (values === null) {
            return;
        }

        await confirmCreation(values);
    };

    /**
     * Creates the resource from what the dialog collected and opens it in the
     * inspector. Node type default values are applied by the server.
     */
    const confirmCreation = async (values: CreationDialogValues): Promise<void> => {
        const data: Record<string, unknown> = {};

        // Editors may hand work over that can only run before the value is sent -
        // the image editor creates its variant this way - so the hooks the dialog
        // collected run here.
        for (const [propertyName, element] of Object.entries(values)) {
            data[propertyName] = await applySaveHooks(element.value, element.hooks, saveHooksRegistry);
        }

        // A required argument the editor left untouched is sent as an empty value of
        // the right type: the entity rejects null, and the dialog has had its say.
        for (const property of creation.requiredProperties ?? []) {
            if (data[property.name] === undefined || data[property.name] === null) {
                data[property.name] = emptyValueFor(property.type);
            }
        }

        await collection.run(async () => {
            const container = collection.container ?? (await collection.reload()).container;
            const response = await backend.get().endpoints.change([{
                type: 'Neos.Neos.Ui:CreateInto',
                subject: container.contextPath,
                payload: {nodeType: creation.type, data}
            }]);

            forwardFeedbacks(store, response);

            const created = (response?.feedbacks ?? []).find(
                (feedback: any) => feedback?.type === 'Neos.Neos.Ui:NodeCreated'
            )?.payload;

            if (!created?.identifier) {
                throw new Error(t('error.creationFailed', 'The resource could not be created.'));
            }

            // The resource was created in live; the document's own workspace only
            // sees it once it has caught up, and the reference is written there.
            await syncEditingWorkspace(store);
            collection.touch();

            references.add(created.identifier);
            applyOwnPendingChange(store, props.identifier);

            const {resources} = await collection.reload();
            const createdResource = resources.find(
                resource => resource.identifier === created.identifier
            );

            if (createdResource) {
                await inspected.inspect(createdResource);
            }
        });
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

            await syncEditingWorkspace(store);
            collection.touch();

            const {resources} = await collection.reload();
            const lastCopy = resources.find(
                resource => resource.identifier === createdIdentifiers[createdIdentifiers.length - 1]
            );

            selection.leave();

            if (lastCopy) {
                await inspected.inspect(lastCopy);
            }
        });
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

            await syncEditingWorkspace(store);
            collection.touch();
            store.dispatch(actions.UI.ContentCanvas.reload());
            await collection.reload();

            // The visibility group of the inspector shows the same flag, so the open
            // resource is read again instead of keeping the value it had.
            if (inspected.node && resourcesToChange.some(
                resource => resource.contextPath === inspected.node.contextPath
            )) {
                await inspected.inspect(inspected.node);
            }
        });
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
            await syncEditingWorkspace(store);
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
        });
    };

    return {
        create,
        duplicate,
        setHidden,
        requestRemoval,
        remove,
        cancelRemoval,
        pendingRemoval,
        pendingRemovalUsage
    };
};
