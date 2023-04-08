<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Stripe\Checkout\Session;
use Stripe\Exception\SignatureVerificationException;
use Stripe\Stripe;
use Stripe\Webhook;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class StripeCheckoutWebhookController extends AbstractController
{
    public function __construct(
        private UserRepository $userRepository
    ) {
        Stripe::setApiKey($_ENV['STRIPE_SK_KEY']);
    }

    #[Route('/checkout/webhook', name: 'checkout.webhook')]
    public function index(Request $request): Response
    {
        $endpointSecret = $_ENV['WEBHOOK_SK_KEY'];
        $payload = $request->getContent();
        $signature = $request->headers->get('stripe-signature', '');
        $event = null;

        try {
            $event = Webhook::constructEvent(
                $payload,
                $signature,
                $endpointSecret
            );
        } catch (\UnexpectedValueException $e) {
            return new Response('', 400);
        } catch (SignatureVerificationException $e) {
            return new Response('', 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = Session::retrieve([
                'id' => $event->data->object->id
            ]);
            $user = $this->userRepository->findOneBy([
                'email' => $session['customer_details']['email']
            ]);
            if ($user) {
                $user->setIsPremium(true);
                $this->userRepository->save($user, true);
            }
        }

        return new Response();
    }
}