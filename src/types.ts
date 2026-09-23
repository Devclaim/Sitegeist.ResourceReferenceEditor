import React from 'react';

/**
 * The shapes this package works with: the editor's own configuration, the node
 * information Neos hands back, and the inspector structure of a node type.
 */

export type ResourceNode = {
    contextPath: string;
    identifier: string;
    nodeType: string;
    label: string;
    properties?: Record<string, unknown>;
    /** Subtree tags as node info serializes them: `{disabled: true}` when hidden. */
    tags?: Record<string, boolean | null>;
    /** The node name, which for a tethered child is its slot in the parent. */
    name?: string;
    /** Tethered children belong to their parent and cannot be changed on their own. */
    tethered?: boolean;
    hidden?: boolean;
    /**
     * Whether the current user may change it and create below it - the
     * ManageResources privilege. Only what the dialog offers depends on it; the
     * content repository enforces the privilege by itself.
     */
    canManage?: boolean;
    /** How many children this node has - what makes a row descendable. */
    childCount?: number;
    /**
     * The children, when they came with the node. The list reads several levels at
     * once and shows them unfolded; a level that was not read is fetched when its
     * node is unfolded.
     */
    children?: ResourceNode[];
};


/** How many nodes reference a resource, and in which documents. */
export type ResourceUsage = {
    count: number;
    documents: string[];
};


export type RequiredProperty = {
    name: string;
    type: string;
};


export type ResourceCreation = {
    type: string;
    /** Name of the collection below the resource root, for example "authors". */
    collection: string;
    buttonLabel?: string;
    /** Properties the entity cannot be constructed without - resolved in PHP. */
    requiredProperties?: RequiredProperty[];
    /** Required properties no empty placeholder can be invented for. */
    unsupportedRequiredProperties?: string[];
};


export type EditorOptions = {
    nodeTypes?: string[];
    startingPoint?: string;
    disabled?: boolean;
    /** A collection typed property is edited with the multi value reference editor. */
    multiple?: boolean;
    resourceCreation: ResourceCreation;
    [key: string]: unknown;
};


export type EditorProps = {
    value?: string | string[] | null;
    options: EditorOptions;
    commit: (value: string | string[]) => void;
    className?: string;
    /** Injected by the inspector: configuration, routes and the global registry. */
    neos?: any;
    identifier?: string;
    [key: string]: unknown;
};


export type Store = {
    dispatch: (action: unknown) => void;
    getState: () => any;
};


export type Registry = {
    get: (key: string) => any;
};


/** One editor of the node type's inspector configuration. */
export type InspectorItem = {
    type: string;
    id: string;
    /** Only on creation dialog elements: the data type and its default. */
    dataType?: string;
    defaultValue?: unknown;
    validation?: Record<string, unknown>;
    label?: string;
    editor?: string;
    editorOptions?: Record<string, unknown>;
    hidden?: boolean;
    helpMessage?: string;
    helpThumbnail?: string;
};


export type InspectorGroup = {
    id: string;
    label?: string;
    icon?: string;
    collapsed?: boolean;
    items?: InspectorItem[];
};


export type InspectorTab = {
    id: string;
    label?: string;
    icon?: string;
    groups: InspectorGroup[];
};


export type DraftValue = {
    value: unknown;
    hooks?: Record<string, unknown>;
};


export type SecondaryInspector = {
    id: string;
    /**
     * The resolved element, not the factory. Neos resolves the factory once when
     * the secondary editor opens "to ensure the object is not re-created on every
     * render but stays the same for its whole lifetime" - the image cropper keeps
     * the current crop in its own state and resets it when it receives new props.
     */
    element: React.ReactNode;
};


/** The collection resources of a type live in. */
export type ResourceContainer = {
    contextPath: string;
    /** Whether the current user may create resources in it. */
    canManage: boolean;
};
