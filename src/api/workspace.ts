import backend from '@neos-project/neos-ui-backend-connector';
import {selectors} from '@neos-project/neos-ui-redux-store';

import {Store} from '../types';

/**
 * Brings the editor's own workspace up to date with live.
 *
 * Resources are created and changed in live, and a workspace is a fork: it does not
 * see what live gained after it was forked. Writing the reference into the document
 * would then fail with
 *
 *     Node aggregate "..." does currently not exist.
 *
 * because the document's workspace cannot see the resource yet. This is the same
 * synchronisation the Neos UI offers when it reports a workspace as outdated - it
 * is only triggered here right after a resource was created or changed, so the
 * document can reference it in the same step.
 */
export const syncEditingWorkspace = async (store: Store): Promise<void> => {
    const syncWorkspace = backend.get().endpoints?.syncWorkspace;

    if (!syncWorkspace) {
        return;
    }

    const state = store.getState();
    const workspaceName = selectors.CR.Workspaces.personalWorkspaceNameSelector(state);

    if (typeof workspaceName !== 'string' || workspaceName === '') {
        return;
    }

    // Never forced: forcing drops the editor's own changes that cannot be replayed,
    // which is not a decision to make behind their back.
    const result = await syncWorkspace(
        workspaceName,
        false,
        selectors.CR.ContentDimensions.active(state)
    );

    if (result && typeof result === 'object' && 'conflicts' in result) {
        throw new Error(
            'Your workspace could not be brought up to date with the live workspace, '
            + 'because some of your changes conflict with it. Resolve the conflicts '
            + 'from the workspace dialog, then try again.'
        );
    }

    if (result && typeof result === 'object' && 'error' in result) {
        throw new Error(
            (result as any).error?.message
            ?? 'Your workspace could not be brought up to date with the live workspace.'
        );
    }
};
