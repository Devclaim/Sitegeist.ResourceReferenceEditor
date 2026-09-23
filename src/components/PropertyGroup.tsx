import React from 'react';
import {Icon, ToggablePanel} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {editableItems} from '../domain/nodeTypes';
import {translate} from '../i18n';
import {DraftValue, InspectorGroup} from '../types';
import {PropertyField} from './PropertyField';

/** The header theme the regular inspector gives its group headlines. */
const headerTheme = {
    panel__headline: 'sitegeist-resource-reference-editor__group-label' // eslint-disable-line camelcase
};

/**
 * One inspector group - the collapsible panel from the regular inspector, with the
 * same class names on it (as its PropertyGroup has them), so it is separated from
 * the next group by the same line.
 */
export const PropertyGroup: React.FC<{
    group: InspectorGroup;
    node: any;
    values: Record<string, unknown>;
    draft: Record<string, DraftValue>;
    isOpen: boolean;
    onToggle: () => void;
    onChange: (propertyName: string, value: unknown, hooks?: Record<string, unknown>) => void;
    renderSecondaryInspector: (id?: string, render?: () => React.ReactNode) => void;
    validationErrors: Record<string, React.ReactNode[]>;
}> = ({
    group,
    node,
    values,
    draft,
    isOpen,
    onToggle,
    onChange,
    renderSecondaryInspector,
    validationErrors
}) => {
    const {i18nRegistry} = useRegistries();

    return (
        <ToggablePanel
            isOpen={isOpen}
            onPanelToggle={onToggle}
            className="sitegeist-resource-reference-editor__group"
        >
            <ToggablePanel.Header theme={headerTheme}>
                {group.icon && (
                    <div className="sitegeist-resource-reference-editor__group-icon">
                        <Icon icon={group.icon} />
                    </div>
                )}
                {translate(i18nRegistry, group.label)}
            </ToggablePanel.Header>
            <ToggablePanel.Contents>
                {editableItems(group).map(item => (
                    <PropertyField
                        key={`${node?.contextPath ?? 'new'}-${item.id}`}
                        item={item}
                        node={node}
                        // `_nodeType` is not a property - the inspector reads it off
                        // the node itself, and the NodeTypeEditor stays empty without it.
                        value={item.id === '_nodeType' ? node?.nodeType : values[item.id]}
                        hooks={draft[item.id]?.hooks}
                        isChanged={Boolean(draft[item.id])}
                        onChange={onChange}
                        renderSecondaryInspector={renderSecondaryInspector}
                        validationErrors={validationErrors[item.id]}
                    />
                ))}
            </ToggablePanel.Contents>
        </ToggablePanel>
    );
};
