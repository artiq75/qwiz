<?php

namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ApiUserUpdatePasswordController extends AbstractController
{
  public function __construct(
    private readonly UserPasswordHasherInterface $hasher,
    private readonly ValidatorInterface $validator,
    private readonly JWTTokenManagerInterface $JWTManager,
    private readonly EntityManagerInterface $em
  ) {
  }

  public function __invoke(Request $request): JsonResponse
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