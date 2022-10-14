<?php

function getEnvironment(): string {
    return getenv("APPLICATION_ENV") ?? "production";
}

function getProjectRoot(): string {
    if (defined("ROOT")) {
        return ROOT;
    }

    return \JPI\Utils\URL::removeTrailingSlash(realpath($_SERVER["DOCUMENT_ROOT"]));
}

function getConfigPath(string $level = null): string {
    if ($level && !in_array($level, ["global", "site", "production"])) {
        return getProjectRoot() . "/src/config.{$level}.php";
    }

    return getProjectRoot() . "/src/config.php";
}

function formatURL(string $url): string {
    $indexes = [
        "index.php",
        "index.html",
    ];
    foreach ($indexes as $index) {
        $indexLength = strlen($index);
        if (substr($url, -$indexLength) === $index) {
            return substr($url, 0, -$indexLength);
        }
    }

    return $url;
}

function turnPathToURL(string $path): string {
    if (stripos($path, ROOT) === 0) {
        $path = substr($path, strlen(ROOT));
    }

    $url = str_replace("\\", "/", $path);

    return formatURL($url);
}

function getDomain(): string {
    $protocol = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ? "https" : "http";
    return "$protocol://" . $_SERVER["SERVER_NAME"];
}

/**
 * @return string Generate and return the URL of current requested page/URL
 */
function getRequestedPath(): string {
    return formatURL(parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH));
}

/**
 * @return bool Whether or not the debug was set by user on page view
 */
function getIsDebug(): bool {
    return isset($_GET["debug"]) && !($_GET["debug"] === "false" || $_GET["debug"] === "0");
}

/**
 * Get a version number of a asset file.
 *
 * The number to use can be passed as a param.
 * Else it tries to get the last modified date string from file.
 * And if that fails it fall backs to global default version number
 *
 * @param $src string The relative path to a asset
 * @param $ver string|null A version number to use
 * @param $root string The root location of where the file should be if not the default
 * @return string The version number found
 */
function getAssetVersion(string $src, string $ver = null, string $root = ROOT): string {
    if ($ver !== null) {
        return $ver;
    }

    $filepath = (new \JPI\Utils\URL($root))
        ->addPath($src)
    ;

    if ((new File($filepath, false))->exists()) {
        return date("mdYHi", filemtime($filepath));
    }

    return "1";
}

/**
 * Wrapper around getAssetVersion() to generate the full relative URL for the asset
 * including a version number
 */
function addAssetVersion(string $src, string $ver = null, string $root = ROOT): string {
    $ver = getAssetVersion($src, $ver, $root);

    if (empty($ver)) {
        return $src;
    }

    return (new \JPI\Utils\URL($src))
        ->setParam("v", $ver)
    ;
}

/**
 * Wrapper around addAssetVersion() & getAssetVersion()
 * Used to echo the full relative URL for the asset including a version number
 */
function echoWithAssetVersion(string $src, string $ver = null, string $root = ROOT) {
    echo addAssetVersion($src, $ver, $root);
}

function getNowDateTime(): DateTime {
    $origTimezone = date_default_timezone_get();
    date_default_timezone_set(JPI_DATE_TIMEZONE);

    $nowDateTime = new DateTime();

    date_default_timezone_set($origTimezone);

    return $nowDateTime;
}

/**
 * @param $fromDate DateTime|string
 * @param $toDate DateTime|string
 * @param $format string|null
 * @return DateInterval|string
 * @throws Exception
 */
function getTimeDifference($fromDate, $toDate, string $format = null) {
    $origTimezone = date_default_timezone_get();
    date_default_timezone_set(JPI_DATE_TIMEZONE);

    if (is_string($fromDate)) {
        $fromDate = new DateTime($fromDate);
    }
    if (is_string($toDate)) {
        $toDate = new DateTime($toDate);
    }

    date_default_timezone_set($origTimezone);

    if (!$fromDate instanceof DateTime || !$toDate instanceof DateTime) {
        return "";
    }

    // Work out the time difference from both dates
    $diff = $fromDate->diff($toDate);

    // Get the formatted value of the difference if requested
    if ($format) {
        $diff = $diff->format($format);
    }

    return $diff;
}

/**
 * Echo out the contents of a file
 *
 * @param string $path
 */
function renderFile(string $path) {
    (new File($path))->render();
}
