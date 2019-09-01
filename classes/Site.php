<?php
/**
 * A helper class to use throughout the site.
 * To aid in including global/common files, content & configurations.
 *
 * Developed so it can be used in multiple sites.
 *
 * PHP version 7.1+
 *
 * @version 1.4.0
 * @since Class available since Release: v4.1.0
 * @author Jahidul Pabel Islam <me@jahidulpabelislam.com>
 * @copyright 2010-2019 JPI
 */

class Site {

    public const LIVE_DOMAIN = "https://jahidulpabelislam.com/";
    public const VALID_NAV_TINTS = ["dark", "light"];
    public const JPI_START_DATE = "04/10/2010";

    private $environment;

    private $isDebug;

    private $liveDomain;
    private $liveURL;

    private $localDomain;
    private $localURL;

    private $dateStarted;
    private $yearStarted;

    private static $instance;

    public function __construct() {
        $this->environment = getenv("APPLICATION_ENV") ?? "production";
    }

    public static function get(): Site {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
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
    public function getIsDebug(): bool {
        if ($this->isDebug === null) {
            $this->isDebug = getIsDebug();
        }

        return $this->isDebug;
    }

    /**
     * @return string Generate and return the live domain
     */
    public function getLiveDomain(): string {
        if (!$this->liveDomain) {
            $this->liveDomain = addTrailingSlash(self::LIVE_DOMAIN);
        }

        return $this->liveDomain;
    }

    /**
     * @return string Generate and return the local domain
     */
    public function getLocalDomain(): string {
        if (!$this->localDomain) {
            $this->localDomain = getDomain();
        }

        return $this->localDomain;
    }

    private function getFullURL(string $relativeURL, bool $addDebug = true, bool $isFull = false, bool $isLive = false): string {
        $domain = "";
        if ($isFull) {
            $domain = $isLive ? $this->getLiveDomain() : $this->getLocalDomain();
        }

        $fullURL = getURL($domain, $relativeURL, $addDebug);

        return $fullURL;
    }

    /**
     * @return string Generate and return the URL of current requested page/URL
     */
    public function getRequestedURL(bool $isFull = false, bool $isLive = false): string {
        $relativeURL = getRequestedURL();
        $relativeURL = $this->getFullURL($relativeURL, false, $isFull, $isLive);

        return $relativeURL;
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
        $url = $this->getFullURL($relativeURL, $addDebug, $isFull, $isLive);

        return $url;
    }

    /**
     * Generates and echos a url
     * Uses getURL to generate the url, then echoes what is returned
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
     * Generate and return the API endpoint
     */
    public static function getAPIEndpoint(string $entity = ""): string {
        $endpoint = addTrailingSlash(JPI_API_ENDPOINT);
        $endpoint .= "v" . JPI_API_VERSION;
        $endpoint = addTrailingSlash($endpoint);

        $entity = removeSlashes($entity);
        if (!empty($entity)) {
            $endpoint .= $entity;
            $endpoint = addTrailingSlash($endpoint);
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
        $root = removeTrailingSlash(JPI_API_ENDPOINT);
        $imageURL = "{$root}{$filepath}";
        echoWithAssetVersion($imageURL);
    }

    public function getDateStarted(): DateTime {
        if (!$this->dateStarted) {
            $origTimezone = date_default_timezone_get();
            date_default_timezone_set(JPI_DATE_TIMEZONE);

            $this->dateStarted = DateTime::createFromFormat("d/m/Y", self::JPI_START_DATE);

            date_default_timezone_set($origTimezone);
        }

        return $this->dateStarted;
    }

    public function getYearStarted(): string {
        if (!$this->yearStarted) {
            $dateStartedDate = $this->getDateStarted();
            $this->yearStarted = $dateStartedDate->format("Y");
        }

        return $this->yearStarted;
    }

}

Site::get();
