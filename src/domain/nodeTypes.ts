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
 * non-nullable constructor arguments, so a required field the editor left untouched
 * is sent as an empty value of the right type rather than as null.
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
 * The fields a resource is created with: the node type's creation dialog elements,
 * in the shape the inspector renders. Only properties promoted to the creation
 * dialog (`showInCreationDialog`) end up here - values for anything else are
 * dropped server side.
 */
export const creationElementsFor = (nodeType: any): InspectorItem[] =>
    Object.entries<any>(nodeType?.ui?.creationDialog?.elements ?? {})
        .filter(([, element]) => element?.ui?.editor && element?.ui?.hidden !== true)
        .map(([name, element]) => ({
            type: 'editor',
            id: name,
            dataType: element.type,
            label: element.ui?.label ?? name,
            editor: element.ui.editor,
            editorOptions: element.ui.editorOptions,
            helpMessage: element.ui?.help,
            defaultValue: element.defaultValue,
            validation: element.validation
        }));

/**
 * Required constructor arguments the creation dialog cannot ask for. Node types
 * mapped to PHP entities cannot be constructed without them, and a node created
 * without them breaks node label rendering - so the editor refuses instead.
 */
export const missingCreationProperties = (
    creation: ResourceCreation,
    elements: InspectorItem[]
): string[] => {
    if (!Array.isArray(creation.requiredProperties)) {
        // The PHP side always sends this list. Without it we cannot know what the
        // entity needs, and creating would produce a node that breaks rendering.
        return ['(stale editor configuration - flush the Neos caches)'];
    }

    const asked = new Set(elements.map(element => element.id));

    return [
        ...(creation.unsupportedRequiredProperties ?? []),
        ...creation.requiredProperties
            .filter(property => !asked.has(property.name))
            .map(property => property.name)
    ];
};

export const declarationFor = (nodeType: any, name: string): any =>
    nodeType?.properties?.[name] ?? nodeType?.references?.[name];


export const allItemsOf = (tabs: InspectorTab[]): InspectorItem[] =>
    tabs.flatMap(tab => tab.groups.flatMap(group => editableItems(group)));

