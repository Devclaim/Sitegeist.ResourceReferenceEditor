<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\Security;

use Neos\ContentRepository\Core\Feature\SubtreeTagging\Dto\SubtreeTag;
use Neos\ContentRepository\Core\Projection\ContentGraph\Node;
use Neos\ContentRepository\Core\SharedModel\Workspace\WorkspaceName;
use Neos\Flow\Annotations as Flow;
use Neos\Flow\Security\Context as SecurityContext;
use Neos\Neos\Domain\Service\UserService;
use Neos\Neos\Security\Authorization\ContentRepositoryAuthorizationService;

/**
 * Who may manage resources - create, edit, reorder, hide and delete them.
 *
 * Every resource collection carries the subtree tag below, and resources inherit it
 * from their collection. The privilege target `Sitegeist.ResourceReferenceEditor:
 * ManageResources` is an EditNodePrivilege on that tag, so the content repository
 * itself refuses every change to a resource by a user without it - whichever way the
 * change is sent. What this class answers is only for the editor, so it can offer
 * the actions a user is actually allowed to take, instead of letting them fail.
 *
 * Picking and referencing resources is not affected: the reference is written to the
 * document, which does not carry the tag.
 */
#[Flow\Scope('singleton')]
final class ResourcePermissions
{
    /** The tag the policy's EditNodePrivilege matches - see Policy.yaml. */
    public const SUBTREE_TAG = 'sitegeist-resources';

    /** @var array<string,bool> whether live is writable, per content repository */
    private array $liveIsWritable = [];

    public function __construct(
        private readonly ContentRepositoryAuthorizationService $authorizationService,
        private readonly SecurityContext $securityContext,
        private readonly UserService $userService,
    ) {
    }

    public static function subtreeTag(): SubtreeTag
    {
        return SubtreeTag::fromString(self::SUBTREE_TAG);
    }

    /**
     * Whether the current user may change the node - and, for a collection, create
     * resources in it. Resources are managed in live, so that takes both: writing to
     * live, and the edit privilege for the node's tags.
     */
    public function canManage(Node $node): bool
    {
        $roles = $this->securityContext->getRoles();
        $contentRepositoryId = $node->contentRepositoryId->value;

        $this->liveIsWritable[$contentRepositoryId] ??= $this->authorizationService->getWorkspacePermissions(
            $node->contentRepositoryId,
            WorkspaceName::forLive(),
            $roles,
            $this->userService->getCurrentUser()?->getId(),
        )->write;

        return $this->liveIsWritable[$contentRepositoryId]
            && $this->authorizationService->getNodePermissions($node, $roles)->edit;
    }
}
