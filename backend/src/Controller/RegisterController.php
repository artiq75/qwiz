<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class RegisterController extends AbstractController
{
    public function __construct(
        private UserPasswordHasherInterface $hasher,
        private EntityManagerInterface $em,
        private ValidatorInterface $validator,
        private Security $security
    ) {
    }

    #[Route('/register', name: 'api_register', methods: ['POST'])]
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
            return new JsonResponse([
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

        $this->security->login($user, 'json_login', 'main');

        /**
         * @var User
         */
        $user = $this->getUser();

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'isPremium' => $user->isIsPremium(),
        ]);
    }
}