import React from 'react';

import {ResourceNode} from '../types';

export type Selection = {
    /** Selection mode: a click anywhere on a row picks it instead of opening it. */
    isSelecting: boolean;
    enter: () => void;
    leave: () => void;
    selection: string[];
    selected: ResourceNode[];
    toggle: (resource: ResourceNode) => void;
    setSelection: (contextPaths: string[]) => void;
    /** Drops resources that are gone; answers whether nothing is left selected. */
    forget: (contextPaths: string[]) => void;
};

export const useSelection = (resources: ResourceNode[]): Selection => {
    const [isSelecting, setIsSelecting] = React.useState(false);
    const [selection, setSelection] = React.useState<string[]>([]);

    const leave = React.useCallback((): void => {
        setIsSelecting(false);
        setSelection([]);
    }, []);

    const toggle = React.useCallback((resource: ResourceNode): void => {
        setSelection(current => current.includes(resource.contextPath)
            ? current.filter(contextPath => contextPath !== resource.contextPath)
            : [...current, resource.contextPath]);
    }, []);

    const forget = React.useCallback((contextPaths: string[]): void => {
        setSelection(current => current.filter(contextPath => !contextPaths.includes(contextPath)));
    }, []);

    return {
        isSelecting,
        enter: () => setIsSelecting(true),
        leave,
        selection,
        selected: resources.filter(resource => selection.includes(resource.contextPath)),
        toggle,
        setSelection,
        forget
    };
};
