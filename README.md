# Sitegeist.ResourceReferenceEditor

Reusable Neos inspector editor for references to centrally managed content nodes.

The editor keeps the normal reference search and adds a button which creates a new
resource straight away - like adding a content element - opens the resource dialog
and selects the new node in the inspector. The same action sits at the bottom of
the list inside the dialog. A created resource is referenced immediately and its
properties are filled in the inspector and saved with **Apply**.

Node types mapped to PHP entities (OPGM) cannot exist without their non-nullable
constructor arguments: a node created without them makes node label rendering throw,
which takes down every backend view that touches the node. Nullability is not part of
the node type schema the UI receives, so `ResourceCreationConfiguration` resolves it
by reflection and hands the required properties to the editor, which sends an empty
value of the matching type for each of them on creation. Those properties have to be
promoted to the creation dialog (`showInCreationDialog: true`), because values for
anything else are dropped server side. If a required property is missing there, or has
a type no empty value can be invented for, the editor refuses to create and names it.

The editor also provides a **Show all** dialog, built like the backend itself: the
left side lists every resource below the configured resource container, the right
side is the node's inspector at the regular sidebar width, with the node type's own
tabs and property groups. Selecting a resource on the left is the equivalent of
clicking a content element in the canvas. Creating and editing both happen inside
that dialog - the content canvas is never navigated away from the document you are
working on.

```php
#[ResourceReferenceEditorConfiguration(
    fqns: [Author::class],
    create: new ResourceCreationConfiguration(
        fqn: Author::class,
        collection: 'authors',
        buttonLabel: 'Neue Autor:in',
    ),
)]
public ?Author $author = null;
```

## Selecting, creating and managing

A property typed as a collection of resources is edited with Neos' multi value
reference editor and the dialog lets several resources be selected at once; a single
valued property keeps the single value editor. The distinction is made in PHP from
the property type, not configured twice.

The dialog splits into the resource list on the left and the regular inspector on
the right. A row is opened by clicking it; its only button is *Use*, which writes
the reference into the edited property, and a resource already referenced shows an
*In use* marker instead.

Everything else lives in one action bar above the list, which always acts on **what
you are looking at**: the resource open in the inspector, or the selection while
*Select multiple* is active. It holds

| Action | What it does |
| --- | --- |
| `+` | creates a resource right away and opens it - node type defaults apply |
| Duplicate | copies the resource into the same collection (`Neos.Neos.Ui:CopyInto`) |
| Hide / Show | toggles `_hidden`, disabled for node types without `Neos.Neos:Hidable` |
| Delete | asks first, and says what would break |

There is no clipboard copy and paste: a resource has exactly one valid destination,
the collection it already lives in, so a paste would have nothing to decide and
duplicating is the shorter way to say it.

Hiding is the safe way to retire a resource - documents that reference it keep a
reference that resolves. Deleting is the soft removal the content tree performs
(`Neos.Neos.Ui:RemoveNode`, which tags the subtree as removed), and references to
removed resources are dropped from the edited property, because they would
otherwise resolve to nothing. The confirmation therefore names, per resource, how
many nodes reference it and in which documents, and offers to hide it instead.

Those counts come from the `sitegeist-resource-usage` data source:

```
/neos/service/data-source/sitegeist-resource-usage?node=<nodeAddress>&nodes=<id>,<id>
```

It counts back references in the subgraph of the node being edited, so references
from other dimensions or from another editor's workspace are not visible to it. The
number is a lower bound, which is what a warning needs. A failure to reach it never
blocks the deletion - the warning is then shown without counts.

## Where resources are stored

Resources do not live below a site. They live in an own root subtree, the way
Sitegeist.Taxonomy keeps vocabularies out of the site tree:

```
/<Sitegeist.ResourceReferenceEditor:Root>/<collection>/<resource>
```

Root and collections are created on first use, in the live workspace and in the
most general dimension, so a collection shines through into every specialization
instead of existing once per language. Both node types are configurable:

```yaml
Sitegeist:
  ResourceReferenceEditor:
    contentRepository:
      rootNodeType: 'Sitegeist.ResourceReferenceEditor:Root'
      collectionNodeType: 'Sitegeist.ResourceReferenceEditor:Collection'
```

Derive your own root type to constrain which collections may exist. When you do,
pass an explicit `startingPoint` to the editor configuration - it otherwise
defaults to `/<Sitegeist.ResourceReferenceEditor:Root>/<collection>`, which is also
what the reference search uses, since resources are not reachable from the site
node.

