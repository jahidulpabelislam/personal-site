<?php
$app = app();
$page = page();

$pagination = $page->pagination ?? [];

if ($page->indexed) {
    $liveURL = $app->getCurrentURL(true, true);
    echo "<link rel='canonical' href='$liveURL' />";
}
else {
    echo "<meta name='robots' content='noindex,nofollow' />";
}
