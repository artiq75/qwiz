<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiRegisterController extends AbstractController
{
    public function __construct(
        private UserPasswordHasherInterface $hasher,
        private EntityManagerInterface $em,
        private JWTTokenManagerInterface $JWTManager,
        private ValidatorInterface $validator
    ) {
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function __handle(Request $request): JsonResponse
    {
        if ($request->headers->get('Content-Type') !== 'application/json') {
            return new JsonResponse([
                'code' => JsonResponse::HTTP_NOT_ACCEPTABLE,
                'message' => JsonResponse::$statusTexts[JsonResponse::HTTP_NOT_ACCEPTABLE]
            ], JsonResponse::HTTP_NOT_ACCEPTABLE);
        }

        $data = $request->toArray();

        $user = new User();
        $user
            ->setUsername($data['username'] ?? '')
            ->setEmail($data['email'] ?? '')
            ->setPassword($data['password'] ?? '');

        $errors = $this->validator->validate($user);

        if (count($errors) > 0) {
            return new JsonResponse([
                'code' => JsonResponse::HTTP_UNAUTHORIZED,
                'message' => JsonResponse::$statusTexts[JsonResponse::HTTP_UNAUTHORIZED]
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $user->setPassword(
            $this->hasher->hashPassword(
                $user,
                $user->getPassword()
            )
        );

        $this->em->persist($user);
        $this->em->flush();

        return new JsonResponse([
            "token" => $this->JWTManager->create($user)
        ]);
    }
}