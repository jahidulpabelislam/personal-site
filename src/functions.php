<?php

function site(): \App\Site {
    return \App\Site::get();
}

function page(): \App\Page {
    return \App\Page::get();
}

function load(string $path, bool $isRelative = true): \App\File {
    return new \App\File($path, $isRelative);
}

function getConfigPath(string $level = null): string {
    if ($level && !in_array($level, ["global", "site", "production"])) {
        return ROOT . "/config/app.$level.php";
    }

    return ROOT . "/config/app.php";
}

/**
 * @param $fromDate DateTime|string
 * @param $toDate DateTime|string
 * @param $format string|null
 * @return DateInterval|string
 * @throws Exception
 */
function getTimeDifference($fromDate, $toDate, string $format = null) {
    if (is_string($fromDate)) {
        $fromDate = new DateTime($fromDate);
    }
    if (is_string($toDate)) {
        $toDate = new DateTime($toDate);
    }

    if (!$fromDate instanceof DateTime || !$toDate instanceof DateTime) {
        return "";
    }

    // Work out the time difference from both dates
    $diff = $fromDate->diff($toDate);

    // Get the formatted value of the difference if requested
    if ($format) {
        $diff = $diff->format($format);
    }

    return $diff;
}

/**
 * Echo out the contents of a file
 *
 * @param $path string
 * @param $isRelative bool
 */
function renderFile(string $path, bool $isRelative = true) {
    load($path, $isRelative)->render();
}
