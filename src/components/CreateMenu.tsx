import React from 'react';
import {Button, Icon} from '@neos-project/react-ui-components';

import {ActionIcon} from './ActionIcon';

import {useRegistries} from '../context/Registries';

/** One entry of the create menu: what would be created, and where it would go. */
export type CreateOption = {
    nodeTypeName: string;
    label: string;
    icon?: string;
    /** Where the node goes - missing for a resource of the collection itself. */
    parentContextPath?: string;
};

/** The options that go into one node, under the name of that node. */
export type CreateGroup = {
    /** Left out for the collection itself, which needs no explaining. */
    label?: string;
    options: CreateOption[];
};

/**
 * The New button. Everything the dialog creates comes from here: a resource next to
 * the one that is selected, and the children that one allows. With only one thing to
 * create it is a plain button, so it does not ask a question that has one answer.
 */
export const CreateMenu: React.FC<{
    groups: CreateGroup[];
    isDisabled: boolean;
    /** Shows a spinner on the button while a resource is being created. */
    isBusy?: boolean;
    onCreate: (option: CreateOption) => void;
}> = ({groups, isDisabled, isBusy, onCreate}) => {
    const {t} = useRegistries();
    const [isOpen, setIsOpen] = React.useState(false);
    const element = React.useRef<HTMLDivElement | null>(null);
    const options = groups.flatMap(group => group.options);

    // The menu closes the way every menu does: by clicking somewhere else, or with
    // escape. The dialog around it keeps its own keyboard handling.
    React.useEffect(() => {
        if (!isOpen) {
            return;
        }

        const closeOnOutsideClick = (event: MouseEvent): void => {
            if (!element.current?.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        const closeOnEscape = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') {
                event.stopPropagation();
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', closeOnOutsideClick);
        document.addEventListener('keydown', closeOnEscape, true);

        return () => {
            document.removeEventListener('mousedown', closeOnOutsideClick);
            document.removeEventListener('keydown', closeOnEscape, true);
        };
    }, [isOpen]);

    const choose = (option: CreateOption): void => {
        setIsOpen(false);
        onCreate(option);
    };

    const entry = (option: CreateOption): React.ReactNode => (
        <button
            key={(option.parentContextPath ?? '') + option.nodeTypeName}
            type="button"
            role="menuitem"
            className="sitegeist-resource-reference-editor__create-option"
            onClick={() => choose(option)}
        >
            <Icon icon={option.icon ?? 'file'} /> {option.label}
        </button>
    );

    if (options.length <= 1) {
        return (
            <Button
                type="button"
                style="lighter"
                disabled={isDisabled || options.length === 0}
                title={options[0]?.label}
                onClick={() => options[0] && choose(options[0])}
            >
                <ActionIcon icon="plus" isBusy={isBusy} /> {t('action.new', 'New')}
            </Button>
        );
    }

    return (
        <div className="sitegeist-resource-reference-editor__create-menu" ref={element}>
            <Button
                type="button"
                style="lighter"
                disabled={isDisabled}
                aria-haspopup="menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(open => !open)}
            >
                <ActionIcon icon="plus" isBusy={isBusy} /> {t('action.new', 'New')}
            </Button>
            {isOpen && (
                <div className="sitegeist-resource-reference-editor__create-options" role="menu">
                    {groups.map(group => (
                        <React.Fragment key={group.label ?? ''}>
                            {/* A node the options go into is named above them. */}
                            {group.label && (
                                <span className="sitegeist-resource-reference-editor__create-section">
                                    {group.label}
                                </span>
                            )}
                            {group.options.map(entry)}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};
