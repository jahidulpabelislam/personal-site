<?php
include '../../inc/all.php';

$ID = $_POST['ID'];
$Text = $_POST['Text'];

$bindings = array(":ID" => $ID, ":Text" => $Text);

if (isset($_POST['PrecedingID'])) {
    $query = "UPDATE mueslitask SET Text = :Text, PrecedingID = :PrecedingID WHERE ID = :ID;";
    $bindings[":PrecedingID"] = $_POST['PrecedingID'];
} else {
    $query = "UPDATE mueslitask SET Text = :Text WHERE ID = :ID;";
}

$result = $db->prepare($query);
$result->execute($bindings);
?>