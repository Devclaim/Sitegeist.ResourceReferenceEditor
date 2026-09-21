<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\DataSource;

use Neos\ContentRepository\Core\Projection\ContentGraph\Node;
use Neos\Flow\Annotations as Flow;
use Neos\Neos\Service\DataSource\AbstractDataSource;
use Sitegeist\ResourceReferenceEditor\Domain\ResourceCollectionService;

/**
 * Answers with the node address of a resource collection, creating the resource
 * root and the collection on first use.
 *
 * This is a data source rather than an own controller on purpose: data sources are
 * served by Neos' own service controller, so routing and backend authentication
 * apply without the package having to register routes, policies and request
 * patterns of its own.
 *
 *     /neos/service/data-source/sitegeist-resource-collections?node=<nodeAddress>&collection=authors
 *
 * Content repository and dimension are taken from the node the editor is working on;
 * the workspace is always live, where resources are managed.
 */
class ResourceCollectionDataSource extends AbstractDataSource
{
    /**
     * @var string
     */
    protected static $identifier = 'sitegeist-resource-collections';

    #[Flow\Inject]
    protected ResourceCollectionService $resourceCollectionService;

    /**
     * @param array<string,mixed> $arguments
     * @return array<string,string>
     */
    public function getData(?Node $node = null, array $arguments = []): array
    {
        if ($node === null) {
            throw new \RuntimeException(
                'The resource collection data source needs the node that is being edited.',
                1758450000
            );
        }

        $collection = $arguments['collection'] ?? null;
        if (!is_string($collection) || $collection === '') {
            throw new \RuntimeException(
                'The resource collection data source needs a "collection" argument.',
                1758450001
            );
        }

        $title = $arguments['title'] ?? null;

        // Only the content repository and the dimension come from the node being
        // edited - resources themselves live in the live workspace.
        $nodeAddress = $this->resourceCollectionService->findOrCreateCollectionAddress(
            $node->contentRepositoryId,
            $node->dimensionSpacePoint,
            $collection,
            is_string($title) ? $title : null,
        );

        return [
            'collection' => $collection,
            'contextPath' => $nodeAddress->toJson(),
        ];
    }
}
