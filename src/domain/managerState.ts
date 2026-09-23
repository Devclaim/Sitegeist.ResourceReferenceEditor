import React from 'react';
import {actionTypes} from '@neos-project/neos-ui-redux-store';
import {takeEvery} from 'redux-saga/effects';

/**
 * Whether the resource manager is open. Its parts sit in different places of the
 * Neos UI - the page and its button in the top bar's right group, the breadcrumb next
 * to the logo - so they share this instead of props.
 */
let isOpen = false;
const listeners = new Set<(open: boolean) => void>();

export const setManagerOpen = (open: boolean): void => {
    isOpen = open;
    listeners.forEach(listener => listener(open));
};

export const useManagerOpen = (): boolean => {
    const [open, setOpen] = React.useState(isOpen);

    React.useEffect(() => {
        listeners.add(setOpen);
        setOpen(isOpen);

        return () => {
            listeners.delete(setOpen);
        };
    }, []);

    return open;
};


/** The manager's own address, /neos/management/resources - see Routes.yaml. */
export const isManagerAddress = (): boolean =>
    /\/neos\/management\/resources\/?$/.test(window.location.pathname);

/**
 * The Neos UI writes the open document into the address (`?node=...`) whenever it
 * loads one. The manager page is a module, whose address names the module and
 * nothing else, so the parameter is taken off again right after - once Neos' own
 * saga for the same action has run.
 */
export function* keepManagerAddressClean(): Generator<unknown, void, unknown> {
    yield takeEvery(actionTypes.CR.Nodes.SET_DOCUMENT_NODE, () => {
        if (!isManagerAddress()) {
            return;
        }

        window.setTimeout(() => {
            if (isManagerAddress() && window.location.search !== '') {
                window.history.replaceState(window.history.state, '', window.location.pathname);
            }
        }, 0);
    });
}
