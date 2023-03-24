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
    $payload = $event->getData();
    
    $payload['username'] = $event->getUser()->getUsername();

    $event->setData($payload);
  }
}