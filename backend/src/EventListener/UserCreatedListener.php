<?php

namespace App\EventListener;

use App\Entity\Score;
use App\Event\UserCreatedEvent;
use App\Repository\CategoryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;

#[AsEventListener(event: UserCreatedEvent::class)]
class UserCreatedListener
{
  public function __construct(
    private CategoryRepository $categoryRepository,
    private EntityManagerInterface $entityManager
  ) {
  }

  public function __invoke(UserCreatedEvent $event)
  {
    /**
     * @var \App\Entity\User
     */
    $user = $event->getUser();

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