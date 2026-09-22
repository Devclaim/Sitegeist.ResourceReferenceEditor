<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\DataSource;

use Neos\ContentRepository\Core\ContentRepository;
use Neos\ContentRepository\Core\Projection\ContentGraph\Filter\FindSubtreeFilter;
use Neos\ContentRepository\Core\Projection\ContentGraph\Node;
use Neos\ContentRepository\Core\Projection\ContentGraph\Subtree;
use Neos\ContentRepository\Core\SharedModel\Node\NodeAddress;
use Neos\ContentRepository\Core\SharedModel\Workspace\WorkspaceName;
use Neos\ContentRepositoryRegistry\ContentRepositoryRegistry;
use Neos\Flow\Annotations as Flow;
use Neos\Neos\Domain\NodeLabel\NodeLabelGeneratorInterface;
use Neos\Neos\Domain\SubtreeTagging\NeosSubtreeTag;
use Neos\Neos\Service\DataSource\AbstractDataSource;

/**
 * Answers with what lives below a node: the resources of a collection, or the
 * children of a resource.
 *
 *     /neos/service/data-source/sitegeist-resource-children
 *         ?node=<nodeAddress>&parent=<nodeAddress>[&nodeTypes=A,B][&levels=3]
 *
 * Several levels are read at once and answered nested, so the list can show a
 * resource with its children without asking again - and one level deeper than it
 * shows, because that is what says which of the deepest rows can still be unfolded.
 *
 * `nodeTypes` narrows the first level to the types the editor accepts; deeper levels
 * are whatever the node types allow, which can only ever be resources.
 *
 * Resources live in the live workspace, so only the dimension is taken from the node
 * that is being edited.
 */
class ResourceChildrenDataSource extends AbstractDataSource
{
    /**
     * @var string
     */
    protected static $identifier = 'sitegeist-resource-children';

    private const DEFAULT_LEVELS = 3;

    #[Flow\Inject]
    protected ContentRepositoryRegistry $contentRepositoryRegistry;

    #[Flow\Inject]
    protected NodeLabelGeneratorInterface $nodeLabelGenerator;

    /**
     * @param array<string,mixed> $arguments
     * @return array<int,array<string,mixed>>
     */
    public function getData(?Node $node = null, array $arguments = []): array
    {
        if ($node === null) {
            throw new \RuntimeException(
                'The resource children data source needs the node that is being edited.',
                1758800000
            );
        }

        $parent = $arguments['parent'] ?? null;
        if (!is_string($parent) || $parent === '') {
            throw new \RuntimeException(
                'The resource children data source needs a "parent" argument.',
                1758800001
            );
        }

        $levels = isset($arguments['levels'])
            ? max(2, min(5, (int)$arguments['levels']))
            : self::DEFAULT_LEVELS;

        $nodeTypes = array_values(array_filter(
            array_map('trim', explode(',', (string)($arguments['nodeTypes'] ?? '')))
        ));

        $parentAddress = NodeAddress::fromJsonString($parent);
        $contentRepository = $this->contentRepositoryRegistry->get($node->contentRepositoryId);
        $subgraph = $contentRepository
            ->getContentSubgraph(WorkspaceName::forLive(), $parentAddress->dimensionSpacePoint);

        $subtree = $subgraph->findSubtree(
            $parentAddress->aggregateId,
            FindSubtreeFilter::create(maximumLevels: $levels),
        );

        if ($subtree === null) {
            return [];
        }

        $children = [];
        foreach ($subtree->children as $child) {
            if ($nodeTypes !== [] && !$this->isOfAnyType($child->node, $nodeTypes, $contentRepository)) {
                continue;
            }

            $children[] = $this->toArray($child, $parentAddress, $levels - 1);
        }

        return $children;
    }

    /**
     * @param array<int,string> $nodeTypes
     */
    private function isOfAnyType(Node $node, array $nodeTypes, ContentRepository $contentRepository): bool
    {
        $nodeType = $contentRepository->getNodeTypeManager()->getNodeType($node->nodeTypeName);

        if ($nodeType === null) {
            return false;
        }

        foreach ($nodeTypes as $nodeTypeName) {
            if ($nodeType->isOfType($nodeTypeName)) {
                return true;
            }
        }

        return false;
    }

    /**
     * @param int $loadedLevelsBelow how many levels of descendants were read below
     *                              this node - its own children are only answered
     *                              when theirs were read too, because that is what
     *                              tells them whether they can be unfolded
     * @return array<string,mixed>
     */
    private function toArray(Subtree $subtree, NodeAddress $parentAddress, int $loadedLevelsBelow): array
    {
        $node = $subtree->node;
        $children = iterator_to_array($subtree->children);

        $entry = [
            'contextPath' => NodeAddress::create(
                $parentAddress->contentRepositoryId,
                $parentAddress->workspaceName,
                $parentAddress->dimensionSpacePoint,
                $node->aggregateId,
            )->toJson(),
            'identifier' => $node->aggregateId->value,
            'nodeType' => $node->nodeTypeName->value,
            'label' => $this->nodeLabelGenerator->getLabel($node),
            // The node name of a tethered child is how its parent's node type refers
            // to it, which is where the editor takes its label from.
            'name' => $node->name?->value,
            // Tethered children are part of their parent: they cannot be removed,
            // moved or hidden on their own.
            'tethered' => $node->classification->isTethered(),
            'hidden' => $node->tags->withoutInherited()->contain(NeosSubtreeTag::disabled()),
            'childCount' => count($children),
        ];

        if ($loadedLevelsBelow >= 2) {
            $entry['children'] = array_map(
                fn (Subtree $child): array => $this->toArray(
                    $child,
                    $parentAddress,
                    $loadedLevelsBelow - 1
                ),
                $children
            );
        }

        return $entry;
    }
}
