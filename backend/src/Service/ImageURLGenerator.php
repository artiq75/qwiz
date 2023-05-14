<?php

namespace App\Service;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\RequestStack;
use Vich\UploaderBundle\Storage\StorageInterface;

class ImageURLGenerator
{
  public function __construct(
    private readonly StorageInterface $storage,
    private readonly RequestStack $requestStack,
    private readonly Security $security
  ) {
  }

  /**
   * Generate a absolute url of image for entity image field
   */
  public function generate(object $entity, string $imageField): string
  {
    /**
     * @var \App\Entity\User
     */
    $user = $this->security->getUser();
    
    if (!$user->getImageFile())
      return '';

    // Récuperation de l'url de base
    $baseUrl = $this->requestStack->getCurrentRequest()->getSchemeAndHttpHost();

    // Récupération du chemin de l'image
    $imageUri = $this->storage->resolveUri($entity, $imageField);

    // Génération de l'url
    return $baseUrl . $imageUri;
  }
}