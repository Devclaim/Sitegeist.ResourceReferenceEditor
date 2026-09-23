import React from 'react';
import {CheckBox, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {isHidden} from '../domain/resources';
import {translate} from '../i18n';
import {ResourceNode} from '../types';

/** A line at one level of indentation - see `guidesOf` in ResourceList. */
export type GuideLine = {level: number; isEnd: boolean};

/** How far a child is indented per level - the guide lines sit in that gap. */
const INDENT = 20;

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
    /** False on rows the edited property cannot hold - a collection, for instance. */
    isUsable: boolean;
    depth: number;
    guides: GuideLine[];
    onOpen: () => void;
    onToggleSelection: () => void;
    /** Shift+click: picks the row, switching into selection mode if need be. */
    onPick: () => void;
    onToggleReference: () => void;
}> = ({
    resource,
    isActive,
    isReferenced,
    isSelecting,
    isSelected,
    isUsable,
    depth,
    guides,
    onOpen,
    onToggleSelection,
    onPick,
    onToggleReference
}) => {
    const {nodeTypesRegistry, i18nRegistry, t} = useRegistries();
    const nodeType = nodeTypesRegistry.getNodeType(resource.nodeType);
    const activate = isSelecting ? onToggleSelection : onOpen;
    const element = React.useRef<HTMLDivElement | null>(null);

    // A resource that has just been created, or one opened from elsewhere, may sit
    // outside the scrolled part of the list - so the list follows it.
    React.useEffect(() => {
        if (isActive) {
            element.current?.scrollIntoView({block: 'nearest'});
        }
    }, [isActive]);

    return (
        <div
            ref={element}
            role="button"
            tabIndex={0}
            className={[
                'sitegeist-resource-reference-editor__item',
                isActive && !isSelecting ? 'sitegeist-resource-reference-editor__item--active' : '',
                isSelecting && isSelected ? 'sitegeist-resource-reference-editor__item--selected' : '',
                isHidden(resource) ? 'sitegeist-resource-reference-editor__item--hidden' : '',
                depth > 0 ? 'sitegeist-resource-reference-editor__item--child' : ''
            ].join(' ')}
            /* The row itself steps in, not its contents, so a child reads as a box
               of its own rather than as a line of text that starts further right. */
            style={depth > 0 ? {marginLeft: `${depth * INDENT}px`} : undefined}
            /* Shift+click picks rows - the first such click switches the list into
               selection mode. The browser's own shift+click text selection is kept
               from highlighting the rows in between. */
            onMouseDown={(event: React.MouseEvent) => {
                if (event.shiftKey) {
                    event.preventDefault();
                }
            }}
            onClick={(event: React.MouseEvent) => (event.shiftKey ? onPick() : activate())}
            onKeyDown={(event: React.KeyboardEvent) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    activate();
                }
            }}
        >
            {guides.map(guide => (
                <span
                    key={guide.level}
                    aria-hidden="true"
                    className={'sitegeist-resource-reference-editor__guide'
                        + (guide.isEnd ? ' sitegeist-resource-reference-editor__guide--end' : '')}
                    // In the middle of the gap the child at that level is indented by.
                    style={{left: `${-((depth - guide.level) * INDENT) - INDENT / 2}px`}}
                />
            ))}
            {isSelecting && (
                <span className="sitegeist-resource-reference-editor__item-select">
                    <CheckBox isChecked={isSelected} onChange={onToggleSelection} />
                </span>
            )}
            <Icon icon={nodeType?.ui?.icon ?? 'file'} />
            <div className="sitegeist-resource-reference-editor__item-label">
                {/*
                  * The name comes from the node's label, which the node type decides
                  * (an Eel expression, or getNeosLabel() on an OPGM node type). A
                  * resource whose label is empty is shown by its type, marked as the
                  * placeholder it is rather than looking like a real name.
                  */}
                <strong
                    className={resource.label
                        ? ''
                        : 'sitegeist-resource-reference-editor__item-unnamed'}
                >
                    {resource.label
                        || translate(i18nRegistry, nodeType?.ui?.label)
                        || resource.identifier}
                </strong>
                <small>
                    {translate(i18nRegistry, nodeType?.ui?.label) || resource.nodeType}
                </small>
            </div>

            {/* While selecting, the row keeps its badge and its button - they just
                stop taking clicks, so a click anywhere on the row selects it. */}
            <span
                className={'sitegeist-resource-reference-editor__item-actions'
                    + (isSelecting ? ' sitegeist-resource-reference-editor__item-actions--inert' : '')}
            >
                {isHidden(resource) && (
                    <span
                        className="sitegeist-resource-reference-editor__hidden-badge"
                        title={t('resource.hiddenTitle', 'This resource is hidden')}
                    >
                        <Icon icon="eye-slash" /> {t('resource.hidden', 'Hidden')}
                    </span>
                )}
                {/*
                  * Deliberately not a Neos button: a full button on every row is
                  * louder than the row itself. This is a quiet control that shows
                  * up when the row is hovered - except on a resource that is in
                  * use, which says so at all times and offers to undo it under the
                  * cursor.
                  */}
                {isUsable && (
                <button
                    type="button"
                    className={'sitegeist-resource-reference-editor__use'
                        + (isReferenced ? ' sitegeist-resource-reference-editor__use--active' : '')}
                    onClick={(event: React.MouseEvent) => {
                        event.stopPropagation();
                        onToggleReference();
                    }}
                >
                    {isReferenced
                        ? (
                            <>
                                <span className="sitegeist-resource-reference-editor__use-state">
                                    <Icon icon="check" /> {t('action.inUse', 'In use')}
                                </span>
                                <span className="sitegeist-resource-reference-editor__use-action">
                                    <Icon icon="times" /> {t('action.remove', 'Remove')}
                                </span>
                            </>
                        )
                        : <><Icon icon="plus" /> {t('action.use', 'Use')}</>}
                </button>
                )}
            </span>
        </div>
    );
};
