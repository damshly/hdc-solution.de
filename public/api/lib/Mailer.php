<?php
// public/api/lib/Mailer.php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__ . '/PHPMailer/Exception.php';
require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';

class Mailer {
    private array $config;
    private string $lastError = '';

    public function __construct(array $config) {
        $this->config = $config;
    }

    public function getLastError(): string {
        return $this->lastError;
    }

    /**
     * Send email with dynamic data, templates, and optional attachments.
     */
    public function send(string $subject, array $data, array $attachments = []): bool {
        $mail = new PHPMailer(true);

        try {
            // SMTP Settings
            $mail->isSMTP();
            $mail->Host       = $this->config['host'];
            $mail->SMTPAuth   = true;
            $mail->Username   = $this->config['username'];
            $mail->Password   = $this->config['password'];

            // Encryption
            $encryption = strtolower($this->config['encryption'] ?? '');
            if ($encryption === 'ssl' || $encryption === 'smtps') {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            } elseif ($encryption === 'tls' || $encryption === 'starttls') {
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            } else {
                $mail->SMTPSecure = '';
                $mail->SMTPAutoTLS = false;
            }

            $mail->Port    = (int) ($this->config['port'] ?? 465);
            $mail->CharSet = 'UTF-8';

            // Recipients
            $fromEmail = !empty($this->config['from_email']) ? $this->config['from_email'] : $this->config['username'];
            $fromName  = !empty($this->config['from_name']) ? $this->config['from_name'] : 'Website Contact';
            $mail->setFrom($fromEmail, $fromName);

            $toEmail = $this->config['to_email'];
            if (empty($toEmail)) {
                $this->lastError = 'Receiver email is not configured.';
                return false;
            }
            $mail->addAddress($toEmail);

            // Auto-detect Reply-To from user data
            $replyEmail = $this->detectEmailField($data);
            $replyName  = $this->detectNameField($data);
            if ($replyEmail && filter_var($replyEmail, FILTER_VALIDATE_EMAIL)) {
                $mail->addReplyTo($replyEmail, $replyName);
            }

            // Attachments
            foreach ($attachments as $attachment) {
                if (isset($attachment['path']) && file_exists($attachment['path'])) {
                    $mail->addAttachment(
                        $attachment['path'],
                        $attachment['name'] ?? '',
                        $attachment['encoding'] ?? 'base64',
                        $attachment['type'] ?? '',
                        $attachment['disposition'] ?? 'attachment'
                    );
                } elseif (isset($attachment['string']) && isset($attachment['name'])) {
                    $mail->addStringAttachment(
                        $attachment['string'],
                        $attachment['name'],
                        $attachment['encoding'] ?? 'base64',
                        $attachment['type'] ?? '',
                        $attachment['disposition'] ?? 'attachment'
                    );
                }
            }

            // Clean data by filtering internal control fields
            $displayData = $this->filterControlFields($data);

            // Content
            $mail->isHTML(true);
            $mail->Subject = $subject;
            $mail->Body    = $this->buildHtmlTemplate($subject, $displayData);
            $mail->AltBody = $this->buildPlainTextTemplate($subject, $displayData);

            return $mail->send();
        } catch (Exception $e) {
            $this->lastError = $mail->ErrorInfo ?: $e->getMessage();
            error_log("Next-PHP-Mailer Error: " . $this->lastError);
            return false;
        }
    }

    /**
     * Filter out hidden or internal keys (like _subject, _gotcha, honeypot) from the email body.
     */
    private function filterControlFields(array $data): array {
        $filtered = [];
        $ignoredKeys = ['_subject', '_gotcha', '_honey', '_honeypot', '_replyto', '_next', 'g-recaptcha-response'];

        foreach ($data as $key => $value) {
            if (in_array(strtolower($key), $ignoredKeys, true) || strpos($key, '_') === 0) {
                continue;
            }
            $filtered[$key] = $value;
        }

        return $filtered;
    }

    /**
     * Helper to detect user's email field for Reply-To
     */
    private function detectEmailField(array $data): ?string {
        $keys = ['email', 'user_email', 'contact_email', 'sender_email', 'mail', '_replyto'];
        foreach ($keys as $key) {
            if (!empty($data[$key]) && is_string($data[$key])) {
                return trim($data[$key]);
            }
        }
        return null;
    }

    /**
     * Helper to detect user's name field
     */
    private function detectNameField(array $data): string {
        $keys = ['name', 'user_name', 'full_name', 'contact_name', 'sender_name', 'fullname'];
        foreach ($keys as $key) {
            if (!empty($data[$key]) && is_string($data[$key])) {
                return trim($data[$key]);
            }
        }
        return '';
    }

