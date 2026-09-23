import React from 'react';
import {Icon} from '@neos-project/react-ui-components';

/**
 * A button's icon that turns into a spinner while the action behind that button
 * is running, so it is clear which of the disabled buttons is the one at work.
 */
export const ActionIcon: React.FC<{icon: string; isBusy?: boolean}> = ({icon, isBusy}) => (
    isBusy
        ? <Icon icon="spinner" className="sitegeist-resource-reference-editor__spinner" />
        : <Icon icon={icon} />
);
