<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiUserUpdateController extends AbstractController
{
    public function __construct(
        private readonly ValidatorInterface $validator,
        private readonly JWTTokenManagerInterface $JWTManager,
        private readonly EntityManagerInterface $em
    ) {
    }

    public function __invoke(Request $request): JsonResponse
    {
        $image = $request->files->get('image');
        $email = $request->request->get('email');
        $username = $request->request->get('username');

        /**
         * @var User
         */
        $user = $this->getUser();

        if ($image) {
            $user->setImageFile($image);
        }

        if ($email) {
            $user->setEmail($email);
        }

        if ($username) {
            $user->setUsername($username);
        }

        // Validation des données
        $errors = $this->validator->validate($user);

        // Si il n'ya pas d'erreur on lève une exception
        if (count($errors) > 0) {
            throw new BadRequestHttpException();
        }
        
        // Si il n'ya pas d'erreur on persiste les données
        $this->em->persist($user);
        $this->em->flush();

        // On génére un nouveau token
        return $this->json([
            'token' => $this->JWTManager->create($user)
        ]);
    }
}