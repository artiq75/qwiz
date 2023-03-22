<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ApiLoginController extends AbstractController
{
    // #[Route('/api/login', name: 'api_login')]
    public function index(): JsonResponse
    {
        return new JsonResponse();
    }
}
