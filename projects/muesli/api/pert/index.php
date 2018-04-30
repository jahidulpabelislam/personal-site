<?php
include '../../inc/all.php';

$ID = $_POST['ID'];
$Text = $_POST['Text'];
$PlanStartTime = $_POST['PlanStartTime'];
$PlanDuration = $_POST['PlanDuration'];
$PlanEndTime = $_POST['PlanEndTime'];
$SlackStartTime = $_POST['SlackStartTime'];
$SlackDuration = $_POST['SlackDuration'];
$SlackEndTime = $_POST['SlackEndTime'];
$PERTX = $_POST['PERTX'];
$PERTY = $_POST['PERTY'];
$PERTWidth = $_POST['PERTWidth'];
$PERTHeight = $_POST['PERTHeight'];


if (isset($_POST['PreseedingID'])) {
    $PreseedingID = $_POST['PreseedingID'];
    $query = "UPDATE MuesliTask SET Text = '${Text}', PreseedingID = ${PreseedingID}, PlanStartTime = ${PlanStartTime}, PlanDuration = ${PlanDuration}, PlanEndTime = ${PlanEndTime}, SlackStartTime = ${SlackStartTime}, SlackDuration = ${SlackDuration}, SlackEndTime = ${SlackEndTime} PERTX = ${PERTX}, PERTY = ${PERTY}, PERTWidth = ${PERTWidth}, PERTHeight = ${PERTHeight} WHERE ID = ${ID};";
} else {
    $query = "UPDATE MuesliTask SET Text = '${Text}', PlanStartTime = ${PlanStartTime}, PlanDuration = ${PlanDuration}, PlanEndTime = ${PlanEndTime}, PERTX = ${PERTX}, PERTY = ${PERTY}, PERTWidth = ${PERTWidth}, PERTHeight = ${PERTHeight} WHERE ID = ${ID};";
}
$db->query($query);
?>