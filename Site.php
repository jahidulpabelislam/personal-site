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
    private $pageData = [];

    public function __construct() {
        if (!defined("ROOT")) {
            define("ROOT", self::getProjectRoot());
        }
    }

    public static function get(): Site {
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
    private static function getProjectRoot(): string {
        if (defined("ROOT")) {
            return ROOT;
        }

        return rtrim($_SERVER["DOCUMENT_ROOT"], " /");
    }

    public function addToPageData($field, $value) {
        $this->pageData[$field] = trim($value);
    }

    public function addPageData($fields) {
        $this->pageData = array_merge($this->pageData, $fields);
    }

    public function getFromPageData($field, $defaultValue = "") {
        return $this->pageData[$field] ?? $defaultValue;
    }

    /**
     * Include the common config file for page/site
     */
    public static function echoConfig() {
        include_once(ROOT . "/config.php");
    }

    /**
     * Include the common html head for page/site
     */
    public function renderHTMLHead() {
        $pageId = $this->getFromPageData("pageId");
        $title = $this->pageData["headTitle"] ?? $this->pageData["title"] ?? "";
        $desc = $this->pageData["headDesc"] ?? $this->pageData["desc"] ?? "";

        include_once(ROOT . "/partials/head.php");
    }

    /**
     * Include the common html nav content for page/site
     *
     * @param $title string
     * @param $pageId string
     * @param string $navTint string
     */
    public function renderNav() {
        $pageId = $this->getFromPageData("pageId");

        $defaultTint = "dark";

        $navTint = $this->getFromPageData("navTint", $defaultTint);
        $navTint = in_array($navTint, self::VALID_NAV_TINTS) ? $navTint : $defaultTint;

        include_once(ROOT . "/partials/nav.php");
    }

    /**
     * Include the common html header content for page/site
     *
     * @param $pageId string
     * @param $title string
     * @param string $desc string
     */
    public function renderHeader() {
        $pageId = $this->getFromPageData("pageId");
        $title = $this->pageData["headerTitle"] ?? $this->pageData["title"] ?? "";
        $desc = $this->pageData["headerDesc"] ?? $this->pageData["desc"] ?? "";

        include_once(ROOT . "/partials/header.php");
    }

    /**
     * Include the common favicons content for page/site
     */
    public function renderFavicons() {
        include_once(ROOT . "/partials/favicons.php");
    }

    /**
     * Include the common footer content for page/site
     */
    public function renderFooter(array $similarLinks = []) {
        include_once(ROOT . "/partials/footer.php");
    }

    /**
     * Include the common cookie banner content for page/site
     */
    public function echoCookieBanner() {
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
    public static function getURL(string $url = "", bool $isFull = false, bool $isLive = false): string {
        $url = trim($url);

        if (!empty($url)) {
            $url = "/" . trim($url, "/") . "/";
        }
        else {
            $url = "/";
        }

        $url .= self::isDebug() ? "?debug" : "";

        if ($isFull) {
            $domain = $isLive ? self::getLiveDomain() : self::getLocalDomain();
            $url = rtrim($domain, "/") . $url;
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
    public static function echoURL(string $url = "", bool $isFull = false, bool $isLive = false) {
        $url = self::getURL($url, $isFull, $isLive);

        echo $url;
    }

    /**
     * @param $url string The url to add slash to
     * @return string The new url
     */
    public static function addTrailingSlash(string $url): string {
        $url = rtrim($url, " /");
        $url = "{$url}/";

        return $url;
    }

    /**
     * @return string Generate and return the LIVE domain
     */
    public static function getLiveDomain(): string {
        $liveDomain = self::LIVE_DOMAIN;
        $liveDomain = self::addTrailingSlash($liveDomain);

        return $liveDomain;
    }

    /**
     * @return string Generate and return the local domain
     */
    public static function getLocalDomain(): string {
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
     * @param $root string The root location of where the file should be if not the default
     * @return string The version number found
     */
    public static function getAssetVersion(string $src, $ver = false, $root = ROOT): string {
        if (!$ver) {
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
    public static function getWithAssetVersion(string $src, $ver = false, $root = ROOT): string {
        $ver = self::getAssetVersion($src, $ver, $root);

        return "{$src}?v={$ver}";
    }

    /**
     * Wrapper around Site::getWithAssetVersion() & Site::getAssetVersion()
     * Used to echo the full relative URL for the asset including a version number
     */
    public static function echoWithAssetVersion(string $src, $ver = false, $root = ROOT) {
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
    public static function echoProjectImageURL(string $filepath = "") {
        $root = rtrim(JPI_API_ENDPOINT, " /");
        $imageURL = "{$root}{$filepath}";
        self::echoWithAssetVersion($imageURL);
    }

    /**
     * @return bool Whether or not the debug was set by user on page view
     */
    public static function isDebug(): bool {
        return (isset($_GET["debug"]) && !($_GET["debug"] == "false" || $_GET["debug"] == "0"));
    }

    public static function getDateStarted(): DateTime {
        $dateStarted = self::JPI_START_DATE;
        $dateStartedDateObj = DateTime::createFromFormat("d/m/Y", $dateStarted);

        return $dateStartedDateObj;
    }

    public static function getYearStarted(): string {
        $dateStartedDate = self::getDateStarted();
        $year = $dateStartedDate->format("Y");

        return $year;
    }
}

Site::get();
