import React from 'react';
import backend from '@neos-project/neos-ui-backend-connector';
import {actions} from '@neos-project/neos-ui-redux-store';

import {forwardFeedbacks} from '../api/feedback';
import {useRegistries} from '../context/Registries';
import {allItemsOf, inspectorTabsFor} from '../domain/nodeTypes';
import {resolveDraft} from '../domain/saveHooks';
import {validateItems} from '../domain/validation';
import {editingWorkspaceName, inWorkspace} from '../domain/workspace';
import {DraftValue, InspectorTab, ResourceNode} from '../types';
import {ResourceCollection} from './useResourceCollection';

export type InspectedResource = {
    /** The fully rendered node info of the resource open in the inspector. */
    node: any;
    nodeType: any;
    tabs: InspectorTab[];
    values: Record<string, unknown>;
    draft: Record<string, DraftValue>;
    hasChanges: boolean;
    validationErrors: Record<string, React.ReactNode[]>;
    isPanelOpen: (groupId: string, collapsed?: boolean) => boolean;
    togglePanel: (groupId: string) => void;
    inspect: (resource: Pick<ResourceNode, 'contextPath'>) => Promise<void>;
    forget: () => void;
    change: (propertyName: string, value: unknown, hooks?: Record<string, unknown>) => void;
    save: () => Promise<void>;
    discard: () => void;
};

/**
 * The right hand pane: one resource, edited with the node type's own inspector
 * configuration, with the same pending-changes semantics as the sidebar - values
 * are kept locally until Apply, and a property that is set back to its stored value
 * drops out of the pending changes again.
 */
export const useInspectedResource = (
    collection: ResourceCollection,
    closeSecondaryInspector: () => void
): InspectedResource => {
    const {store, nodeTypesRegistry, saveHooksRegistry, validatorsRegistry} = useRegistries();

    const [node, setNode] = React.useState<any>(null);
    const [tabs, setTabs] = React.useState<InspectorTab[]>([]);
    const [values, setValues] = React.useState<Record<string, unknown>>({});
    const [draft, setDraft] = React.useState<Record<string, DraftValue>>({});
    const [validationErrors, setValidationErrors] = React.useState<Record<string, React.ReactNode[]>>({});
    const [toggledPanels, setToggledPanels] = React.useState<Record<string, boolean>>({});

    const nodeType = nodeTypesRegistry.getNodeType(node?.nodeType);
    const items = allItemsOf(tabs);
    const hasChanges = Object.keys(draft).length > 0;

    const resetForm = (): void => {
        setDraft({});
        setValues({});
        setValidationErrors({});
        closeSecondaryInspector();
    };

    const inspect = async (resource: Pick<ResourceNode, 'contextPath'>): Promise<void> => {
        resetForm();

        await collection.run(async () => {
            // Load the node again instead of reusing the list entry: this is the
            // fully rendered node info, and merging it into the store lets editors
            // that look their node up by context path find it.
            const [loaded] = await backend.get().q([resource.contextPath]).get();
            const inspected = loaded ?? resource;

            store.dispatch(actions.CR.Nodes.merge({[inspected.contextPath]: inspected}));

            setNode(inspected);
            setTabs(inspectorTabsFor(nodeTypesRegistry, inspected.nodeType));
            setValues({...(inspected.properties ?? {})});
        });
    };

    const forget = (): void => {
        setNode(null);
        setTabs([]);
        resetForm();
    };

    const change = (
        propertyName: string,
        value: unknown,
        hooks?: Record<string, unknown>
    ): void => {
        // Like InspectorEditorEnvelope: committing the stored value again without
        // hooks is not a change, so the property drops out of the pending changes.
        const storedValue = node?.properties?.[propertyName];
        const isUnchanged = !hooks && (
            storedValue === value || JSON.stringify(storedValue) === JSON.stringify(value)
        );

        setDraft(current => {
            if (isUnchanged) {
                const {[propertyName]: _removed, ...rest} = current;

                return rest;
            }

            return {...current, [propertyName]: {value, hooks}};
        });
        setValues(current => ({...current, [propertyName]: value}));
        setValidationErrors(current => {
            if (!current[propertyName]) {
                return current;
            }

            const {[propertyName]: _removed, ...rest} = current;

            return rest;
        });
    };

    const save = async (): Promise<void> => {
        if (!node) {
            return;
        }

        const errors = validateItems(items, nodeType, values, validatorsRegistry);
        setValidationErrors(errors);

        if (Object.keys(errors).length > 0) {
            return;
        }

        await collection.run(async () => {
            const resolved = await resolveDraft(draft, saveHooksRegistry);
            const subject = inWorkspace(node.contextPath, editingWorkspaceName(store));
            const changes = Object.entries(resolved).map(([propertyName, value]) => ({
                type: 'Neos.Neos.Ui:Property',
                subject,
                payload: {propertyName, value}
            }));

            if (changes.length > 0) {
                const response = await backend.get().endpoints.change(changes);
                forwardFeedbacks(store, response);
                store.dispatch(actions.UI.ContentCanvas.reload());
            }

            setDraft({});
            await collection.reload();
            // Saved values can differ from what was sent - a save hook creates an
            // image variant, for example - so the form is filled from the node again
            // instead of keeping the values that went in.
            await inspect(node);
        });
    };

    const discard = (): void => {
        setDraft({});
        setValidationErrors({});
        setValues({...(node?.properties ?? {})});
    };

    return {
        node,
        nodeType,
        tabs,
        values,
        draft,
        hasChanges,
        validationErrors,
        isPanelOpen: (groupId, collapsed) => Boolean(toggledPanels[groupId]) === Boolean(collapsed),
        togglePanel: groupId => setToggledPanels(current => ({
            ...current,
            [groupId]: !current[groupId]
        })),
        inspect,
        forget,
        change,
        save,
        discard
    };
};
