<?php
$option = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);

$dsn = "mysql:host=" . IP . ";charset-UTF-8";
try {
    $db = new PDO($dsn, USERNAME, PASSWORD, $option);
} catch (PDOException $failure) {
    if (defined("DEBUG") && DEBUG) {
        echo 'Connection failed: ' . $failure->getMessage();
    }
}
try {
    $showquery = "SHOW DATABASES LIKE '" . DATABASENAME . "';";
    $showresult = $db->query($showquery);
    if (!$showresult->fetch()) {
        $db->query("CREATE DATABASE " . DATABASENAME);
    }
    $db->exec("USE " . DATABASENAME . ";");
    $db->exec($createquery);
} catch (PDOException $failure) {
    if (defined("DEBUG") && DEBUG) {
        echo 'Server failed: ' . $failure->getMessage();
    }
}
?>