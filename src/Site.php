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

use JPI\Site as BaseSite;
use JPI\Me;
use JPI\MeTrait;

class Site extends BaseSite implements Me {

    use MeTrait;

    public const LIVE_DOMAIN = "https://jahidulpabelislam.com/";

    private $isDebug;

    private $liveDomain;
    private $liveURL;

    private $localDomain;
    private $localURL;

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

        return getURL($domain, $relativeURL, $addDebug);
    }

    /**
     * @return string Generate and return the URL of current requested page/URL
     */
    public function getRequestedURL(bool $isFull = false, bool $isLive = false): string {
        $relativeURL = getRequestedURL();
        return $this->getFullURL($relativeURL, false, $isFull, $isLive);
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
     * @param $relativeURL string The relative url part/s to use to generate url from
     * @param $addDebug bool Whether the url should include the debug flag if currently added
     * @param $isFull bool Whether the url should be a full url
     * @param $isLive bool Whether the url should be a full live url
     * @return string
     */
    public function getURL(string $relativeURL = "/", bool $addDebug = true, bool $isFull = false, bool $isLive = false): string {
        return $this->getFullURL($relativeURL, $addDebug, $isFull, $isLive);
    }

    /**
     * Generate and return the API endpoint
     */
    public static function getAPIEndpoint(string $entity = ""): string {
        $parts = [
            JPI_API_ENDPOINT,
            "v" . JPI_API_VERSION
        ];
        $entity = removeSlashes($entity);
        if (!empty($entity)) {
            $parts[] = $entity;
        }

        return partsToUrl($parts);
    }

    /**
     * Generate a full url to a image file
     *
     * @param $filepath string The relative url of image
     */
    public static function getProjectImageURL(string $filepath = ""): string {
        $root = removeTrailingSlash(JPI_API_ENDPOINT);
        $imageURL = "$root$filepath";
        return static::asset($imageURL);
    }

    public function processFormSubmission(): void {
        // Get the data from request
        $data = [];
        foreach ($_POST as $key => $value) {
            $data[$key] = trim(stripslashes(strip_tags(urldecode(filter_input(INPUT_POST, $key, FILTER_SANITIZE_STRING)))));
        }

        // The email user provided to reply to
        $emailAddress = $data["emailAddress"] ?? "";

        // The message the user is trying to send
        $message = $data["message"] ?? "";

        // The subject of the message the user is trying to send
        $subject = $data["subject"] ?? "";

        // Default to as everything is okay
        $meta["ok"] = true;

        if ($message === "") {
            $meta["ok"] = false;
            $meta["messageFeedback"] = "Message isn't provided.";
        }

        if ($emailAddress === "") {
            $meta["ok"] = false;
            $meta["emailAddressFeedback"] = "Email Address isn't provided.";
        } // Checks if email provided is valid using REGEX
        else if (!preg_match("/\b[\w._-]+@[\w-]+.[\w]{2,}\b/im", $emailAddress)) {
            $meta["ok"] = false;
            $meta["emailAddressFeedback"] = "Email Address isn't valid.";
        }

        if ($meta["ok"]) {

            // If user didn't provide subject create a default one
            if ($subject === "") {
                $subject = "Portfolio Contact Form";
            }

            // Creates the headers for sending email
            $headers = "From: contact@jahidulpabelislam.com\r\nReply-To:$emailAddress";

            // The address to send mail to
            $to = "contact@jahidulpabelislam.com";

            // Try to send the email, check it was sent
            if (mail($to, $subject, $message, $headers)) {
                $meta["feedback"] = "Your message has been sent.";
            } // Something went wrong
            else {
                $meta["ok"] = false;
                $meta["feedback"] = "Something went wrong, please try again.";
            }
        }
        $meta["status"] = $status = $meta["ok"] ? 200 : 500;
        $meta["message"] = $message = $meta["ok"] ? "OK" : "Internal Server Error";

        $meta["data"] = $data;

        header("HTTP/1.1 $status $message");

        // Send the response, by json
        header("Content-Type: application/json");
        echo json_encode($meta);
    }

}
