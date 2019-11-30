<?php

include_once("functions.php");

if (!defined("JPI_DATE_TIMEZONE")) {
    define("JPI_DATE_TIMEZONE", "Europe/London");
}

if (!defined("ROOT")) {
    define("ROOT", getProjectRoot());
}

include_once("Site.php");
include_once("Page.php");
include_once("Renderer.php");
