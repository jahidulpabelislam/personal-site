<?php

function getEnvironment(): string {
    return getenv("APPLICATION_ENV") ?? "production";
}

function removeTrailingSlash(string $url): string {
    $url = rtrim($url, "/");

    return $url;
}

function removeLeadingSlash(string $url): string {
    $url = ltrim($url, "/");

    return $url;
}

function removeSlashes(string $url): string {
    $url = trim($url, "/");

    return $url;
}

function getProjectRoot(): string {
    if (defined("ROOT")) {
        return ROOT;
    }

    return removeTrailingSlash(realpath($_SERVER["DOCUMENT_ROOT"]));
}

function getConfigPath(string $level = null): string {
    if ($level && !in_array($level, ["global", "site", "production"])) {
        return getProjectRoot() . "/src/config.{$level}.php";
    }

    return getProjectRoot() . "/src/config.php";
}

function addTrailingSlash(string $url): string {
    $url = removeTrailingSlash($url);

    // If the last bit includes a full stop, assume its a file...
    // so don't add trailing slash
    $withoutProtocol = str_replace(["https://", "http://"], "", $url);
    $splitPaths = explode("/", $withoutProtocol);
    $count = count($splitPaths);
    if ($count > 1 && !is_dir($url)) {
        $lastPath = $splitPaths[$count - 1] ?? null;
        if ($lastPath && strpos($lastPath, ".")) {
            return $url;
        }
    }

    return "{$url}/";
}

function partsToUrl(array $parts): string {
    $url = implode("/", $parts);

    return addTrailingSlash($url);
}

function formatURL(string $domain, string $relativeURL): string {
    $indexes = [
        "index.php",
        "index.html",
    ];
    foreach ($indexes as $index) {
        $indexLength = strlen($index);
        if (substr($relativeURL, -$indexLength) === $index) {
            $relativeURL = substr($relativeURL, 0, -$indexLength);
            break;
        }
    }

    $parts = [
        removeTrailingSlash($domain),
        removeLeadingSlash($relativeURL),
    ];

    return partsToUrl($parts);
}

function turnPathToURL(string $path): string {
    if (stripos($path, ROOT) === 0) {
        $path = substr($path, strlen(ROOT));
    }

    $url = str_replace("\\", "/", $path);

    $url = formatURL("", $url);

    return $url;
}

function addParamToURL($url, $param, $value) {
    $query = parse_url($url, PHP_URL_QUERY);
    if (empty($query)) {
        return "{$url}?{$param}={$value}";
    }

    return "{$url}&{$param}={$value}";
}

function getDomain(): string {
    $protocol = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ? "https" : "http";
    $domain = "{$protocol}://" . $_SERVER["SERVER_NAME"];
    $domain = addTrailingSlash($domain);

    return $domain;
}

/**
 * @return string Generate and return the URL of current requested page/URL
 */
function getRequestedURL(): string {
    $relativeURL = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);
    $relativeURL = formatURL("", $relativeURL);

    return $relativeURL;
}

/**
 * @return bool Whether or not the debug was set by user on page view
 */
function getIsDebug(): bool {
    $isDebug = isset($_GET["debug"]) && !($_GET["debug"] === "false" || $_GET["debug"] === "0");

    return $isDebug;
}

/**
 * Generate and return a URL from passed URL
 *
 * @param $domain string The domain to use to generate URL with
 * @param $url string The relative URL part/s to use to generate URL from
 * @param $addDebug bool Whether the URL should include the debug flag if currently added
 * @return string
 */
function getURL(string $domain, string $url, bool $addDebug = true): string {
    $url = formatURL($domain, $url);

    if ($addDebug && getIsDebug()) {
        $url = addParamToURL($url, "debug", "");
    }

    return $url;
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
 * @param $path string
 */
function renderFile(string $path) {
    (new File($path))->render();
}
