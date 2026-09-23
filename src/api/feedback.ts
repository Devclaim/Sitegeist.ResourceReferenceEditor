import {actions, selectors} from '@neos-project/neos-ui-redux-store';

import {Store} from '../types';

/**
 * Feedbacks we hand back to the Neos UI after a change. Everything else - most
 * importantly ReloadDocument, Redirect and the out-of-band rendering feedbacks -
 * is dropped on purpose: resource nodes live outside the rendered document, so
 * the server resolves their "closest document" to the site node and the UI would
 * navigate the content canvas to the home page.
 */
export const FORWARDED_FEEDBACKS = [
    'Neos.Neos.Ui:UpdateNodeInfo',
    'Neos.Neos.Ui:UpdateNodePreviewUrl',
    'Neos.Neos.Ui:UpdateWorkspaceInfo',
    'Neos.Neos.Ui:Success',
    'Neos.Neos.Ui:Info',
    'Neos.Neos.Ui:Warning',
    'Neos.Neos.Ui:Error'
];


/**
 * Committing the reference only marks the surrounding inspector dirty - the editor
 * would have to press Apply in the sidebar afterwards, and until then Neos blocks
 * the screen with its unapplied-changes overlay. When our property is the only
 * pending change, applying it right away keeps adding a resource a single step.
 * Anything else the editor has typed is left alone.
 */
export const applyOwnPendingChange = (store: Store, propertyName?: unknown): void => {
    if (typeof propertyName !== 'string') {
        return;
    }

    const state = store.getState();
    const focusedNodeContextPath = selectors.CR.Nodes.focusedNodePathSelector(state);
    const transientValues = state?.ui?.inspector?.valuesByNodePath?.[focusedNodeContextPath] ?? {};
    const pendingProperties = Object.keys(transientValues)
        .filter(key => transientValues[key] !== undefined);

    if (pendingProperties.length === 1 && pendingProperties[0] === propertyName) {
        store.dispatch(actions.UI.Inspector.apply());
    }
};


export const forwardFeedbacks = (store: Store, response: any): void => {
    const feedbacks = (response?.feedbacks ?? []).filter(
        (feedback: any) => FORWARDED_FEEDBACKS.includes(feedback?.type)
    );

    if (feedbacks.length > 0) {
        store.dispatch(actions.ServerFeedback.handleServerFeedback({feedbacks}));
    }
};


/**
 * The node the server rendered after a change, taken from the same response the
 * change endpoint already returned. The endpoint answers every property or
 * creation change with a `Neos.Neos.Ui:UpdateNodeInfo` feedback carrying the fully
 * rendered node - the same information a fresh read would give, so a caller that
 * needs the authoritative value after a save (a save hook can alter it beyond what
 * was sent, the way the image editor creates a variant) can read it here instead
 * of asking the server again.
 */
export const nodeFromFeedback = (response: any, contextPath: string): any | null => {
    const feedback = (response?.feedbacks ?? []).find(
        (candidate: any) => candidate?.type === 'Neos.Neos.Ui:UpdateNodeInfo'
    );

    return feedback?.payload?.byContextPath?.[contextPath] ?? null;
};

