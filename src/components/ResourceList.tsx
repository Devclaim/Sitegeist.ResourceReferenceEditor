import React from 'react';

import {useRegistries} from '../context/Registries';
import {isUsableType} from '../domain/nodeTypes';
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

/**
 * The resources and their children as one list - the shape of the node tree in the
 * backend, where a child sits indented below the node it belongs to.
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
    onToggleReference
}) => {
    const {nodeTypesRegistry, t} = useRegistries();

    return (
        <div className="sitegeist-resource-reference-editor__list">
            {rows.length === 0 && (
                <div className="sitegeist-resource-reference-editor__state">
                    {isLoading
                        ? t('list.loading', 'Loading…')
                        : t('list.empty', 'No resources found.')}
                </div>
            )}
            {rows.map((row, index) => (
                <ResourceListItem
                    key={row.resource.contextPath}
                    resource={row.resource}
                    depth={row.depth}
                    guides={guidesOf(rows, index)}
                    isActive={activeContextPath === row.resource.contextPath}
                    isReferenced={referencedIdentifiers.includes(row.resource.identifier)}
                    isSelecting={isSelecting}
                    isSelected={selection.includes(row.resource.contextPath)}
                    isUsable={isUsableType(nodeTypesRegistry, row.resource.nodeType, usableNodeTypes)}
                    onOpen={() => onOpen(row.resource)}
                    onToggleSelection={() => onToggleSelection(row.resource)}
                    onPick={() => onPick(row.resource)}
                    onToggleReference={() => onToggleReference(row.resource.identifier)}
                />
            ))}
        </div>
    );
};
