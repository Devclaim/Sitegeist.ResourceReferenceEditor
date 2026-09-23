import React from 'react';
import {Dialog, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {isUsableType, resourceChildTypesOf} from '../domain/nodeTypes';
import {translate} from '../i18n';
import {InspectedResource} from '../hooks/useInspectedResource';
import {References} from '../hooks/useReferences';
import {ResourceCollection} from '../hooks/useResourceCollection';
import {ResourceActions} from '../hooks/useResourceActions';
import {ResourceTree, TreeRow} from '../hooks/useResourceTree';
import {Selection} from '../hooks/useSelection';
import {ResourceNode} from '../types';
import {CreateGroup, CreateOption} from './CreateMenu';
import {ResourceActionBar} from './ResourceActionBar';
import {ResourceInspector} from './ResourceInspector';
import {ResourceList} from './ResourceList';
import {ResourceToolbar} from './ResourceToolbar';

/**
 * The dialog itself: the collection on the left, the inspector of the resource that
 * is open on the right - the layout of the regular backend, with the list standing
 * in for the rendered content.
 */
export const ResourceDialog: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    collection: ResourceCollection;
    tree: ResourceTree;
    inspected: InspectedResource;
    selection: Selection;
    references: References;
    actions: ResourceActions;
    /** The node type resources of the collection are created with. */
    creationType: string;
    /** Node types the edited property can hold. */
    usableNodeTypes: string[];
    renderSecondaryInspector: (id?: string, render?: () => React.ReactNode) => void;
    /** The open secondary editor - media browser, image cropper, link editor. */
    secondaryInspector: React.ReactNode | null;
    onCloseSecondaryInspector: () => void;
}> = ({
    isOpen,
    onClose,
    collection,
    tree,
    inspected,
    selection,
    references,
    actions,
    creationType,
    usableNodeTypes,
    renderSecondaryInspector,
    secondaryInspector,
    onCloseSecondaryInspector
}) => {
    const {nodeTypesRegistry, i18nRegistry, t} = useRegistries();
    const [filter, setFilter] = React.useState('');

    const normalizedFilter = filter.trim().toLocaleLowerCase();
    const visibleRows: TreeRow[] = normalizedFilter === ''
        ? tree.rows
        : tree.rows.filter(row =>
            (row.resource.label ?? '').toLocaleLowerCase().includes(normalizedFilter));
    const visibleResources = visibleRows.map(row => row.resource);

    // Selecting covers every row, children included: hiding and deleting apply to
    // all of them. Referencing does not - only what the edited property accepts can
    // go into it, so Use works on that part of the selection and says nothing when
    // there is none.
    const isUsable = (resource: ResourceNode): boolean =>
        isUsableType(nodeTypesRegistry, resource.nodeType, usableNodeTypes);
    const usableSelection = selection.selected.filter(isUsable);

    // The action bar acts on what the editor is looking at: the resource open in the
    // inspector, or the selection while several are being picked.
    const inspectedRow: TreeRow | null = inspected.node
        ? tree.rows.find(row => row.resource.contextPath === inspected.node.contextPath) ?? null
        : null;
    const inspectedResource: ResourceNode | null = inspectedRow?.resource ?? null;
    const targets = selection.isSelecting
        ? selection.selected
        : (inspectedResource ? [inspectedResource] : []);

    // The footer names what is selected, with the nodes it sits below - which is
    // where the breadcrumb of the list used to be.
    const selectedPath = inspectedRow
        ? [...inspectedRow.ancestors, inspectedRow.resource].map(entry => entry.label)
        : [];

    // Everything the dialog creates comes out of the New button, and it creates it
    // where the selection is: next to the resource that is open - which for a child
    // means another child of the same parent, not another resource of the collection
    // - and, below that, whatever child types the open resource itself allows.
    const creationNodeType = nodeTypesRegistry.getNodeType(creationType);
    const optionsIn = (resource: ResourceNode): CreateOption[] =>
        resourceChildTypesOf(nodeTypesRegistry, i18nRegistry, resource.nodeType)
            .map(nodeType => ({...nodeType, parentContextPath: resource.contextPath}));
    const inLabel = (name: string): string =>
        t('action.createIn', 'In “{name}”', {name});

    const openRow = selection.isSelecting ? null : inspectedRow;
    const parentResource = openRow?.ancestors[openRow.ancestors.length - 1] ?? null;
    const createGroups: CreateGroup[] = [
        // Siblings of what is open. At the top of the tree that is the collection,
        // which needs no name above it.
        parentResource
            ? {label: inLabel(parentResource.label), options: optionsIn(parentResource)}
            : {
                options: [{
                    nodeTypeName: creationType,
                    label: translate(i18nRegistry, creationNodeType?.ui?.label) || creationType,
                    icon: creationNodeType?.ui?.icon
                }]
            },
        ...(openRow ? [{label: inLabel(openRow.resource.label), options: optionsIn(openRow.resource)}] : [])
    ].filter(group => group.options.length > 0);

    return (
        <Dialog
            isOpen={isOpen}
            /* No title: the dialog is the resource list, and a headline on top of
               the list only pushed everything down. */
            title=""

            style="jumbo"
            /* Escape closes an open secondary editor first, as it does in the
               sidebar, rather than the whole dialog under it. */
            onRequestClose={secondaryInspector ? onCloseSecondaryInspector : onClose}
            /* No footer row: the inspector runs down to the bottom of the dialog,
               and the list column carries its own actions and the close button. */
            actions={[]}
        >
            <div className="sitegeist-resource-reference-editor__layout">
                {/*
                  * The dialog has no footer, so its close button sits in the free
                  * corner of the inspector's tab row - where the sidebar has its
                  * own toggle - and stays in reach while a secondary editor is open.
                  */}
                <button
                    type="button"
                    className="sitegeist-resource-reference-editor__close"
                    title={t('action.close', 'Close')}
                    aria-label={t('action.close', 'Close')}
                    onClick={onClose}
                >
                    <Icon icon="times" />
                </button>
                <div className="sitegeist-resource-reference-editor__content">
                    {collection.error && (
                        <div
                            className={'sitegeist-resource-reference-editor__state '
                                + 'sitegeist-resource-reference-editor__error'}
                        >
                            {collection.error}
                        </div>
                    )}
                    <ResourceToolbar
                        filter={filter}
                        onFilter={setFilter}
                        isLoading={collection.isLoading}
                        isCreating={collection.activity === 'create'}
                        isSelecting={selection.isSelecting}
                        canSelect={visibleResources.length > 0}
                        createGroups={createGroups}
                        onCreate={option => actions.create(option.parentContextPath
                            ? {
                                parentContextPath: option.parentContextPath,
                                nodeTypeName: option.nodeTypeName
                            }
                            : undefined)}
                        onEnterSelection={() => selection.enter(
                            // Carry the resource that is open over into the
                            // selection, so switching modes does not lose it.
                            inspectedResource ? [inspectedResource.contextPath] : []
                        )}
                        onLeaveSelection={selection.leave}
                    />
                    {/* A thin running bar above the list while an action is under way. */}
                    <div
                        className={'sitegeist-resource-reference-editor__progress'
                            + (collection.isLoading ? ' sitegeist-resource-reference-editor__progress--active' : '')}
                        aria-hidden="true"
                    />
                    <ResourceList
                        rows={visibleRows}
                        usableNodeTypes={usableNodeTypes}
                        isLoading={collection.isLoading}
                        activeContextPath={inspected.node?.contextPath}
                        referencedIdentifiers={references.referenced}
                        isSelecting={selection.isSelecting}
                        selection={selection.selection}
                        onOpen={inspected.inspect}
                        onToggleSelection={selection.toggle}
                        onPick={resource => selection.pick(
                            resource,
                            // The resource that is open counts as the first one picked.
                            inspectedResource ? [inspectedResource.contextPath] : []
                        )}
                        onToggleReference={references.toggle}
                        // A filtered list shows only some of the siblings, and while
                        // picking, a drag would fight the clicks that select.
                        canReorder={normalizedFilter === '' && !selection.isSelecting && !collection.isLoading}
                        onMove={actions.move}
                    />
                    {/* The actions for what the editor is looking at, under the list. */}
                    <ResourceActionBar
                        targets={targets}
                        selectableResources={visibleResources}
                        selection={selection.selection}
                        isSelecting={selection.isSelecting}
                        isLoading={collection.isLoading}
                        activity={collection.activity}
                        isMultiple={references.isMultiple}
                        path={selectedPath}
                        canUseSelection={usableSelection.length > 0}
                        selectionIsReferenced={usableSelection.length > 0
                            && usableSelection.every(
                                resource => references.referenced.includes(resource.identifier)
                            )}
                        onDuplicate={() => actions.duplicate(targets)}
                        onSetHidden={hidden => actions.setHidden(targets, hidden)}
                        onDelete={() => actions.requestRemoval(targets)}
                        onSetSelection={selection.setSelection}
                        onUseSelection={() => {
                            references.addMany(usableSelection.map(resource => resource.identifier));
                            selection.leave();
                        }}
                        onUnuseSelection={() => {
                            references.drop(usableSelection.map(resource => resource.identifier));
                            selection.leave();
                        }}
                    />
                </div>
                {/*
                  * Secondary editors open where the regular inspector opens them:
                  * over the area next to it, with the inspector itself staying in
                  * reach - not in a dialog of their own on top of this one.
                  */}
                {secondaryInspector && (
                    <div className="sitegeist-resource-reference-editor__secondary">
                        <button
                            type="button"
                            className="sitegeist-resource-reference-editor__secondary-close"
                            title={t('action.close', 'Close')}
                            onClick={onCloseSecondaryInspector}
                        >
                            <Icon icon="times" />
                        </button>
                        {secondaryInspector}
                    </div>
                )}
                <ResourceInspector
                    inspected={inspected}
                    isLoading={collection.isLoading}
                    renderSecondaryInspector={renderSecondaryInspector}
                />
            </div>
        </Dialog>
    );
};
