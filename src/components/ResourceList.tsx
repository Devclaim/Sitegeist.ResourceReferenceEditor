import React from 'react';
import autoAnimate from '@formkit/auto-animate';

import {useRegistries} from '../context/Registries';
import {isUsableType} from '../domain/nodeTypes';
import {MovePosition} from '../domain/order';
import {TreeRow} from '../hooks/useResourceTree';
import {ResourceNode} from '../types';
import {GuideLine, ResourceListItem} from './ResourceListItem';

/**
 * The vertical lines that tie a child to the node it belongs to, one per level of
 * indentation. A line runs on through a row as long as a sibling further down still
 * belongs to it, and stops halfway into the last child - so it ends at that child
 * instead of running on to the bottom of the group.
 */
const guidesOf = (rows: TreeRow[], index: number): GuideLine[] => {
    const {depth} = rows[index];
    const guides: GuideLine[] = [];

    for (let level = 1; level <= depth; level++) {
        let continues = false;

        for (let next = index + 1; next < rows.length && rows[next].depth >= level; next++) {
            if (rows[next].depth === level) {
                continues = true;
                break;
            }
        }

        if (continues) {
            guides.push({level, isEnd: false});
        } else if (level === depth) {
            guides.push({level, isEnd: true});
        }
    }

    return guides;
};

/** The node a row sits below - `null` for a resource of the collection itself. */
const parentOf = (row: TreeRow): string | null =>
    row.ancestors[row.ancestors.length - 1]?.contextPath ?? null;

const isSiblingOf = (row: TreeRow, other: TreeRow): boolean =>
    row.depth === other.depth && parentOf(row) === parentOf(other);

/** The rows of a node and everything shown below it, as `[start, end)`. */
const blockOf = (rows: TreeRow[], index: number): [number, number] => {
    let end = index + 1;

    while (end < rows.length && rows[end].depth > rows[index].depth) {
        end++;
    }

    return [index, end];
};

const indexOf = (rows: TreeRow[], contextPath: string): number =>
    rows.findIndex(row => row.resource.contextPath === contextPath);

/** The rows with a node - and everything below it - moved next to a sibling. */
const withBlockMoved = (
    rows: TreeRow[],
    moving: string,
    target: string,
    position: MovePosition
): TreeRow[] => {
    const [start, end] = blockOf(rows, indexOf(rows, moving));
    const block = rows.slice(start, end);
    const rest = [...rows.slice(0, start), ...rows.slice(end)];
    const targetIndex = indexOf(rest, target);
    const at = position === 'before' ? targetIndex : blockOf(rest, targetIndex)[1];

    return [...rest.slice(0, at), ...block, ...rest.slice(at)];
};

/** Pixels the pointer has to travel before it counts as moving up or down. */
const DIRECTION_THRESHOLD = 4;

/**
 * Where the dragged row goes while it is dragged over a sibling: past it - but only
 * in the direction the pointer is actually moving, the way a sortable list swaps.
 *
 * Right after a swap the sibling slides away under the pointer (auto-animate), and
 * for that moment it is still what the pointer is over. Without the direction check
 * that hover swaps the two straight back, and again, and again - worst with rows
 * that carry children, which are tall and take long to pass. A row that moves under
 * a pointer that does not move cannot trigger anything this way.
 *
 * Only the sibling's own row counts, not the children shown below it: after a swap
 * the pointer can come to rest on those, too.
 */
const previewAfterHover = (
    rows: TreeRow[],
    dragged: string,
    hovered: string,
    direction: 'up' | 'down'
): TreeRow[] | null => {
    const draggedRow = rows[indexOf(rows, dragged)];
    const hoveredRow = rows[indexOf(rows, hovered)];

    if (!draggedRow || !hoveredRow || dragged === hovered || !isSiblingOf(hoveredRow, draggedRow)) {
        return null;
    }

    const isAbove = indexOf(rows, hovered) < indexOf(rows, dragged);

    // Up only ever puts the row above a sibling, down only below one.
    if (isAbove !== (direction === 'up')) {
        return null;
    }

    return withBlockMoved(rows, dragged, hovered, isAbove ? 'before' : 'after');
};

/** The siblings of a row, in the order the rows show them. */
const siblingsOf = (rows: TreeRow[], row: TreeRow): TreeRow[] =>
    rows.filter(candidate => isSiblingOf(candidate, row));

/**
 * The resources and their children as one list - the shape of the node tree in the
 * backend, where a child sits indented below the node it belongs to.
 *
 * Rows are reordered by dragging them: while a row is dragged, the list already shows
 * the order it would have, and the rows glide to their new places (auto-animate), so
 * where the row will land is the list itself rather than a marker to read.
 */
