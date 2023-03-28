<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Security\Http\Event\LoginSuccessEvent;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\RememberMeBadge;

// #[AsEventListener(event: LoginSuccessEvent::class, method: 'onSymfonyComponentSecurityHttpEventLoginSuccessEvent')]
class LoginSucessLoginListener
{
  public function onSymfonyComponentSecurityHttpEventLoginSuccessEvent(LoginSuccessEvent $loginEvent)
  {
    $passport = $loginEvent->getPassport();
    $passport->addBadge(new RememberMeBadge());
    
    // Add _remember_me from JSON body to attributes
    $request = $loginEvent->getRequest();
    $data = json_decode($request->getContent());
    $request->attributes->set('_remember_me', $data->_remember_me ?? '');
    dd($request->attributes);
  }
}