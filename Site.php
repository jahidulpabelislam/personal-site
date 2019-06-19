<?php
/**
 * A helper class to use throughout the site.
 * To aid in including global/common files, content & configurations.
 *
 * Developed so it can be used in multiple sites.
 *
 * PHP version 7.1+
 *
 * @version 1.3.0
 * @since Class available since Release: v4.1.0
 * @author Jahidul Pabel Islam <me@jahidulpabelislam.com>
 * @copyright 2010-2019 JPI
 */

include_once("SiteConstants.php");

class Site implements SiteConstants {

    private $environment;

    private $isDebug;

    private $liveDomain;
    private $liveURL;
    private $localDomain;
    private $localURL;

    private $dateStarted;
    private $yearStarted;

    private $nowDateTime;

    private static $instance;

    public function __construct() {
        if (!defined("ROOT")) {
            define("ROOT", self::getProjectRoot());
        }

        $this->environment = getenv("APPLICATION_ENV") ?? "production";
    }

    public static function get(): Site {
        if (self::$instance === null) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    /**
     * Return this projects root directory
     */
    private static function getProjectRoot(): string {
        if (defined("ROOT")) {
            return ROOT;
        }

        return rtrim(realpath($_SERVER["DOCUMENT_ROOT"]), " /");
    }

    public function isProduction(): bool {
        return $this->environment === "production";
    }

    /**
     * Include the common config file for page/site
     */
    public static function echoConfig() {
        include_once(ROOT . "/config.php");
    }

    /**
     * @return bool Whether or not the debug was set by user on page view
     */
    public function isDebug(): bool {
        if ($this->isDebug === null) {
            $this->isDebug = isset($_GET["debug"]) && !($_GET["debug"] === "false" || $_GET["debug"] === "0");
        }

        return $this->isDebug;
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
     * @return string Generate and return the live domain
     */
    public function getLiveDomain(): string {
        if (!$this->liveDomain) {
            $liveDomain = self::LIVE_DOMAIN;
            $this->liveDomain = self::addTrailingSlash($liveDomain);
        }

        return $this->liveDomain;
    }

    /**
     * @return string Generate and return the local domain
     */
    public function getLocalDomain(): string {
        if (!$this->localDomain) {
            $protocol = (!empty($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] !== "off") ? "https" : "http";
            $localDomain = "{$protocol}://" . $_SERVER["SERVER_NAME"];
            $this->localDomain = self::addTrailingSlash($localDomain);
        }

        return $this->localDomain;
    }

    private function genURLWithDomain(string $relativeURL, bool $isFull = false, bool $isLive = false): string {
        $domain = "";
        if ($isFull) {
            $domain = $isLive ? $this->getLiveDomain() : $this->getLocalDomain();
            $domain = rtrim($domain, "/");
        }

        $relativeURL = ltrim($relativeURL, " /");

        $fullURL = $domain . "/" . $relativeURL;
        $fullURL = self::addTrailingSlash($fullURL);

        return $fullURL;
    }

    /**
     * @return string Generate and return the URL of current requested page/URL
     */
    public function getRequestedURL(bool $isFull = false, bool $isLive = false): string {
        $relativeURL = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);

        return $this->genURLWithDomain($relativeURL, $isFull, $isLive);
    }

    /**
     * @return string Generate and return the live URL of the current requested page/URL
     */
    public function getRequestedLiveURL(): string {
        if (!$this->liveURL) {
            $this->liveURL = $this->getRequestedURL(true, true);
        }

        return $this->liveURL;
    }

    /**
     * @return string Generate and return the local URL of the current requested page/URL
     */
    public function getRequestedLocalURL(): string {
        if (!$this->localURL) {
            $this->localURL = $this->getRequestedURL(true);
        }

        return $this->localURL;
    }

    /**
     * Generate and return a url from passed url
     * Depending on param values, return url can be a relative, full live or a full local url.
     *
     * @param string $relativeURL string The relative url part/s to use to generate url from
     * @param bool $addDebug bool Whether the url should include the debug flag if currently added
     * @param bool $isFull bool Whether the url should be a full url
     * @param bool $isLive bool Whether the url should be a full live url
     * @return string
     */
    public function getURL(string $relativeURL = "", bool $addDebug = true, bool $isFull = false, bool $isLive = false): string {
        $url = $this->genURLWithDomain($relativeURL, $isFull, $isLive);
        $url .= ($addDebug && $this->isDebug()) ? "?debug" : "";

        return $url;
    }

    /**
     * Generates and echos a url
     * Used getURL to generate the url, then echoes what is returned
     * Depending on param values, return url can be a relative, full live or a full local url.
     *
     * @param string $url string The relative url part/s to use to generate url from
     * @param bool $addDebug bool Whether the url should include the debug flag if currently added
     * @param bool $isFull bool Whether the url should be a full url
     * @param bool $isLive bool Whether the url should be a full live url
     */
    public function echoURL(string $url = "", bool $addDebug = true, bool $isFull = false, bool $isLive = false) {
        echo $this->getURL($url, $addDebug, $isFull, $isLive);
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
    public static function getAssetVersion(string $src, $ver = false, string $root = ROOT): string {
        if (!$ver) {
            $ver = self::DEFAULT_ASSET_VERSION;

            $src = ltrim($src, " /");
            $file = self::addTrailingSlash($root) . $src;
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
    public static function getWithAssetVersion(string $src, $ver = false, string $root = ROOT): string {
        $ver = self::getAssetVersion($src, $ver, $root);

        return "{$src}?v={$ver}";
    }

    /**
     * Wrapper around Site::getWithAssetVersion() & Site::getAssetVersion()
     * Used to echo the full relative URL for the asset including a version number
     */
    public static function echoWithAssetVersion(string $src, $ver = false, string $root = ROOT) {
        echo self::getWithAssetVersion($src, $ver, $root);
    }

    /**
     * Generate and return the API endpoint
     */
    public static function getAPIEndpoint(string $entity = ""): string {
        $endpoint = self::addTrailingSlash(JPI_API_ENDPOINT);
        $endpoint .= "v" . JPI_API_VERSION;
        $endpoint = self::addTrailingSlash($endpoint);

        $entity = trim($entity);
        if (!empty($entity)) {
            $endpoint .= trim($entity, "/");
            $endpoint = self::addTrailingSlash($endpoint);
        }

        return $endpoint;
    }

    /**
     * Generate and echo the API endpoint
     */
    public static function echoAPIEndpoint(string $entity = "") {
        echo self::getAPIEndpoint($entity);
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

    public function getDateStarted(): DateTime {
        if (!$this->dateStarted) {
            $origTimezone = date_default_timezone_get();
            date_default_timezone_set(self::DATE_TIMEZONE);

            $dateStarted = self::JPI_START_DATE;
            $dateStartedDateObj = DateTime::createFromFormat("d/m/Y", $dateStarted);

            date_default_timezone_set($origTimezone);

            $this->dateStarted = $dateStartedDateObj;
        }

        return $this->dateStarted;
    }

    public function getYearStarted(): string {
        if (!$this->yearStarted) {
            $dateStartedDate = $this->getDateStarted();
            $year = $dateStartedDate->format("Y");

            $this->yearStarted = $year;
        }

        return $this->yearStarted;
    }

    public static function turnPathToURL(string $path): string {
        if (stripos($path, ROOT) === 0) {
            $path = substr($path, strlen(ROOT));
        }

        $url = str_replace("\\", "/", $path);

        return $url;
    }

    public function getNowDateTime() {
        if (!$this->nowDateTime) {
            $origTimezone = date_default_timezone_get();
            date_default_timezone_set(self::DATE_TIMEZONE);

            $this->nowDateTime = new DateTime();

            date_default_timezone_set($origTimezone);
        }

        return $this->nowDateTime;
    }

    public function getTimeDifference($fromDate, $toDate, string $format): string {
        $origTimezone = date_default_timezone_get();
        date_default_timezone_set(self::DATE_TIMEZONE);

        if (is_string($fromDate)) {
            $fromDate = DateTime::createFromFormat("d/m/Y", $fromDate);
        }

        if (!$toDate) {
            $toDate = $this->getNowDateTime();
        }

        if (!is_a($fromDate, "DateTime") && !is_a($toDate, "DateTime")) {
            return "";
        }

        // Work out the time difference from both dates
        $diff = $fromDate->diff($toDate);

        // Get the value of the difference formatted
        $timeDiff = $diff->format($format);
        date_default_timezone_set($origTimezone);

        return $timeDiff;
    }
}

Site::get();
