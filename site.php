<?php

class Site {

	private static $LIVE_DOMAIN = "https://jahidulpabelislam.com/";

	public static function getFooter() {
		// Include the common footer content for page/site
		include $_SERVER["DOCUMENT_ROOT"] . "/partials/footer.php";
	}

	public static function getHTMLHead($pageId, $pageTitle, $desc) {
		// Include the common html head for page/site
		include $_SERVER["DOCUMENT_ROOT"] . "/partials/head.php";
	}

	public static function getHeader($pageId, $title, $desc = "", $navTint = "dark") {
		// Include the common html header content for page/site
		include $_SERVER["DOCUMENT_ROOT"] . "/partials/header.php";
	}

	public static function getFavicons() {
		// Include the common favicons content for page/site
		include $_SERVER["DOCUMENT_ROOT"] . "/partials/favicons.php";
	}

	public static function getCookieBanner() {
		// Include the common cookie banner content for page/site
		include $_SERVER["DOCUMENT_ROOT"] . "/partials/cookie-banner.php";
	}

	public static function getConfig() {
		// Include the common config file for page/site
		include $_SERVER["DOCUMENT_ROOT"] . "/config.php";
	}

	public static function echoURL($url = "", $full = false, $live = false) {

		if (!empty($url)) {
			$url = "/" . trim($url, "/") . "/";
		}
		else {
			$url = "/";
		}

		$url = (isset($_GET["debug"]) && $_GET["debug"]) ? $url . "?debug=true" : $url;

		if ($full && $live) {
			$liveDomain = self::getLiveDomain();
			$url = rtrim($liveDomain, "/") . $url;
		}
		else if ($full) {
			$localDomain = self::getLocalDomain();
			$url = rtrim($localDomain, "/") . $url;
		}

		echo $url;
	}
	
	public static function getLiveDomain() {
		return self::$LIVE_DOMAIN;
	}
	
	public static function getLocalDomain() {
		$protocol = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] != "off") ? "https" : "http";
		$localDomain = $protocol . "://" . $_SERVER["SERVER_NAME"] . "/";
		
		return $localDomain;
	}
}