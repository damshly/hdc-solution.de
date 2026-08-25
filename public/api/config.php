<?php
// public/api/config.php

/**
 * Robust lightweight .env loader without external composer dependencies.
 */
if (!function_exists('loadEnvFile')) {
    function loadEnvFile($path) {
        if (!file_exists($path) || !is_readable($path)) {
            return;
        }

        $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        if ($lines === false) {
            return;
        }

        foreach ($lines as $line) {
            $line = trim($line);

            // Skip comments and empty lines
            if (empty($line) || strpos($line, '#') === 0 || strpos($line, ';') === 0) {
                continue;
            }

            // Must contain key=value
            if (strpos($line, '=') === false) {
                continue;
            }

            list($name, $value) = explode('=', $line, 2);
            $name  = trim($name);
            $value = trim($value);

            // Strip outer quotes if present
            if (
                (strpos($value, '"') === 0 && strrpos($value, '"') === strlen($value) - 1) ||
                (strpos($value, "'") === 0 && strrpos($value, "'") === strlen($value) - 1)
            ) {
                $value = substr($value, 1, -1);
            }

            if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
                putenv(sprintf('%s=%s', $name, $value));
                $_ENV[$name] = $value;
                $_SERVER[$name] = $value;
            }
        }
    }
}

// Load .env file in the same directory if it exists
loadEnvFile(__DIR__ . '/.env');

/**
 * Helper to fetch environment variable with fallback.
 */
if (!function_exists('env')) {
    function env($key, $default = null) {
        $value = getenv($key);
        if ($value !== false) {
            return $value;
        }
        if (isset($_ENV[$key])) {
            return $_ENV[$key];
        }
        if (isset($_SERVER[$key])) {
            return $_SERVER[$key];
        }
        return $default;
    }
}

// Determine SMTP encryption mode
$port = (int) env('SMTP_PORT', 465);
$encryption = env('SMTP_ENCRYPTION');
if (empty($encryption)) {
    if ($port === 465) {
        $encryption = 'ssl';
    } elseif ($port === 587) {
        $encryption = 'tls';
    } else {
        $encryption = null;
    }
}

return [
    'host'            => env('SMTP_HOST', 'smtp.gmail.com'),
    'port'            => $port,
    'username'        => env('SMTP_USER', ''),
    'password'        => env('SMTP_PASS', ''),
    'encryption'      => $encryption,
    'from_email'      => env('FROM_EMAIL', env('SMTP_USER', '')),
    'from_name'       => env('FROM_NAME', 'Website Contact Form'),
    'to_email'        => env('RECEIVER_EMAIL', ''),
    'default_subject' => env('DEFAULT_SUBJECT', 'New Contact Form Submission'),
    'allowed_origin'  => env('ALLOWED_ORIGIN', '*'),
];
