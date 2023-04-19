<?php

namespace App\EventListener;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: Events::JWT_CREATED)]
class JWTCreatedListener
{
  public function __invoke(JWTCreatedEvent $event)
  {
    /**
     * @var \App\Entity\User $user
     */
    $user = $event->getUser();

    $payload = $event->getData();

    $payload['email'] = $user->getEmail();
    $payload['isPremium'] = $user->isIsPremium();

    $event->setData($payload);
  }
}