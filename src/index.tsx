import React from 'react';
import manifest from '@neos-project/neos-ui-extensibility';

import {watchCreationDialog} from './api/creationDialog';
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
manifest('Sitegeist.ResourceReferenceEditor', {}, (globalRegistry: Registry, {store}: {store: Store}) => {
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
