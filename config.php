<?php
// Function to load .env file
function loadEnv($file = ".env") {
    if (!file_exists($file)) return;
    $lines = file($file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue; // Ignore comments
        list($key, $value) = explode("=", $line, 2);
        putenv(trim($key) . "=" . trim($value));
    }
}

// Load environment variables
loadEnv();

$serverName = getenv("DB_SERVER");
$dbName = getenv("DB_NAME");
$username = getenv("DB_USER");
$password = getenv("DB_PASS");

header("Content-Type: application/json");

try {
    $conn = new PDO("sqlsrv:server=$serverName;Database=$dbName", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo json_encode(["Status" => "Success", "Message" => "Connected successfully"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["Status" => "Failed", "Error" => "Database connection failed"]);
}
?>
