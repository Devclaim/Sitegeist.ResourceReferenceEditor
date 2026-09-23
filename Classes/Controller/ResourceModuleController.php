<?php

declare(strict_types=1);

namespace Sitegeist\ResourceReferenceEditor\Controller;

use Neos\Neos\Controller\Module\AbstractModuleController;

/**
 * The module's entry in the Neos module configuration. Its address,
 * /neos/management/resources, is served by the package's own route - the Neos UI,
 * with the resource manager on it - which comes before Neos' generic module route
 * and takes every GET request. So this is only reached by another kind of request,
 * and sends it to the same address as a GET.
 */
class ResourceModuleController extends AbstractModuleController
{
    public function indexAction(): void
    {
        $uri = $this->request->getMainRequest()->getHttpRequest()->getUri()->withQuery('');

        $this->redirectToUri((string)$uri);
    }
}
