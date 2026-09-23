import React from 'react';
import {Button, Tabs} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {InspectedResource} from '../hooks/useInspectedResource';
import {translate} from '../i18n';
import {PropertyGroup} from './PropertyGroup';

/**
 * The right hand pane of the dialog: the node type's own inspector, with the same
 * tabs, groups and editors the sidebar would show for this resource.
 */
export const ResourceInspector: React.FC<{
    inspected: InspectedResource;
    isLoading: boolean;
    /** The user may look at the resource, not change it: editors disabled, no Apply. */
    isReadOnly: boolean;
    renderSecondaryInspector: (id?: string, render?: () => React.ReactNode) => void;
}> = ({inspected, isLoading, isReadOnly, renderSecondaryInspector}) => {
    const {i18nRegistry, t} = useRegistries();

    const body = (): React.ReactNode => {
        if (!inspected.node) {
            return (
                <div className="sitegeist-resource-reference-editor__state">
                    {t('inspector.empty', 'Select a resource to edit its properties.')}
                </div>
            );
        }

        if (inspected.tabs.length === 0) {
            return (
                <div className="sitegeist-resource-reference-editor__state">
                    {t('inspector.noConfiguration', 'This node type has no inspector configuration.')}
                </div>
            );
        }

        return (
            <Tabs className="sitegeist-resource-reference-editor__tabs">
                {inspected.tabs.map(tab => (
                    <Tabs.Panel
                        key={tab.id}
                        id={tab.id}
                        icon={tab.icon}
                        tooltip={translate(i18nRegistry, tab.label)}
                    >
                        {tab.groups.map(group => (
                            <PropertyGroup
                                key={group.id}
                                group={group}
                                node={inspected.node}
                                values={inspected.values}
                                draft={inspected.draft}
                                isOpen={inspected.isPanelOpen(group.id, group.collapsed)}
                                onToggle={() => inspected.togglePanel(group.id)}
                                isReadOnly={isReadOnly}
                                onChange={inspected.change}
                                renderSecondaryInspector={renderSecondaryInspector}
                                validationErrors={inspected.validationErrors}
                            />
                        ))}
                    </Tabs.Panel>
                ))}
            </Tabs>
        );
    };

    return (
        <div className="sitegeist-resource-reference-editor__inspector">
            <div className="sitegeist-resource-reference-editor__inspector-body">
                {body()}
            </div>
            {inspected.node && !isReadOnly && (
                <div className="sitegeist-resource-reference-editor__inspector-footer">
                    <Button
                        type="button"
                        style="lighter"
                        disabled={isLoading || !inspected.hasChanges}
                        onClick={inspected.discard}
                    >
                        {t('action.discard', 'Discard')}
                    </Button>
                    <Button
                        type="button"
                        style="success"
                        disabled={isLoading || !inspected.hasChanges}
                        onClick={inspected.save}
                    >
                        {t('action.apply', 'Apply')}
                    </Button>
                </div>
            )}
        </div>
    );
};
