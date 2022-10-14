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
    "/privacy-policy/",
    "/site-map/",
];

if (($site->isProduction() || $site->isDevelopment()) && in_array($currentURL, $indexedURLs)) {
    $liveURL = $site->getRequestedLiveURL();

    if (!empty($pagination)) {
        $search = $_GET["search"] ?? "";
        $search = trim($search);
        $page = $pagination["page"] ?? 1;

        $url = $site->getURL($currentURL, false, true, true);

        if (strlen($search) > 0) {
            $url->addPath($search);
        }

        if ($pagination["hasPreviousPage"]) {
            $prevURL = clone $url;

            if ($page > 2) {
                $prevURL->addPath($page - 1);
            }

            echo "<link rel='prev' href='$prevURL' />";
        }

        if ($pagination["hasNextPage"]) {
            $nextURL = clone $url;
            $nextURL->addPath($page + 1);
            echo "<link rel='next' href='$nextURL' />";
        }
    }
    echo "<link rel='canonical' href='$liveURL' />";
}
else {
    echo "<meta name='robots' content='noindex,nofollow' />";
}
