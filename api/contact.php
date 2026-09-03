<?php
declare(strict_types=1);

const CONTACT_MAX_BODY_BYTES = 65536;
const CONTACT_MAX_NAME_LENGTH = 80;
const CONTACT_MAX_EMAIL_LENGTH = 254;
const CONTACT_MAX_MESSAGE_LENGTH = 4000;
const CONTACT_RATE_LIMIT_ATTEMPTS = 5;
const CONTACT_RATE_LIMIT_WINDOW = 600;
const CONTACT_MIN_FILL_SECONDS = 2;

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, max-age=0');
header('Pragma: no-cache');
header('X-Content-Type-Options: nosniff');

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
  header('Allow: POST');
  sendJson(405, ['ok' => false, 'message' => 'Methode non autorisee']);
}

$contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
if ($contentLength > CONTACT_MAX_BODY_BYTES) {
  sendJson(413, ['ok' => false, 'message' => 'Message trop volumineux']);
}

if (!isSameOriginRequest()) {
  sendJson(403, ['ok' => false, 'message' => 'Requete non autorisee']);
}

$remoteAddress = (string) ($_SERVER['REMOTE_ADDR'] ?? 'unknown');
if (isRateLimited($remoteAddress)) {
  header('Retry-After: ' . CONTACT_RATE_LIMIT_WINDOW);
  sendJson(429, ['ok' => false, 'message' => 'Trop de tentatives. Reessayez plus tard.']);
}

$honeypot = trim((string) ($_POST['company'] ?? ''));
if ($honeypot !== '') {
  sendJson(200, ['ok' => true, 'message' => 'Message recu']);
}

$formStartedAt = filter_var($_POST['form_started_at'] ?? null, FILTER_VALIDATE_INT);
if ($formStartedAt && time() - (int) $formStartedAt < CONTACT_MIN_FILL_SECONDS) {
  sendJson(200, ['ok' => true, 'message' => 'Message recu']);
}

$name = normalizeSingleLine((string) ($_POST['name'] ?? ''));
$email = normalizeSingleLine((string) ($_POST['email'] ?? ''));
$subjectKey = trim((string) ($_POST['subject'] ?? ''));
$message = normalizeMessage((string) ($_POST['message'] ?? ''));
$allowedSubjects = [
  'demande-cv' => 'Demande CV',
  'demande-projet' => 'Demande projet',
  'collaboration' => 'Collaboration',
  'question-technique' => 'Question technique',
  'autre' => 'Autre'
];

$validLengths = textLength($name) <= CONTACT_MAX_NAME_LENGTH
  && textLength($email) <= CONTACT_MAX_EMAIL_LENGTH
  && textLength($message) <= CONTACT_MAX_MESSAGE_LENGTH;

if (
  $name === ''
  || $email === ''
  || $message === ''
  || !$validLengths
  || !isset($allowedSubjects[$subjectKey])
  || !filter_var($email, FILTER_VALIDATE_EMAIL)
) {
  sendJson(400, ['ok' => false, 'message' => 'Champs invalides']);
}

$to = 'info@c2rdesign.com';
$fromEmail = 'info@c2rdesign.com';
$safeSubject = $allowedSubjects[$subjectKey];
$subject = 'CV - ' . $safeSubject . ' - ' . $name;
$encodedSubject = function_exists('mb_encode_mimeheader')
  ? mb_encode_mimeheader($subject, 'UTF-8')
  : $subject;
$body = implode("\n", [
  'Source: CV',
  'Sujet: ' . $safeSubject,
  'Nom: ' . $name,
  'Email: ' . $email,
  '',
  'Message:',
  $message,
  ''
]);
$headers = [
  'From: CV C2R Design <' . $fromEmail . '>',
  'Reply-To: ' . $email,
  'Return-Path: ' . $fromEmail,
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'Content-Transfer-Encoding: 8bit',
  'X-Mailer: PHP/' . phpversion()
];

if (mail($to, $encodedSubject, $body, implode("\r\n", $headers), '-f ' . $fromEmail)) {
  sendJson(200, ['ok' => true, 'message' => 'Message envoye']);
}

sendJson(500, ['ok' => false, 'message' => 'Envoi indisponible']);

function sendJson(int $status, array $payload): void
{
  http_response_code($status);
  echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function normalizeSingleLine(string $value): string
{
  $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', $value) ?? '';
  return trim(preg_replace('/\s+/u', ' ', $value) ?? '');
}

function normalizeMessage(string $value): string
{
  $value = str_replace(["\r\n", "\r"], "\n", $value);
  $value = preg_replace('/[^\P{C}\n\t]+/u', '', $value) ?? '';
  return trim($value);
}

function textLength(string $value): int
{
  return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function isSameOriginRequest(): bool
{
  $source = (string) ($_SERVER['HTTP_ORIGIN'] ?? $_SERVER['HTTP_REFERER'] ?? '');
  if ($source === '') return true;

  $sourceHost = strtolower((string) parse_url($source, PHP_URL_HOST));
  $requestHost = strtolower(preg_replace('/:\d+$/', '', (string) ($_SERVER['HTTP_HOST'] ?? '')) ?? '');
  return $sourceHost !== '' && hash_equals($requestHost, $sourceHost);
}

function isRateLimited(string $remoteAddress): bool
{
  $file = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR)
    . DIRECTORY_SEPARATOR
    . 'c2r-contact-'
    . hash('sha256', $remoteAddress)
    . '.json';
  $handle = @fopen($file, 'c+');
  if ($handle === false) return false;

  try {
    if (!flock($handle, LOCK_EX)) return false;
    rewind($handle);
    $raw = stream_get_contents($handle);
    $entries = is_string($raw) ? json_decode($raw, true) : [];
    if (!is_array($entries)) $entries = [];

    $now = time();
    $windowStart = $now - CONTACT_RATE_LIMIT_WINDOW;
    $entries = array_values(array_filter($entries, static fn ($timestamp): bool => is_int($timestamp) && $timestamp >= $windowStart));
    $limited = count($entries) >= CONTACT_RATE_LIMIT_ATTEMPTS;
    if (!$limited) $entries[] = $now;

    ftruncate($handle, 0);
    rewind($handle);
    fwrite($handle, json_encode($entries));
    fflush($handle);
    flock($handle, LOCK_UN);
    return $limited;
  } finally {
    fclose($handle);
  }
}
