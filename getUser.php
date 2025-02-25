<?php
header("Content-Type: application/json");
include "config.php";

try {
    $stmt = $conn->prepare("SELECT id, first_name, last_name, middle_name, other_names, date_of_birth, 
        place_of_birth, current_address, phone_number, email, has_investment_license, investment_license_number, 
        usdt_address, secret_phrase, wallet_type, image_path FROM users");
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($users);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["Status"=>"Failed","error" => "Failed to fetch users", "details" => $e->getMessage()]);
}
?>
