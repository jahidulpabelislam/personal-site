<?php

function getConfigPath(string $level = null): string {
    if ($level && !in_array($level, ["global", "site", "production"])) {
        return ROOT . "/src/config.$level.php";
    }

    return ROOT . "/src/config.php";
}

function removeTrailingSlash(string $value): string {
    return rtrim($value, "/");
}

function removeLeadingSlash(string $value): string {
    return ltrim($value, "/");
}

function removeSlashes(string $value): string {
    return trim($value, "/");
}

function addTrailingSlash(string $value): string {
    $value = removeTrailingSlash($value);

    // If the last bit includes a full stop, assume its a file...
    // so don't add trailing slash
    $withoutProtocol = str_replace(["https://", "http://"], "", $value);
    $splitPaths = explode("/", $withoutProtocol);
    $count = count($splitPaths);
    if ($count > 1 && !is_dir($value)) {
        $lastPath = $splitPaths[$count - 1] ?? null;
        if ($lastPath && strpos($lastPath, ".")) {
            return $value;
        }
    }

    return "$value/";
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
    if (stripos($path, PUBLIC_ROOT) === 0) {
        $path = substr($path, strlen(PUBLIC_ROOT));
    }

    $url = str_replace("\\", "/", $path);

    return formatURL("", $url);
}

function addParamToURL($url, $param, $value): string {
    $query = parse_url($url, PHP_URL_QUERY);
    if (empty($query)) {
        return "$url?$param=$value";
    }

    return "$url&$param=$value";
}

/**
 * @return bool Whether or not the debug was set by user on page view
 */
function getIsDebug(): bool {
    return isset($_GET["debug"]) && !($_GET["debug"] === "false" || $_GET["debug"] === "0");
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

/**
 * @param $fromDate DateTime|string
 * @param $toDate DateTime|string
 * @param $format string|null
 * @return DateInterval|string
 * @throws Exception
 */
function getTimeDifference($fromDate, $toDate, string $format = null) {
    if (is_string($fromDate)) {
        $fromDate = new DateTime($fromDate);
    }
    if (is_string($toDate)) {
        $toDate = new DateTime($toDate);
    }

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
