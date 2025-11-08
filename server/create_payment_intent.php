<?php
require 'vendor/autoload.php';
\Stripe\Stripe::setApiKey(getenv('STRIPE_SECRET_KEY'));

header('Content-Type: application/json');

try {
    // Leemos el JSON del body (desde el frontend)
    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str);

    // Creamos el PaymentIntent con el monto que venga del frontend
    $paymentIntent = \Stripe\PaymentIntent::create([
        'amount' => $json_obj->amount,
        'currency' => 'eur',
        'automatic_payment_methods' => ['enabled' => true],
    ]);

    echo json_encode(['clientSecret' => $paymentIntent->client_secret]);
} catch (Error $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
