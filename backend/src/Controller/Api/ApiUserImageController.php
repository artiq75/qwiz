<?php

namespace App\Controller\Api;

use App\Entity\User;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ApiUserImageController extends AbstractController
{
    public function __invoke(Request $request): User
    {
        $image = $request->files->get('image');

        if (!$image) {
            throw new BadRequestHttpException('"image" is required');
        }

        /**
         * @var User
         */
        $user = $this->getUser();

        $user->setImageFile($image);

        return $user;
    }
}