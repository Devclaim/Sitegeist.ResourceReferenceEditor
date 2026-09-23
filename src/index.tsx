import React from 'react';
import manifest from '@neos-project/neos-ui-extensibility';

import {watchCreationDialog} from './api/creationDialog';
import {isManagerAddress, keepManagerAddressClean} from './domain/managerState';
import {ResourceManager, ResourceManagerBreadcrumb} from './components/ResourceManager';
import {ResourceReferenceEditor} from './components/ResourceReferenceEditor';
import {RegistriesProvider} from './context/Registries';
import {EditorProps, Registry, Store} from './types';

/**
 * Registers the resource reference editor with the Neos UI.
 *
 * The editor wraps Neos' own reference editor - taken from the registry rather than
 * reimplemented - and adds the resource dialog around it, so the familiar search
 * keeps working and resources can be created, edited and managed without leaving
 * the document.
 */
manifest('Sitegeist.ResourceReferenceEditor', {}, (globalRegistry: Registry, {store, routes}: {store: Store; routes: any}) => {
    const inspectorRegistry = globalRegistry.get('inspector');
    const editorsRegistry = inspectorRegistry?.get('editors');
    const saveHooksRegistry = inspectorRegistry?.get('saveHooks');
    const validatorsRegistry = globalRegistry.get('validators');
    const referenceEditorDefinition = editorsRegistry?.get(
        'Neos.Neos/Inspector/Editors/ReferenceEditor'
    );
    const referencesEditorDefinition = editorsRegistry?.get(
        'Neos.Neos/Inspector/Editors/ReferencesEditor'
    );
    const nodeTypesRegistry = globalRegistry.get('@neos-project/neos-ui-contentrepository');
    const i18nRegistry = globalRegistry.get('i18n');

    if (!editorsRegistry || !referenceEditorDefinition?.component || !nodeTypesRegistry) {
        console.warn('[Sitegeist.ResourceReferenceEditor] Required Neos UI registries are missing.');

        return;
    }

    // Resources are created with Neos' own node creation dialog, whose result comes
    // back as an action - this is what listens for it.
    globalRegistry.get('sagas')?.set(
        'Sitegeist.ResourceReferenceEditor/CreationDialog',
        {saga: watchCreationDialog}
    );

    const registries = {
        store,
        globalRegistry,
        nodeTypesRegistry,
        saveHooksRegistry,
        validatorsRegistry,
        i18nRegistry
    };

    // The resource manager has a module address of its own,
    // /neos/management/resources, which serves the Neos UI (see Routes.yaml) - on
    // that page, the manager is what is shown.
    const isManagerPage = isManagerAddress();

    globalRegistry.get('sagas')?.set(
        'Sitegeist.ResourceReferenceEditor/ManagerAddress',
        {saga: keepManagerAddressClean}
    );

    globalRegistry.get('containers')?.set(
        'PrimaryToolbar/Right/SitegeistResourceManager',
        ({className}: {className?: string}) => (
            <RegistriesProvider registries={registries}>
                <ResourceManager
                    className={className}
                    routes={routes}
                    isManagerPage={isManagerPage}
                    isAvailable={userMaySeeManager()}
                />
            </RegistriesProvider>
        ),
        'start'
    );

    globalRegistry.get('containers')?.set(
        'PrimaryToolbar/Left/SitegeistResourceManagerBreadcrumb',
        () => (
            <RegistriesProvider registries={registries}>
                <ResourceManagerBreadcrumb routes={routes} />
            </RegistriesProvider>
        ),
        'end'
    );

    editorsRegistry.set('Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor', {
        component: (props: EditorProps) => (
            <RegistriesProvider registries={registries}>
                <ResourceReferenceEditor
                    {...props}
                    ReferenceEditor={referenceEditorDefinition.component}
                    ReferencesEditor={referencesEditorDefinition?.component}
                />
            </RegistriesProvider>
        )
    });
});


/**
 * Whether the resource manager's module is in this user's module menu - the menu the
 * backend renders into the page is already filtered by the module privilege, so the
 * toolbar button follows the same rule as the menu entry.
 */
const userMaySeeManager = (): boolean => {
    try {
        const initialData = JSON.parse(document.getElementById('initialData')?.textContent ?? '{}');
        const uris: string[] = [];
        const collect = (entries: unknown): void => Object.values(entries ?? {}).forEach((entry: any) => {
            if (typeof entry?.uri === 'string') {
                uris.push(entry.uri);
            }
            collect(entry?.children);
        });

        collect(initialData?.menu);

        return uris.some(uri => /\/management\/resources(?:[?#]|$)/.test(uri));
    } catch (exception) {
        return false;
    }
};
