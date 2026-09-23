import React from 'react';
import {Button, Icon} from '@neos-project/react-ui-components';

import {Activity} from '../hooks/useResourceCollection';
import {ActionIcon} from './ActionIcon';

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
    /** The rows Select all covers - everything in the list, children included. */
    selectableResources: ResourceNode[];
    selection: string[];
    isSelecting: boolean;
    isLoading: boolean;
    activity: Activity | null;
    /** Whether the user may copy resources into the collection. */
    canDuplicate: boolean;
    /** Whether the user may hide and delete what the actions apply to. */
    canChangeTargets: boolean;
    isMultiple: boolean;
    /** False when nothing picked can be referenced at all. */
    canUseSelection: boolean;
    /** True when every picked resource that can be referenced already is. */
    selectionIsReferenced: boolean;
    /** The selected node and what it sits below, nearest last. */
    path: string[];
    onDuplicate: () => void;
    onSetHidden: (hidden: boolean) => void;
    onDelete: () => void;
    onSetSelection: (contextPaths: string[]) => void;
    onUseSelection: () => void;
    onUnuseSelection: () => void;
}> = ({
    targets,
    selectableResources,
    selection,
    isSelecting,
    isLoading,
    activity,
    canDuplicate,
    canChangeTargets,
    isMultiple,
    canUseSelection,
    selectionIsReferenced,
    path,
    onDuplicate,
    onSetHidden,
    onDelete,
    onSetSelection,
    onUseSelection,
    onUnuseSelection
}) => {
    const {nodeTypesRegistry, t} = useRegistries();

    // A tethered child is part of its parent: it cannot be duplicated, hidden or
    // deleted on its own.
    const hasTargets = targets.length > 0 && targets.every(target => !target.tethered);
    const targetsAreHidden = hasTargets && targets.every(isHidden);
    // Hiding is a `_hidden` property change, which only node types deriving from
    // Neos.Neos:Hidable have - without this the button would quietly do nothing.
    const targetsCanBeHidden = hasTargets && targets.every(resource =>
        Boolean(nodeTypesRegistry.getNodeType(resource.nodeType)?.properties?._hidden));
    const allSelectableSelected = selectableResources.length > 0
        && selectableResources.every(resource => selection.includes(resource.contextPath));

    const status = (): string => {
        if (isSelecting) {
            return selection.length > 0
                ? t('selection.count', '{count} selected', {count: selection.length})
                : t('selection.hint', 'Click the resources to select them');
        }

        // The path of the selected node, so a child deep in the tree says where it
        // belongs rather than standing there by name alone.
        return path.length > 0
            ? path.join(' › ')
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
                        disabled={isLoading || selectableResources.length === 0}
                        onClick={() => onSetSelection(allSelectableSelected
                            ? []
                            : selectableResources.map(resource => resource.contextPath))}
                    >
                        {allSelectableSelected
                            ? t('action.deselectAll', 'Deselect all')
                            : t('action.selectAll', 'Select all')}
                    </Button>
                )}
                {canDuplicate && (
                    <Button
                        type="button"
                        style="lighter"
                        disabled={isLoading || !hasTargets}
                        onClick={onDuplicate}
                    >
                        <ActionIcon icon="clone" isBusy={activity === 'duplicate'} /> {t('action.duplicate', 'Duplicate')}
                    </Button>
                )}
                {canChangeTargets && (
                    <Button
                        type="button"
                        style="lighter"
                        disabled={isLoading || !targetsCanBeHidden}
                        onClick={() => onSetHidden(!targetsAreHidden)}
                    >
                        <ActionIcon icon={targetsAreHidden ? 'eye' : 'eye-slash'} isBusy={activity === 'hide'} />
                        {' '}
                        {targetsAreHidden ? t('action.show', 'Show') : t('action.hide', 'Hide')}
                    </Button>
                )}
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
                        disabled={isLoading || !canUseSelection}
                        onClick={selectionIsReferenced ? onUnuseSelection : onUseSelection}
                    >
                        {selectionIsReferenced
                            ? <><Icon icon="times" /> {t('action.remove', 'Remove')}</>
                            : <><Icon icon="check" /> {t('action.use', 'Use')}</>}
                    </Button>
                )}
                {canChangeTargets && (
                    <Button
                        type="button"
                        style="error"
                        hoverStyle="error"
                        disabled={isLoading || !hasTargets}
                        onClick={onDelete}
                    >
                        <ActionIcon icon="trash" isBusy={activity === 'delete'} /> {t('action.delete', 'Delete')}
                    </Button>
                )}
            </div>
        </div>
    );
};
