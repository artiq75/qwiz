<?php

namespace App\Controller;

use App\Entity\Question;
use App\Repository\QuestionRepository;
use Doctrine\DBAL\Connection;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class RandomQuestionController extends AbstractController
{
  public function __construct(
    private QuestionRepository $questionRepository,
    private Connection $connection
  ) {
  }

  public function __invoke(): ?Question
  {
    return $this->questionRepository->findRandom();
  }
}