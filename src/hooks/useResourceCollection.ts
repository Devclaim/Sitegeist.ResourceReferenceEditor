import React from 'react';

import {loadResources, resolveResourceContainer} from '../api/endpoints';
import {invalidateNodeLookupCache} from '../api/nodeLookup';
import {useRegistries} from '../context/Registries';
import {MovePosition, withMovedDeep} from '../domain/order';
import {messageOf} from '../domain/validation';
import {EditorOptions, ResourceNode} from '../types';

/** The action `run` is busy with - its button shows a spinner meanwhile. */
export type Activity = 'create' | 'duplicate' | 'hide' | 'delete' | 'save' | 'move';

export type ResourceCollection = {
    /** Node address of the collection the resources live in. */
    container: {contextPath: string} | null;
    resources: ResourceNode[];
    isLoading: boolean;
    activity: Activity | null;
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
    run: <T>(action: () => Promise<T>, activity?: Activity) => Promise<T | undefined>;
    /**
     * Applies an outcome that is already known - a visibility toggle, a rename -
     * to the matching resource (wherever it sits in the nested tree) without
     * asking the server to read the whole collection back just to confirm it.
     */
    patch: (contextPath: string, fields: Partial<ResourceNode>) => void;
    /** Moves a resource next to a sibling, wherever in the nested tree the two sit. */
    reorder: (moving: string, target: string, position: MovePosition) => void;
};

/** `patch`, applied wherever the resource sits in the nested tree. */
const withPatchedResource = (
    resources: ResourceNode[],
    contextPath: string,
    fields: Partial<ResourceNode>
): ResourceNode[] => resources.map(resource => {
    if (resource.contextPath === contextPath) {
        return {...resource, ...fields};
    }

    return resource.children
        ? {...resource, children: withPatchedResource(resource.children, contextPath, fields)}
        : resource;
});

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
    const [activity, setActivity] = React.useState<Activity | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [version, setVersion] = React.useState(0);

    // The collection's node address does not change while the same document is
    // edited, so it is resolved once per document instead of in front of every
    // reload - which would otherwise always be two requests in a row.
    const resolved = React.useRef<{key: string; container: {contextPath: string}} | null>(null);

    const reload = React.useCallback(async () => {
        const key = `${store.getState()?.cr?.nodes?.documentNode ?? ''}|${creation.collection}`;
        const resolvedContainer = resolved.current?.key === key
            ? resolved.current.container
            : await resolveResourceContainer(store, creation, routes);

        resolved.current = {key, container: resolvedContainer};
        const loadedResources = await loadResources(
            store,
            routes,
            options,
            resolvedContainer.contextPath
        );

        setContainer(resolvedContainer);
        setResources(loadedResources);

        return {container: resolvedContainer, resources: loadedResources};
    }, [creation, options, routes, store]);

    const run = React.useCallback(async <T, >(
        action: () => Promise<T>,
        runningActivity?: Activity
    ): Promise<T | undefined> => {
        setIsLoading(true);
        setActivity(runningActivity ?? null);
        setError(null);
        try {
            return await action();
        } catch (exception) {
            setError(messageOf(exception));

            return undefined;
        } finally {
            setIsLoading(false);
            setActivity(null);
        }
    }, []);

    return {
        container,
        resources,
        isLoading,
        activity,
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
        ),
        patch: React.useCallback(
            (contextPath: string, fields: Partial<ResourceNode>) =>
                setResources(current => withPatchedResource(current, contextPath, fields)),
            []
        ),
        reorder: React.useCallback(
            (moving: string, target: string, position: MovePosition) =>
                setResources(current => withMovedDeep(current, moving, target, position)),
            []
        )
    };
};
