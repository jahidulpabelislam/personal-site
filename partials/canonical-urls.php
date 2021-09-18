<?php
$site = site();
$page = page();

$pagination = $page->pagination ?? [];
$currentURL = $page->currentURL;

$indexedURLs = [
    "/",
    "/projects/",
    "/contact/",
    "/about/",
    "/privacy-policy/",
];

if ($site->isProduction() && in_array($currentURL, $indexedURLs)) {
    $liveURL = $site->getCurrentURL(true, true);

    if (!empty($pagination)) {
        $search = $_GET["search"] ?? "";
        $search = trim($search);
        $page = $pagination["page"] ?? 1;

        $url = $site->makeURL($currentURL, false, true, true);

        if (strlen($search) > 0) {
            $url .= $site::addTrailingSlash($search);
        }

        if ($pagination["hasPreviousPage"]) {
            $prevURL = $url;

            if ($page > 2) {
                $prevURL .= $site::addTrailingSlash($page - 1);
            }

            echo "<link rel='prev' href='{$prevURL}' />";
        }

        if ($pagination["hasNextPage"]) {
            $nextURL = $url . $site::addTrailingSlash($page + 1);
            echo "<link rel='next' href='{$nextURL}' />";
        }
    }
    echo "<link rel='canonical' href='{$liveURL}' />";
}
else {
    echo "<meta name='robots' content='noindex,nofollow' />";
}