export const ResourceList: React.FC<{
    rows: TreeRow[];
    isLoading: boolean;
    activeContextPath?: string;
    referencedIdentifiers: string[];
    isSelecting: boolean;
    selection: string[];
    /** Node types the edited property can hold - the others get no Use control. */
    usableNodeTypes: string[];
    onOpen: (resource: ResourceNode) => void;
    onToggleSelection: (resource: ResourceNode) => void;
    onPick: (resource: ResourceNode) => void;
    onToggleReference: (identifier: string) => void;
    /** Off while the list is filtered or picked from - the order is not all there. */
    canReorder: boolean;
    onMove: (
        resource: ResourceNode,
        target: ResourceNode,
        position: MovePosition,
        parentContextPath: string | null
    ) => void;
}> = ({
    rows,
    isLoading,
    activeContextPath,
    referencedIdentifiers,
    isSelecting,
    selection,
    usableNodeTypes,
    onOpen,
    onToggleSelection,
    onPick,
    onToggleReference,
    canReorder,
    onMove
}) => {
    const {nodeTypesRegistry, t} = useRegistries();
    const list = React.useRef<HTMLDivElement | null>(null);
    const [dragged, setDragged] = React.useState<string | null>(null);
    // The order while a row is being dragged; `null` otherwise.
    const [preview, setPreview] = React.useState<TreeRow[] | null>(null);
    const shown = preview ?? rows;
    // Where the pointer was when it last counted as moving, and which way it went.
    const pointer = React.useRef<{y: number; direction: 'up' | 'down' | null}>({y: 0, direction: null});

    React.useEffect(() => {
        if (list.current) {
            autoAnimate(list.current, {duration: 160, easing: 'ease-out'});
        }
    }, []);

    /** Applies the order the rows show now, if it differs from the stored one. */
    const commit = (order: TreeRow[], contextPath: string): void => {
        const row = order[indexOf(order, contextPath)];
        const original = rows[indexOf(rows, contextPath)];

        if (!row || !original) {
            return;
        }

        const before = siblingsOf(rows, original).map(sibling => sibling.resource.contextPath);
        const after = siblingsOf(order, row);

        if (before.join('|') === after.map(sibling => sibling.resource.contextPath).join('|')) {
            return;
        }

        const index = after.findIndex(sibling => sibling.resource.contextPath === contextPath);
        const next = after[index + 1];
        const previous = after[index - 1];

        if (next) {
            onMove(row.resource, next.resource, 'before', parentOf(row));
        } else if (previous) {
            onMove(row.resource, previous.resource, 'after', parentOf(row));
        }
    };

    const endDrag = (): void => {
        setDragged(null);
        setPreview(null);
    };

    /** Alt+Arrow keys: one step up or down among the siblings, without a mouse. */
    const moveByKey = (row: TreeRow, direction: -1 | 1): void => {
        const siblings = siblingsOf(rows, row);
        const index = siblings.findIndex(sibling => sibling.resource.contextPath === row.resource.contextPath);
        const neighbour = siblings[index + direction];

        if (neighbour) {
            onMove(row.resource, neighbour.resource, direction < 0 ? 'before' : 'after', parentOf(row));
        }
    };

    return (
        <div
            ref={list}
            className="sitegeist-resource-reference-editor__list"
            onDragOver={(event: React.DragEvent) => {
                if (!dragged) {
                    return;
                }

                // Anywhere in the list is a valid place to let go - where the row
                // lands is decided by the order shown, not by the drop point.
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';

                // Small jitters are not a direction; the distance adds up until it is.
                const travelled = event.clientY - pointer.current.y;

                if (Math.abs(travelled) >= DIRECTION_THRESHOLD) {
                    pointer.current = {y: event.clientY, direction: travelled < 0 ? 'up' : 'down'};
                }

                const {direction} = pointer.current;
                const hovered = (event.target as HTMLElement)
                    .closest?.('[data-context-path]')
                    ?.getAttribute('data-context-path');

                if (hovered && direction) {
                    const next = previewAfterHover(shown, dragged, hovered, direction);

                    if (next) {
                        setPreview(next);
                    }
                }
            }}
            onDrop={(event: React.DragEvent) => {
                event.preventDefault();

                if (dragged && preview) {
                    commit(preview, dragged);
                }

                endDrag();
            }}
        >
            {shown.length === 0 && (
                <div className="sitegeist-resource-reference-editor__state">
                    {isLoading
                        ? t('list.loading', 'Loading…')
                        : t('list.empty', 'No resources found.')}
                </div>
            )}
            {shown.map((row, index) => (
                <ResourceListItem
                    key={row.resource.contextPath}
                    resource={row.resource}
                    depth={row.depth}
                    guides={guidesOf(shown, index)}
                    isActive={activeContextPath === row.resource.contextPath}
                    isReferenced={referencedIdentifiers.includes(row.resource.identifier)}
                    isSelecting={isSelecting}
                    isSelected={selection.includes(row.resource.contextPath)}
                    isUsable={isUsableType(nodeTypesRegistry, row.resource.nodeType, usableNodeTypes)}
                    isDraggable={canReorder && !row.resource.tethered}
                    isDragged={dragged === row.resource.contextPath}
                    onDragStart={(clientY: number) => {
                        pointer.current = {y: clientY, direction: null};
                        setDragged(row.resource.contextPath);
                        setPreview(rows);
                    }}
                    // Also after a drop; a drag let go outside the list, or cancelled
                    // with Escape, puts the rows back where they were.
                    onDragEnd={endDrag}
                    onMoveByKey={direction => {
                        if (canReorder && !row.resource.tethered) {
                            moveByKey(row, direction);
                        }
                    }}
                    onOpen={() => onOpen(row.resource)}
                    onToggleSelection={() => onToggleSelection(row.resource)}
                    onPick={() => onPick(row.resource)}
                    onToggleReference={() => onToggleReference(row.resource.identifier)}
                />
            ))}
        </div>
    );
};
