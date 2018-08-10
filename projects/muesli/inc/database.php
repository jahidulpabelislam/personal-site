<?php
$option = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

$dsn = "mysql:host=" . DB_IP . ";charset-UTF-8";
try {
    $db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, $option);
} catch (PDOException $failure) {
    if (defined("DEBUG") && DEBUG) {
        echo 'Connection failed: ' . $failure->getMessage();
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
    if (defined("DEBUG") && DEBUG) {
        echo 'Server failed: ' . $failure->getMessage();
    }
}
?>