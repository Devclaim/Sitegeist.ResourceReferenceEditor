<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\Property;

use Neos\ContentRepository\Core\NodeType\NodeTypeName;
use Neos\ContentRepository\Core\NodeType\NodeTypeNames;
use Neos\ContentRepository\Core\Projection\ContentGraph\AbsoluteNodePath;
use PackageFactory\OPGM\Infrastructure\NodeTypeNameExtractor;
use PackageFactory\OPGM\NeosAdapter\PropertyDeclaration\Editor\AbstractEditorConfiguration;

#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_PARAMETER)]
final readonly class ResourceReferenceEditorConfiguration extends AbstractEditorConfiguration
{
    /**
     * Mirrors Sitegeist.ResourceReferenceEditor.contentRepository.rootNodeType. Pass
     * an explicit $startingPoint when that setting points at a derived node type.
     */
    private const DEFAULT_ROOT_NODE_TYPE = 'Sitegeist.ResourceReferenceEditor:Root';

    /**
     * Every resource is of this type, so it is what the reference search is limited
     * to when no node types are given.
     */
    private const RESOURCE_NODE_TYPE = 'Sitegeist.ResourceReferenceEditor:Resource';

    private ?NodeTypeNames $nodeTypes;
    private ?AbsoluteNodePath $startingPoint;

    /** @param array<int,class-string<object>>|null $fqns */
    public function __construct(
        ?array $fqns,
        public ResourceCreationConfiguration $create,
        public ?string $placeholder = null,
        ?string $startingPoint = null,
        public ?int $threshold = null,
        public ?bool $disabled = null,
    ) {
        $this->nodeTypes = is_array($fqns)
            ? NodeTypeNames::fromArray(array_map(
                static fn (string $fqn): NodeTypeName => NodeTypeNameExtractor::requireFromReflectionClass(
                    new \ReflectionClass($fqn),
                ),
                $fqns,
            ))
            : null;
        // Resources live outside the site, so searching from the site node would
        // never find them: the reference search starts in the collection instead.
        $this->startingPoint = AbsoluteNodePath::fromString(
            $startingPoint ?? sprintf('/<%s>/%s', self::DEFAULT_ROOT_NODE_TYPE, $create->collection)
        );
    }

    /**
     * A property typed as a collection of resources is edited with the multi value
     * reference editor - the same distinction Neos makes between its Reference and
     * References editors.
     */
    private static function isMultiple(?\ReflectionNamedType $propertyType): bool
    {
        if ($propertyType === null) {
            return false;
        }

        $type = $propertyType->getName();

        return $type === 'array'
            || (class_exists($type) && NodeTypeNameExtractor::tryFromCollectionType($type) !== null);
    }

    /** @return array<string,mixed> */
    public function getEditorConfiguration(?\ReflectionNamedType $propertyType): array
    {
        return [
            'editor' => 'Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor',
            'editorOptions' => array_filter([
                'nodeTypes' => $this->nodeTypes?->toStringArray() ?? [self::RESOURCE_NODE_TYPE],
                'placeholder' => $this->placeholder,
                'startingPoint' => $this->startingPoint?->serializeToString(),
                'threshold' => $this->threshold,
                'disabled' => $this->disabled,
                'multiple' => self::isMultiple($propertyType) ?: null,
                'resourceCreation' => $this->create->toConfigurationArray(),
            ], static fn (mixed $value): bool => $value !== null),
        ];
    }
}
