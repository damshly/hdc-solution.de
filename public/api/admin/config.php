<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, x-admin-token");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$expectedToken = getenv('ADMIN_SECRET') ?: 'hdc-admin-secret-key-2026';
$token = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';

if ($token !== $expectedToken) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized access"]);
    exit;
}

$allowedConfigFiles = [
    "config/site.json",
    "config/services.json",
    "config/faq.json",
    "constants/settings.json"
];

$rootDir = realpath(__DIR__ . '/../../..');

function sanitizeAndValidatePath($relativePath, $rootDir, $allowedConfigFiles) {
    // Basic path traversal prevention
    $relativePath = str_replace(['..', '\\'], ['', '/'], $relativePath);
    $relativePath = preg_replace('#/+#', '/', $relativePath);
    
    if (!in_array($relativePath, $allowedConfigFiles)) {
        return ["safe" => false, "error" => "Access to the requested path is not allowed."];
    }
    
    $fullPath = $rootDir . '/' . $relativePath;
    return ["safe" => true, "fullPath" => $fullPath];
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $targetFile = $_GET['file'] ?? null;
    
    if (!$targetFile) {
        $fileList = [];
        foreach ($allowedConfigFiles as $relPath) {
            $fullPath = $rootDir . '/' . $relPath;
            if (file_exists($fullPath)) {
                $fileList[] = [
                    "filename" => $relPath,
                    "name" => basename($relPath),
                    "size" => filesize($fullPath),
                    "lastModified" => date("c", filemtime($fullPath)),
                    "exists" => true
                ];
            } else {
                $fileList[] = [
                    "filename" => $relPath,
                    "name" => basename($relPath),
                    "size" => 0,
                    "lastModified" => null,
                    "exists" => false
                ];
            }
        }
        echo json_encode(["success" => true, "files" => $fileList]);
        exit;
    }
    
    $validation = sanitizeAndValidatePath($targetFile, $rootDir, $allowedConfigFiles);
    if (!$validation['safe']) {
        http_response_code(403);
        echo json_encode(["error" => $validation['error']]);
        exit;
    }
    
    $fullPath = $validation['fullPath'];
    if (!file_exists($fullPath)) {
        http_response_code(404);
        echo json_encode(["error" => "File not found"]);
        exit;
    }
    
    $fileContent = file_get_contents($fullPath);
    $parsedContent = json_decode($fileContent, true);
    
    echo json_encode([
        "success" => true,
        "filename" => $targetFile,
        "content" => $parsedContent !== null ? $parsedContent : $fileContent,
        "raw" => $fileContent
    ]);
    exit;
}

if ($method === 'POST' || $method === 'PUT') {
    $inputJSON = file_get_contents('php://input');
    $body = json_decode($inputJSON, true);
    
    if (!is_array($body)) {
        http_response_code(400);
        echo json_encode(["error" => "Invalid JSON payload"]);
        exit;
    }
    
    $filename = $body['filename'] ?? null;
    $content = $body['content'] ?? null;
    
    if (!$filename) {
        http_response_code(400);
        echo json_encode(["error" => "Filename is required"]);
        exit;
    }
    
    if ($content === null) {
        http_response_code(400);
        echo json_encode(["error" => "Content is required"]);
        exit;
    }
    
    $validation = sanitizeAndValidatePath($filename, $rootDir, $allowedConfigFiles);
    if (!$validation['safe']) {
        http_response_code(403);
        echo json_encode(["error" => $validation['error']]);
        exit;
    }
    
    $stringToWrite = '';
    if (is_string($content)) {
        $parsed = json_decode($content, true);
        if (json_last_error() === JSON_ERROR_NONE) {
            $stringToWrite = json_encode($parsed, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        } else {
            $stringToWrite = $content;
        }
    } else {
        $stringToWrite = json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    }
    
    $fullPath = $validation['fullPath'];
    
    // Ensure directory exists
    $dir = dirname($fullPath);
    if (!is_dir($dir)) {
        mkdir($dir, 0755, true);
    }
    
    $success = file_put_contents($fullPath, $stringToWrite);
    
    if ($success !== false) {
        echo json_encode([
            "success" => true,
            "message" => "File updated successfully",
            "filename" => $filename
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to save file"]);
    }
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
?>
