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

use JPI\Utils\Singleton;
use JPI\Utils\URL;

class Site {

    use Singleton;

    public const LIVE_DOMAIN = "jahidulpabelislam.com";
    public const VALID_NAV_TINTS = ["dark", "light"];
    public const JPI_START_DATE = "2010-10-04";

    private $environment;

    private $isDebug;

    private $liveDomain;
    private $liveURL;

    private $localDomain;
    private $localURL;

    private $dateStarted;
    private $yearStarted;

    private function __construct() {
        $this->environment = getEnvironment();
    }

    public function isDevelopment(): bool {
        return $this->environment === "development";
    }

    public function isProduction(): bool {
        return $this->environment === "production";
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
            $this->liveDomain = self::LIVE_DOMAIN;
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

    public function getURL(string $path, bool $addDebug = true, bool $isFull = false, bool $isLive = false): URL {
        $url = new URL(formatURL($path));

        if ($isFull) {
            $url->setScheme("https");
            $url->setHost($isLive ? $this->getLiveDomain() : $this->getLocalDomain());
        }

        if ($addDebug && getIsDebug()) {
            $url->setParam("debug", "");
        }

        return $url;
    }

    /**
     * @return URL Generate and return the URL of current requested page/URL
     */
    public function getRequestedURL(bool $isFull = false, bool $isLive = false): URL {
        return $this->getURL(getRequestedPath(), false, $isFull, $isLive);
    }

    /**
     * @return URL Generate and return the live URL of the current requested page/URL
     */
    public function getRequestedLiveURL(): URL {
        if (!$this->liveURL) {
            $this->liveURL = $this->getRequestedURL(true, true);
        }

        return $this->liveURL;
    }

    /**
     * @return URL Generate and return the local URL of the current requested page/URL
     */
    public function getRequestedLocalURL(): URL {
        if (!$this->localURL) {
            $this->localURL = $this->getRequestedURL(true);
        }

        return $this->localURL;
    }

    /**
     * Generates and echos a url
     * Uses getURL to generate the url, then echoes what is returned
     * Depending on param values, return url can be a relative, full live or a full local url.
     *
     * @param string $path string The relative url part/s to use to generate url from
     * @param bool $addDebug bool Whether the url should include the debug flag if currently added
     * @param bool $isFull bool Whether the url should be a full url
     * @param bool $isLive bool Whether the url should be a full live url
     */
    public function echoURL(string $path = "", bool $addDebug = true, bool $isFull = false, bool $isLive = false) {
        echo $this->getURL($path, $addDebug, $isFull, $isLive);
    }

    /**
     * Generate and return the API endpoint
     */
    public static function getAPIEndpoint(string $entity = ""): URL {
        $url = new URL(JPI_API_ENDPOINT);
        $url->addPath("v" . JPI_API_VERSION);
        $url->addPath($entity);
        return $url;
    }

    /**
     * Generate and echo the API endpoint
     */
    public static function echoAPIEndpoint(string $entity = "") {
        echo self::getAPIEndpoint($entity);
    }

    public function getDateStarted(): DateTime {
        if (!$this->dateStarted) {
            $origTimezone = date_default_timezone_get();
            date_default_timezone_set(JPI_DATE_TIMEZONE);

            $this->dateStarted = new DateTime(self::JPI_START_DATE);

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
