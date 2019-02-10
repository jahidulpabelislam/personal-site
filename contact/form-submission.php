<?php

// Get the data from request
$data = [];
foreach ($_POST as $key => $value) {
    $data[$key] = trim(stripslashes(strip_tags(urldecode(filter_input(INPUT_POST, $key, FILTER_SANITIZE_STRING)))));
}

// The email user provided to reply to
$emailAddress = $data["emailAddress"] ?? "";

// The message the user is trying to send
$message = $data["message"] ?? "";

// The subject of the message the user is trying to send
$subject = $data["subject"] ?? "";

// Default to as everything is okay
$meta["ok"] = true;

if ($message === "") {
    $meta["ok"] = false;
    $meta["messageFeedback"] = "Message isn't provided.";
}

if ($emailAddress === "") {
    $meta["ok"] = false;
    $meta["emailAddressFeedback"] = "Email Address isn't provided.";
} // Checks if email provided is valid using REGEX
else if (!preg_match("/\b[\w._-]+@[\w-]+.[\w]{2,}\b/im", $emailAddress)) {
    $meta["ok"] = false;
    $meta["emailAddressFeedback"] = "Email Address isn't valid.";
}

if ($meta["ok"]) {

    // If user didn't provide subject create a default one
    if ($subject === "") {
        $subject = "Portfolio Contact Form";
    }

    // Creates the headers for sending email
    $headers = "From: contact@jahidulpabelislam.com\r\nReply-To:{$emailAddress}";

    // The address to send mail to
    $to = "contact@jahidulpabelislam.com";

    // Try to send the email, check it was sent
    if (mail($to, $subject, $message, $headers)) {
        $meta["feedback"] = "Your message has been sent.";
    } // Something went wrong
    else {
        $meta["ok"] = false;
        $meta["feedback"] = "Something went wrong, please try again.";
    }
}
$meta["status"] = $status = $meta["ok"] ? 200 : 500;
$meta["message"] = $message = $meta["ok"] ? "OK" : "Internal Server Error";

$meta["data"] = $data;

header("HTTP/1.1 {$status} {$message}");

// Send the response, by json
header("Content-Type: application/json");
echo json_encode($meta);