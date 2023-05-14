<?php

namespace App\Controller\Api;

use App\Entity\User;
use App\Event\UserCreatedEvent;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiRegisterController extends AbstractController
{
    public function __construct(
        private readonly UserPasswordHasherInterface $hasher,
        private readonly EntityManagerInterface $em,
        private readonly ValidatorInterface $validator,
        private readonly JWTTokenManagerInterface $JWTManager,
        private readonly EventDispatcherInterface $dispatcher
    ) {
    }

    #[Route('/api/register', name: 'api_register', methods: ['POST'])]
    public function __invoke(Request $request): JsonResponse
    {
        $data = $request->toArray();

        $user = new User();
        $user
            ->setUsername($data['username'] ?? '')
            ->setEmail($data['email'] ?? '')
            ->setPassword($data['password'] ?? '');

        $errors = $this->validator->validate($user);

        if (count($errors) > 0) {
            return $this->json([
                'message' => 'Les données sont invalide!'
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

        $this->dispatcher->dispatch(new UserCreatedEvent($user), UserCreatedEvent::class);

        return $this->json([
            'token' => $this->JWTManager->create($user)
        ]);
    }
}