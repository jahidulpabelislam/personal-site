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

	const LIVE_DOMAIN = "https://jahidulpabelislam.com/";

	const VALID_NAV_TINTS = ["dark", "light",];

	private static $instance = null;

	public function __construct() {
		if (!defined("ROOT")) {
			define("ROOT", self::getProjectRoot());
		}
	}

	public static function get() {
		if (self::$instance === null) {
			self::$instance = new self();
		}

		return self::$instance;
	}

	/**
	 * Return this projects root directory
	 *
	 * @return string
	 */
	private static function getProjectRoot() {
		if (defined("ROOT")) {
			return ROOT;
		}

		return $_SERVER["DOCUMENT_ROOT"];
	}

	/**
	 * Helper function to tidy up page id
	 * and remove any non alpha text
	 *
	 * @param $pageId
	 * @return string|string[]|null
	 */
	private static function formatPageId($pageId) {
		$pageIdFormatted = trim($pageId);
		$pageIdFormatted = strtolower($pageIdFormatted);
		$pageIdFormatted = preg_replace("/[^a-z0-9]+/", "-", $pageIdFormatted);

		return $pageIdFormatted;
	}

	/**
	 * Generate pageId using page Title
	 *
	 * @param $title string
	 * @return string
	 */
	private static function generatePageIdFromTitle($title) {
		$pageId = self::formatPageId($title);

		return $pageId;
	}

	/**
	 * Include the common config file for page/site
	 */
	public static function echoConfig() {
		include_once(ROOT . "/config.php");
	}

	/**
	 * Include the common html head for page/site
	 *
	 * @param $pageId string
	 * @param $title string
	 * @param $desc string
	 */
	public static function echoHTMLHead($title, $desc, $pageId = "") {
		$title = trim($title);
		$desc = trim($desc);
		$pageId = trim($pageId);

		$pageId = (empty($pageId)) ? self::generatePageIdFromTitle($title) : self::formatPageId($pageId);

		include_once(ROOT . "/partials/head.php");
	}

	/**
	 * Include the common html header content for page/site
	 *
	 * @param $pageId string
	 * @param $title string
	 * @param string $desc string
	 * @param string $navTint string
	 */
	public static function echoHeader($title, $desc = "", $pageId = "", $navTint = "dark") {
		$title = trim($title);
		$desc = trim($desc);
		$pageId = trim($pageId);
		$navTint = trim($navTint);

		$navTint = (in_array($navTint, self::VALID_NAV_TINTS)) ? $navTint : "dark";

		$pageId = (empty($pageId)) ? self::generatePageIdFromTitle($title) : self::formatPageId($pageId);

		include_once(ROOT . "/partials/header.php");
	}

	/**
	 * Include the common favicons content for page/site
	 */
	public static function echoFavicons() {
		include_once(ROOT . "/partials/favicons.php");
	}

	/**
	 * Include the common footer content for page/site
	 */
	public static function echoFooter() {
		include_once(ROOT . "/partials/footer.php");
	}

	/**
	 * Include the common cookie banner content for page/site
	 */
	public static function echoCookieBanner() {
		include_once(ROOT . "/partials/cookie-banner.php");
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
		$liveDomain = self::LIVE_DOMAIN;
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
		$root = rtrim(JPI_API_ENDPOINT, " /");
		$imageURL = $root . $filepath;
		echo $imageURL;
	}

	/**
	 * Generate the API endpoint and echo
	 */
	public static function echoAPIEndpoint() {
		$endpoint = self::addTrailingSlash(JPI_API_ENDPOINT);
		$endpoint .= "v" . JPI_API_VERSION;
		$endpoint = self::addTrailingSlash($endpoint);
		echo $endpoint;
	}

	/**
	 * @param $url string The url to add slash to
	 * @return string The new url
	 */
	public static function addTrailingSlash($url) {
		$url = rtrim($url, " /");
		$url = "$url/";
		return $url;
	}

	/**
	 * @return bool Whether or not the debug was set by user on page view
	 */
	public static function isDebug() {
		return (isset($_GET["debug"]) && !($_GET["debug"] == "false" || $_GET["debug"] == "0"));
	}
}

Site::get();