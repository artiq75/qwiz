<?php

namespace App\Controller\Api;

use Stripe\Checkout\Session;
use Stripe\Stripe;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiStripeCheckoutController extends AbstractController
{
    public function __construct()
    {
        Stripe::setApiKey($_ENV['STRIPE_SK_KEY']);
        Stripe::setApiVersion('2022-11-15');
    }

    #[Route('/api/checkout', name: 'checkout', methods: ['POST'])]
    public function index(Request $request): Response
    {
        /**
         * @var \App\Entity\User
         */
        $user = $this->getUser();

        // Création du session checkout
        $checkoutSession = Session::create([
            'line_items' => [
                [
                    'price' => 'price_1N7gepC22cMRK3R3b8THSOXA',
                    'quantity' => 1,
                ]
            ],
            'customer_email' => $user->getEmail(),
            'mode' => 'payment',
            'success_url' => 'http://localhost:5173?success=true',
            'cancel_url' => 'http://localhost:5173?canceled=true',
        ]);

        // On redirige vers la page paiment de stripe
        return $this->json([
            'sessionUrl' => $checkoutSession->url
        ]);
    }
}