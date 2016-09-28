<?php
include '../../inc/all.php';

$ID = $_POST['ID'];
$Text = $_POST['Text'];

if (isset($_POST['PrecedingID'])) {
    $PrecedingID = $_POST['PrecedingID'];
    $query = "INSERT INTO Task (Text, PrecedingID) VALUES ('${Text}', ${PrecedingID});";
} else {
    $query = "INSERT INTO Task (ID, Text) VALUES (${ID}, '${Text}');";
}

$db->query($query);
?>