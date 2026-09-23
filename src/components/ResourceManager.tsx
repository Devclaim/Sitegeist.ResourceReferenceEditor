import React from 'react';
import {Button, Dialog, Icon, IconButton} from '@neos-project/react-ui-components';

import {basePathOf} from '../api/endpoints';
import {useRegistries} from '../context/Registries';
import {ManagedCollection, managedCollectionsOf} from '../domain/collections';
import {setManagerOpen, useManagerOpen} from '../domain/managerState';
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
                asPage
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
 * The resource manager - the backend module for resources. It is the field's own
 * dialog, with the collections of the installation as tabs above it. It lives in the
 * Neos UI rather than as a module page of its own, because that is where the
 * inspector's editors, the media browser and the image cropper exist; the module
 * menu entry leads here.
 */
export const ResourceManager: React.FC<{
    routes: any;
    /** On /neos/management/resources, where the manager is the page. */
    isManagerPage: boolean;
    /** Whether this user sees the entry at all - the module privilege. */
    isAvailable: boolean;
    className?: string;
}> = ({routes, isManagerPage, isAvailable, className}) => {
    const {nodeTypesRegistry, i18nRegistry, store, t} = useRegistries();
    const isOpen = useManagerOpen();
    const base = basePathOf(routes);

    React.useEffect(() => {
        if (isManagerPage && isAvailable) {
            setManagerOpen(true);
        }
    }, []);

    // Entering and leaving are real page changes, as between any two modules:
    // closing goes to the content module, on the document it had open.
    const close = (): void => {
        const documentNode = store.getState()?.cr?.nodes?.documentNode;

        window.location.href = `${base}/neos/content`
            + (typeof documentNode === 'string' ? `?node=${encodeURIComponent(documentNode)}` : '');
    };
    const collections = React.useMemo(
        () => managedCollectionsOf(nodeTypesRegistry, i18nRegistry),
        [nodeTypesRegistry, i18nRegistry]
    );
    const [active, setActive] = React.useState<string | null>(
        collections[0]?.name ?? null
    );
    const current = collections.find(collection => collection.name === active) ?? null;

    if (!isAvailable) {
        return null;
    }

    const header = (
        <>
            <div className="sitegeist-resource-reference-editor__manager-tabs" role="tablist">
            {collections.map(collection => (
                <button
                    key={collection.name}
                    type="button"
                    role="tab"
                    aria-selected={collection.name === active}
                    className={'sitegeist-resource-reference-editor__manager-tab'
                        + (collection.name === active
                            ? ' sitegeist-resource-reference-editor__manager-tab--active'
                            : '')}
                    onClick={() => setActive(collection.name)}
                >
                    {collection.label}
                </button>
            ))}
            </div>
        </>
    );

    return (
        <>
            <IconButton
                className={className}
                icon="box-archive"
                title={t('manager.open', 'Resources')}
                aria-label={t('manager.open', 'Resources')}
                onClick={() => {
                    window.location.href = `${base}/neos/management/resources`;
                }}
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
                                onClose={close}
                            />
                        )
                        : (
                            <EmptyManager onClose={close} />
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

/**
 * The page's breadcrumb, in the top bar next to the Neos logo - where a module page
 * has the rest of its chrome - shown while the manager is open. Same entries and
 * colours as the breadcrumb of Neos' module pages.
 */
export const ResourceManagerBreadcrumb: React.FC<{routes: any}> = ({routes}) => {
    const {i18nRegistry, t} = useRegistries();
    const isOpen = useManagerOpen();

    if (!isOpen) {
        return null;
    }

    return (
        <nav className="sitegeist-resource-reference-editor__breadcrumb" aria-label="Breadcrumb">
            <a href={`${basePathOf(routes)}/neos/management`}>
                <Icon icon="briefcase" />
                {i18nRegistry.translate('Neos.Neos:Modules:management.label', 'Management')}
            </a>
            <span className="sitegeist-resource-reference-editor__breadcrumb-divider">/</span>
            <span className="sitegeist-resource-reference-editor__breadcrumb-current">
                <Icon icon="box-archive" />
                {t('module.label', 'Resources')}
            </span>
        </nav>
    );
};
