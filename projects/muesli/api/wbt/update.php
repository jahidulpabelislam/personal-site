<?php
include '../../inc/all.php';

$ID = $_POST['ID'];
$Text = $_POST['Text'];

if (isset($_POST['PrecedingID'])) {
    $PrecedingID = $_POST['PrecedingID'];
    $query = "UPDATE Task SET Text = '${Text}', PrecedingID = ${PrecedingID} WHERE ID = ${ID};";
} else {
    $query = "UPDATE Task SET Text = '${Text}' WHERE ID = ${ID};";
}

$db->query($query);
?>