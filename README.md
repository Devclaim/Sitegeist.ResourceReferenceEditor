# Sitegeist.ResourceReferenceEditor

A Neos inspector editor for references to resources. It keeps
Neos' own reference search and adds a dialog in which those resources are listed,
created, edited, duplicated, hidden and deleted without leaving the document.

A resource is its own kind of node, not a content element: it has no renderer and
cannot be placed on a page. Resources are kept in their own root subtree in the
live workspace.

## Usage with OPGM

In the node type that points at the resource, declare the reference as you would any
other OPGM reference and add the editor configuration to it. The second argument says
which node type the *New* button creates and which collection it lands in:

```php
#[NodeTypeDeclaration]
final readonly class News
{
    public function __construct(
        #[ReferenceRelationDeclaration]
        #[PropertyUiConfiguration(label: 'Autor:in')]
        #[InspectorConfiguration(group: 'news')]
        #[ResourceReferenceEditorConfiguration(
            [Author::class],
            new ResourceCreationConfiguration(
                Author::class,
                'authors',
                'Neue Autor:in anlegen',
            ),
            'Autor:in auswählen',
        )]
        public ?Author $author = null,
    ) {
    }
}
```

`Author` is not a content element. A resource implements the package's `Resource`
node type, which makes it a node without a renderer that can only live in a resource
collection - a collection accepts nothing else, and no page accepts a resource:

```php
#[NodeTypeDeclaration]
#[NodeTypeUiConfiguration(label: 'Autor:in', icon: 'user-edit')]
final readonly class Author implements Resource
{
    use ResourceProperties;

    public function __construct(
        #[PropertyUiConfiguration(label: 'Name', showInCreationDialog: true)]
        #[InspectorConfiguration(group: 'author')]
        public string $name,
    ) {
    }

    public function getNeosLabel(NodeLabelRenderingAccessInterface $access): string
    {
        return $this->name;
    }
}
```

`Resource` brings `Neos.Neos:Node` and `Neos.Neos:Hidable` - deliberately not
`Neos.Neos:Content`, which is what would make it insertable into a page and expected
to render itself.

Type the property as a collection of resources to reference several of them; the
editor switches to Neos' multi value reference editor by itself:

```php
public Authors $authors = new Authors(),
```

Two things a resource has to bring:

- **A label.** The name shown in the list and in the field is the node label, which
  `Resource` requires as `getNeosLabel()`.
- **Everything it needs, in the creation dialog.** *New* opens Neos' own node
  creation dialog, so every non-nullable constructor argument has to be promoted to
  it (`showInCreationDialog: true`) - values for anything else are dropped server
  side. The editor resolves those arguments by reflection and refuses to create -
  naming the property - rather than producing an entity that cannot be constructed
  and whose label rendering would throw. A resource type that asks for nothing is
  created without a dialog.

### Options

| Argument | Meaning |
| --- | --- |
| `fqns` | Node types that may be referenced. Defaults to the created type. |
| `create` | Node type, collection and button label for *New*. |
| `placeholder` | Placeholder of the reference search. |
| `startingPoint` | Where the search starts. Defaults to the collection. |
| `threshold` | Characters before the search runs. |
| `disabled` | Renders the editor read only. |

## How it works

```
/<Sitegeist.ResourceReferenceEditor:Root>/<collection>/<resource>
```

Root and collection are created on first use, in the most general dimension, so a
collection shines through into every specialization instead of existing once per
language. Both node types are configurable:

```yaml
Sitegeist:
  ResourceReferenceEditor:
    contentRepository:
      rootNodeType: 'Sitegeist.ResourceReferenceEditor:Root'
      collectionNodeType: 'Sitegeist.ResourceReferenceEditor:Collection'
```

## Development

```bash
yarn build                  # bundles src/ into Resources/Public/JavaScript
node_modules/.bin/tsc -p .  # type checks; esbuild only transpiles
```

`src/` is split into `api/` (endpoints and server feedback), `domain/` (node types,
workspace, validation, save hooks), `context/`, `hooks/` and `components/`;
`index.tsx` is the manifest. Strings go through the i18n registry with their English
wording as the fallback; English and German live in
`Resources/Private/Translations/<locale>/Main.xlf` and are registered for auto
inclusion in `Settings.yaml`.
