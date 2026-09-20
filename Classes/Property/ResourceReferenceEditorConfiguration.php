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
        $this->startingPoint = $startingPoint !== null
            ? AbsoluteNodePath::fromString($startingPoint)
            : null;
    }

    /** @return array<string,mixed> */
    public function getEditorConfiguration(?\ReflectionNamedType $propertyType): array
    {
        return [
            'editor' => 'Sitegeist.ResourceReferenceEditor/Inspector/Editors/ResourceReferenceEditor',
            'editorOptions' => array_filter([
                'nodeTypes' => $this->nodeTypes?->toStringArray(),
                'placeholder' => $this->placeholder,
                'startingPoint' => $this->startingPoint?->serializeToString(),
                'threshold' => $this->threshold,
                'disabled' => $this->disabled,
                'resourceCreation' => $this->create->toConfigurationArray(),
            ], static fn (mixed $value): bool => $value !== null),
        ];
    }
}
