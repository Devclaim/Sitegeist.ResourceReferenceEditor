import React from 'react';
import {Button, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {CreateGroup, CreateMenu, CreateOption} from './CreateMenu';

/**
 * The row above the list: what to see, and what to create. Everything that acts on a
 * resource that already exists sits in the footer below the list instead, next to the
 * name of the resource it would act on.
 */
export const ResourceToolbar: React.FC<{
    filter: string;
    onFilter: (filter: string) => void;
    isLoading: boolean;
    isSelecting: boolean;
    canSelect: boolean;
    /** What the New button offers, grouped by the node the options go into. */
    createGroups: CreateGroup[];
    onCreate: (option: CreateOption) => void;
    onEnterSelection: () => void;
    onLeaveSelection: () => void;
}> = ({
    filter,
    onFilter,
    isLoading,
    isSelecting,
    canSelect,
    createGroups,
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
            <CreateMenu
                groups={createGroups}
                isDisabled={isLoading}
                onCreate={onCreate}
            />
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
