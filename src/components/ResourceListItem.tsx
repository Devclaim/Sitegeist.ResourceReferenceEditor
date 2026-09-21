import React from 'react';
import {Button, CheckBox, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {isHidden} from '../domain/resources';
import {translate} from '../i18n';
import {ResourceNode} from '../types';

/**
 * One row of the resource list. Clicking it opens the resource in the inspector, or
 * picks it while the list is in selection mode; its only button puts the reference
 * into the edited property, and takes it out again when it is already there.
 */
export const ResourceListItem: React.FC<{
    resource: ResourceNode;
    isActive: boolean;
    isReferenced: boolean;
    isSelecting: boolean;
    isSelected: boolean;
    onOpen: () => void;
    onToggleSelection: () => void;
    onToggleReference: () => void;
}> = ({
    resource,
    isActive,
    isReferenced,
    isSelecting,
    isSelected,
    onOpen,
    onToggleSelection,
    onToggleReference
}) => {
    const {nodeTypesRegistry, i18nRegistry, t} = useRegistries();
    const nodeType = nodeTypesRegistry.getNodeType(resource.nodeType);
    const activate = isSelecting ? onToggleSelection : onOpen;

    return (
        <div
            role="button"
            tabIndex={0}
            className={[
                'sitegeist-resource-reference-editor__item',
                isActive && !isSelecting ? 'sitegeist-resource-reference-editor__item--active' : '',
                isSelecting && isSelected ? 'sitegeist-resource-reference-editor__item--selected' : '',
                isHidden(resource) ? 'sitegeist-resource-reference-editor__item--hidden' : ''
            ].join(' ')}
            onClick={activate}
            onKeyDown={(event: React.KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activate();
                }
            }}
        >
            {isSelecting && (
                <span className="sitegeist-resource-reference-editor__item-select">
                    <CheckBox isChecked={isSelected} onChange={onToggleSelection} />
                </span>
            )}
            <Icon icon={nodeType?.ui?.icon ?? 'file'} />
            <div className="sitegeist-resource-reference-editor__item-label">
                <strong>
                    {resource.label
                        || translate(i18nRegistry, nodeType?.ui?.label)
                        || resource.identifier}
                </strong>
                <small>
                    {translate(i18nRegistry, nodeType?.ui?.label) || resource.nodeType}
                </small>
            </div>
            {!isSelecting && (
                <span className="sitegeist-resource-reference-editor__item-actions">
                    {isHidden(resource) && (
                        <span
                            className="sitegeist-resource-reference-editor__hidden-badge"
                            title={t('resource.hiddenTitle', 'This resource is hidden')}
                        >
                            <Icon icon="eye-slash" /> {t('resource.hidden', 'Hidden')}
                        </span>
                    )}
                    <Button
                        type="button"
                        style={isReferenced ? 'success' : 'lighter'}
                        title={isReferenced
                            ? t('resource.removeReference', 'Click to remove this reference')
                            : undefined}
                        onClick={(event: React.MouseEvent) => {
                            event.stopPropagation();
                            onToggleReference();
                        }}
                    >
                        {isReferenced
                            ? <><Icon icon="check" /> {t('action.inUse', 'In use')}</>
                            : t('action.use', 'Use')}
                    </Button>
                </span>
            )}
        </div>
    );
};
