import React from 'react';
import ReactDOM from 'react-dom';
import {Icon, IconButton} from '@neos-project/react-ui-components';

import {loadResources, resolveResourceContainer} from '../api/endpoints';
import {useRegistries} from '../context/Registries';
import {managedCollectionsOf} from '../domain/collections';
import {openManager} from '../domain/managerState';
import {styles} from '../styles';

const STORAGE_KEY = 'Sitegeist.ResourceReferenceEditor:sidebarSectionOpen';

const readOpen = (): boolean => {
    try {
        return window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch (exception) {
        return false;
    }
};

const writeOpen = (open: boolean): void => {
    try {
        window.localStorage.setItem(STORAGE_KEY, open ? '1' : '0');
    } catch (exception) {
        // Remembering it is a convenience only.
    }
};

/**
 * The Resources section of the left sidebar, below the content tree: one row per
 * resource collection, each opening the resource manager on its tab. Closed by
 * default, like a panel one opens when needed; whether it is open is remembered in
 * this browser.
 *
 * Neos renders its LeftSideBar/Bottom slot only while the content tree is open, so
 * the section is registered in the top slot, which is always rendered, and moves
 * itself to the end of the sidebar - below the content tree, whether that is open
 * or not.
 */
export const ResourceSidebarSection: React.FC<{routes: any}> = ({routes}) => {
    const {nodeTypesRegistry, i18nRegistry, store, t} = useRegistries();
    const anchor = React.useRef<HTMLSpanElement | null>(null);
    const [host, setHost] = React.useState<HTMLElement | null>(null);
    const [isOpen, setIsOpen] = React.useState(readOpen);
    const [counts, setCounts] = React.useState<Record<string, number>>({});
    const collections = React.useMemo(
        () => managedCollectionsOf(nodeTypesRegistry, i18nRegistry),
        [nodeTypesRegistry, i18nRegistry]
    );

    // The sidebar is the parent of the slot this is rendered into.
    React.useLayoutEffect(() => {
        const sidebar = anchor.current?.parentElement?.parentElement;

        if (!sidebar) {
            return undefined;
        }

        const element = document.createElement('div');
        element.className = 'sitegeist-resource-reference-editor__sidebar-host';
        sidebar.appendChild(element);
        setHost(element);

        return () => {
            element.remove();
        };
    }, []);

    // How many resources each collection holds - read when the section is opened,
    // not with every page load.
    React.useEffect(() => {
        if (!isOpen) {
            return;
        }

        collections.forEach(collection => {
            const creation = collection.options.resourceCreation;

            resolveResourceContainer(store, creation, routes)
                .then(container => loadResources(store, routes, collection.options, container.contextPath))
                .then(resources => setCounts(current => ({...current, [collection.name]: resources.length})))
                .catch(() => undefined);
        });
    }, [isOpen, collections, routes, store]);

    const toggle = (): void => {
        setIsOpen(open => {
            writeOpen(!open);

            return !open;
        });
    };

    const section = collections.length === 0 ? null : (
        <div className="sitegeist-resource-reference-editor__sidebar">
            <style>{styles}</style>
            <div role="button" className="sitegeist-resource-reference-editor__sidebar-toggle" onClick={toggle}>
                <IconButton
                    className="sitegeist-resource-reference-editor__sidebar-toggle-button"
                    icon={isOpen ? 'chevron-circle-down' : 'chevron-circle-up'}
                    hoverStyle="clean"
                    aria-label={t('sidebar.toggle', 'Toggle resources')}
                />
                <span className="sitegeist-resource-reference-editor__sidebar-label">
                    {t('manager.open', 'Resources')}
                </span>
            </div>
            {isOpen && (
                <ul className="sitegeist-resource-reference-editor__sidebar-list">
                    {collections.map(collection => (
                        <li key={collection.name}>
                            <button
                                type="button"
                                className="sitegeist-resource-reference-editor__sidebar-item"
                                onClick={() => openManager(collection.name)}
                            >
                                <Icon icon={collection.icon ?? 'box-archive'} />
                                <span className="sitegeist-resource-reference-editor__sidebar-item-label">
                                    {collection.label}
                                </span>
                                {counts[collection.name] !== undefined && (
                                    <span className="sitegeist-resource-reference-editor__sidebar-count">
                                        {counts[collection.name]}
                                    </span>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <>
            <span ref={anchor} hidden />
            {host && section && ReactDOM.createPortal(section, host)}
        </>
    );
};
