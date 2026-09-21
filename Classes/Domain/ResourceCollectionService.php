<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\Domain;

use Neos\ContentRepository\Core\ContentRepository;
use Neos\ContentRepository\Core\DimensionSpace\DimensionSpacePoint;
use Neos\ContentRepository\Core\DimensionSpace\OriginDimensionSpacePoint;
use Neos\ContentRepository\Core\Feature\NodeCreation\Command\CreateNodeAggregateWithNode;
use Neos\ContentRepository\Core\Feature\NodeModification\Dto\PropertyValuesToWrite;
use Neos\ContentRepository\Core\Feature\RootNodeCreation\Command\CreateRootNodeAggregateWithNode;
use Neos\ContentRepository\Core\Feature\WorkspaceRebase\Command\RebaseWorkspace;
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
use Psr\Log\LoggerInterface;

/**
 * Resolves the collections resources are stored in.
 *
 * Resources do not live below a site. They live in an own root subtree, the way
 * Sitegeist.Taxonomy keeps vocabularies out of the site tree:
 *
 *     /<Sitegeist.ResourceReferenceEditor:Root>/<collection>/<resource>
 *
 * Root and collections are created on demand, always in the live workspace and in
 * the root generalization of the dimension space, so a collection created in the
 * most general dimension shines through into all specializations.
 */
#[Flow\Scope('singleton')]
class ResourceCollectionService
{
    /**
     * @var array{rootNodeType:string,collectionNodeType:string}
     */
    #[Flow\InjectConfiguration(package: 'Sitegeist.ResourceReferenceEditor', path: 'contentRepository')]
    protected array $configuration;

    #[Flow\Inject]
    protected ?LoggerInterface $logger = null;

    public function __construct(
        private readonly ContentRepositoryRegistry $contentRepositoryRegistry,
    ) {
    }

    /**
     * The node address of the collection with the given name, as seen from the
     * given workspace and dimension. Creates root and collection if they are missing.
     */
    public function findOrCreateCollectionAddress(
        ContentRepositoryId $contentRepositoryId,
        WorkspaceName $workspaceName,
        DimensionSpacePoint $dimensionSpacePoint,
        string $collectionName,
        ?string $collectionTitle = null,
    ): NodeAddress {
        $contentRepository = $this->contentRepositoryRegistry->get($contentRepositoryId);
        $rootNodeAggregateId = $this->findOrCreateRootNodeAggregateId($contentRepository);
        $nodeName = NodeName::fromString($collectionName);

        $collection = $this->findCollection($contentRepository, $rootNodeAggregateId, $nodeName);
        $created = false;

        if ($collection !== null) {
            $collectionNodeAggregateId = $collection->aggregateId;
        } else {
            $created = true;
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

        // Root and collections are created in live. A workspace that was forked
        // before does not see them until it is rebased, and the editor would be
        // handed an address that resolves to nothing.
        if ($created && !$workspaceName->isLive()) {
            $this->makeVisibleInWorkspace($contentRepository, $workspaceName);
        }

        // Hand back an address that actually resolves - otherwise the editor runs
        // into an empty FlowQuery context and an error that says nothing.
        $visibleCollection = $contentRepository
            ->getContentSubgraph($workspaceName, $dimensionSpacePoint)
            ->findNodeById($collectionNodeAggregateId);

        if ($visibleCollection === null) {
            throw new \RuntimeException(sprintf(
                'The resource collection "%s" exists in the live workspace, but workspace "%s" '
                . 'does not see it yet. Publish or discard the changes in that workspace, or rebase it.',
                $collectionName,
                $workspaceName->value,
            ), 1758460000);
        }

        return NodeAddress::create(
            $contentRepositoryId,
            $workspaceName,
            $dimensionSpacePoint,
            $collectionNodeAggregateId,
        );
    }

    /**
     * Rebases the workspace so it sees what was just created in live. Rebasing fails
     * when the workspace holds changes that cannot be replayed - in that case the
     * collection shows up after the next publish or discard, which is better than
     * losing the editor's work here.
     */
    private function makeVisibleInWorkspace(
        ContentRepository $contentRepository,
        WorkspaceName $workspaceName,
    ): void {
        try {
            $contentRepository->handle(RebaseWorkspace::create($workspaceName));
        } catch (\Throwable $exception) {
            $this->logger?->warning(sprintf(
                'Could not rebase workspace "%s" after creating a resource collection: %s',
                $workspaceName->value,
                $exception->getMessage()
            ));
        }
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
