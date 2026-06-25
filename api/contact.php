<?php
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'message' => 'Methode non autorisee']);
  exit;
}

$honeypot = trim($_POST['company'] ?? '');
if ($honeypot !== '') {
  echo json_encode(['ok' => true, 'message' => 'Message recu']);
  exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $message === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Champs invalides']);
  exit;
}

$safeName = str_replace(["\r", "\n"], ' ', $name);
$safeEmail = str_replace(["\r", "\n"], '', $email);
$subjectName = function_exists('mb_substr') ? mb_substr($safeName, 0, 80) : substr($safeName, 0, 80);

$to = 'info@c2rdesign.com';
$fromEmail = 'info@c2rdesign.com';
$source = 'CV';
$subject = 'CV - Contact - ' . $subjectName;
$encodedSubject = function_exists('mb_encode_mimeheader') ? mb_encode_mimeheader($subject, 'UTF-8') : $subject;
$body = "Source: {$source}\nNom: {$name}\nEmail: {$email}\n\nMessage:\n{$message}\n";
$headers = [
  'From: CV C2R Design <' . $fromEmail . '>',
  'Reply-To: ' . $safeEmail,
  'Return-Path: ' . $fromEmail,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  'X-Mailer: PHP/' . phpversion()
];

if (mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f ' . $fromEmail)) {
  echo json_encode(['ok' => true, 'message' => 'Message envoye']);
  exit;
}

http_response_code(500);
echo json_encode(['ok' => false, 'message' => 'Envoi indisponible']);
