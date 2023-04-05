<?php

namespace App\Serializer\Normalizer;

use App\Entity\User;
use Symfony\Component\Serializer\Normalizer\ContextAwareNormalizerInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareInterface;
use Symfony\Component\Serializer\Normalizer\NormalizerAwareTrait;
use Vich\UploaderBundle\Storage\StorageInterface;

class UserNormalizer implements ContextAwareNormalizerInterface, NormalizerAwareInterface
{
    use NormalizerAwareTrait;

    private const ALREADY_CALLED = 'MEDIA_OBJECT_NORMALIZER_ALREADY_CALLED';

    public function __construct(private StorageInterface $storage)
    {
    }

    public function normalize($object, string $format = null, array $context = []): array
    {
        $context[self::ALREADY_CALLED] = true;
        
        $object->setImage($this->storage->resolveUri($object, 'imageFile'));

        
        return $this->normalizer->normalize($object, $format, $context);
    }
    
    public function supportsNormalization($data, string $format = null, array $context = []): bool
    {
        dd($data);
        if (isset($context[self::ALREADY_CALLED])) {
            return false;
        }

        return $data instanceof User;
    }
}
