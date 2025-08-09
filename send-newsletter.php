<?php
// send-newsletter.php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Location: index.php?sent=0#contact-section');
  exit;
}

$name    = trim($_POST['name'] ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = trim($_POST['subject'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || $subject === '' || $message === '') {
  header('Location: index.php?sent=0#contact-section');
  exit;
}

$to = "lucas.magan10@gmail.com"; // agrega más separados por coma si quieres

$subject_mail = 'Contato do site: ' . $subject;
$subject_mail = '=?UTF-8?B?' . base64_encode($subject_mail) . '?=';

$body  = "Novo contato através do site\n\n";
$body .= "Nome: {$name}\n";
$body .= "Email: {$email}\n";
$body .= "Assunto: {$subject}\n";
$body .= "Mensagem:\n{$message}\n";
$body .= "\n----\nIP: " . ($_SERVER['REMOTE_ADDR'] ?? 'desconhecido');

$from = "no-reply@" . preg_replace('/^www\./', '', $_SERVER['HTTP_HOST'] ?? 'seu-dominio.com');

$headers  = "From: {$from}\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = @mail($to, $subject_mail, $body, $headers, "-f {$from}");

header('Location: index.php?sent=' . ($sent ? '1' : '0') . '#contact-section');
exit;
