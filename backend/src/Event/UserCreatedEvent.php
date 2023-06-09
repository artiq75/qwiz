<?php

namespace App\Event;

use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Contracts\EventDispatcher\Event;

class UserCreatedEvent extends Event
{
  public const NAME = 'user.created';

  public function __construct(
    private readonly UserInterface $user
  ) {
  }

  /**
   * Get the user
   */
  public function getUser(): UserInterface
  {
    return $this->user;
  }
}