<?php
$option = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

$dsn = "mysql:host=" . DB_IP . ";charset-UTF-8";
try {
    $db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, $option);
} catch (PDOException $failure) {
	error_log("Database connection failed for Muesli: " . $failure->getMessage());
    if (defined("DEBUG") && DEBUG) {
    	echo "Database connection failed for Muesli: " . $failure->getMessage();
    }
}
try {
    $showquery = "SHOW DATABASES LIKE '" . DB_NAME . "';";
    $showresult = $db->query($showquery);
    if (!$showresult->fetch()) {
        $db->query("CREATE DATABASE " . DB_NAME);
    }
    $db->exec("USE " . DB_NAME . ";");
    $db->exec($createquery);
} catch (PDOException $failure) {
	error_log("Server failed on database init for Muesli: " . $failure->getMessage());
    if (defined("DEBUG") && DEBUG) {
    	echo "Server failed on database init for Muesli: " . $failure->getMessage();
    }
}
?>