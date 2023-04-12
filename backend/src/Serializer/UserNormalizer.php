<?php

namespace App\Serializer;

use App\Entity\User;
use App\Service\ImageURLGenerator;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;

class UserNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
  use NormalizerAwareTrait;

  private const ALREADY_CALLED = 'USER_NORMALIZER_ALREADY_CALLED';

  public function __construct(
    private ImageURLGenerator $imageURLGenerator
  ) {
  }

  /**
   * @var User $object
   */
  public function normalize($object, ?string $format = null, array $context = []): array|string|int|float|bool|\ArrayObject|null
  {
    $context[self::ALREADY_CALLED] = true;

    // Géneration de l'url de l'image
    $object->setImage($this->imageURLGenerator->generate($object, 'imageFile'));

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