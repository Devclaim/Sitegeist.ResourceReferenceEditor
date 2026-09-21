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

    const status = (): string => {
        if (selection.isSelecting) {
            return selection.selection.length > 0
                ? t('selection.count', '{count} selected', {count: selection.selection.length})
                : t('selection.hint', 'Click the resources to select them');
        }

        if (inspectedResource) {
            return inspectedResource.label;
        }

        return visibleResources.length === 1
            ? t('list.countOne', '1 resource')
            : t('list.count', '{count} resources', {count: visibleResources.length});
    };

    return (
        <Dialog
            isOpen={isOpen}
            title={t('dialog.title', 'Resources')}
            style="jumbo"
            onRequestClose={onClose}
            actions={[
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
                    <input
                        className="sitegeist-resource-reference-editor__search"
                        type="search"
                        value={filter}
                        placeholder={t('list.search', 'Filter resources')}
                        onChange={event => setFilter(event.currentTarget.value)}
                    />
                    <ResourceActionBar
                        targets={targets}
                        visibleResources={visibleResources}
                        selection={selection.selection}
                        isSelecting={selection.isSelecting}
                        isLoading={collection.isLoading}
                        isMultiple={references.isMultiple}
                        createLabel={createLabel}
                        status={status()}
                        onCreate={actions.create}
                        onDuplicate={() => actions.duplicate(targets)}
                        onSetHidden={hidden => actions.setHidden(targets, hidden)}
                        onDelete={() => actions.requestRemoval(targets)}
                        onEnterSelection={selection.enter}
                        onLeaveSelection={selection.leave}
                        onSetSelection={selection.setSelection}
                        onUseSelection={() => {
                            references.addMany(selection.selected.map(resource => resource.identifier));
                            selection.leave();
                        }}
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
