import React from 'react';

import {loadResources, resolveResourceContainer} from '../api/endpoints';
import {invalidateNodeLookupCache} from '../api/nodeLookup';
import {useRegistries} from '../context/Registries';
import {messageOf} from '../domain/validation';
import {EditorOptions, ResourceNode} from '../types';

export type ResourceCollection = {
    /** Node address of the collection the resources live in. */
    container: {contextPath: string} | null;
    resources: ResourceNode[];
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    /** Re-reads collection and resources, and answers with what was read. */
    reload: () => Promise<{container: {contextPath: string}; resources: ResourceNode[]}>;
    /**
     * Counts the changes made to resources. Neos' reference editor loads the label
     * of its value once and keeps it, so it is re-keyed on this and reads the label
     * again after a resource was renamed.
     */
    version: number;
    touch: () => void;
    /**
     * Runs an action with the dialog's loading state and error banner around it, so
     * every action does not have to repeat the same try/catch/finally.
     */
    run: <T>(action: () => Promise<T>) => Promise<T | undefined>;
};

/**
 * Holds the resource collection: its node address, the resources in it, and the
 * loading and error state every action on them shares.
 */
export const useResourceCollection = (options: EditorOptions, routes: any): ResourceCollection => {
    const {store, globalRegistry} = useRegistries();
    const creation = options.resourceCreation;

    const [container, setContainer] = React.useState<{contextPath: string} | null>(null);
    const [resources, setResources] = React.useState<ResourceNode[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [version, setVersion] = React.useState(0);

    const reload = React.useCallback(async () => {
        const resolvedContainer = await resolveResourceContainer(store, creation, routes);
        const loadedResources = await loadResources(options, resolvedContainer.contextPath);

        setContainer(resolvedContainer);
        setResources(loadedResources);

        return {container: resolvedContainer, resources: loadedResources};
    }, [creation, options, routes, store]);

    const run = React.useCallback(async <T, >(action: () => Promise<T>): Promise<T | undefined> => {
        setIsLoading(true);
        setError(null);
        try {
            return await action();
        } catch (exception) {
            setError(messageOf(exception));

            return undefined;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        container,
        resources,
        isLoading,
        error,
        setError,
        reload,
        run,
        version,
        touch: React.useCallback(
            () => {
                invalidateNodeLookupCache(globalRegistry);
                setVersion(current => current + 1);
            },
            [globalRegistry]
        )
    };
};
