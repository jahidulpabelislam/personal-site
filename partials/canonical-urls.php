<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();

$indexedPages = [
    "home",
    "projects",
    "contact",
    "about",
    "links",
    "privacy-policy",
    "site-map",
];

if ($site->isProduction() && in_array($pageId, $indexedPages)) {
    $liveURL = $site->getRequestedLiveURL();

    if (!empty($pagination)) {
        $search = $_GET["search"] ?? "";
        $search = trim($search);
        $page = $pagination["page"] ?? 1;

        $url = $site->getLiveDomain();
        $url .= "{$pageId}/";

        if (strlen($search) > 0) {
            $url .= $search . "/";
        }

        if ($pagination["has_previous_page"]) {
            $prevURL = $url;

            if ($page > 2) {
                $prevURL .= ($page - 1) . "/";
            }

            echo "<link rel='prev' href='{$prevURL}' />" . PHP_EOL;
        }

        if ($pagination["has_next_page"]) {
            $nextURL = $url . ($page + 1) . "/";
            echo "<link rel='next' href='{$nextURL}' />" . PHP_EOL;
        }
    }
    echo "<link rel='canonical' href='{$liveURL}' />" . PHP_EOL;
}
else {
    echo "<meta name='robots' content='noindex,nofollow' />" . PHP_EOL;
}
