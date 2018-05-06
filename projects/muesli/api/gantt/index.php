<?php
include '../../inc/all.php';

$bindings = array(
    ":ID" => $_POST['ID'],
    ":Text" => $_POST['Text'],
    ":Complete" => $_POST['Complete'],
    ":PlanStartTime" => $_POST['PlanStartTime'],
    ":PlanDuration" => $_POST['PlanDuration'],
    ":PlanEndTime" => $_POST['PlanEndTime'],
    ":ActualStartTime" =>  $_POST['ActualStartTime'],
    ":ActualDuration" => $_POST['ActualDuration'],
    ":ActualEndTime" => $_POST['ActualEndTime']
);

$query = "UPDATE MuesliTask SET Text = :Text, Complete = :Complete, PlanStartTime = :PlanStartTime, PlanDuration = :PlanDuration, PlanEndTime = :PlanEndTime, ActualStartTime = :ActualStartTime, ActualDuration = :ActualDuration, ActualEndTime = :ActualEndTime WHERE ID = :ID;";

$result = $db->prepare($query);
$result->execute($bindings);
?>