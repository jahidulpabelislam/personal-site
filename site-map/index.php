<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/classes/init.php");

$site = Site::get();
$page = Page::get();

$headDesc = "Site map for Jahidul Pabel Islam's Portfolio, a Web &amp; Software Developer based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "title" => "Site Map",
    "headDesc" => $headDesc,
    "navTint" => "light",
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();
?>

                <div class="article">
                    <div class="container">
                        <ul class="site-map__list">
                            <li>
                                <a class="link-styled" href="<?php $site->echoURL(); ?>">Home</a>
                            </li>
                            <li>
                                <a class="link-styled" href="<?php $site->echoURL("projects"); ?>">Projects</a>
                            </li>
                            <li>
                                <a class="link-styled" href="<?php $site->echoURL("contact"); ?>">Contact</a>
                            </li>
                            <li>
                                <a class="link-styled" href="<?php $site->echoURL("about"); ?>">About</a>
                            </li>
                            <li>
                                <a class="link-styled" href="<?php $site->echoURL("privacy-policy"); ?>">Privacy Policy</a>
                            </li>
                            <li>
                                <a class="link-styled" href="<?php $site->echoURL("links"); ?>">Links</a>
                            </li>
                        </ul>
                    </div>
                </div>

<?php
$similarLinks = [
    [
        "title" => "Projects",
        "url" => "projects",
        "text" => "View My Work",
        "colour" => "purple",
    ], [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
        "colour" => "red",
    ],
];
$page->renderFooter($similarLinks);
