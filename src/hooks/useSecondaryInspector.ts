import React from 'react';

import {SecondaryInspector} from '../types';

export type SecondaryInspectorState = {
    secondaryInspector: SecondaryInspector | null;
    /** The `renderSecondaryInspector` prop every Neos editor expects. */
    render: (id?: string, secondaryInspectorComponentFactory?: () => React.ReactNode) => void;
    close: () => void;
};

/**
 * Secondary editors - the media browser, the image cropper, the link editor - are
 * opened by the editor they belong to and rendered next to it.
 */
export const useSecondaryInspector = (): SecondaryInspectorState => {
    const [secondaryInspector, setSecondaryInspector] = React.useState<SecondaryInspector | null>(null);
    const openId = React.useRef<string | null>(null);

    const close = React.useCallback((): void => {
        openId.current = null;
        setSecondaryInspector(null);
    }, []);

    const render = React.useCallback(
        (id?: string, secondaryInspectorComponentFactory?: () => React.ReactNode): void => {
            // Same contract as the inspector: rendering the same editor again closes
            // it, and the factory is resolved exactly once.
            if (!id || !secondaryInspectorComponentFactory || openId.current === id) {
                close();

                return;
            }

            openId.current = id;
            setSecondaryInspector({id, element: secondaryInspectorComponentFactory()});
        },
        [close]
    );

    return {secondaryInspector, render, close};
};
