<?php

define("SITE_ROOT", __DIR__ . "/..");

include_once(__DIR__ . "/../vendor/autoload.php");

include_once("functions.php");
include_once("File.php");

// Include local config file (if found) for any local set up of constants takes precedence
$localConfigPath = getConfigPath("local");
(new File($localConfigPath, false))->include();

// Next include the config file for this deployment (if found)
$environment = getEnvironment();
if ($environment !== "production") {
    $environmentConfigPath = getConfigPath($environment);
    (new File($environmentConfigPath, false))->include();
}

include_once(getConfigPath());

include_once("Site.php");
include_once("Page.php");
include_once("Renderer.php");
