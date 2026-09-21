<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\DataSource;

use Neos\ContentRepository\Core\Projection\ContentGraph\Filter\FindBackReferencesFilter;
use Neos\ContentRepository\Core\Projection\ContentGraph\Filter\FindClosestNodeFilter;
use Neos\ContentRepository\Core\Projection\ContentGraph\Node;
use Neos\ContentRepository\Core\SharedModel\Node\NodeAggregateId;
use Neos\ContentRepositoryRegistry\ContentRepositoryRegistry;
use Neos\Flow\Annotations as Flow;
use Neos\Neos\Domain\NodeLabel\NodeLabelGeneratorInterface;
use Neos\Neos\Domain\Service\NodeTypeNameFactory;
use Neos\Neos\Service\DataSource\AbstractDataSource;

/**
 * Answers with the number of nodes that reference the given resources, so deleting
 * one can warn about the references it would break.
 *
 *     /neos/service/data-source/sitegeist-resource-usage?node=<nodeAddress>&nodes=<id>,<id>
 *
 * The count is taken from the subgraph of the node that is being edited, so it
 * covers the current workspace and dimension - references from other dimensions or
 * other editors' workspaces are not visible from here and are therefore not
 * counted. The number is a lower bound, which is what a warning needs.
 */
class ResourceUsageDataSource extends AbstractDataSource
{
    /**
     * How many referencing documents are named in the answer before the rest is
     * summarised as "and n more" by the client.
     */
    private const MAXIMUM_NAMED_DOCUMENTS = 5;

    /**
     * @var string
     */
    protected static $identifier = 'sitegeist-resource-usage';

    #[Flow\Inject]
    protected ContentRepositoryRegistry $contentRepositoryRegistry;

    #[Flow\Inject]
    protected NodeLabelGeneratorInterface $nodeLabelGenerator;

    /**
     * @param array<string,mixed> $arguments
     * @return array<string,array{count:int,documents:array<int,string>}>
     */
    public function getData(?Node $node = null, array $arguments = []): array
    {
        if ($node === null) {
            throw new \RuntimeException(
                'The resource usage data source needs the node that is being edited.',
                1758540000
            );
        }

        $nodes = $arguments['nodes'] ?? '';
        if (!is_string($nodes)) {
            throw new \RuntimeException(
                'The resource usage data source needs a "nodes" argument.',
                1758540001
            );
        }

        $subgraph = $this->contentRepositoryRegistry->subgraphForNode($node);
        $usage = [];

        foreach (explode(',', $nodes) as $aggregateId) {
            $aggregateId = trim($aggregateId);
            if ($aggregateId === '') {
                continue;
            }

            $backReferences = $subgraph->findBackReferences(
                NodeAggregateId::fromString($aggregateId),
                FindBackReferencesFilter::create(),
            );

            $documents = [];
            foreach ($backReferences as $backReference) {
                // The editor cares about the page an editor would have to fix, not
                // about the content element that holds the reference.
                $document = $subgraph->findClosestNode(
                    $backReference->node->aggregateId,
                    FindClosestNodeFilter::create(nodeTypes: NodeTypeNameFactory::NAME_DOCUMENT),
                );
                $documents[] = $this->nodeLabelGenerator->getLabel($document ?? $backReference->node);
            }

            $documents = array_values(array_unique(array_filter($documents)));

            $usage[$aggregateId] = [
                'count' => $backReferences->count(),
                'documents' => array_slice($documents, 0, self::MAXIMUM_NAMED_DOCUMENTS),
            ];
        }

        return $usage;
    }
}
