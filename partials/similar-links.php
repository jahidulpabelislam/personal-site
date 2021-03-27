<?php
$site = Site::get();
$page = Page::get();

$similarLinks = $page->similarLinks ?? [];

if (count($similarLinks)) {
    $linksContent = "";
    foreach ($similarLinks as $link) {
        $pageTitle = $link["title"];
        $buttonText = $link["text"] ?? $pageTitle;

        $url = $link["url"];
        $url = $site->getURL($url);

        $buttonClasses = ["button"];

        if (!empty($link["colour"])){
            $buttonClasses[] =  "button--{$link["colour"]}";
        }

        $buttonClass = implode(" ", $buttonClasses);

        $linksContent .= <<<HTML
<div class="row__column">
    <a class="{$buttonClass}" href="{$url}" title="Link to {$pageTitle} Page">
        {$buttonText}
    </a>
</div>
HTML;
    }

    echo <<<HTML
<div class="row row--split similar-links">
    <div class="container">
        {$linksContent}
    </div>
</div>
HTML;
}
