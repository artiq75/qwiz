<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Http\Event\LogoutEvent;

#[AsEventListener(event: LogoutEvent::class)]
class LogoutEventListener
{
  public function __construct(
    private UrlGeneratorInterface $urlGenerator
  ) {
  }

  public function __invoke(LogoutEvent $event): void
  {
    $response = $event->getResponse();

    $response = new Response(
      null,
      Response::HTTP_NO_CONTENT
    );

    $event->setResponse($response);
  }
}