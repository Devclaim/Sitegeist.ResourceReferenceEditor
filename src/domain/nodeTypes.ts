import {EditorOptions, InspectorGroup, InspectorItem, InspectorTab, ResourceCreation} from '../types';

export const nodeTypeFilter = (options: EditorOptions): string =>
    (options.nodeTypes ?? [options.resourceCreation.type])
        .map(nodeTypeName => `[instanceof ${nodeTypeName}]`)
        .join(',');


export const editableItems = (group: InspectorGroup): InspectorItem[] =>
    (group.items ?? []).filter(item => item.type === 'editor' && item.editor && item.hidden !== true);


/**
 * The node type's inspector structure - tabs, groups and editors - exactly as
 * the Neos inspector builds it, minus groups that would end up empty here.
 */
export const inspectorTabsFor = (nodeTypesRegistry: any, nodeTypeName: string): InspectorTab[] => {
    const viewConfiguration = nodeTypesRegistry.getInspectorViewConfigurationFor(nodeTypeName);

    return (viewConfiguration?.tabs ?? [])
        .map((tab: any) => ({
            ...tab,
            groups: (tab.groups ?? []).filter((group: InspectorGroup) => editableItems(group).length > 0)
        }))
        .filter((tab: InspectorTab) => tab.groups.length > 0);
};


/**
 * An empty, type correct value. Node types mapped to PHP entities reject null for
 * non-nullable constructor arguments, so a resource cannot be created without one.
 */
export const emptyValueFor = (type: string): unknown => {
    switch (type) {
        case 'integer':
        case 'float':
            return 0;
        case 'boolean':
            return false;
        case 'array':
            return [];
        default:
            return '';
    }
};


/**
 * Values sent on creation only reach the node when the property is promoted to the
 * creation dialog (`showInCreationDialog`) - everything else is dropped server side.
 */
export const creationDataFor = (
    creation: ResourceCreation,
    nodeType: any
): {data: Record<string, unknown>; missing: string[]} => {
    const elements = nodeType?.ui?.creationDialog?.elements ?? {};
    const data: Record<string, unknown> = {};
    const missing = [...(creation.unsupportedRequiredProperties ?? [])];

    if (!Array.isArray(creation.requiredProperties)) {
        // The PHP side always sends this list. Without it we cannot know which
        // properties the entity needs, and creating would produce a node that
        // breaks node label rendering.
        return {
            data,
            missing: ['(stale editor configuration - flush the Neos caches)']
        };
    }

    for (const property of creation.requiredProperties) {
        if (!elements[property.name]) {
            missing.push(property.name);

            continue;
        }

        data[property.name] = emptyValueFor(property.type);
    }

    return {data, missing};
};


export const declarationFor = (nodeType: any, name: string): any =>
    nodeType?.properties?.[name] ?? nodeType?.references?.[name];


export const allItemsOf = (tabs: InspectorTab[]): InspectorItem[] =>
    tabs.flatMap(tab => tab.groups.flatMap(group => editableItems(group)));

