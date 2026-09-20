# Sitegeist.ResourceReferenceEditor

Reusable Neos inspector editor for references to centrally managed content nodes.

The editor keeps the normal reference search and adds a button which opens a full
creation dialog based on the target node type's `ui.creationDialog` configuration.
After creation, the new node is selected immediately.

```php
#[ResourceReferenceEditorConfiguration(
    fqns: [Author::class],
    create: new ResourceCreationConfiguration(
        fqn: Author::class,
        path: 'authors',
        buttonLabel: 'Neue Autor:in',
    ),
)]
public ?Author $author = null;
```

Relative creation paths are resolved below the current site node. Absolute paths
are passed through unchanged. The target node type defines the dialog fields with
the regular Neos `showInCreationDialog` option, so this package is not coupled to
authors or to a specific property schema.
