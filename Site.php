<?php
/*
 * A helper class to use throughout the site.
 * To aid in including global/common files, content & configurations.
 *
 * Developed so it can be used in multiple sites.
 *
 * PHP version 7
 *
 * @author Jahidul Pabel Islam <me@jahidulpabelislam.com>
 * @version 1
 * @link https://github.com/jahidulpabelislam/portfolio/
 * @since Class available since Release: v4.1.0
 * @copyright 2010-2019 JPI
*/

class Site {

    const LIVE_DOMAIN = "https://jahidulpabelislam.com/";

    const VALID_NAV_TINTS = ["dark", "light"];

    const DEFAULT_ASSET_VERSION = "1";

    const JPI_START_DATE = "04/10/2010";

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
    public static function echoFooter($similarLinks = []) {
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
     * @param bool $isFull bool Whether the url should be a full url
     * @param bool $isLive bool Whether the url should be a full live url
     * @return string
     */
    public static function getURL($url = "", $isFull = false, $isLive = false) {
        $url = trim($url);

        if (!empty($url)) {
            $url = "/" . trim($url, "/") . "/";
        }
        else {
            $url = "/";
        }

        $url .= self::isDebug() ? "?debug" : "";

        if ($isFull && $isLive) {
            $liveDomain = self::getLiveDomain();
            $url = rtrim($liveDomain, "/") . $url;
        }
        else if ($isFull) {
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
     * @param bool $isFull bool Whether the url should be a full url
     * @param bool $isLive bool Whether the url should be a full live url
     */
    public static function echoURL($url = "", $isFull = false, $isLive = false) {
        $url = self::getURL($url, $isFull, $isLive);

        echo $url;
    }

    /**
     * @param $url string The url to add slash to
     * @return string The new url
     */
    public static function addTrailingSlash($url) {
        $url = rtrim($url, " /");
        $url = "{$url}/";

        return $url;
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
        $localDomain = "{$protocol}://" . $_SERVER["SERVER_NAME"];
        $localDomain = self::addTrailingSlash($localDomain);

        return $localDomain;
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
     * @param bool $root string The root location of where the file should be if not the default
     * @return string The version number found
     */
    public static function getAssetVersion(string $src, $ver = false, $root = false) {
        if (!$ver) {
            if (!$root) {
                $root = self::getProjectRoot();
            }

            $src = ltrim($src, " /");
            $file = self::addTrailingSlash($root) . $src;

            $ver = self::DEFAULT_ASSET_VERSION;
            if (file_exists($file)) {
                $ver = date("mdYHi", filemtime($file));
            }
        }

        return $ver;
    }

    /**
     * Wrapper around Site::getAssetVersion() to generate the full relative URL for the asset
     * including a version number
     */
    public static function getWithAssetVersion($src, $ver = false, $root = false) {
        $ver = self::getAssetVersion($src, $ver, $root);

         return "{$src}?v={$ver}";
    }

    /**
     * Wrapper around Site::getWithAssetVersion() & Site::getAssetVersion()
     * Used to echo the full relative URL for the asset including a version number
     */
    public static function echoWithAssetVersion($src, $ver = false, $root = false) {
        echo self::getWithAssetVersion($src, $ver, $root);
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
     * Generate a full url to a image file
     *
     * @param string $filepath string The relative url of image
     */
    public static function echoProjectImageURL($filepath = "") {
        $root = rtrim(JPI_API_ENDPOINT, " /");
        $imageURL = "{$root}{$filepath}";
        self::echoWithAssetVersion($imageURL);
    }

    /**
     * @return bool Whether or not the debug was set by user on page view
     */
    public static function isDebug() {
        return (isset($_GET["debug"]) && !($_GET["debug"] == "false" || $_GET["debug"] == "0"));
    }

    public function getDateStarted() {
        $dateStarted = self::JPI_START_DATE;
        $dateStartedDateObj = DateTime::createFromFormat("d/m/Y", $dateStarted);

        return $dateStartedDateObj;
    }

    public function getYearStarted() {
        $dateStartedDate = self::getDateStarted();

        $year = $dateStartedDate->format("Y");

        return $year;
    }
}

Site::get();
