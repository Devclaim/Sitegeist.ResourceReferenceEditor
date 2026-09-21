import React from 'react';

import {useRegistries} from '../context/Registries';
import {ResourceNode} from '../types';
import {ResourceListItem} from './ResourceListItem';

/** The resources of the collection, as the rows the editor picks and opens. */
export const ResourceList: React.FC<{
    resources: ResourceNode[];
    isLoading: boolean;
    activeContextPath?: string;
    referencedIdentifiers: string[];
    isSelecting: boolean;
    selection: string[];
    onOpen: (resource: ResourceNode) => void;
    onToggleSelection: (resource: ResourceNode) => void;
    onToggleReference: (identifier: string) => void;
}> = ({
    resources,
    isLoading,
    activeContextPath,
    referencedIdentifiers,
    isSelecting,
    selection,
    onOpen,
    onToggleSelection,
    onToggleReference
}) => {
    const {t} = useRegistries();

    return (
        <div className="sitegeist-resource-reference-editor__list">
            {resources.length === 0 && (
                <div className="sitegeist-resource-reference-editor__state">
                    {isLoading
                        ? t('list.loading', 'Loading…')
                        : t('list.empty', 'No resources found.')}
                </div>
            )}
            {resources.map(resource => (
                <ResourceListItem
                    key={resource.contextPath}
                    resource={resource}
                    isActive={activeContextPath === resource.contextPath}
                    isReferenced={referencedIdentifiers.includes(resource.identifier)}
                    isSelecting={isSelecting}
                    isSelected={selection.includes(resource.contextPath)}
                    onOpen={() => onOpen(resource)}
                    onToggleSelection={() => onToggleSelection(resource)}
                    onToggleReference={() => onToggleReference(resource.identifier)}
                />
            ))}
        </div>
    );
};
