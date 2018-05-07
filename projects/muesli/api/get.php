<?php
include '../inc/all.php';

$query = "SELECT * from mueslitask;";
$rows = $db->query($query);
$rows = $rows->fetchAll(PDO::FETCH_ASSOC);

$results["rows"] = $rows;

header("Content-Type: application/json");
echo json_encode($results);
?>