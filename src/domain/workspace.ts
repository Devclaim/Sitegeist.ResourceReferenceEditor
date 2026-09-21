/**
 * Resources are managed in the live workspace, the way Sitegeist.Taxonomy manages
 * its vocabularies. They are shared vocabulary rather than draft content of one
 * document: a resource kept in an editor's workspace could not be published
 * together with the document that references it, because publishing that one
 * document would leave live with a reference to a node that is not there.
 */
export const RESOURCE_WORKSPACE_NAME = 'live';

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

