import {ResourceNode} from '../types';

/** Where a moved resource goes, relative to the sibling it was dropped on. */
export type MovePosition = 'before' | 'after';

/**
 * The siblings with one of them moved next to another - or `null` when the two are
 * not both in this list, so a caller can look further down the tree.
 */
export const withMoved = (
    siblings: ResourceNode[],
    moving: string,
    target: string,
    position: MovePosition
): ResourceNode[] | null => {
    const from = siblings.findIndex(resource => resource.contextPath === moving);

    if (from < 0 || !siblings.some(resource => resource.contextPath === target)) {
        return null;
    }

    const rest = siblings.filter((_resource, index) => index !== from);
    const to = rest.findIndex(resource => resource.contextPath === target);
    rest.splice(position === 'before' ? to : to + 1, 0, siblings[from]);

    return rest;
};

/** `withMoved`, applied wherever in the nested tree the two siblings sit. */
export const withMovedDeep = (
    resources: ResourceNode[],
    moving: string,
    target: string,
    position: MovePosition
): ResourceNode[] => withMoved(resources, moving, target, position)
    ?? resources.map(resource => (resource.children
        ? {...resource, children: withMovedDeep(resource.children, moving, target, position)}
        : resource));
