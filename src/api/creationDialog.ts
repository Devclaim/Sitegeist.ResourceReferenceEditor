import backend from '@neos-project/neos-ui-backend-connector';
import {actions, actionTypes} from '@neos-project/neos-ui-redux-store';
import {takeEvery} from 'redux-saga/effects';

import {Store} from '../types';

/** What the creation dialog hands back: a value per element, with its save hooks. */
export type CreationDialogValues = Record<string, {value: unknown; hooks?: Record<string, unknown>}>;

type Waiting = {
    apply: (values: CreationDialogValues) => void;
    cancel: () => void;
};

/**
 * The editor that is waiting for the dialog, if any. The dialog is a single global
 * component, so only one editor can be waiting at a time - which is also true of the
 * dialog itself.
 */
let waiting: Waiting | null = null;

const settle = (handle: (waiting: Waiting) => void): void => {
    const current = waiting;
    waiting = null;
    if (current) {
        handle(current);
    }
};

/**
 * Opens Neos' own node creation dialog - the green one - for a resource, and
 * answers with what the editor filled in.
 *
 * The dialog is opened through the store and its result comes back as an action, so
 * it cannot simply be awaited: `watchCreationDialog` catches that action and hands
 * the values here. The parent node is merged into the store first, because the
 * dialog resolves it by context path and evaluates the elements' ClientEval
 * expressions against it.
 */
export const openCreationDialog = async (
    store: Store,
    nodeType: any,
    nodeTypeName: string,
    parentContextPath: string
): Promise<CreationDialogValues | null> => {
    const [parentNode] = await backend.get().q([parentContextPath]).get();

    if (parentNode) {
        store.dispatch(actions.CR.Nodes.merge({[parentNode.contextPath]: parentNode}));
    }

    return new Promise<CreationDialogValues | null>(resolve => {
        waiting = {
            apply: values => resolve(values),
            cancel: () => resolve(null)
        };

        store.dispatch(actions.UI.NodeCreationDialog.open(
            nodeType?.ui?.label ?? nodeTypeName,
            nodeType?.ui?.creationDialog ?? {elements: {}},
            parentContextPath,
            nodeTypeName
        ));
    });
};

/**
 * Registered in the manifest. Neos calls its saga registry "unplanned
 * extensibility", but the dialog reports its result as an action and there is no
 * other way to hear it. The saga only acts while this editor is waiting, so the
 * regular node creation flow is untouched.
 */
export function* watchCreationDialog(): Generator<unknown, void, unknown> {
    yield takeEvery(
        actionTypes.UI.NodeCreationDialog.APPLY,
        (action: any) => settle(current => current.apply(action?.payload ?? {}))
    );
    yield takeEvery(
        [actionTypes.UI.NodeCreationDialog.CANCEL, actionTypes.UI.NodeCreationDialog.BACK],
        () => settle(current => current.cancel())
    );
}
