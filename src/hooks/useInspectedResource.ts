import React from 'react';
import backend from '@neos-project/neos-ui-backend-connector';
import {actions} from '@neos-project/neos-ui-redux-store';

import {forwardFeedbacks, nodeFromFeedback} from '../api/feedback';
import {syncEditingWorkspace} from '../api/workspace';
import {useRegistries} from '../context/Registries';
import {allItemsOf, inspectorTabsFor} from '../domain/nodeTypes';
import {resolveDraft} from '../domain/saveHooks';
import {messageOf, validateItems} from '../domain/validation';
import {RESOURCE_WORKSPACE_NAME, inWorkspace} from '../domain/workspace';
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
    inspect: (
        resource: Pick<ResourceNode, 'contextPath'>,
        /** Skips the already-open check and the store cache - asks the server again. */
        options?: {force?: boolean}
    ) => Promise<void>;
    forget: () => void;
    change: (propertyName: string, value: unknown, hooks?: Record<string, unknown>) => void;
    /**
     * Applies a value the server already confirmed - a visibility toggle done
     * elsewhere in the dialog - without touching the pending changes, so an
     * in-progress edit of another property is not discarded by it.
     */
    patchProperty: (propertyName: string, value: unknown) => void;
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

    // The resource the last `inspect` was for - what a response that arrives after
    // the editor clicked on to another row is checked against, so it cannot open
    // the row that was clicked first.
    const latest = React.useRef<string | null>(null);
    // The pending changes as of the last render, for a fresher read that arrives
    // while the editor already started typing.
    const draftRef = React.useRef(draft);
    draftRef.current = draft;

    const show = (inspected: any, keepPendingChanges: boolean): void => {
        // Merging it into the store lets editors that look their node up by
        // context path find it - see PropertyField's comment on EditorEnvelope.
        store.dispatch(actions.CR.Nodes.merge({[inspected.contextPath]: inspected}));

        const pending = keepPendingChanges
            ? Object.fromEntries(Object.entries(draftRef.current).map(([name, entry]) => [name, entry.value]))
            : {};

        setNode(inspected);
        setTabs(inspectorTabsFor(nodeTypesRegistry, inspected.nodeType));
        setValues({...(inspected.properties ?? {}), ...pending});
    };

    const inspect = async (
        resource: Pick<ResourceNode, 'contextPath'>,
        options?: {force?: boolean}
    ): Promise<void> => {
        // Already open (or on its way): nothing to ask the server for - and no
        // reason to discard a draft the editor may be mid-way through by resetting
        // the form under them.
        if (!options?.force && latest.current === resource.contextPath) {
            return;
        }

        latest.current = resource.contextPath;
        resetForm();

        // Opening a resource in the inspector is not a collection-wide action - it
        // must not run through `collection.run`, which flips every button in the
        // toolbar and action bar to disabled and back. That shared loading flag is
        // for things that take the collection out of a usable state - create,
        // duplicate, hide, delete, save - not for looking at a row.
        collection.setError(null);

        // What the store has from an earlier look is shown right away, and read
        // again underneath: someone else may have changed the resource since, and
        // a save on top of a stale form would silently overwrite that.
        const cached = options?.force
            ? null
            : store.getState()?.cr?.nodes?.byContextPath?.[resource.contextPath];

        if (cached) {
            show(cached, false);
        }

        try {
            const [loaded] = await backend.get().q([resource.contextPath]).get();

            if (latest.current !== resource.contextPath) {
                return;
            }

            const fresh = loaded ?? cached ?? resource;

            if (cached && JSON.stringify(fresh) === JSON.stringify(cached)) {
                return;
            }

            show(fresh, Boolean(cached));
        } catch (exception) {
            if (latest.current !== resource.contextPath) {
                return;
            }

            if (!cached) {
                latest.current = null;
            }

            collection.setError(messageOf(exception));
        }
    };

    const forget = (): void => {
        latest.current = null;
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

        // Apply is the end of an edit, as in the sidebar - a secondary editor that
        // is still open (the image cropper, the media browser) goes with it.
        closeSecondaryInspector();

        await collection.run(async () => {
            const resolved = await resolveDraft(draft, saveHooksRegistry);
            const subject = inWorkspace(node.contextPath, RESOURCE_WORKSPACE_NAME);
            const changes = Object.entries(resolved).map(([propertyName, value]) => ({
                type: 'Neos.Neos.Ui:Property',
                subject,
                payload: {propertyName, value}
            }));

            if (changes.length === 0) {
                setDraft({});

                return;
            }

            const response = await backend.get().endpoints.change(changes);
            forwardFeedbacks(store, response);
            setDraft({});

            // The endpoint already answered with the node it rendered after the
            // change - a save hook can alter a value beyond what was sent (the
            // image editor creates a variant, for example), and this is that
            // answer. It is shown right away, before the workspace sync below,
            // which is the slow part of saving.
            const updatedNode = nodeFromFeedback(response, subject);

            if (updatedNode) {
                collection.patch(subject, {
                    label: updatedNode.label,
                    properties: updatedNode.properties,
                    tags: updatedNode.tags
                });
                show(updatedNode, false);
            }

            // The change went to live, so the document's workspace is a step
            // behind until it catches up - and the canvas would render the old
            // state if it were reloaded before that.
            await syncEditingWorkspace(store);
            collection.touch();
            store.dispatch(actions.UI.ContentCanvas.reload());

            if (updatedNode) {
                return;
            }

            // No rendered node came back - fall back to reading it the old way,
            // forced: this is the one place a re-inspect of the already-open node
            // must not be skipped or answered from a now-stale cache entry.
            await collection.reload();
            await inspect(node, {force: true});
        }, 'save');
    };

    const discard = (): void => {
        closeSecondaryInspector();
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
        patchProperty: (propertyName: string, value: unknown): void => {
            setNode((current: any) => (current
                ? {...current, properties: {...current.properties, [propertyName]: value}}
                : current));
            setValues(current => ({...current, [propertyName]: value}));
        },
        save,
        discard
    };
};
