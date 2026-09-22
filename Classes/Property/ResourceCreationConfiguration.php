<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\Property;

use PackageFactory\OPGM\Infrastructure\NodeTypeNameExtractor;
use Sitegeist\ResourceReferenceEditor\NodeTypes\Resource;

final readonly class ResourceCreationConfiguration
{
    /** @param class-string<object> $fqn */
    public function __construct(
        public string $fqn,
        /** Name of the collection below the resource root, for example "authors". */
        public string $collection,
        public ?string $buttonLabel = null,
    ) {
        // Refused here rather than at runtime: a collection only accepts resources,
        // so creating anything else would fail on the node type constraints with an
        // error that says nothing about the configuration that caused it.
        if (!in_array(Resource::class, class_implements($fqn) ?: [], true)) {
            throw new \InvalidArgumentException(sprintf(
                '%s cannot be used as a resource: it does not implement %s. Resources '
                . 'are not content elements - they live in the resource subtree and '
                . 'are never rendered on a page.',
                $fqn,
                Resource::class,
            ), 1758700000);
        }
    }

    /**
     * @return array{
     *     type:string,
     *     collection:string,
     *     buttonLabel?:string,
     *     requiredProperties?:array<int,array{name:string,type:string}>,
     *     unsupportedRequiredProperties?:array<int,string>
     * }
     */
    public function toConfigurationArray(): array
    {
        $reflectionClass = new \ReflectionClass($this->fqn);

        $configuration = [
            'type' => NodeTypeNameExtractor::requireFromReflectionClass($reflectionClass)->value,
            'collection' => $this->collection,
        ];

        if ($this->buttonLabel !== null) {
            $configuration['buttonLabel'] = $this->buttonLabel;
        }

        /**
         * The editor creates resources right away, so it has to send a value for every
         * property the entity cannot be constructed without. Nullability is not part of
         * the node type schema the UI receives, so it is resolved here by reflection.
         */
        $requiredProperties = [];
        $unsupportedRequiredProperties = [];

        foreach ($reflectionClass->getConstructor()?->getParameters() ?? [] as $parameter) {
            if ($parameter->isOptional() || $parameter->isDefaultValueAvailable()) {
                continue;
            }

            $type = $parameter->getType();
            if (!$type instanceof \ReflectionNamedType || $type->allowsNull()) {
                continue;
            }

            $placeholderType = match ($type->getName()) {
                'string' => 'string',
                'int' => 'integer',
                'float' => 'float',
                'bool' => 'boolean',
                'array' => 'array',
                default => null,
            };

            if ($placeholderType === null) {
                // A required value object or reference cannot be filled with an empty
                // placeholder - the editor reports this instead of creating a broken node.
                $unsupportedRequiredProperties[] = $parameter->getName();
                continue;
            }

            $requiredProperties[] = [
                'name' => $parameter->getName(),
                'type' => $placeholderType,
            ];
        }

        // Always emitted, even when empty: its absence tells the editor that it is
        // looking at a stale configuration and must not create anything.
        $configuration['requiredProperties'] = $requiredProperties;

        if ($unsupportedRequiredProperties !== []) {
            $configuration['unsupportedRequiredProperties'] = $unsupportedRequiredProperties;
        }

        return $configuration;
    }
}
