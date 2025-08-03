<?php

declare(strict_types=1);

date_default_timezone_set("Europe/London");

include_once(__DIR__ . "/vendor/autoload.php");

load(APP_ROOT . "/assets/config.local.php", false)->include();
load(APP_ROOT . "/assets/config.php", false)->include();
