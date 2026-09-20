<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\Property;

use PackageFactory\OPGM\Infrastructure\NodeTypeNameExtractor;

final readonly class ResourceCreationConfiguration
{
    /** @param class-string<object> $fqn */
    public function __construct(
        public string $fqn,
        public string $path,
        public ?string $buttonLabel = null,
    ) {
    }

    /** @return array{type:string,path:string,buttonLabel?:string} */
    public function toConfigurationArray(): array
    {
        $configuration = [
            'type' => NodeTypeNameExtractor::requireFromReflectionClass(
                new \ReflectionClass($this->fqn),
            )->value,
            'path' => $this->path,
        ];

        if ($this->buttonLabel !== null) {
            $configuration['buttonLabel'] = $this->buttonLabel;
        }

        return $configuration;
    }
}
