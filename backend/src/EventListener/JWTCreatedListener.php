<?php

namespace App\EventListener;

use App\Service\ImageURLGenerator;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: Events::JWT_CREATED)]
class JWTCreatedListener
{
  public function __construct(
    private readonly ImageURLGenerator $imageURLGenerator
  ) {
  }

  public function __invoke(JWTCreatedEvent $event)
  {
    /**
     * @var \App\Entity\User $user
     */
    $user = $event->getUser();

    $payload = $event->getData();

    $payload['id'] = $user->getId();
    $payload['email'] = $user->getEmail();
    $payload['image'] = $this->imageURLGenerator->generate($user, 'imageFile');
    $payload['isPremium'] = $user->isIsPremium();

    $event->setData($payload);
  }
}