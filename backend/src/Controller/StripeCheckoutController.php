<?php

namespace App\Controller;

use Stripe\Checkout\Session;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeCheckoutController extends AbstractController
{
    public function __construct()
    {
        Stripe::setApiKey($_ENV['STRIPE_SK_KEY']);
    }

    #[Route('/checkout', name: 'checkout')]
    public function index(Request $request): Response
    {
        // Si l'utilisateur n'est pas connecter
        // il est rediréger
        if (!$this->isGranted('ROLE_USER')) {
            return $this->redirect('http://localhost:5173');
        }

        /**
         * @var \App\Entity\User
         */
        $user = $this->getUser();

        // Création du session checkout
        $checkoutSession = Session::create([
            'line_items' => [
                [
                    'price' => 'price_1MuXq4C22cMRK3R3xUOdFQyk',
                    'quantity' => 1,
                ]
            ],
            'customer_email' => $user->getEmail(),
            'mode' => 'payment',
            'success_url' => 'http://localhost:5173?success=true',
            'cancel_url' => 'http://localhost:5173?canceled=true',
        ]);

        // On redirige vers la page paiment de stripe
        return $this->redirect($checkoutSession->url);
    }
}