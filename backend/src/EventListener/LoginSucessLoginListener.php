<?php

namespace App\EventListener;

use App\Entity\Score;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\Security\Http\Event\LoginSuccessEvent;

#[AsEventListener(event: LoginSuccessEvent::class)]
class LoginSucessLoginListener
{
  public function __construct(
    private CategoryRepository $categoryRepository,
    private EntityManagerInterface $entityManager
  ) {
  }

  public function __invoke(LoginSuccessEvent $loginEvent)
  {
    /**
     * @var \App\Entity\User
     */
    $user = $loginEvent->getAuthenticatedToken()->getUser();

    
    if ($user->getScores()->isEmpty()) {
      $categories = $this->categoryRepository->findAll();

      foreach ($categories as $category) {
        $score = new Score();

        $score
          ->setGoodAnswer(0)
          ->setBadAnswer(0)
          ->setAttempt(0)
          ->setCategory($category)
          ->setUser($user);

        $this->entityManager->persist($score);
      }

      $this->entityManager->flush();
    }
  }
}