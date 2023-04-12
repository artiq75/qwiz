<?php

namespace App\Controller;

use App\Service\ImageURLGenerator;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Storage\StorageInterface;

class SecurityController extends AbstractController
{
    public function __construct(
        private StorageInterface $storage,
        private ImageURLGenerator $imageURLGenerator
    ) {
    }

    #[Route('/login', name: 'api_login')]
    public function index(Request $request): JsonResponse
    {
        $user = $this->getUser();

        if (null === $user) {
            return $this->json([
                'message' => "Les informations d'identification manquantes",
            ], JsonResponse::HTTP_UNAUTHORIZED);
        }

        /**
         * @var \App\Entity\User
         */
        $user = $this->getUser();

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'isPremium' => $user->isIsPremium(),
            'image' => $this->imageURLGenerator->generate($user, 'imageFile')
        ]);
    }

    #[Route('/logout', name: 'app_logout', methods: ['POST'])]
    public function logout()
    {
        // controller can be blank: it will never be called!
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }
}