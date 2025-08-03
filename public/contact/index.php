<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/../bootstrap.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    app()->processFormSubmission();
    exit();
}

http_response_code(404);
include(PUBLIC_ROOT . "/error/index.php");
exit();
