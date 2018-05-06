<?php
include '../../inc/all.php';

$bindings = array(":Text" => $_POST['Text']);

if (isset($_POST['PrecedingID'])) {
    $query = "INSERT INTO MuesliTask (Text, PrecedingID) VALUES (:Text, :PrecedingID);";
    $bindings[":PrecedingID"] = $_POST['PrecedingID'];
} else {
    $query = "INSERT INTO MuesliTask (ID, Text) VALUES (:ID, :Text);";
    $bindings[":ID"] = $_POST['ID'];
}

$result = $db->prepare($query);
$result->execute($bindings);
?>