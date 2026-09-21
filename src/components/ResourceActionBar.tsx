import React from 'react';
import {Button, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {isHidden} from '../domain/resources';
import {ResourceNode} from '../types';

/**
 * The footer below the list. It names what the editor is looking at - the resource
 * open in the inspector, or the selection while several are being picked - and
 * carries the actions that apply to it, so the two are read together.
 */
export const ResourceActionBar: React.FC<{
    /** What the actions apply to - the inspected resource or the selection. */
    targets: ResourceNode[];
    visibleResources: ResourceNode[];
    selection: string[];
    isSelecting: boolean;
    isLoading: boolean;
    isMultiple: boolean;
    /** True when every picked resource is already referenced. */
    selectionIsReferenced: boolean;
    onDuplicate: () => void;
    onSetHidden: (hidden: boolean) => void;
    onDelete: () => void;
    onSetSelection: (contextPaths: string[]) => void;
    onUseSelection: () => void;
    onUnuseSelection: () => void;
}> = ({
    targets,
    visibleResources,
    selection,
    isSelecting,
    isLoading,
    isMultiple,
    selectionIsReferenced,
    onDuplicate,
    onSetHidden,
    onDelete,
    onSetSelection,
    onUseSelection,
    onUnuseSelection
}) => {
    const {nodeTypesRegistry, t} = useRegistries();

    const hasTargets = targets.length > 0;
    const targetsAreHidden = hasTargets && targets.every(isHidden);
    // Hiding is a `_hidden` property change, which only node types deriving from
    // Neos.Neos:Hidable have - without this the button would quietly do nothing.
    const targetsCanBeHidden = hasTargets && targets.every(resource =>
        Boolean(nodeTypesRegistry.getNodeType(resource.nodeType)?.properties?._hidden));
    const allVisibleSelected = selection.length === visibleResources.length;

    const status = (): string => {
        if (isSelecting) {
            return selection.length > 0
                ? t('selection.count', '{count} selected', {count: selection.length})
                : t('selection.hint', 'Click the resources to select them');
        }

        return hasTargets
            ? targets[0].label
            : t('action.noTarget', 'No resource selected');
    };

    return (
        <div className="sitegeist-resource-reference-editor__footer">
            <span
                className={'sitegeist-resource-reference-editor__footer-target'
                    + (hasTargets ? '' : ' sitegeist-resource-reference-editor__footer-target--empty')}
            >
                {status()}
            </span>
            <div className="sitegeist-resource-reference-editor__footer-actions">
                {isSelecting && (
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
                )}
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
                {/*
                  * Picking resources that are all referenced already leaves nothing
                  * to add, so the button offers the opposite instead of sitting
                  * there doing nothing.
                  */}
                {isSelecting && isMultiple && (
                    <Button
                        className={'sitegeist-resource-reference-editor__bulk-use'
                            + (selectionIsReferenced
                                ? ' sitegeist-resource-reference-editor__bulk-use--remove'
                                : '')}
                        type="button"
                        style="lighter"
                        disabled={isLoading || selection.length === 0}
                        onClick={selectionIsReferenced ? onUnuseSelection : onUseSelection}
                    >
                        {selectionIsReferenced
                            ? <><Icon icon="times" /> {t('action.remove', 'Remove')}</>
                            : <><Icon icon="check" /> {t('action.use', 'Use')}</>}
                    </Button>
                )}
                <Button
                    type="button"
                    style="error"
                    hoverStyle="error"
                    disabled={isLoading || !hasTargets}
                    onClick={onDelete}
                >
                    <Icon icon="trash" /> {t('action.delete', 'Delete')}
                </Button>
            </div>
        </div>
    );
};
