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

namespace App;

use JPI\Site as BaseSite;
use JPI\Me;
use JPI\MeTrait;

class Site extends BaseSite implements Me {

    use MeTrait;

    public const LIVE_DOMAIN = "https://jahidulpabelislam.com/";

    private $liveDomain;

    /**
     * @return string Generate and return the live domain
     */
    public function getLiveDomain(): string {
        if (!$this->liveDomain) {
            $this->liveDomain = static::addTrailingSlash(self::LIVE_DOMAIN);
        }

        return $this->liveDomain;
    }

    /**
     * Generate and return a url from passed url
     * Depending on param values, return url can be a relative, full live or a full local url.
     *
     * @param $relativeURL string The relative url part/s to use to generate url from
     * @param $addDevAssetsParam bool Whether the url should include the dev assets flag if currently added
     * @param $isFull bool Whether the url should be a full url
     * @param $isLive bool Whether the url should be a full live url
     * @return string
     */
    public function makeURL(string $relativeURL = "/", bool $addDevAssetsParam = true, bool $isFull = false, bool $isLive = false): string {
        $url = parent::makeURL($relativeURL, $addDevAssetsParam, $isFull && !$isLive);

        if ($isFull && $isLive) {
            $url = $this->getLiveDomain() . $url;
        }

        return $url;
    }

    /**
     * @return string Generate and return the URL of current requested page/URL
     */
    public function getCurrentURL(bool $isFull = false, bool $isLive = false): string {
        $url = parent::getCurrentURL($isFull && !$isLive);

        if ($isFull && $isLive) {
            $url = $this->getLiveDomain() . $url;
        }

        return $url;
    }

    /**
     * Generate and return the API endpoint
     */
    public static function getAPIEndpoint(string $entity = ""): string {
        $parts = [
            static::removeTrailingSlash(JPI_API_ENDPOINT),
            static::removeSlashes("v" . JPI_API_VERSION),
        ];
        $entity = static::removeSlashes($entity);
        if (!empty($entity)) {
            $parts[] = $entity;
        }

        $url = implode("/", $parts);

        return static::addTrailingSlash($url);
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
                $subject = "Site Contact Form";
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
