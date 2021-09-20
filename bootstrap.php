<?php

define("ROOT", __DIR__);
define("PUBLIC_ROOT", __DIR__ . "/public");
define("JPI_SITE_ROOT", __DIR__ . "/vendor/jpi/site");

date_default_timezone_set("Europe/London");

include_once(__DIR__ . "/vendor/autoload.php");

// Include local config file (if found) for any local set up of constants takes precedence
$localConfigPath = getConfigPath("local");
load($localConfigPath, false)->include();

// Next include the config file for this deployment (if found)
$environment = site()->getEnvironment();
if ($environment !== "production") {
    $environmentConfigPath = getConfigPath($environment);
    load($environmentConfigPath, false)->include();
}

include_once(getConfigPath());
