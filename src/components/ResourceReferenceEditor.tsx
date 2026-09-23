import React from 'react';
import {Button, Icon} from '@neos-project/react-ui-components';

import {useRegistries} from '../context/Registries';
import {translate} from '../i18n';
import {useInspectedResource} from '../hooks/useInspectedResource';
import {useReferences} from '../hooks/useReferences';
import {useResourceActions} from '../hooks/useResourceActions';
import {useResourceCollection} from '../hooks/useResourceCollection';
import {useResourceTree} from '../hooks/useResourceTree';
import {useSecondaryInspector} from '../hooks/useSecondaryInspector';
import {useSelection} from '../hooks/useSelection';
import {styles} from '../styles';
import {EditorProps} from '../types';
import {DeleteConfirmationDialog} from './DeleteConfirmationDialog';
import {ResourceDialog} from './ResourceDialog';

/**
 * The editor as the inspector sees it: the regular Neos reference editor, plus the
 * two buttons that lead into the resource dialog - one that creates a resource
 * straight away, one that opens the collection.
 */
export const ResourceReferenceEditor: React.FC<EditorProps & {
    ReferenceEditor: React.ComponentType<any>;
    ReferencesEditor?: React.ComponentType<any>;
}> = ({ReferenceEditor, ReferencesEditor, ...props}) => {
    const {i18nRegistry, nodeTypesRegistry, t} = useRegistries();
    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);

    const creation = props.options.resourceCreation;
    const secondary = useSecondaryInspector();
    const collection = useResourceCollection(props.options, props.neos?.routes);
    const tree = useResourceTree(collection, props.neos?.routes);
    const selection = useSelection(tree.rows.map(row => row.resource));
    const references = useReferences(props);
    const inspected = useInspectedResource(collection, secondary.close);
    const openDialog = (): void => setDialogIsOpen(true);
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

    const showAll = async (): Promise<void> => {
        openDialog();
        await collection.run(() => collection.reload());
    };

    const closeDialog = (): void => {
        secondary.close();
        setDialogIsOpen(false);
    };

    /**
     * Which reference was clicked, if any.
     *
     * A single value editor shows its reference in the select box header. A multi
     * value editor lists them above the search box, in the order of the property's
     * value - so the position of the clicked entry is the position of its
     * identifier.
     */
    const clickedReference = (target: HTMLElement): string | null => {
        if (!references.isMultiple) {
            return target.closest('[class*="selectBoxHeader"]')
                && references.referenced.length === 1
                ? references.referenced[0]
                : null;
        }

        const item = target
            .closest('[class*="selectedOptions__innerPreview"]')
            ?.closest('li');
        const list = item?.parentElement;

        if (!item || !list) {
            return null;
        }

        return references.referenced[
            Array.prototype.indexOf.call(list.children, item)
        ] ?? null;
    };

    /**
     * Neos' reference editor navigates the content canvas to the referenced node
     * when it is clicked. A resource is not part of any document, so the server
     * resolves its "closest document" to the site node and the editor would be
     * taken to the home page. The click opens the resource here instead.
     */
    const openReferencedResource = (event: React.MouseEvent): void => {
        const target = event.target as HTMLElement | null;

        // The clear button, the remove icon of an entry and the search input keep
        // doing what they do.
        if (!target || target.closest('input, button')) {
            return;
        }

        const identifier = clickedReference(target);

        if (!identifier) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        openDialog();

        // Opened before: the resource is shown right away while the list is read
        // again next to it, instead of after it.
        const known = collection.resources.find(candidate => candidate.identifier === identifier);

        void collection.run(async () => {
            if (known) {
                await Promise.all([collection.reload(), inspected.inspect(known)]);

                return;
            }

            const {resources} = await collection.reload();
            const resource = resources.find(candidate => candidate.identifier === identifier);

            if (resource) {
                await inspected.inspect(resource);
            }
        });
    };

    // The wrapped Neos editor knows nothing about resource creation.
    const {resourceCreation: _creationOptions, ...referenceOptions} = props.options;

    /*
     * The label of the resource type, for the line under a referenced resource. It
     * is read from the configuration rather than from the referenced node, which
     * would cost a request every time the inspector renders - and a field that
     * accepts several node types gets no label, because a fixed one would be wrong.
     */
    const allowedNodeTypes = props.options.nodeTypes ?? [creation.type];
    const resourceTypeLabel = allowedNodeTypes.length === 1
        ? translate(i18nRegistry, nodeTypesRegistry.getNodeType(allowedNodeTypes[0])?.ui?.label)
        : '';

    return (
        <>
            <style>{styles}</style>
            {/*
              * A multi value property is edited with Neos' ReferencesEditor, which
              * works on arrays of identifiers rather than a single one.
              */}
            <div
                className="sitegeist-resource-reference-editor__reference"
                style={{
                    ['--sitegeist-resource-type' as any]: JSON.stringify(resourceTypeLabel)
                }}
                onClickCapture={openReferencedResource}
            >
                {/*
                  * Keyed on the change counter: Neos' reference editor reads the
                  * label of its value once, when it mounts, so renaming a resource
                  * would otherwise keep showing the old name until the backend is
                  * reloaded. Re-keying it makes it read the label again.
                  */}
                {references.isMultiple && ReferencesEditor
                    ? (
                        <ReferencesEditor
                            key={collection.version}
                            {...props}
                            options={referenceOptions}
                        />
                    )
                    : (
                        <ReferenceEditor
                            key={collection.version}
                            {...props}
                            options={referenceOptions}
                        />
                    )}
            </div>
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
                tree={tree}
                inspected={inspected}
                selection={selection}
                references={references}
                actions={actions}
                creationType={creation.type}
                usableNodeTypes={allowedNodeTypes}
                renderSecondaryInspector={secondary.render}
                secondaryInspector={secondary.secondaryInspector?.element ?? null}
                onCloseSecondaryInspector={secondary.close}
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
        </>
    );
};
