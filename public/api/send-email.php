<?php
// public/api/send-email.php

$config = require __DIR__ . '/config.php';

// CORS Headers
$allowedOrigin = $config['allowed_origin'] ?? '*';
header("Access-Control-Allow-Origin: {$allowedOrigin}");
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method Not Allowed. Only POST requests are supported.'
    ]);
    exit;
}

// Parse request data
$contentType = $_SERVER['CONTENT_TYPE'] ?? '';
$data = [];
$attachments = [];

if (stripos($contentType, 'application/json') !== false) {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);
    if (!is_array($data)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid JSON payload received.'
        ]);
        exit;
    }
} else {
    // Standard form-data or x-www-form-urlencoded
    $data = $_POST;
}

if (empty($data) && empty($_FILES)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'No form data submitted.'
    ]);
    exit;
}

// Honeypot spam protection check
$honeypotFields = ['_gotcha', '_honey', '_honeypot', 'website_hp'];
foreach ($honeypotFields as $hpField) {
    if (!empty($data[$hpField])) {
        // Silently succeed for bots
        echo json_encode([
            'success' => true,
            'message' => 'Message submitted successfully.'
        ]);
        exit;
    }
}

// Handle uploaded files via standard $_FILES if present
if (!empty($_FILES)) {
    foreach ($_FILES as $file) {
        if (is_array($file['name'])) {
            for ($i = 0; $i < count($file['name']); $i++) {
                if ($file['error'][$i] === UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'][$i])) {
                    $attachments[] = [
                        'path' => $file['tmp_name'][$i],
                        'name' => $file['name'][$i],
                        'type' => $file['type'][$i] ?? '',
                    ];
                }
            }
        } else {
            if ($file['error'] === UPLOAD_ERR_OK && is_uploaded_file($file['tmp_name'])) {
                $attachments[] = [
                    'path' => $file['tmp_name'],
                    'name' => $file['name'],
                    'type' => $file['type'] ?? '',
                ];
            }
        }
    }
}

// Determine Email Subject
$subject = $config['default_subject'] ?? 'New Contact Form Submission';
if (!empty($data['_subject']) && is_string($data['_subject'])) {
    $subject = trim($data['_subject']);
} elseif (!empty($data['subject']) && is_string($data['subject'])) {
    $subject = trim($data['subject']);
}

require_once __DIR__ . '/lib/Mailer.php';

$mailer = new Mailer($config);
$success = $mailer->send($subject, $data, $attachments);

if ($success) {
    echo json_encode([
        'success' => true,
        'message' => 'Email sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to send email. Please check server configuration.'
    ]);
}
