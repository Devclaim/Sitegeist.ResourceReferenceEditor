import React from 'react';

import {useRegistries} from '../context/Registries';
import {isUsableType} from '../domain/nodeTypes';
import {TreeRow} from '../hooks/useResourceTree';
import {ResourceNode} from '../types';
import {ResourceListItem} from './ResourceListItem';

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
            {rows.map(row => (
                <ResourceListItem
                    key={row.resource.contextPath}
                    resource={row.resource}
                    depth={row.depth}
                    isActive={activeContextPath === row.resource.contextPath}
                    isReferenced={referencedIdentifiers.includes(row.resource.identifier)}
                    isSelecting={isSelecting}
                    isSelected={selection.includes(row.resource.contextPath)}
                    isUsable={isUsableType(nodeTypesRegistry, row.resource.nodeType, usableNodeTypes)}
                    onOpen={() => onOpen(row.resource)}
                    onToggleSelection={() => onToggleSelection(row.resource)}
                    onToggleReference={() => onToggleReference(row.resource.identifier)}
                />
            ))}
        </div>
    );
};
