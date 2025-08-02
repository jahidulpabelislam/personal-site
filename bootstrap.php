<?php

const ROOT = __DIR__;
const PUBLIC_ROOT = __DIR__ . "/public";

date_default_timezone_set("Europe/London");

include_once(__DIR__ . "/vendor/autoload.php");

load(ROOT . "/assets/config.local.php", false)->include();
load(ROOT . "/assets/config.php", false)->include();
