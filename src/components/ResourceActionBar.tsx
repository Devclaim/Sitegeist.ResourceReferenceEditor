import React from 'react';
import {Button, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {isHidden} from '../domain/resources';
import {ResourceNode} from '../types';

/**
 * The bar above the list. It always acts on what the editor is looking at: the
 * resource open in the inspector, or the selection while several are being picked.
 */
export const ResourceActionBar: React.FC<{
    /** What the actions apply to - the inspected resource or the selection. */
    targets: ResourceNode[];
    visibleResources: ResourceNode[];
    selection: string[];
    isSelecting: boolean;
    isLoading: boolean;
    isMultiple: boolean;
    createLabel?: string;
    onCreate: () => void;
    onDuplicate: () => void;
    onSetHidden: (hidden: boolean) => void;
    onDelete: () => void;
    onEnterSelection: () => void;
    onLeaveSelection: () => void;
    onSetSelection: (contextPaths: string[]) => void;
    onUseSelection: () => void;
    /** Shown on the left when nothing is selected and nothing is open. */
    status: string;
}> = ({
    targets,
    visibleResources,
    selection,
    isSelecting,
    isLoading,
    isMultiple,
    createLabel,
    onCreate,
    onDuplicate,
    onSetHidden,
    onDelete,
    onEnterSelection,
    onLeaveSelection,
    onSetSelection,
    onUseSelection,
    status
}) => {
    const {nodeTypesRegistry, t} = useRegistries();

    const hasTargets = targets.length > 0;
    const targetsAreHidden = hasTargets && targets.every(isHidden);
    // Hiding is a `_hidden` property change, which only node types deriving from
    // Neos.Neos:Hidable have - without this the button would quietly do nothing.
    const targetsCanBeHidden = hasTargets && targets.every(resource =>
        Boolean(nodeTypesRegistry.getNodeType(resource.nodeType)?.properties?._hidden));
    const allVisibleSelected = selection.length === visibleResources.length;

    return (
        <div className="sitegeist-resource-reference-editor__bulk">
            <span className="sitegeist-resource-reference-editor__bulk-target">{status}</span>
            <div className="sitegeist-resource-reference-editor__bulk-actions">
                <Button
                    type="button"
                    style="lighter"
                    disabled={isLoading}
                    onClick={onCreate}
                    title={createLabel}
                >
                    <Icon icon="plus" /> {t('action.new', 'New')}
                </Button>
                <Button
                    type="button"
                    style="lighter"
                    disabled={isLoading || !hasTargets}
                    onClick={onDuplicate}
                >
                    <Icon icon="clone" /> {t('action.duplicate', 'Duplicate')}
                </Button>
                <Button
                    type="button"
                    style="lighter"
                    disabled={isLoading || !targetsCanBeHidden}
                    onClick={() => onSetHidden(!targetsAreHidden)}
                >
                    <Icon icon={targetsAreHidden ? 'eye' : 'eye-slash'} />
                    {' '}
                    {targetsAreHidden ? t('action.show', 'Show') : t('action.hide', 'Hide')}
                </Button>
                <Button
                    type="button"
                    style="error"
                    hoverStyle="error"
                    disabled={isLoading || !hasTargets}
                    onClick={onDelete}
                >
                    <Icon icon="trash" /> {t('action.delete', 'Delete')}
                </Button>
                {isSelecting
                    ? (
                        <>
                            <Button
                                type="button"
                                style="lighter"
                                disabled={isLoading || visibleResources.length === 0}
                                onClick={() => onSetSelection(allVisibleSelected
                                    ? []
                                    : visibleResources.map(resource => resource.contextPath))}
                            >
                                {allVisibleSelected
                                    ? t('action.deselectAll', 'Deselect all')
                                    : t('action.selectAll', 'Select all')}
                            </Button>
                            {isMultiple && (
                                <Button
                                    type="button"
                                    style="success"
                                    disabled={isLoading || selection.length === 0}
                                    onClick={onUseSelection}
                                >
                                    <Icon icon="check" /> {t('action.use', 'Use')}
                                </Button>
                            )}
                            <Button type="button" onClick={onLeaveSelection}>
                                {t('action.done', 'Done')}
                            </Button>
                        </>
                    )
                    : (
                        <Button
                            type="button"
                            style="lighter"
                            disabled={isLoading || visibleResources.length === 0}
                            onClick={onEnterSelection}
                        >
                            <Icon icon="list-check" /> {t('action.selectMultiple', 'Select multiple')}
                        </Button>
                    )}
            </div>
        </div>
    );
};
