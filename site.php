<?php

class Site {

	public static function getFooter() {
		// Include the common footer content for page/site
		include $_SERVER["DOCUMENT_ROOT"] . "/partials/footer.php";
	}

	public static function getHTMLHead($pageId, $title, $desc) {
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
}