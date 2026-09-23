# Sitegeist.ResourceReferenceEditor

A Neos inspector editor for referencing shared resources - authors, books, partners,
anything a document points at. Editors pick a resource with Neos' normal reference
search, or open a dialog to create and manage resources without leaving the page.

Resources are nodes of their own: they live in a separate subtree in the live
workspace, are never rendered on a page, and are shared by every document.

Requires Neos 9.1 and PackageFactory.OPGM.

## Features

- Pick one or several resources in the inspector
- Create, edit, duplicate, hide and delete them in a dialog
- The resource's own inspector, including image cropper and media browser
- Resources inside resources (e.g. books below an author)
- Reorder by drag and drop or Alt+↑/↓
- Multi select with *Select multiple* or shift+click
- Delete warns about documents that still use the resource
- Managing resources is limited to administrators by default

## Tutorial

**1. Declare a resource.** Implement `Resource` and give it a label. Every required
constructor argument must be shown in the creation dialog:

```php
#[NodeTypeDeclaration]
#[NodeTypeUiConfiguration(label: 'Autor:in', icon: 'user-edit')]
final readonly class Author implements Resource
{
    use ResourceProperties;

    public function __construct(
        #[PropertyUiConfiguration(label: 'Name', showInCreationDialog: true)]
        public string $name,
        #[ChildRelationDeclaration]
        public Books $books = new Books(), // optional: resources inside the resource
    ) {
    }

    public function getNeosLabel(NodeLabelRenderingAccessInterface $access): string
    {
        return $this->name;
    }
}
```

**2. Reference it.** Add the editor to a reference. The creation configuration names
the type *New* creates and the collection it goes into:

```php
#[ReferenceRelationDeclaration]
#[PropertyUiConfiguration(label: 'Autor:in')]
#[ResourceReferenceEditorConfiguration(
    [Author::class],
    new ResourceCreationConfiguration(Author::class, 'authors', 'Neue Autor:in anlegen'),
    'Autor:in auswählen',
)]
public ?Author $author = null,
```

Type the property as a collection (`public Authors $authors = new Authors()`) to
reference several.

**3. Flush the caches.** `./flow flow:cache:flush` - the collection is created on
first use.

### Options

`ResourceReferenceEditorConfiguration($fqns, $create, $placeholder, $startingPoint, $threshold, $disabled)` -
`$fqns: null` allows every resource type; `$startingPoint` defaults to the collection.

## Permissions

Using resources is open to every editor. Managing them takes
`Sitegeist.ResourceReferenceEditor:ManageResources`, granted to administrators. To
allow editors:

```yaml
roles:
  'Neos.Neos:Editor':
    privileges:
      - privilegeTarget: 'Sitegeist.ResourceReferenceEditor:ManageResources'
        permission: GRANT
```

## Development

```bash
yarn build   # or: yarn watch
node_modules/.bin/tsc -p .
```

Commit the built `Resources/Public/JavaScript/Plugin.js` with every change to `src/`.
