<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\Domain;

use Neos\ContentRepository\Core\ContentRepository;
use Neos\ContentRepository\Core\DimensionSpace\DimensionSpacePoint;
use Neos\ContentRepository\Core\DimensionSpace\OriginDimensionSpacePoint;
use Neos\ContentRepository\Core\Feature\NodeCreation\Command\CreateNodeAggregateWithNode;
use Neos\ContentRepository\Core\Feature\NodeModification\Dto\PropertyValuesToWrite;
use Neos\ContentRepository\Core\Feature\RootNodeCreation\Command\CreateRootNodeAggregateWithNode;
use Neos\ContentRepository\Core\NodeType\NodeTypeName;
use Neos\ContentRepository\Core\Projection\ContentGraph\Filter\FindSubtreeFilter;
use Neos\ContentRepository\Core\Projection\ContentGraph\Node;
use Neos\ContentRepository\Core\SharedModel\ContentRepository\ContentRepositoryId;
use Neos\ContentRepository\Core\SharedModel\Node\NodeAggregateId;
use Neos\ContentRepository\Core\SharedModel\Node\NodeAddress;
use Neos\ContentRepository\Core\SharedModel\Node\NodeName;
use Neos\ContentRepository\Core\SharedModel\Workspace\WorkspaceName;
use Neos\ContentRepositoryRegistry\ContentRepositoryRegistry;
use Neos\Flow\Annotations as Flow;

/**
 * Resolves the collections resources are stored in.
 *
 * Resources do not live below a site. They live in an own root subtree, the way
 * Sitegeist.Taxonomy keeps vocabularies out of the site tree:
 *
 *     /<Sitegeist.ResourceReferenceEditor:Root>/<collection>/<resource>
 *
 * Root, collections and the resources in them live in the live workspace, the way
 * Sitegeist.Taxonomy manages its vocabularies: resources are shared vocabulary, not
 * draft content of one document. A resource kept in an editor's workspace could not
 * be published together with the document that references it - the document's
 * publication would carry a reference to a node that does not exist in live yet.
 *
 * Collections are created in the root generalization of the dimension space, so a
 * collection shines through into all specializations instead of existing per
 * language.
 */
#[Flow\Scope('singleton')]
class ResourceCollectionService
{
    /**
     * @var array{rootNodeType:string,collectionNodeType:string}
     */
    #[Flow\InjectConfiguration(package: 'Sitegeist.ResourceReferenceEditor', path: 'contentRepository')]
    protected array $configuration;

    public function __construct(
        private readonly ContentRepositoryRegistry $contentRepositoryRegistry,
    ) {
    }

    /**
     * The node address of the collection with the given name in the given dimension.
     * Creates root and collection if they are missing.
     */
    public function findOrCreateCollectionAddress(
        ContentRepositoryId $contentRepositoryId,
        DimensionSpacePoint $dimensionSpacePoint,
        string $collectionName,
        ?string $collectionTitle = null,
    ): NodeAddress {
        $contentRepository = $this->contentRepositoryRegistry->get($contentRepositoryId);
        $rootNodeAggregateId = $this->findOrCreateRootNodeAggregateId($contentRepository);
        $nodeName = NodeName::fromString($collectionName);

        $collection = $this->findCollection($contentRepository, $rootNodeAggregateId, $nodeName);

        if ($collection !== null) {
            $collectionNodeAggregateId = $collection->aggregateId;
        } else {
            $collectionNodeAggregateId = NodeAggregateId::create();
            $contentRepository->handle(
                CreateNodeAggregateWithNode::create(
                    WorkspaceName::forLive(),
                    $collectionNodeAggregateId,
                    NodeTypeName::fromString($this->configuration['collectionNodeType']),
                    OriginDimensionSpacePoint::fromDimensionSpacePoint(
                        $this->rootGeneralization($contentRepository)
                    ),
                    $rootNodeAggregateId,
                )
                    ->withNodeName($nodeName)
                    ->withInitialPropertyValues(
                        PropertyValuesToWrite::fromArray([
                            'title' => $collectionTitle ?? $collectionName,
                        ])
                    )
            );
        }

        // Hand back an address that actually resolves - otherwise the editor runs
        // into an empty FlowQuery context and an error that says nothing.
        $visibleCollection = $contentRepository
            ->getContentSubgraph(WorkspaceName::forLive(), $dimensionSpacePoint)
            ->findNodeById($collectionNodeAggregateId);

        if ($visibleCollection === null) {
            throw new \RuntimeException(sprintf(
                'The resource collection "%s" was created, but is not visible in dimension %s.',
                $collectionName,
                json_encode($dimensionSpacePoint->coordinates),
            ), 1758460000);
        }

        return NodeAddress::create(
            $contentRepositoryId,
            WorkspaceName::forLive(),
            $dimensionSpacePoint,
            $collectionNodeAggregateId,
        );
    }

    private function findCollection(
        ContentRepository $contentRepository,
        NodeAggregateId $rootNodeAggregateId,
        NodeName $nodeName,
    ): ?Node {
        return $contentRepository
            ->getContentSubgraph(WorkspaceName::forLive(), $this->rootGeneralization($contentRepository))
            ->findNodeByPath($nodeName, $rootNodeAggregateId);
    }

    private function findOrCreateRootNodeAggregateId(ContentRepository $contentRepository): NodeAggregateId
    {
        $rootNodeTypeName = NodeTypeName::fromString($this->configuration['rootNodeType']);
        $rootNodeAggregate = $contentRepository
            ->getContentGraph(WorkspaceName::forLive())
            ->findRootNodeAggregateByType($rootNodeTypeName);

        if ($rootNodeAggregate !== null) {
            return $rootNodeAggregate->nodeAggregateId;
        }

        $rootNodeAggregateId = NodeAggregateId::create();
        $contentRepository->handle(
            CreateRootNodeAggregateWithNode::create(
                WorkspaceName::forLive(),
                $rootNodeAggregateId,
                $rootNodeTypeName,
            )
        );

        return $rootNodeAggregateId;
    }

    /**
     * Collections are created in the most general dimension, so they shine through
     * into every specialization instead of existing once per language.
     */
    private function rootGeneralization(ContentRepository $contentRepository): DimensionSpacePoint
    {
        $rootGeneralizations = $contentRepository->getVariationGraph()->getRootGeneralizations();

        foreach ($rootGeneralizations as $dimensionSpacePoint) {
            return $dimensionSpacePoint;
        }

        return DimensionSpacePoint::createWithoutDimensions();
    }
}
