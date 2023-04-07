<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiUserUpdateController extends AbstractController
{
    public function __construct(
        private ValidatorInterface $validator,
        private Security $security
    ) {
    }

    public function __invoke(Request $request): User
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED');

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

        // Si il n'ya pas d'erreur on persiste les données
        if (!count($errors)) {
            return $user;
        }

        $jsonErrors = [];

        // Construction du tableau d'erreurs pour l'envoie
        foreach ($errors as $error) {
            $jsonErrors[$error->getPropertyPath()] = $error->getMessage();
        }

        throw new BadRequestHttpException(json_encode($jsonErrors));
    }
}