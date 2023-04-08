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
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED');

        /**
         * @var \App\Entity\User
         */
        $user = $this->getUser();

        $checkoutSession = Session::create([
            'line_items' => [
                [
                    'price' => 'price_1MuXq4C22cMRK3R3xUOdFQyk',
                    'quantity' => 1,
                ]
            ],
            'customer_email' => $user->getEmail(),
            'mode' => 'payment',
            'success_url' => 'http://localhost:5173',
            'cancel_url' => 'http://localhost:5173',
        ]);

        return $this->redirect($checkoutSession->url);
    }
}