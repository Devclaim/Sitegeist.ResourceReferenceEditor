import React from 'react';
import {Button, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';

/**
 * The row above the list: what to see. Filtering, creating, and switching the list
 * into selection mode - everything that acts on a resource sits in the footer below
 * the list instead, next to the name of the resource it would act on.
 */
export const ResourceToolbar: React.FC<{
    filter: string;
    onFilter: (filter: string) => void;
    isLoading: boolean;
    isSelecting: boolean;
    canSelect: boolean;
    createLabel?: string;
    onCreate: () => void;
    onEnterSelection: () => void;
    onLeaveSelection: () => void;
}> = ({
    filter,
    onFilter,
    isLoading,
    isSelecting,
    canSelect,
    createLabel,
    onCreate,
    onEnterSelection,
    onLeaveSelection
}) => {
    const {t} = useRegistries();

    return (
        <div className="sitegeist-resource-reference-editor__toolbar">
            <input
                className="sitegeist-resource-reference-editor__search"
                type="search"
                value={filter}
                placeholder={t('list.search', 'Filter resources')}
                onChange={event => onFilter(event.currentTarget.value)}
            />
            <Button
                type="button"
                style="lighter"
                disabled={isLoading}
                onClick={onCreate}
                title={createLabel}
            >
                <Icon icon="plus" /> {t('action.new', 'New')}
            </Button>
            {isSelecting
                ? (
                    <Button type="button" style="lighter" onClick={onLeaveSelection}>
                        <Icon icon="check" /> {t('action.done', 'Done')}
                    </Button>
                )
                : (
                    <Button
                        type="button"
                        style="lighter"
                        disabled={isLoading || !canSelect}
                        onClick={onEnterSelection}
                    >
                        <Icon icon="list-check" /> {t('action.selectMultiple', 'Select multiple')}
                    </Button>
                )}
        </div>
    );
};
