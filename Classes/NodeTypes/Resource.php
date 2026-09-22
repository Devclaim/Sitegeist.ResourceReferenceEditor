<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\NodeTypes;

use Neos\Neos\NodeTypes\Hidable;
use Neos\Neos\NodeTypes\Node;
use PackageFactory\OPGM\Domain\NodeType\NodeTypeDeclaration;
use PackageFactory\OPGM\NeosAdapter\NodeTypes\NeosLabelProvider;

/**
 * Marks a node type as a resource: content that is shared between documents and
 * lives in the resource subtree, rather than on a page.
 *
 * Deliberately not a `Neos.Neos:Content`. A content node type is one an editor can
 * insert into a content collection and that Fusion renders on its own; a resource is
 * neither. It has no renderer, it cannot be added to a page, and the only place it
 * can be created is a resource collection - which the collection's node type
 * constraints enforce, so this is a guarantee rather than a convention.
 *
 * Resources are hidable, because retiring one without deleting it is the safe way to
 * take it out of circulation, and they name themselves through `getNeosLabel()`,
 * because the name is what every list, search and reference field shows.
 *
 * Use `ResourceProperties` for the backing properties:
 *
 *     #[NodeTypeDeclaration]
 *     #[NodeTypeUiConfiguration(label: 'Autor:in', icon: 'user-edit')]
 *     final readonly class Author implements Resource
 *     {
 *         use ResourceProperties;
 *
 *         public function __construct(public string $name) {}
 *
 *         public function getNeosLabel(NodeLabelRenderingAccessInterface $access): string
 *         {
 *             return $this->name;
 *         }
 *     }
 */
#[NodeTypeDeclaration]
interface Resource extends Node, Hidable, NeosLabelProvider
{
}
