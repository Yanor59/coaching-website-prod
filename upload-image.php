<?php
/**
 * Image Upload Handler
 * Handles image uploads for the gallery manager
 */

// Enable error reporting for debugging (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set JSON response header
header('Content-Type: application/json');

// CORS headers (adjust origin in production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
define('UPLOAD_DIR', __DIR__ . '/images/gallery/');
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5 MB
define('ALLOWED_TYPES', ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']);
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'webp']);

/**
 * Send JSON response
 */
function sendResponse($success, $message, $data = []) {
    echo json_encode(array_merge([
        'success' => $success,
        'message' => $message
    ], $data));
    exit;
}

/**
 * Sanitize filename
 */
function sanitizeFilename($filename) {
    // Remove extension
    $info = pathinfo($filename);
    $name = $info['filename'];
    $ext = strtolower($info['extension']);
    
    // Remove special characters
    $name = preg_replace('/[^a-zA-Z0-9-_]/', '-', $name);
    $name = preg_replace('/-+/', '-', $name);
    $name = trim($name, '-');
    
    // Add timestamp to avoid conflicts
    $name = $name . '-' . time();
    
    return $name . '.' . $ext;
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method');
}

// Check if file was uploaded
if (!isset($_FILES['image']) || $_FILES['image']['error'] === UPLOAD_ERR_NO_FILE) {
    sendResponse(false, 'No file uploaded');
}

$file = $_FILES['image'];

// Check for upload errors
if ($file['error'] !== UPLOAD_ERR_OK) {
    $errors = [
        UPLOAD_ERR_INI_SIZE => 'File exceeds upload_max_filesize',
        UPLOAD_ERR_FORM_SIZE => 'File exceeds MAX_FILE_SIZE',
        UPLOAD_ERR_PARTIAL => 'File was only partially uploaded',
        UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
        UPLOAD_ERR_CANT_WRITE => 'Failed to write file to disk',
        UPLOAD_ERR_EXTENSION => 'Upload stopped by extension'
    ];
    $errorMessage = isset($errors[$file['error']]) ? $errors[$file['error']] : 'Unknown upload error';
    sendResponse(false, $errorMessage);
}

// Validate file size
if ($file['size'] > MAX_FILE_SIZE) {
    sendResponse(false, 'File is too large (max 5 MB)');
}

// Validate file type
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!in_array($mimeType, ALLOWED_TYPES)) {
    sendResponse(false, 'Invalid file type. Only JPG, PNG, and WebP are allowed');
}

// Validate file extension
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($extension, ALLOWED_EXTENSIONS)) {
    sendResponse(false, 'Invalid file extension');
}

// Create upload directory if it doesn't exist
if (!file_exists(UPLOAD_DIR)) {
    if (!mkdir(UPLOAD_DIR, 0755, true)) {
        sendResponse(false, 'Failed to create upload directory');
    }
}

// Generate safe filename
$filename = sanitizeFilename($file['name']);
$filepath = UPLOAD_DIR . $filename;

// Move uploaded file
if (!move_uploaded_file($file['tmp_name'], $filepath)) {
    sendResponse(false, 'Failed to save uploaded file');
}

// Optional: Optimize image (requires GD library)
try {
    optimizeImage($filepath, $mimeType);
} catch (Exception $e) {
    // Continue even if optimization fails
    error_log('Image optimization failed: ' . $e->getMessage());
}

// Return success with relative path
$relativePath = 'images/gallery/' . $filename;
sendResponse(true, 'Image uploaded successfully', [
    'path' => $relativePath,
    'filename' => $filename,
    'size' => filesize($filepath),
    'type' => $mimeType
]);

/**
 * Optimize image (optional)
 */
function optimizeImage($filepath, $mimeType) {
    // Check if GD is available
    if (!extension_loaded('gd')) {
        return;
    }
    
    // Load image based on type
    switch ($mimeType) {
        case 'image/jpeg':
        case 'image/jpg':
            $image = imagecreatefromjpeg($filepath);
            break;
        case 'image/png':
            $image = imagecreatefrompng($filepath);
            break;
        case 'image/webp':
            $image = imagecreatefromwebp($filepath);
            break;
        default:
            return;
    }
    
    if (!$image) {
        return;
    }
    
    // Get original dimensions
    $width = imagesx($image);
    $height = imagesy($image);
    
    // Resize if too large (max 1920px width)
    $maxWidth = 1920;
    if ($width > $maxWidth) {
        $newWidth = $maxWidth;
        $newHeight = (int)($height * ($maxWidth / $width));
        
        $resized = imagecreatetruecolor($newWidth, $newHeight);
        
        // Preserve transparency for PNG
        if ($mimeType === 'image/png') {
            imagealphablending($resized, false);
            imagesavealpha($resized, true);
        }
        
        imagecopyresampled($resized, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
        imagedestroy($image);
        $image = $resized;
    }
    
    // Save optimized image
    switch ($mimeType) {
        case 'image/jpeg':
        case 'image/jpg':
            imagejpeg($image, $filepath, 85); // 85% quality
            break;
        case 'image/png':
            imagepng($image, $filepath, 8); // Compression level 8
            break;
        case 'image/webp':
            imagewebp($image, $filepath, 85); // 85% quality
            break;
    }
    
    imagedestroy($image);
}

// Made with Bob
