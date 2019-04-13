<?php
if (defined("DB_IP") && defined("DB_NAME") && defined("DB_USERNAME") && defined("DB_PASSWORD"))
{
	$option = array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
	
	$dsn = "mysql:host=" . DB_IP . ";charset-UTF-8";
	try {
		$db = new PDO($dsn, DB_USERNAME, DB_PASSWORD, $option);
	} catch (PDOException $failure) {
		
		if (defined("DEBUG") && DEBUG) {
			echo "Database connection failed for Muesli: " . $failure->getMessage();
		}
		
		error_log("Database connection failed for Muesli: " . $failure->getMessage());
		echo "A internal problem has occurred, please get in touch or try again later!";
		die();
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
			echo "Server failed on database init for Muesli: " . $failure->getMessage();
		}
		error_log("Server failed on database init for Muesli: " . $failure->getMessage());
		echo "A internal problem has occurred, please get in touch or try again later!";
		die();
	}
}
else
{
	error_log("Database connection failed for Muesli.");
	echo "A internal problem has occurred, please get in touch or try again later!";
	die();
}