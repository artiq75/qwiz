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
        private readonly UserRepository $userRepository
    ) {
        Stripe::setApiKey($_ENV['STRIPE_SK_KEY']);
        Stripe::setApiVersion('2022-11-15');
    }

    #[Route('/checkout/webhook', name: 'checkout.webhook')]
    public function index(Request $request): Response
    {
        // Récupération de la clé webhook pour communiquer uniquement avec stripe
        $endpointSecret = $_ENV['WEBHOOK_SK_KEY'];
        // Récupération du corps de la requète qui contient les informations du webhook
        $payload = $request->getContent();
        // Récupération de la signature stripe pour vérifier que la requète
        // provient bien de stripe
        $signature = $request->headers->get('stripe-signature', '');
        $event = null;

        try {
            // Construction de l'évenement du webhook
            $event = Webhook::constructEvent(
                $payload,
                $signature,
                $endpointSecret
            );
            // Si le format du payload est invalide
        } catch (\UnexpectedValueException $e) {
            return new Response('', 400);
            // Si la signature à échouer, 
            // donc la requète ne provient pas de stripe
        } catch (SignatureVerificationException $e) {
            return new Response('', 400);
        }

        if ($event->type === 'checkout.session.completed') {
            // On récupère la session checkout qui contient 
            // les informations de l'utilisateur
            $session = Session::retrieve([
                'id' => $event->data->object->id
            ]);
            // Ensuite on récupère l'utilisateur depuis la DB 
            // avec l'email dans la session
            $user = $this->userRepository->findOneBy([
                'email' => $session['customer_details']['email']
            ]);
            // Enfin si l'utilisateur est récupérer
            // on le passe en premium
            if ($user) {
                $user->setIsPremium(true);
                $this->userRepository->save($user, true);
            }
        }

        return new Response();
    }
}