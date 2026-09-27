import React from 'react';

/**
 * Whether the resource manager is open, and on which collection. It is opened from
 * two places of the Neos UI - the Resources section in the left sidebar and the
 * button in the top bar - so they share this instead of props.
 */
export type ManagerState = {
    isOpen: boolean;
    /** The collection whose tab is shown; `null` for the first one. */
    collection: string | null;
};

let state: ManagerState = {isOpen: false, collection: null};
const listeners = new Set<(state: ManagerState) => void>();

const set = (next: ManagerState): void => {
    state = next;
    listeners.forEach(listener => listener(next));
};

export const openManager = (collection: string | null = null): void =>
    set({isOpen: true, collection});

export const closeManager = (): void => set({...state, isOpen: false});

export const useManagerState = (): ManagerState => {
    const [current, setCurrent] = React.useState(state);

    React.useEffect(() => {
        listeners.add(setCurrent);
        setCurrent(state);

        return () => {
            listeners.delete(setCurrent);
        };
    }, []);

    return current;
};
