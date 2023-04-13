<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Exception\BadRequestException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiUserUpdatePasswordController extends AbstractController
{
  public function __construct(
    private UserPasswordHasherInterface $hasher,
    private ValidatorInterface $validator
  ) {
  }

  public function __invoke(Request $request): User
  {
    $this->denyAccessUnlessGranted('IS_AUTHENTICATED');

    $data = $request->toArray();

    $password = $data['password'];
    $currentPassword = $data['currentPassword'];

    /**
     * @var User
     */
    $user = $this->getUser();

    // Si mot de passe actuelle n'est pas correcte
    if (!$this->hasher->isPasswordValid($user, $currentPassword)) {
      throw new AccessDeniedHttpException();
    }

    // Modification du mot de passe en cas de succès
    $user->setPassword(
      $this->hasher->hashPassword(
        $user,
        $password
      )
    );

    // Validation des données
    $errors = $this->validator->validate($user);

    // Si il y a des erreurs on lève une exception
    if (count($errors) > 0) {
      throw new BadRequestException();
    }

    return $user;
  }
}