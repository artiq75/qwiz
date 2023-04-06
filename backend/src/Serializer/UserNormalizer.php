<?php

namespace App\Serializer;

use App\Entity\User;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Vich\UploaderBundle\Storage\StorageInterface;

class UserNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
  use NormalizerAwareTrait;

  private const ALREADY_CALLED = 'USER_NORMALIZER_ALREADY_CALLED';

  public function __construct(
    private StorageInterface $storage,
    private KernelInterface $kernel
  ) {
  }

  /**
   * @var User $object
   */
  public function normalize($object, ?string $format = null, array $context = []): array|string|int|float|bool|\ArrayObject|null
  {
    $context[self::ALREADY_CALLED] = true;

    // Récupération du context du router
    $routerContext = $this->kernel->getContainer()->get('router')->getContext();

    // Construction de la base url
    $baseUrl = $routerContext->getScheme() . '://' . $routerContext->getHost();

    // Résolution l'uri de l'image
    $imageUri = $this->storage->resolveUri($object, 'imageFile');

    // Définition du chemin de l'image
    $object->setImage($baseUrl . $imageUri);

    // Suppreisson de la propriété 'imageFile'
    // pour éviter de la sérializer
    unset($object->imageFile);

    return $this->normalizer->normalize($object, $format, $context);
  }

  public function supportsNormalization($data, ?string $format = null, array $context = []): bool
  {
    if (isset($context[self::ALREADY_CALLED])) {
      return false;
    }

    return $data instanceof User;
  }
}