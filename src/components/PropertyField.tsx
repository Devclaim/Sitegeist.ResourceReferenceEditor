import React from 'react';
import {EditorEnvelope} from '@neos-project/neos-ui-editors';

import {InspectorItem} from '../types';

/**
 * Renders a single property with the regular Neos inspector editor.
 *
 * This goes through EditorEnvelope on purpose: the envelope is what injects the
 * `neos` prop (configuration, globalRegistry, routes) into the editor component.
 * Editors that read `props.neos.globalRegistry` - the Kaleidoscope image editor
 * among them - break when their component is taken from the registry and
 * rendered directly.
 */
export const PropertyField: React.FC<{
    item: InspectorItem;
    node: any;
    value: unknown;
    /**
     * Pending save hooks for this property. Editors hand work that can only run on
     * save back this way - the image editor delivers a crop as a
     * `Neos.UI:Hook.BeforeSave.CreateImageVariant` hook while the value stays the
     * original asset - and they render their preview from these hooks, so they have
     * to be passed back in or the editor shows the unchanged value again.
     */
    hooks?: Record<string, unknown> | null;
    isChanged?: boolean;
    onChange: (propertyName: string, value: unknown, hooks?: Record<string, unknown>) => void;
    renderSecondaryInspector: (id?: string, render?: () => React.ReactNode) => void;
    validationErrors?: React.ReactNode[];
}> = ({item, node, value, hooks, isChanged, onChange, renderSecondaryInspector, validationErrors}) => (
    <div className="sitegeist-resource-reference-editor__field">
        <EditorEnvelope
            identifier={item.id}
            label={item.label ?? item.id}
            editor={item.editor}
            options={item.editorOptions}
            value={value}
            hooks={hooks ?? null}
            node={node}
            propertyName={item.id}
            commit={(newValue: unknown, commitHooks?: Record<string, unknown>) =>
                onChange(item.id, newValue, commitHooks)
            }
            renderSecondaryInspector={renderSecondaryInspector}
            validationErrors={validationErrors}
            helpMessage={item.helpMessage}
            helpThumbnail={item.helpThumbnail}
            highlight={Boolean(isChanged)}
        />
    </div>
);
