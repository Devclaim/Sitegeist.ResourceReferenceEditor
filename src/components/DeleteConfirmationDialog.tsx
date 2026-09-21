import React from 'react';
import {Button, Dialog, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {isHidden} from '../domain/resources';
import {ResourceNode, ResourceUsage} from '../types';

/**
 * Warns before a removal, and says what it would break: how many nodes reference
 * each resource and in which documents. Hiding keeps those references intact, so
 * the dialog offers that instead whenever it applies.
 */
export const DeleteConfirmationDialog: React.FC<{
    resources: ResourceNode[];
    /** `null` while the reference counts are still being fetched. */
    usage: Record<string, ResourceUsage> | null;
    onCancel: () => void;
    onHideInstead: (resources: ResourceNode[]) => void;
    onConfirm: (resources: ResourceNode[]) => void;
}> = ({resources, usage, onCancel, onHideInstead, onConfirm}) => {
    const {nodeTypesRegistry, t} = useRegistries();

    const canBeHidden = resources.every(resource => Boolean(
        nodeTypesRegistry.getNodeType(resource.nodeType)?.properties?._hidden
    )) && !resources.every(isHidden);

    return (
        <Dialog
            isOpen
            type="warn"
            style="narrow"
            title={resources.length === 1
                ? t('removal.titleOne', 'Delete this resource?')
                : t('removal.title', 'Delete {count} resources?', {count: resources.length})}
            onRequestClose={onCancel}
            actions={[
                <Button key="cancel" type="button" onClick={onCancel}>
                    {t('action.cancel', 'Cancel')}
                </Button>,
                canBeHidden
                    ? (
                        <Button
                            key="hide"
                            type="button"
                            style="lighter"
                            onClick={() => onHideInstead(resources)}
                        >
                            <Icon icon="eye-slash" /> {t('action.hideInstead', 'Hide instead')}
                        </Button>
                    )
                    : null,
                <Button
                    key="delete"
                    type="button"
                    style="error"
                    hoverStyle="error"
                    onClick={() => onConfirm(resources)}
                >
                    <Icon icon="trash" /> {t('action.delete', 'Delete')}
                </Button>
            ].filter(Boolean)}
        >
            <div className="sitegeist-resource-reference-editor__confirmation">
                <ul>
                    {resources.map(resource => {
                        const resourceUsage = usage?.[resource.identifier];

                        return (
                            <li key={resource.contextPath}>
                                <strong>{resource.label || resource.identifier}</strong>
                                {usage === null && (
                                    <small>{t('removal.checking', 'Checking references…')}</small>
                                )}
                                {resourceUsage && resourceUsage.count > 0 && (
                                    <small>
                                        {resourceUsage.count === 1
                                            ? t('removal.referencedOnce', 'Referenced once')
                                            : t('removal.referenced', 'Referenced {count} times', {
                                                count: resourceUsage.count
                                            })}
                                        {resourceUsage.documents.length > 0
                                            ? `: ${resourceUsage.documents.join(', ')}`
                                            : ''}
                                    </small>
                                )}
                                {usage !== null && !resourceUsage?.count && (
                                    <small>{t('removal.notReferenced', 'Not referenced')}</small>
                                )}
                            </li>
                        );
                    })}
                </ul>
                <p>
                    {t(
                        'removal.explanation',
                        'Deleting removes the resource from the collection, and every document '
                        + 'that references it loses that reference. Hiding it instead keeps those '
                        + 'references intact.'
                    )}
                </p>
            </div>
        </Dialog>
    );
};
