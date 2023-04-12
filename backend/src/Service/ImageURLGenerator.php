<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\RequestStack;
use Vich\UploaderBundle\Storage\StorageInterface;

class ImageURLGenerator
{
  public function __construct(
    private StorageInterface $storage,
    private RequestStack $requestStack
  ) {
  }

  /**
   * Generate a absolute url of image for entity image field
   */
  public function generate(object $entity, string $imageField): string
  {
    // Récuperation de l'url de base
    $baseUrl = $this->requestStack->getCurrentRequest()->getSchemeAndHttpHost();

    // Récupération du chemin de l'image
    $imageUri = $this->storage->resolveUri($entity, $imageField);

    // Génération de l'url
    return $baseUrl . $imageUri;
  }
}