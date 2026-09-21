import React from 'react';
import {Button, Dialog, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';

/**
 * Holds a secondary editor - the media browser, the image cropper, the link editor.
 * The regular inspector renders those in a pane next to itself; inside a dialog
 * they get a dialog of their own, which the styles keep above the resource dialog.
 */
export const SecondaryInspectorDialog: React.FC<{
    children: React.ReactNode;
    onClose: () => void;
}> = ({children, onClose}) => {
    const {t} = useRegistries();

    return (
        <Dialog
            isOpen
            title=""
            style="jumbo"
            onRequestClose={onClose}
            actions={[
                <Button key="close" type="button" style="lighter" onClick={onClose}>
                    <Icon icon="times" /> {t('action.close', 'Close')}
                </Button>
            ]}
        >
            <div className="sitegeist-resource-reference-editor__secondary">
                {children}
            </div>
        </Dialog>
    );
};
