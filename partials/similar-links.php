<?php
$site = Site::get();
$page = Page::get();

$similarLinks = $page->similarLinks ?? [];
$colour = $page->similarLinksColour ? "row--$page->similarLinksColour": "";

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
<div class="row row--halves similar-links $colour">
    <div class="container">
        {$linksContent}
    </div>
</div>
HTML;
}
