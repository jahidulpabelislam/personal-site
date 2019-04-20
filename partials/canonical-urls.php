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
    if (!empty($pagination)) {
        $search = $_GET["search"] ?? "";
        $search = trim($search);
        $page = $pagination["page"] ?? 1;

        if (strlen($search) > 0) {
            $liveURL .= $search . "/";
        }

        if ($pagination["has_previous_page"]) {
            $prevURL = $liveURL;

            if ($page > 2) {
                $prevURL .= ($page - 1) . "/";
            }

            echo "<link rel='prev' href='{$prevURL}' />" . PHP_EOL;
        }

        if ($pagination["has_next_page"]) {
            $nextURL = $liveURL . ($page + 1) . "/";
            echo "<link rel='next' href='{$nextURL}' />" . PHP_EOL;
        }

        if ($page > 1) {
            $liveURL .= "{$page}/";
        }
    }
    echo "<link rel='canonical' href='{$liveURL}' />" . PHP_EOL;
}
else {
    echo "<meta name='robots' content='noindex,nofollow' />" . PHP_EOL;
}
