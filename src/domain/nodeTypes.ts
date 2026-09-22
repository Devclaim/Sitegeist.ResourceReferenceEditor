import {translate} from '../i18n';
import {InspectorGroup, InspectorItem, InspectorTab, ResourceCreation} from '../types';

/** The node type every resource derives from - declared in Classes/NodeTypes. */
export const RESOURCE_NODE_TYPE = 'Sitegeist.ResourceReferenceEditor:Resource';

/** One node type that can be created, ready to be shown in a menu. */
export type CreatableNodeType = {
    nodeTypeName: string;
    label: string;
    icon?: string;
};

/**
 * True when the edited property accepts this node type. A resource that is only in
 * the list to be managed - a child of another kind, say - cannot be referenced, so
 * it gets no Use control and is left out of Select all.
 */
export const isUsableType = (
    nodeTypesRegistry: any,
    nodeTypeName: string,
    usableNodeTypes: string[]
): boolean => usableNodeTypes.some(
    candidate => nodeTypesRegistry.isOfType?.(nodeTypeName, candidate) ?? nodeTypeName === candidate
);

export const isResourceType = (nodeTypesRegistry: any, nodeTypeName: string): boolean =>
    Boolean(nodeTypesRegistry.isOfType?.(nodeTypeName, RESOURCE_NODE_TYPE));

/**
 * The node types that may be created below a node: the ones its constraints allow,
 * narrowed to resources. A resource contains resources and nothing else, so a
 * content type that a hand written constraint let through is not offered here.
 */
export const resourceChildTypesOf = (
    nodeTypesRegistry: any,
    i18nRegistry: any,
    nodeTypeName: string
): CreatableNodeType[] =>
    ((nodeTypesRegistry.getAllowedChildNodeTypes?.(nodeTypeName) ?? []) as string[])
        .map(name => ({name, nodeType: nodeTypesRegistry.getNodeType(name)}))
        .filter(({name, nodeType}) => Boolean(nodeType)
            && nodeType.abstract !== true
            && isResourceType(nodeTypesRegistry, name))
        .map(({name, nodeType}) => ({
            nodeTypeName: name,
            label: translate(i18nRegistry, nodeType?.ui?.label) || name,
            icon: nodeType?.ui?.icon
        }))
        .sort((one, other) => one.label.localeCompare(other.label));

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

