<?php

define("ROOT", __DIR__);
define("PUBLIC_ROOT", __DIR__ . "/public");

date_default_timezone_set("Europe/London");

include_once(__DIR__ . "/vendor/autoload.php");

include_once("src/functions.php");

include_once("src/File.php");
include_once("src/Site.php");
include_once("src/Page.php");
include_once("src/Renderer.php");

// Include local config file (if found) for any local set up of constants takes precedence
$localConfigPath = getConfigPath("local");
(new File($localConfigPath, false))->include();

// Next include the config file for this deployment (if found)
$environment = Site::get()->getEnvironment();
if ($environment !== "production") {
    $environmentConfigPath = getConfigPath($environment);
    (new File($environmentConfigPath, false))->include();
}

include_once(getConfigPath());
