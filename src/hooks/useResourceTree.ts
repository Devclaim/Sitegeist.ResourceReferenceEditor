import React from 'react';

import {loadChildren} from '../api/endpoints';
import {useRegistries} from '../context/Registries';
import {ResourceNode} from '../types';
import {ResourceCollection} from './useResourceCollection';

/** One line of the list: a node, how deep it sits, and what it sits below. */
export type TreeRow = {
    resource: ResourceNode;
    depth: number;
    /** Its ancestors, nearest last - the path shown for the selected node. */
    ancestors: ResourceNode[];
};

export type ResourceTree = {
    rows: TreeRow[];
    /**
     * Reads the children of a node again - what a node needs after one was created
     * below it, so the new child is in the list.
     */
    reveal: (contextPath: string) => Promise<ResourceNode[]>;
};

/**
 * The resources and their children as one list, a child indented below the node it
 * belongs to. There is nothing to fold: a resource collection is a handful of
 * entries, not a site tree, and hiding children behind a control on every row made
 * the rows busier than the list they describe. Filtering is what narrows a long list.
 *
 * The collection is read several levels deep in one request. A level below that -
 * which only a deeply nested resource type ever has - is read when it comes into the
 * list, once, and kept.
 */
export const useResourceTree = (
    collection: ResourceCollection,
    routes: any
): ResourceTree => {
    const {store} = useRegistries();
    const [children, setChildren] = React.useState<Record<string, ResourceNode[]>>({});
    const requested = React.useRef<Set<string>>(new Set());

    const read = React.useCallback(async (contextPath: string): Promise<ResourceNode[]> => {
        const loaded = await loadChildren(store, routes, contextPath);

        setChildren(current => ({...current, [contextPath]: loaded}));

        return loaded;
    }, [routes, store]);

    // What was read for a node wins over what came nested with it: the nested
    // children are what the last reload saw, the map is what was read since.
    const childrenOf = (resource: ResourceNode): ResourceNode[] | undefined =>
        children[resource.contextPath] ?? resource.children;

    /** Nodes that say they have children the last request did not go deep enough for. */
    const unread: string[] = [];

    const build = (entries: ResourceNode[], depth: number, ancestors: ResourceNode[]): TreeRow[] =>
        entries.flatMap(resource => {
            const row: TreeRow = {resource, depth, ancestors};
            const loaded = childrenOf(resource);

            if (!loaded) {
                if (resource.childCount) {
                    unread.push(resource.contextPath);
                }

                return [row];
            }

            return loaded.length > 0
                ? [row, ...build(loaded, depth + 1, [...ancestors, resource])]
                : [row];
        });

    const rows = build(collection.resources, 0, []);

    // Reading happens once per node: a request that came back empty or failed is not
    // tried again on every render. The check itself only needs to run again when the
    // set of rows waiting to be read actually changes, not on every re-render of the
    // editor - which, sitting inside the inspector, can happen very often for
    // reasons that have nothing to do with this list.
    const unreadKey = unread.join('|');

    React.useEffect(() => {
        const missing = unread.filter(contextPath => !requested.current.has(contextPath));

        if (missing.length === 0) {
            return;
        }

        missing.forEach(contextPath => requested.current.add(contextPath));

        void collection.run(async () => {
            for (const contextPath of missing) {
                await read(contextPath);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [unreadKey, read]);

    return {
        rows,
        reveal: async contextPath => {
            requested.current.add(contextPath);

            return read(contextPath);
        }
    };
};
