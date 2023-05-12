<?php

namespace App\Controller\Api;

use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiUserTokenRegenerateController extends AbstractController
{
    public function __construct(
        private readonly JWTTokenManagerInterface $JWTManager
    ) {
    }

    public function __invoke(): JsonResponse
    {
        return $this->json([
            'token' => $this->JWTManager->create($this->getUser())
        ]);
    }
}