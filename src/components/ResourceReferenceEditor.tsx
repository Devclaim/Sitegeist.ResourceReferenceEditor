import React from 'react';
import {Button, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {useInspectedResource} from '../hooks/useInspectedResource';
import {useReferences} from '../hooks/useReferences';
import {useResourceActions} from '../hooks/useResourceActions';
import {useResourceCollection} from '../hooks/useResourceCollection';
import {useSecondaryInspector} from '../hooks/useSecondaryInspector';
import {useSelection} from '../hooks/useSelection';
import {styles} from '../styles';
import {EditorProps} from '../types';
import {DeleteConfirmationDialog} from './DeleteConfirmationDialog';
import {ResourceDialog} from './ResourceDialog';
import {SecondaryInspectorDialog} from './SecondaryInspectorDialog';

/**
 * The editor as the inspector sees it: the regular Neos reference editor, plus the
 * two buttons that lead into the resource dialog - one that creates a resource
 * straight away, one that opens the collection.
 */
export const ResourceReferenceEditor: React.FC<EditorProps & {
    ReferenceEditor: React.ComponentType<any>;
    ReferencesEditor?: React.ComponentType<any>;
}> = ({ReferenceEditor, ReferencesEditor, ...props}) => {
    const {t} = useRegistries();
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const creation = props.options.resourceCreation;
    const secondary = useSecondaryInspector();
    const collection = useResourceCollection(props.options, props.neos?.routes);
    const selection = useSelection(collection.resources);
    const references = useReferences(props);
    const inspected = useInspectedResource(collection, secondary.close);
    const openDialog = (): void => setDialogIsOpen(true);
    const actions = useResourceActions(props, collection, references, selection, inspected, openDialog);

    const showAll = async (): Promise<void> => {
        openDialog();
        await collection.run(() => collection.reload());
    };

    const closeDialog = (): void => {
        secondary.close();
        setDialogIsOpen(false);
    };

    // The wrapped Neos editor knows nothing about resource creation.
    const {resourceCreation: _creationOptions, ...referenceOptions} = props.options;

    return (
        <>
            <style>{styles}</style>
            {/*
              * A multi value property is edited with Neos' ReferencesEditor, which
              * works on arrays of identifiers rather than a single one.
              */}
            {references.isMultiple && ReferencesEditor
                ? <ReferencesEditor {...props} options={referenceOptions} />
                : <ReferenceEditor {...props} options={referenceOptions} />}
            <div className="sitegeist-resource-reference-editor__actions">
                <Button
                    className="sitegeist-resource-reference-editor__create"
                    type="button"
                    style="lighter"
                    disabled={props.options.disabled || collection.isLoading}
                    onClick={actions.create}
                    title={creation.buttonLabel ?? t('action.createNew', 'Create new')}
                    aria-label={creation.buttonLabel ?? t('action.createNew', 'Create new')}
                >
                    <Icon icon="plus" />
                </Button>
                <Button
                    type="button"
                    style="lighter"
                    disabled={props.options.disabled || collection.isLoading}
                    onClick={showAll}
                >
                    <Icon icon="list" /> {t('action.showAll', 'Show all')}
                </Button>
            </div>
            <ResourceDialog
                isOpen={dialogIsOpen}
                onClose={closeDialog}
                collection={collection}
                inspected={inspected}
                selection={selection}
                references={references}
                actions={actions}
                createLabel={creation.buttonLabel}
                renderSecondaryInspector={secondary.render}
            />
            {actions.pendingRemoval && (
                <DeleteConfirmationDialog
                    resources={actions.pendingRemoval}
                    usage={actions.pendingRemovalUsage}
                    onCancel={actions.cancelRemoval}
                    onHideInstead={resources => {
                        actions.cancelRemoval();
                        actions.setHidden(resources, true);
                    }}
                    onConfirm={actions.remove}
                />
            )}
            {secondary.secondaryInspector && (
                <SecondaryInspectorDialog onClose={secondary.close}>
                    {secondary.secondaryInspector.element}
                </SecondaryInspectorDialog>
            )}
        </>
    );
};
