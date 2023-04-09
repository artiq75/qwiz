<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Vich\UploaderBundle\Storage\StorageInterface;

class SecurityController extends AbstractController
{
    public function __construct(
        private StorageInterface $storage
    ) {
    }

    #[Route('/login', name: 'api_login')]
    public function index(Request $request): JsonResponse
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED');

        /**
         * @var \App\Entity\User
         */
        $user = $this->getUser();

        $server = $request->server;

        $baseUrl = $server->get('REQUEST_SCHEME') . '://' . $server->get('HTTP_HOST');

        $imageUri = $this->storage->resolveUri($user, 'imageFile');

        return $this->json([
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'isPremium' => $user->isIsPremium(),
            'image' => $baseUrl . $imageUri
        ]);
    }

    #[Route('/logout', name: 'app_logout', methods: ['POST'])]
    public function logout()
    {
        // controller can be blank: it will never be called!
        throw new \Exception('Don\'t forget to activate logout in security.yaml');
    }
}