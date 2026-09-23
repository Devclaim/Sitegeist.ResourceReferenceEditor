import {translate} from '../i18n';
import {EditorOptions} from '../types';

export const RESOURCE_EDITOR = 'Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor';

/** A collection the resource manager offers a tab for. */
export type ManagedCollection = {
    /** The collection's name, below the resource root - "authors". */
    name: string;
    label: string;
    icon?: string;
    /** What the editor needs, as a field using this collection would receive it. */
    options: EditorOptions;
};

/**
 * Every resource collection in the installation, taken from the node type schema:
 * each property or reference edited with this editor names its collection and the
 * type created there. That is the same configuration the field works with, so the
 * manager needs nothing configured of its own - and a collection nobody references
 * does not get a tab.
 */
export const managedCollectionsOf = (nodeTypesRegistry: any, i18nRegistry: any): ManagedCollection[] => {
    const byName = new Map<string, ManagedCollection>();

    for (const nodeType of nodeTypesRegistry?.getAllAsList?.() ?? []) {
        const declarations = [
            ...Object.values(nodeType?.properties ?? {}),
            ...Object.values(nodeType?.references ?? {})
        ] as any[];

        for (const declaration of declarations) {
            const inspector = declaration?.ui?.inspector;
            const options = inspector?.editorOptions as EditorOptions | undefined;
            const creation = options?.resourceCreation;

            if (inspector?.editor !== RESOURCE_EDITOR || !options || !creation?.collection) {
                continue;
            }

            const known = byName.get(creation.collection);

            if (known) {
                // Several properties can use one collection with different allowed
                // types - the manager shows everything any of them may hold.
                known.options = {
                    ...known.options,
                    nodeTypes: [...new Set([
                        ...(known.options.nodeTypes ?? []),
                        ...(options.nodeTypes ?? [])
                    ])]
                };
                continue;
            }

            const createdType = nodeTypesRegistry.getNodeType(creation.type);

            byName.set(creation.collection, {
                name: creation.collection,
                label: translate(i18nRegistry, createdType?.ui?.label) || creation.collection,
                icon: createdType?.ui?.icon,
                // No property is being edited: nothing to reference into, and never
                // read only - what may be changed is the ManageResources privilege's call.
                options: {...options, resourceCreation: creation, multiple: false, disabled: false}
            });
        }
    }

    return [...byName.values()].sort((a, b) => a.label.localeCompare(b.label));
};
