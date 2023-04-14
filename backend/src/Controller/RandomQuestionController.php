<?php

namespace App\Controller;

use App\Entity\Question;
use App\Repository\QuestionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;

class RandomQuestionController extends AbstractController
{
  public function __construct(
    private readonly QuestionRepository $questionRepository
  ) {
  }

  public function __invoke(Request $request): ?Question
  {
    $category = (int) $request->query->get('category');

    return $this->questionRepository->findRandom($category);
  }
}