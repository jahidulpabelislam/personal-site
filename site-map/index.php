<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/classes/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/classes/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$headDesc = "Site map for Jahidul Pabel Islam's Portfolio, a Web &amp; Software Developer based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "title" => "Site Map",
    "headDesc" => $headDesc,
    "navTint" => "light",
];
$pageRenderer->addPageData($pageData);

$pageRenderer->renderHTMLHead();
$pageRenderer->renderNav();
$pageRenderer->renderHeader();
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
$pageRenderer->renderFooter($similarLinks);
