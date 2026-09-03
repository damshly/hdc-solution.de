<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
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

$method = $_SERVER['REQUEST_METHOD'];
$rootDir = realpath(__DIR__ . '/../../..');
$uploadDir = $rootDir . '/public/uploads';

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

if ($method === 'GET') {
    $files = scandir($uploadDir);
    $mediaFiles = [];
    
    foreach ($files as $filename) {
        if ($filename === '.' || $filename === '..') continue;
        
        $filePath = $uploadDir . '/' . $filename;
        if (is_file($filePath)) {
            $mediaFiles[] = [
                "filename" => $filename,
                "url" => "/uploads/" . $filename,
                "size" => filesize($filePath),
                "uploadedAt" => date("c", filemtime($filePath))
            ];
        }
    }
    
    usort($mediaFiles, function($a, $b) {
        return strtotime($b['uploadedAt']) - strtotime($a['uploadedAt']);
    });
    
    echo json_encode(["success" => true, "files" => $mediaFiles]);
    exit;
}

if ($method === 'POST') {
    $allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
        "image/svg+xml",
        "application/pdf"
    ];
    $maxFileSizeBytes = 10 * 1024 * 1024; // 10MB
    
    $file = $_FILES['file'] ?? $_FILES['media'] ?? null;
    
    if (!$file || $file['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(["error" => "No file uploaded or upload error"]);
        exit;
    }
    
    if ($file['size'] > $maxFileSizeBytes) {
        http_response_code(400);
        echo json_encode(["error" => "File size exceeds 10MB limit"]);
        exit;
    }
    
    // Check MIME type using finfo
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mimeType = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
    
    if (!in_array($mimeType, $allowedMimeTypes)) {
        http_response_code(400);
        echo json_encode(["error" => "File type " . $mimeType . " is not allowed"]);
        exit;
    }
    
    $originalName = $file['name'];
    $ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
    $baseName = strtolower(pathinfo($originalName, PATHINFO_FILENAME));
    
    // Sanitize base name
    $baseName = preg_replace('/[^a-z0-9_-]/', '-', $baseName);
    $baseName = preg_replace('/-+/', '-', $baseName);
    $baseName = substr($baseName, 0, 50);
    
    $timestamp = time();
    $sanitizedFilename = $baseName . '-' . $timestamp . '.' . $ext;
    $destinationPath = $uploadDir . '/' . $sanitizedFilename;
    
    if (move_uploaded_file($file['tmp_name'], $destinationPath)) {
        echo json_encode([
            "success" => true,
            "url" => "/uploads/" . $sanitizedFilename,
            "filename" => $sanitizedFilename,
            "size" => $file['size'],
            "mimeType" => $mimeType
        ]);
    } else {
        http_response_code(500);
        echo json_encode(["error" => "Failed to upload file"]);
    }
    exit;
}

http_response_code(405);
echo json_encode(["error" => "Method not allowed"]);
?>
