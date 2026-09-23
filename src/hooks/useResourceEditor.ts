import {EditorProps} from '../types';
import {useInspectedResource} from './useInspectedResource';
import {References} from './useReferences';
import {useResourceActions} from './useResourceActions';
import {useResourceCollection} from './useResourceCollection';
import {useResourceTree} from './useResourceTree';
import {useSecondaryInspector} from './useSecondaryInspector';
import {useSelection} from './useSelection';

/**
 * Everything the resource dialog works with, for one collection - shared by the
 * field in the inspector and the resource manager, so both are the same editor.
 */
export const useResourceEditor = (
    props: EditorProps,
    references: References,
    openDialog: () => void
) => {
    const secondary = useSecondaryInspector();
    const collection = useResourceCollection(props.options, props.neos?.routes);
    const tree = useResourceTree(collection, props.neos?.routes);
    const selection = useSelection(tree.rows.map(row => row.resource));
    const inspected = useInspectedResource(collection, secondary.close);
    const actions = useResourceActions(
        props,
        collection,
        references,
        selection,
        inspected,
        openDialog,
        // A child was created below a node, so it is opened and read again.
        (contextPath: string) => tree.reveal(contextPath),
        tree.reorder
    );

    return {secondary, collection, tree, selection, inspected, actions};
};
