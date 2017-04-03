<?php

//get the data from request
$data = array();
foreach ($_REQUEST as $key => $value) {
    $data[$key] = stripslashes(strip_tags(urldecode(filter_input(INPUT_POST, $key, FILTER_SANITIZE_STRING))));
}

//the email user provided to reply to
$emailAddress = $data["emailAddress"];

//the message the user is trying to send
$message = $data["message"];

//the subject of the message the user is trying to send
$subject = $data["subject"];

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
    $ok = false;
    $meta["emailAddressFeedback"] = "Email Address isn't valid.";
}

//checks if message is not empty
if ($meta["ok"]) {

    //if user didn't provide subject create a default one
    if (trim($subject) == "") $subject = "Portfolio Contact Form";

    //creates the header for sending email
    $headers = "From: contact@jahidulpabelislam.comxa.com\r\nReply-To:$emailAddress";

    //the address to send mail to
    $to = 'jahidul.pabel.islam@hotmail.com';

    //try to send email
    if (mail($to, $subject, $message, $headers)) {
        $meta["feedback"] = "Your message has been sent.";
    } //if not sent give message
    else {
        $meta["ok"] = false;
        $meta["feedback"] = "Something went wrong, please try again.";
    }
}
$meta["status"] = $status = $meta["ok"] ? 200 : 500;
$meta["message"] = $message = $meta["ok"] ? "OK" : "Internal Server Error";

$meta["data"] = $data;

header("HTTP/1.1 $status $message");

//send the results, send by json
header("Content-Type: application/json");
echo json_encode($meta);