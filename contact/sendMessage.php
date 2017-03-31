<?php

$data = array();
foreach ($_REQUEST as $key => $value) {
    $data[$key] = stripslashes(strip_tags(urldecode(filter_input(INPUT_POST, $key, FILTER_SANITIZE_STRING))));
}

//the email user provided to reply to
$emailAddress = $data["emailAddress"];

$message = $data["message"];

$subject = $data["subject"];

//the address to send mail to
$to = 'jahidul.pabel.islam@hotmail.com';

$meta["ok"] = true;

//checks if message is not empty
if (trim($message) === "") {
    $meta["ok"] = false;
    $meta["messageFeedback"] = "Message isn't provided.";
}

//checks if email is not empty
if (trim($emailAddress) === "") {
    $meta["ok"] = false;
    $meta["emailAddressFeedback"] = "Email Address isn't provided.";
} //checks if email provided is valid using REGEX
else if (!preg_match("/\b[\w._-]+@[\w-]+.[\w]{2,}\b/im", $emailAddress)) {
    $meta["ok"] = false;
    $meta["emailAddressFeedback"] = "Email Address isn't valid.";
}

//checks if message is not empty
if ($meta["ok"]) {

    //if user didn't provide subject create a default one
    if (trim($subject) == "") $subject = 'ePortfolio Contact Form';

    //creates the header for sending email
    $headers = 'From: contact@jahidulpabelislam.net16.net' . "\r\n" . 'Reply-To: ' . $emailAddress;

    //try to send email
    if (mail($to, $subject, $message, $headers)) {
        $meta["feedback"] = "Your message has been sent.";
    } //if not sent give message
    else {
        $meta["ok"] = false;
        $meta["feedback"] = "Something went wrong, please try again.";
    }
}

//check if requested to send json
$json = (stripos($_SERVER['HTTP_ACCEPT'], 'application/json') !== false);

//check is everything was ok
if (isset($meta["ok"]) && $meta["ok"] !== false) {
    $status = isset($meta["status"]) ? $meta["status"] : 200;
    $message = isset($meta["message"]) ? $meta["message"] : "OK";
} else {
    $status = isset($meta["status"]) ? $meta["status"] : 500;
    $message = isset($meta["message"]) ? $meta["message"] : "Internal Server Error";
}
$meta["data"] = $data;
$meta["status"] = $status;
$meta["message"] = $message;

header("HTTP/1.1 $status $message");

//send the results, send by json if json was requested
if ($json) {
    header("Content-Type: application/json");
    echo json_encode($meta);
} //else send by plain text
else {
    header("Content-Type: text/plain");
    echo("results: ");
    var_dump($meta);
}