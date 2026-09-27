import React from 'react';
import {Button, Dialog, IconButton} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {ManagedCollection, managedCollectionsOf} from '../domain/collections';
import {closeManager, openManager, useManagerState} from '../domain/managerState';
import {NO_REFERENCES} from '../hooks/useReferences';
import {useResourceEditor} from '../hooks/useResourceEditor';
import {styles} from '../styles';
import {EditorProps} from '../types';
import {DeleteConfirmationDialog} from './DeleteConfirmationDialog';
import {ResourceDialog} from './ResourceDialog';

/**
 * One collection in the manager: exactly the dialog the field opens, with nothing
 * to reference into - so every row's Use control is gone and the rest is the same.
 */
const CollectionPanel: React.FC<{
    collection: ManagedCollection;
    routes: any;
    header: React.ReactNode;
    onClose: () => void;
}> = ({collection: managed, routes, header, onClose}) => {
    // Stable for the lifetime of the panel, as the hooks key their callbacks on it.
    const props = React.useMemo<EditorProps>(() => ({
        options: managed.options,
        value: null,
        commit: () => undefined,
        neos: {routes}
    }), [managed, routes]);

    const {secondary, collection, tree, selection, inspected, actions} =
        useResourceEditor(props, NO_REFERENCES, () => undefined);

    React.useEffect(() => {
        void collection.run(() => collection.reload());
    }, [collection.reload]);

    return (
        <>
            <ResourceDialog
                isOpen
                header={header}
                onClose={() => {
                    secondary.close();
                    onClose();
                }}
                collection={collection}
                tree={tree}
                inspected={inspected}
                selection={selection}
                references={NO_REFERENCES}
                actions={actions}
                creationType={managed.options.resourceCreation.type}
                usableNodeTypes={[]}
                renderSecondaryInspector={secondary.render}
                secondaryInspector={secondary.secondaryInspector?.element ?? null}
                onCloseSecondaryInspector={secondary.close}
            />
            {actions.pendingRemoval && (
                <DeleteConfirmationDialog
                    resources={actions.pendingRemoval}
                    usage={actions.pendingRemovalUsage}
                    onCancel={actions.cancelRemoval}
                    onHideInstead={resources => {
                        actions.cancelRemoval();
                        actions.setHidden(resources, true);
                    }}
                    onConfirm={actions.remove}
                />
            )}
        </>
    );
};

/**
 * The resource manager: the field's own dialog, with the collections of the
 * installation as tabs on top. It is opened from the Resources section in the left
 * sidebar and from the button in the top bar, which is what this component renders
 * in its place - the dialog itself floats above everything, wherever it is mounted.
 */
export const ResourceManager: React.FC<{
    routes: any;
    className?: string;
}> = ({routes, className}) => {
    const {nodeTypesRegistry, i18nRegistry, t} = useRegistries();
    const {isOpen, collection: requested} = useManagerState();
    const collections = React.useMemo(
        () => managedCollectionsOf(nodeTypesRegistry, i18nRegistry),
        [nodeTypesRegistry, i18nRegistry]
    );
    const [active, setActive] = React.useState<string | null>(null);

    // Opening on a collection - from the sidebar - shows its tab.
    React.useEffect(() => {
        if (isOpen) {
            setActive(requested ?? collections[0]?.name ?? null);
        }
    }, [isOpen, requested]);

    const current = collections.find(collection => collection.name === active) ?? collections[0] ?? null;

    const header = (
        <div className="sitegeist-resource-reference-editor__manager-tabs" role="tablist">
            {collections.map(collection => (
                <button
                    key={collection.name}
                    type="button"
                    role="tab"
                    aria-selected={collection.name === current?.name}
                    className={'sitegeist-resource-reference-editor__manager-tab'
                        + (collection.name === current?.name
                            ? ' sitegeist-resource-reference-editor__manager-tab--active'
                            : '')}
                    onClick={() => setActive(collection.name)}
                >
                    {collection.label}
                </button>
            ))}
        </div>
    );

    return (
        <>
            <IconButton
                className={className}
                icon="box-archive"
                title={t('manager.open', 'Resources')}
                aria-label={t('manager.open', 'Resources')}
                onClick={() => openManager()}
            />
            {isOpen && (
                <>
                    <style>{styles}</style>
                    {current
                        ? (
                            // Keyed on the collection: a tab is a collection of its own,
                            // with its own list, selection and open resource.
                            <CollectionPanel
                                key={current.name}
                                collection={current}
                                routes={routes}
                                header={header}
                                onClose={closeManager}
                            />
                        )
                        : (
                            <EmptyManager onClose={closeManager} />
                        )}
                </>
            )}
        </>
    );
};

/** No property uses the editor yet, so there is no collection to show. */
const EmptyManager: React.FC<{onClose: () => void}> = ({onClose}) => {
    const {t} = useRegistries();

    return (
        <Dialog
            isOpen
            title={t('manager.open', 'Resources')}
            onRequestClose={onClose}
            actions={[
                <Button key="close" type="button" style="lighter" onClick={onClose}>
                    {t('action.close', 'Close')}
                </Button>
            ]}
        >
            <div className="sitegeist-resource-reference-editor__state">
                {t(
                    'manager.empty',
                    'No resource collections yet - a collection appears here once a property uses the resource reference editor.'
                )}
            </div>
        </Dialog>
    );
};
