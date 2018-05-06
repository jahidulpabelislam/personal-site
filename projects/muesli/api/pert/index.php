<?php
include '../../inc/all.php';

$bindings = array(
    ":ID" => $_POST['ID'],
    ":Text" => $_POST['Text'],
    ":PlanStartTime" => $_POST['PlanStartTime'],
    ":PlanDuration" => $_POST['PlanDuration'],
    ":PlanEndTime" => $_POST['PlanEndTime'],
    ":PERTX" => $_POST['PERTX'],
    ":PERTY" =>  $_POST['PERTY'],
    ":PERTWidth" => $_POST['PERTWidth'],
    ":PERTHeight" => $_POST['PERTHeight']
);

if (isset($_POST['PrecedingID'])) {
    $query = "UPDATE MuesliTask SET Text = :Text, PrecedingID = :PrecedingID, PlanStartTime = :PlanStartTime, PlanDuration = :PlanDuration, PlanEndTime = :PlanEndTime, SlackStartTime = :SlackStartTime, SlackDuration = :SlackDuration, SlackEndTime = :SlackEndTime PERTX = :PERTX, PERTY = :PERTY, PERTWidth = :PERTWidth;, PERTHeight = :PERTHeight WHERE ID = :ID;";
    $bindings[":PrecedingID"] = $_POST['PrecedingID'];
    $bindings[":SlackStartTime"] = $_POST['SlackStartTime'];
    $bindings[":SlackDuration"] = $_POST['SlackDuration'];
    $bindings[":SlackEndTime"] =  $_POST['SlackEndTime'];
} else {
    $query = "UPDATE MuesliTask SET Text = :Text, PlanStartTime = :PlanStartTime, PlanDuration = :PlanDuration, PlanEndTime = :PlanEndTime, PERTX = :PERTX, PERTY = :PERTY, PERTWidth = :PERTWidth, PERTHeight = :PERTHeight WHERE ID = :ID;";
}

$result = $db->prepare($query);
$result->execute($bindings);
?>