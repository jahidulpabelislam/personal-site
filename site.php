<?php
/*
 * A class to use throughout the site, to aid in include common files, content & configuration.
 * Developed so it can be used in multiple sites.
 *
 * PHP version 7
 *
 * @author Jahidul Pabel Islam <me@jahidulpabelislam.com>
 * @version 1
 * @link https://github.com/jahidulpabelislam/portfolio/
 * @since Class available since Release: v4.1
 * @copyright 2014-2018 JPI
*/

class Site {

	private static $LIVE_DOMAIN = "https://jahidulpabelislam.com/";

	private static function getProjectRoot() {
		return $_SERVER["DOCUMENT_ROOT"];
	}

	/**
	 * Include the common footer content for page/site
	 */
	public static function echoFooter() {
		include self::getProjectRoot() . "/partials/footer.php";
	}

	/**
	 * Include the common html head for page/site
	 *
	 * @param $pageId string
	 * @param $title string
	 * @param $desc string
	 */
	public static function echoHTMLHead($pageId, $title, $desc) {
		include self::getProjectRoot() . "/partials/head.php";
	}

	/**
	 * Include the common html header content for page/site
	 *
	 * @param $pageId string
	 * @param $title string
	 * @param string $desc string
	 * @param string $navTint string
	 */
	public static function echoHeader($pageId, $title, $desc = "", $navTint = "dark") {
		include self::getProjectRoot() . "/partials/header.php";
	}

	/**
	 * Include the common favicons content for page/site
	 */
	public static function echoFavicons() {
		include self::getProjectRoot() . "/partials/favicons.php";
	}

	/**
	 * Include the common cookie banner content for page/site
	 */
	public static function echoCookieBanner() {
		include self::getProjectRoot() . "/partials/cookie-banner.php";
	}

	/**
	 * Include the common config file for page/site
	 */
	public static function echoConfig() {
		include self::getProjectRoot() . "/config.php";
	}

	/**
	 * Generate and return a url from passed url
	 * Depending on param values, return url can be a relative, full live or a full local url.
	 *
	 * @param string $url string The relative url part/s to use to generate url from
	 * @param bool $full bool Whether the url should be a full url
	 * @param bool $live bool Whether the url should be a full live url
	 * @return string
	 */
	public static function getURL($url = "", $full = false, $live = false) {

		$url = trim($url);

		if (!empty($url)) {
			$url = "/" . trim($url, "/") . "/";
		}
		else {
			$url = "/";
		}

		$url = self::isDebug() ? $url . "?debug=true" : $url;

		if ($full && $live) {
			$liveDomain = self::getLiveDomain();
			$url = rtrim($liveDomain, "/") . $url;
		}
		else if ($full) {
			$localDomain = self::getLocalDomain();
			$url = rtrim($localDomain, "/") . $url;
		}

		return $url;
	}

	/**
	 * Generates and echos a url
	 * Used getURL to generate the url, then echoes what is returned
	 * Depending on param values, return url can be a relative, full live or a full local url.
	 *
	 * @param string $url string The relative url part/s to use to generate url from
	 * @param bool $full bool Whether the url should be a full url
	 * @param bool $live bool Whether the url should be a full live url
	 */
	public static function echoURL($url = "", $full = false, $live = false) {

		$url = self::getURL($url, $full, $live);

		echo $url;
	}

	/**
	 * @return string Generate and return the LIVE domain
	 */
	public static function getLiveDomain() {
		$liveDomain = self::$LIVE_DOMAIN;
		$liveDomain = self::addTrailingSlash($liveDomain);
		return $liveDomain;
	}

	/**
	 * @return string Generate and return the local domain
	 */
	public static function getLocalDomain() {
		$protocol = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] != "off") ? "https" : "http";
		$localDomain = $protocol . "://" . $_SERVER["SERVER_NAME"];
		$localDomain = self::addTrailingSlash($localDomain);
		return $localDomain;
	}

	/**
	 * Generate a full url to a image file
	 * @param string $filepath string The relative url of image
	 */
	public static function echoProjectImageURL($filepath = "") {
		$root = rtrim(JPI_API_ENDPOINT, ' /');
		$imageURL = $root . $filepath;
		echo $imageURL;
	}

	/**
	 * Generate the API endpoint and echo
	 */
	public static function echoAPIEndpoint() {
		$endpoint = self::addTrailingSlash(JPI_API_ENDPOINT);
		$endpoint .= JPI_API_VERSION;
		$endpoint = self::addTrailingSlash($endpoint);
		echo $endpoint;
	}
	
	/**
	 * @param $url string The url to add slash to
	 * @return string The new url
	 */
	public static function addTrailingSlash($url) {
		$url = rtrim($url, ' /');
		$url = "$url/";
		return $url;
	}

	/**
	 * @return bool Whether or not the debug was set by user on page view
	 */
	public static function isDebug() {
		return (isset($_GET["debug"]) && ($_GET["debug"] == "true" || $_GET["debug"] == "1"));
	}
}