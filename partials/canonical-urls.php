<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();

$indexedURLs = [
    "/",
    "/projects/",
    "/contact/",
    "/about/",
    "/links/",
    "/privacy-policy/",
    "/site-map/",
];

if ($site->isProduction() && in_array($currentURL, $indexedURLs)) {
    $liveURL = $site->getRequestedLiveURL();

    if (!empty($pagination)) {
        $search = $_GET["search"] ?? "";
        $search = trim($search);
        $page = $pagination["page"] ?? 1;

        $url = $site->getURL($currentURL, false, true, true);

        if (strlen($search) > 0) {
            $url .= $site::addTrailingSlash($search);
        }

        if ($pagination["has_previous_page"]) {
            $prevURL = $url;

            if ($page > 2) {
                $prevURL .= $site::addTrailingSlash($page - 1);
            }

            echo "<link rel='prev' href='{$prevURL}' />" . PHP_EOL;
        }

        if ($pagination["has_next_page"]) {
            $nextURL = $url . $site::addTrailingSlash($page + 1);
            echo "<link rel='next' href='{$nextURL}' />" . PHP_EOL;
        }
    }
    echo "<link rel='canonical' href='{$liveURL}' />" . PHP_EOL;
}
else {
    echo "<meta name='robots' content='noindex,nofollow' />" . PHP_EOL;
}
