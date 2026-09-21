import {selectors} from '@neos-project/neos-ui-redux-store';

import {Store} from '../types';

/**
 * The workspace the current editing session writes to. Changes are addressed to it
 * explicitly, so a resource never ends up in another workspace (live, most notably)
 * than the document the editor is working on.
 */
export const editingWorkspaceName = (store: Store): string | null => {
    const state = store.getState();
    const documentNodeContextPath = state?.cr?.nodes?.documentNode;

    if (typeof documentNodeContextPath === 'string') {
        try {
            const workspaceName = JSON.parse(documentNodeContextPath)?.workspaceName;

            if (typeof workspaceName === 'string') {
                return workspaceName;
            }
        } catch (exception) {
            // fall through to the personal workspace below
        }
    }

    return selectors.CR.Workspaces.personalWorkspaceNameSelector(state) ?? null;
};


/** The same node address, addressed in the given workspace. */
export const inWorkspace = (contextPath: string, workspaceName: string | null): string => {
    if (!workspaceName) {
        return contextPath;
    }

    try {
        const nodeAddress = JSON.parse(contextPath);

        if (nodeAddress?.workspaceName === workspaceName) {
            return contextPath;
        }

        return JSON.stringify({...nodeAddress, workspaceName});
    } catch (exception) {
        return contextPath;
    }
};

