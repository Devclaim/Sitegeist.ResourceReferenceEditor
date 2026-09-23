import React from 'react';

import {EditorProps} from '../types';

export type References = {
    /** The identifiers the edited property currently holds. */
    referenced: string[];
    isMultiple: boolean;
    add: (identifier: string) => void;
    addMany: (identifiers: string[]) => void;
    drop: (identifiers: string[]) => void;
    /** Adds the reference, or takes it away again when it is already there. */
    toggle: (identifier: string) => void;
};

/**
 * Reads and writes the property the editor is attached to. A single valued property
 * holds one identifier, a collection typed one holds a list - the difference is
 * decided in PHP from the property type and arrives as `options.multiple`.
 */
export const useReferences = (props: EditorProps): References => {
    const isMultiple = Boolean(props.options.multiple);
    const {value, commit} = props;

    const referenced = React.useMemo(
        () => (Array.isArray(value) ? value : value ? [value] : []),
        [value]
    );

    const add = (identifier: string): void => {
        if (!isMultiple) {
            commit(identifier);

            return;
        }

        const current = Array.isArray(value) ? value : [];

        if (!current.includes(identifier)) {
            commit([...current, identifier]);
        }
    };

    /**
     * Used when several resources were picked at once. The picked set is what is
     * added, not the whole answer - references the property already holds are left
     * alone, and are removed by clicking their own button instead.
     */
    const addMany = (identifiers: string[]): void => {
        if (!isMultiple) {
            if (identifiers.length > 0) {
                commit(identifiers[0]);
            }

            return;
        }

        const current = Array.isArray(value) ? value : [];
        const added = identifiers.filter(identifier => !current.includes(identifier));

        if (added.length > 0) {
            commit([...current, ...added]);
        }
    };

    /** Also used when resources are deleted - their references would resolve to nothing. */
    const drop = (identifiers: string[]): void => {
        const removed = new Set(identifiers);

        if (isMultiple || Array.isArray(value)) {
            const current = Array.isArray(value) ? value : [];
            const remaining = current.filter(identifier => !removed.has(identifier));

            if (remaining.length !== current.length) {
                commit(remaining);
            }

            return;
        }

        if (typeof value === 'string' && removed.has(value)) {
            commit('');
        }
    };

    const toggle = (identifier: string): void => {
        if (referenced.includes(identifier)) {
            drop([identifier]);

            return;
        }

        add(identifier);
    };

    return {referenced, isMultiple, add, addMany, drop, toggle};
};


/**
 * For the resource manager, where no property is being edited: nothing is
 * referenced, and there is nothing to add a reference to.
 */
export const NO_REFERENCES: References = {
    referenced: [],
    isMultiple: false,
    add: () => undefined,
    addMany: () => undefined,
    drop: () => undefined,
    toggle: () => undefined
};
