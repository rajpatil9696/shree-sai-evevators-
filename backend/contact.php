<?php
/**
 * Shree Sai Elevators — Contact form handler
 * ---------------------------------------------------------------
 * Receives the JSON payload posted by js/script.js, validates it,
 * blocks obvious spam via a honeypot field, and emails the enquiry
 * to the business inbox. Works on any standard PHP hosting (cPanel /
 * Hostinger / GoDaddy etc.) with mail() enabled — no database needed.
 *
 * If your host disables mail(), see README.md for the SMTP
 * (PHPMailer) alternative.
 * ---------------------------------------------------------------
 */

header('Content-Type: application/json; charset=utf-8');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// ---- Basic rate limiting (per session) to slow down abuse ----
session_start();
$now = time();
if (!isset($_SESSION['last_submit'])) {
    $_SESSION['last_submit'] = 0;
}
if ($now - $_SESSION['last_submit'] < 20) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Please wait a few seconds before sending another enquiry.']);
    exit;
}

// ---- Read JSON body ----
$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid submission.']);
    exit;
}

// ---- Honeypot: real users never fill this hidden field ----
if (!empty($input['website'])) {
    // Silently pretend success so bots don't learn anything, but do not send mail.
    echo json_encode(['success' => true]);
    exit;
}

// ---- Sanitize + validate ----
function clean($v) {
    return trim(filter_var($v, FILTER_UNSAFE_RAW));
}

$name     = isset($input['name']) ? clean($input['name']) : '';
$phone    = isset($input['phone']) ? clean($input['phone']) : '';
$email    = isset($input['email']) ? clean($input['email']) : '';
$location = isset($input['location']) ? clean($input['location']) : '';
$interest = isset($input['interest']) ? clean($input['interest']) : 'General enquiry';
$message  = isset($input['message']) ? clean($input['message']) : '';

$errors = [];

if ($name === '' || mb_strlen($name) < 2) {
    $errors[] = 'Please enter your full name.';
}
if (!preg_match('/^[0-9+\-\s]{7,15}$/', $phone)) {
    $errors[] = 'Please enter a valid phone number.';
}
if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ---- Build the email ----
$to      = 'shreesaielevators8@gmail.com';
$subject = 'New website enquiry from ' . $name;

$body  = "You have a new enquiry from shreesaielevators.org\n\n";
$body .= "Name:      $name\n";
$body .= "Phone:     $phone\n";
$body .= "Email:     " . ($email !== '' ? $email : 'Not provided') . "\n";
$body .= "Location:  " . ($location !== '' ? $location : 'Not provided') . "\n";
$body .= "Interest:  $interest\n";
$body .= "Message:\n$message\n";
$body .= "\n---\nSubmitted: " . date('d M Y, H:i') . "\n";
$body .= "IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";

$fromAddress = 'no-reply@shreesaielevators.org'; // use a domain-matching sender to avoid spam flags
$replyTo     = $email !== '' ? $email : $fromAddress;

$headers   = [];
$headers[] = "From: Shree Sai Elevators Website <$fromAddress>";
$headers[] = "Reply-To: $replyTo";
$headers[] = "X-Mailer: PHP/" . phpversion();
$headers[] = "Content-Type: text/plain; charset=utf-8";

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    $_SESSION['last_submit'] = $now;
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'We could not send your message automatically. Please call or WhatsApp us at 98345 62220.'
    ]);
}
