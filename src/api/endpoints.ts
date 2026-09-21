import backend from '@neos-project/neos-ui-backend-connector';
import {selectors} from '@neos-project/neos-ui-redux-store';

import {nodeTypeFilter} from '../domain/nodeTypes';
import {EditorOptions, ResourceCreation, ResourceNode, ResourceUsage, Store} from '../types';

/** Neos may live in a sub directory - derive the prefix from a known backend route. */
export const basePathOf = (routes: any): string => {
    const nodesRoute = routes?.core?.service?.nodes;

    if (typeof nodesRoute !== 'string') {
        return '';
    }

    return nodesRoute.replace(/\/neos\/service\/nodes\/?$/, '');
};


/**
 * Resource collections live in an own root subtree
 * (`/<Sitegeist.ResourceReferenceEditor:Root>/<collection>`), so they cannot be
 * reached by walking the site node. The package's data source resolves - and on
 * first use creates - the collection and answers with its node address.
 *
 * A data source is used rather than an own route, because those are served by Neos'
 * own service controller and are therefore covered by the backend routing and
 * authentication. Workspace and dimension come from the node being edited.
 */
export const resolveResourceContainer = async (
    store: Store,
    creation: ResourceCreation,
    routes: any,
): Promise<{contextPath: string}> => {
    const state = store.getState();
    const nodeContextPath = state?.cr?.nodes?.documentNode
        ?? selectors.CR.Nodes.focusedNodePathSelector(state);

    if (typeof nodeContextPath !== 'string') {
        throw new Error('The node of the current editing session could not be resolved.');
    }

    const parameters = new URLSearchParams({
        node: nodeContextPath,
        collection: creation.collection
    });

    if (creation.buttonLabel) {
        parameters.append('title', creation.buttonLabel);
    }

    const response = await fetch(
        `${basePathOf(routes)}/neos/service/data-source/sitegeist-resource-collections`
        + `?${parameters.toString()}`,
        {credentials: 'include', headers: {Accept: 'application/json'}}
    );

    const body = await response.text();

    if (!response.ok) {
        throw new Error(
            `The resource collection "${creation.collection}" could not be resolved `
            + `(HTTP ${response.status}). ${body.slice(0, 500)}`
        );
    }

    let payload: any = null;
    try {
        payload = JSON.parse(body);
    } catch (exception) {
        throw new Error(`The resource collection data source did not answer with JSON: ${body.slice(0, 500)}`);
    }

    // Data sources answer with the assigned value directly.
    const contextPath = payload?.contextPath ?? payload?.data?.contextPath;

    if (typeof contextPath !== 'string') {
        throw new Error(
            `The resource collection "${creation.collection}" has no node address: ${body.slice(0, 500)}`
        );
    }

    return {contextPath};
};


/**
 * Asks how many nodes reference the given resources. The counts come from the
 * subgraph of the edited node, so they cover the current workspace and dimension.
 */
export const loadUsage = async (
    store: Store,
    routes: any,
    identifiers: string[]
): Promise<Record<string, ResourceUsage>> => {
    if (identifiers.length === 0) {
        return {};
    }

    const state = store.getState();
    const nodeContextPath = state?.cr?.nodes?.documentNode
        ?? selectors.CR.Nodes.focusedNodePathSelector(state);

    if (typeof nodeContextPath !== 'string') {
        return {};
    }

    const parameters = new URLSearchParams({
        node: nodeContextPath,
        nodes: identifiers.join(',')
    });

    const response = await fetch(
        `${basePathOf(routes)}/neos/service/data-source/sitegeist-resource-usage`
        + `?${parameters.toString()}`,
        {credentials: 'include', headers: {Accept: 'application/json'}}
    );

    if (!response.ok) {
        // The counts are a courtesy - a failure here must not block the deletion.
        return {};
    }

    try {
        const payload = await response.json();

        return (payload?.data ?? payload ?? {}) as Record<string, ResourceUsage>;
    } catch (exception) {
        return {};
    }
};


export const loadResources = async (
    options: EditorOptions,
    containerContextPath: string
): Promise<ResourceNode[]> => {
    const nodes = await backend.get().q(containerContextPath).find(nodeTypeFilter(options)).get();

    return (nodes ?? []) as ResourceNode[];
};

