<?php

include_once("functions.php");

// Include local config file (if found) for any local set up of constants takes precedence
$localConfigPath = getConfigPath("local");
if (file_exists($localConfigPath)) {
    include_once($localConfigPath);
}

// Next include the config file for this deployment (if found)
$environment = getEnvironment();
if ($environment !== "production") {
    $environmentConfigPath = getConfigPath($environment);
    if (file_exists($environmentConfigPath)) {
        include_once($environmentConfigPath);
    }
}

include_once(getConfigPath());

include_once("Site.php");
include_once("Page.php");
include_once("Renderer.php");
