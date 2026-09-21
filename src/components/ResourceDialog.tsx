import React from 'react';
import {Button, Dialog} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {InspectedResource} from '../hooks/useInspectedResource';
import {References} from '../hooks/useReferences';
import {ResourceCollection} from '../hooks/useResourceCollection';
import {ResourceActions} from '../hooks/useResourceActions';
import {Selection} from '../hooks/useSelection';
import {ResourceNode} from '../types';
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
    inspected: InspectedResource;
    selection: Selection;
    references: References;
    actions: ResourceActions;
    createLabel?: string;
    renderSecondaryInspector: (id?: string, render?: () => React.ReactNode) => void;
}> = ({
    isOpen,
    onClose,
    collection,
    inspected,
    selection,
    references,
    actions,
    createLabel,
    renderSecondaryInspector
}) => {
    const {t} = useRegistries();
    const [filter, setFilter] = React.useState('');

    const normalizedFilter = filter.trim().toLocaleLowerCase();
    const visibleResources = normalizedFilter === ''
        ? collection.resources
        : collection.resources.filter(resource =>
            (resource.label ?? '').toLocaleLowerCase().includes(normalizedFilter));

    // The action bar acts on what the editor is looking at: the resource open in the
    // inspector, or the selection while several are being picked.
    const inspectedResource: ResourceNode | null = inspected.node
        ? collection.resources.find(
            resource => resource.contextPath === inspected.node.contextPath
        ) ?? null
        : null;
    const targets = selection.isSelecting
        ? selection.selected
        : (inspectedResource ? [inspectedResource] : []);

    return (
        <Dialog
            isOpen={isOpen}
            /* No title: the dialog is the resource list, and a headline on top of
               the list only pushed everything down. */
            title=""

            style="jumbo"
            onRequestClose={onClose}
            /* The resource actions share the dialog's own footer row, so they sit
               as far out of the way as the close button next to them. */
            actions={[
                <ResourceActionBar
                    key="actions"
                    targets={targets}
                    visibleResources={visibleResources}
                    selection={selection.selection}
                    isSelecting={selection.isSelecting}
                    isLoading={collection.isLoading}
                    isMultiple={references.isMultiple}
                    selectionIsReferenced={selection.selected.length > 0
                        && selection.selected.every(
                            resource => references.referenced.includes(resource.identifier)
                        )}
                    onDuplicate={() => actions.duplicate(targets)}
                    onSetHidden={hidden => actions.setHidden(targets, hidden)}
                    onDelete={() => actions.requestRemoval(targets)}
                    onSetSelection={selection.setSelection}
                    onUseSelection={() => {
                        references.addMany(selection.selected.map(resource => resource.identifier));
                        selection.leave();
                    }}
                    onUnuseSelection={() => {
                        references.drop(selection.selected.map(resource => resource.identifier));
                        selection.leave();
                    }}
                />,
                <Button key="close" type="button" onClick={onClose}>
                    {t('action.close', 'Close')}
                </Button>
            ]}
        >
            <div className="sitegeist-resource-reference-editor__layout">
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
                        isSelecting={selection.isSelecting}
                        canSelect={visibleResources.length > 0}
                        createLabel={createLabel}
                        onCreate={actions.create}
                        onEnterSelection={() => selection.enter(
                            // Carry the resource that is open over into the
                            // selection, so switching modes does not lose it.
                            inspectedResource ? [inspectedResource.contextPath] : []
                        )}
                        onLeaveSelection={selection.leave}
                    />
                    <ResourceList
                        resources={visibleResources}
                        isLoading={collection.isLoading}
                        activeContextPath={inspected.node?.contextPath}
                        referencedIdentifiers={references.referenced}
                        isSelecting={selection.isSelecting}
                        selection={selection.selection}
                        onOpen={inspected.inspect}
                        onToggleSelection={selection.toggle}
                        onToggleReference={references.toggle}
                    />
                </div>
                <ResourceInspector
                    inspected={inspected}
                    isLoading={collection.isLoading}
                    renderSecondaryInspector={renderSecondaryInspector}
                />
            </div>
        </Dialog>
    );
};