The editor resolves the collection through the `sitegeist-resource-collections`
data source, which answers with the collection's node address and creates root and
collection when they are missing:

```
/neos/service/data-source/sitegeist-resource-collections?node=<nodeAddress>&collection=authors
```

A data source rather than an own route: those are served by Neos' service
controller, so backend routing and authentication apply without the package
registering routes, policies and authentication request patterns of its own.
Content repository, workspace and dimension are taken from the node being edited.

The fields shown come from the target node type's own inspector configuration, so
this package is not coupled to authors or to a specific property schema.

## Code layout

```
src/
  index.tsx                 the manifest: registries in, editor registered
  types.ts                  the shapes the package works with
  styles.ts                 the dialog's CSS, inlined next to the editor
  i18n.ts                   the registry bound to this package's XLIFF
  neos.d.ts                 the host modules, which ship no types of their own
  api/
    endpoints.ts            the two data sources and the node query
    feedback.ts             which server feedbacks are handed back to the UI
  domain/
    nodeTypes.ts            inspector structure, creation data, node type filters
    resources.ts            what the editor needs to know about a resource
    saveHooks.ts            save hooks the editors hand over with their value
    validation.ts           the node type's validators, run like the inspector does
    workspace.ts            which workspace changes are addressed to
  context/
    Registries.tsx          the Neos UI registries, passed down once
  hooks/
    useResourceCollection   collection, resources, loading and error state
    useInspectedResource    the resource open in the inspector and its form
    useReferences           the property the editor is attached to
    useSelection            selection mode
    useSecondaryInspector   media browser, cropper, link editor
    useResourceActions      create, duplicate, hide, delete
  components/
    ResourceReferenceEditor the editor as the inspector sees it
    ResourceDialog          list on the left, inspector on the right
    ResourceActionBar       the actions above the list
    ResourceList(Item)      the rows
    ResourceInspector       the node type's own inspector
    PropertyGroup/Field     one group, one editor
    DeleteConfirmationDialog, SecondaryInspectorDialog
```

`yarn build` bundles `src/index.tsx` with esbuild; `node_modules/.bin/tsc -p .`
type checks it (esbuild only transpiles).

## Translations

Every string the editor shows goes through the Neos i18n registry, with the English
wording as the fallback, so the editor stays readable even before the XLIFF has been
compiled into the backend's `xliff.json`. English and German live in
`Resources/Private/Translations/<locale>/Main.xlf`, and Settings.yaml registers the
unit for auto inclusion:

```yaml
Neos:
  Neos:
    userInterface:
      translation:
        autoInclude:
          'Sitegeist.ResourceReferenceEditor':
            - Main
```

Labels that come out of node type configuration - group, tab and property labels -
carry their own translation ids and are translated by the same registry. Messages
from the data sources stay in English on purpose: they name node types, collections
and HTTP status codes and are read while fixing a configuration, not while editing.

## Why the editor talks to the change endpoint directly

Resource nodes live below the site node, outside the rendered document. Whenever
the Neos UI creates or changes such a node through the regular workflow, the
server resolves the node's *closest document* - which is the site node - and
answers with a `ReloadDocument` feedback. The UI follows it and the editor lands
on the home page, losing the document they were editing.

Adding a resource also commits the reference on the surrounding node. That commit
lands in the inspector's transient state, which makes Neos cover the screen with its
unapplied-changes overlay - including the resource dialog. The editor therefore
applies that change immediately when it is the only pending one, and leaves it (and
raises the dialog above the overlay) when the editor has other unapplied changes.

The editor therefore sends its changes through `endpoints.change()` itself and
forwards only the feedbacks that are safe outside a rendered document
(`UpdateNodeInfo`, `UpdateWorkspaceInfo`, messages). Navigational and
out-of-band rendering feedbacks are dropped. After saving an existing resource
the *current* document is reloaded so changed values show up in the canvas.

Secondary editors (media browser, image cropper) open in a dialog of their own, at
the same width as the resource dialog and with a positioned, full height body - the
media browser renders as an absolutely positioned iframe and would otherwise collapse.

Both creating and editing render the node type's inspector configuration
(`NodeTypesRegistry.getInspectorViewConfigurationFor`) with the regular Neos
`Tabs`, `ToggablePanel` and `EditorEnvelope` components, so editors behave exactly
as they do in the sidebar - including their secondary inspector (media browser,
image cropper), their save hooks and their validators. Inspector views
(`type: view` items) are not rendered.
