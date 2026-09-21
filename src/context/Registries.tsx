import React from 'react';

import {Translator, translatorFor} from '../i18n';
import {Store} from '../types';

/**
 * The Neos UI hands its registries to a plugin once, when the manifest runs. Every
 * component below the editor needs some of them, so they are passed down through a
 * context instead of through every component's props.
 */
export type Registries = {
    store: Store;
    nodeTypesRegistry: any;
    saveHooksRegistry: any;
    validatorsRegistry: any;
    i18nRegistry: any;
    /** `i18nRegistry` bound to this package's own translation unit. */
    t: Translator;
};

const RegistriesContext = React.createContext<Registries | null>(null);

export const RegistriesProvider: React.FC<{
    registries: Omit<Registries, 't'>;
    children: React.ReactNode;
}> = ({registries, children}) => {
    const value = React.useMemo<Registries>(
        () => ({...registries, t: translatorFor(registries.i18nRegistry)}),
        [registries]
    );

    return (
        <RegistriesContext.Provider value={value}>
            {children}
        </RegistriesContext.Provider>
    );
};

export const useRegistries = (): Registries => {
    const registries = React.useContext(RegistriesContext);

    if (!registries) {
        throw new Error(
            '[Sitegeist.ResourceReferenceEditor] The Neos UI registries are only '
            + 'available below RegistriesProvider.'
        );
    }

    return registries;
};