    /**
     * Format a key name nicely (e.g., 'first_name' or 'contactEmail' -> 'First Name' / 'Contact Email')
     */
    private function formatLabel(string $key): string {
        $formatted = preg_replace('/[_\-]+/', ' ', $key);
        $formatted = preg_replace('/(?<!^)[A-Z]/', ' $0', $formatted);
        return ucwords(trim($formatted));
    }

    /**
     * Format any value type safely to string
     */
    private function formatValueHtml($value): string {
        if (is_null($value)) {
            return '<em style="color:#888;">(Empty)</em>';
        }
        if (is_bool($value)) {
            return $value ? '<strong>Yes</strong>' : 'No';
        }
        if (is_array($value)) {
            if (empty($value)) {
                return '<em style="color:#888;">(Empty)</em>';
            }
            $items = array_map(function ($item) {
                return '<li>' . (is_array($item) ? json_encode($item) : htmlspecialchars((string) $item, ENT_QUOTES, 'UTF-8')) . '</li>';
            }, $value);
            return '<ul style="margin:0; padding-left:18px;">' . implode('', $items) . '</ul>';
        }
        return nl2br(htmlspecialchars((string) $value, ENT_QUOTES, 'UTF-8'));
    }

    /**
     * Format any value type safely to plain text
     */
    private function formatValuePlain($value): string {
        if (is_null($value)) return '(Empty)';
        if (is_bool($value)) return $value ? 'Yes' : 'No';
        if (is_array($value)) {
            return implode(', ', array_map('strval', $value));
        }
        return (string) $value;
    }

    /**
     * Build responsive, modern HTML email template
     */
    private function buildHtmlTemplate(string $title, array $data): string {
        $titleEscaped = htmlspecialchars($title, ENT_QUOTES, 'UTF-8');
        $siteUrl = isset($_SERVER['HTTP_HOST']) ? htmlspecialchars($_SERVER['HTTP_HOST'], ENT_QUOTES, 'UTF-8') : 'Website';
        $timestamp = date('Y-m-d H:i:s T');

        $rowsHtml = '';
        $index = 0;
        foreach ($data as $key => $value) {
            $label = htmlspecialchars($this->formatLabel($key), ENT_QUOTES, 'UTF-8');
            $valHtml = $this->formatValueHtml($value);
            $bgColor = ($index % 2 === 0) ? '#ffffff' : '#f9fafb';

            $rowsHtml .= "
            <tr style=\"background-color: {$bgColor}; border-bottom: 1px solid #e5e7eb;\">
                <td style=\"padding: 12px 16px; font-weight: 600; color: #374151; width: 35%; vertical-align: top; font-size: 14px;\">
                    {$label}
                </td>
                <td style=\"padding: 12px 16px; color: #1f2937; vertical-align: top; font-size: 14px; line-height: 1.5;\">
                    {$valHtml}
                </td>
            </tr>";
            $index++;
        }

        return "<!DOCTYPE html>
<html lang=\"en\">
<head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <title>{$titleEscaped}</title>
</head>
<body style=\"margin:0; padding:24px 12px; background-color:#f3f4f6; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;\">
    <table align=\"center\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"max-width: 620px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.08); border: 1px solid #e5e7eb;\">
        <!-- Header -->
        <tr>
            <td style=\"padding: 24px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; text-align: left;\">
                <h1 style=\"margin: 0; font-size: 20px; font-weight: 600; color: #ffffff;\">{$titleEscaped}</h1>
                <p style=\"margin: 4px 0 0 0; font-size: 13px; color: #94a3b8;\">Received on {$timestamp} from {$siteUrl}</p>
            </td>
        </tr>
        <!-- Content Table -->
        <tr>
            <td style=\"padding: 16px 20px;\">
                <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\" style=\"border-collapse: collapse;\">
                    {$rowsHtml}
                </table>
            </td>
        </tr>
        <!-- Footer -->
        <tr>
            <td style=\"padding: 16px 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;\">
                Sent automatically via Next.js Static Export Mailer Bridge.
            </td>
        </tr>
    </table>
</body>
</html>";
    }

    /**
     * Build clean plain-text version for anti-spam & text clients
     */
    private function buildPlainTextTemplate(string $title, array $data): string {
        $timestamp = date('Y-m-d H:i:s T');
        $text = "=== {$title} ===\n";
        $text .= "Received: {$timestamp}\n\n";

        foreach ($data as $key => $value) {
            $label = $this->formatLabel($key);
            $valText = $this->formatValuePlain($value);
            $text .= "• {$label}: {$valText}\n";
        }

        $text .= "\n---\nSent automatically via Next.js Static Export Mailer Bridge.\n";
        return $text;
    }
}
