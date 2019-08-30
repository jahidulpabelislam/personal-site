<?php

function getProjectRoot(): string {
	if (defined("ROOT")) {
		return ROOT;
	}

	return rtrim(realpath($_SERVER["DOCUMENT_ROOT"]), " /");
}

function turnPathToURL(string $path): string {
	if (stripos($path, ROOT) === 0) {
		$path = substr($path, strlen(ROOT));
	}

	$url = str_replace("\\", "/", $path);

	return $url;
}

function addTrailingSlash(string $url): string {
	$url = rtrim($url, " /");

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

	$relativeURL = addTrailingSlash($relativeURL);

	return $relativeURL;
}

/**
 * @return bool Whether or not the debug was set by user on page view
 */
function isDebug(): bool {
	$isDebug = isset($_GET["debug"]) && !($_GET["debug"] === "false" || $_GET["debug"] === "0");

	return $isDebug;
}

/**
 * Generate and return a url from passed url
 *
 * @param string $url string The relative url part/s to use to generate url from
 * @param bool $addDebug bool Whether the url should include the debug flag if currently added
 * @return string
 */
function getURL(string $url = "", bool $addDebug = true): string {
	// Make sure there is a leading slash
	$url = ltrim($url, " /");
	$url = "/{$url}";

	$url = addTrailingSlash($url);

	$url .= ($addDebug && isDebug()) ? "?debug" : "";

	return $url;
}

/**
 * Get a version number of a asset file.
 *
 * The number to use can be passed as a param.
 * Else it tries to get the last modified date string from file.
 * And if that fails it fall backs to global default version number
 *
 * @param $src string The relative path to a asset
 * @param bool $ver string A version number to use
 * @param $root string The root location of where the file should be if not the default
 * @return string The version number found
 */
function getAssetVersion(string $src, $ver = false, string $root = ROOT): string {
	if (!$ver) {
		$ver = "1"; // Default

		$src = ltrim($src, " /");
		$file = addTrailingSlash($root) . $src;
		if (file_exists($file)) {
			$ver = date("mdYHi", filemtime($file));
		}
	}

	return $ver;
}

/**
 * Wrapper around getAssetVersion() to generate the full relative URL for the asset
 * including a version number
 */
function addAssetVersion(string $src, $ver = false, string $root = ROOT): string {
	$ver = getAssetVersion($src, $ver, $root);

	return "{$src}?v={$ver}";
}

/**
 * Wrapper around addAssetVersion() & getAssetVersion()
 * Used to echo the full relative URL for the asset including a version number
 */
function echoWithAssetVersion(string $src, $ver = false, string $root = ROOT) {
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
 * @param $format string
 * @return string
 */
function getTimeDifference($fromDate, $toDate, string $format): string {
	if (is_string($fromDate)) {
		$fromDate = DateTime::createFromFormat("d/m/Y", $fromDate);
	}
	if (is_string($toDate)) {
		$toDate = DateTime::createFromFormat("d/m/Y", $toDate);
	}

	if (!$fromDate instanceof \DateTime || !$toDate instanceof \DateTime) {
		return "";
	}

	$origTimezone = date_default_timezone_get();
	date_default_timezone_set(JPI_DATE_TIMEZONE);

	// Work out the time difference from both dates
	$diff = $fromDate->diff($toDate);

	// Get the value of the difference formatted
	$timeDiff = $diff->format($format);
	date_default_timezone_set($origTimezone);

	return $timeDiff;
}
