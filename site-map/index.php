<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$headDesc = "Site Map for Jahidul Pabel Islam's Portfolio, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

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
                                <a href="<?php $site->echoURL(); ?>" class="link-styled">Home</a>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("projects"); ?>" class="link-styled">Projects</a>
                                <ul>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/mind-map"); ?>" class="link-styled">Mind Map</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/bubbles-bargain-world"); ?>" class="link-styled">BubblesBargainWorld</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/lials"); ?>" class="link-styled">Lials</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/muesli"); ?>" class="link-styled">Muesli</a>
                                    </li>
                                    <li>
                                        <a href="/projects/izibalo-android/frame.html" class="link-styled">Izibalo - Android</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/e-games"); ?>" class="link-styled">e-games</a>
                                    </li>
                                    <li>
                                        <a href="<?php $site->echoURL("projects/sportsite-universal"); ?>" class="link-styled">Sportsite Universal</a>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("contact"); ?>" class="link-styled">Contact</a>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("about"); ?>" class="link-styled">About</a>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("privacy-policy"); ?>" class="link-styled">Privacy Policy</a>
                            </li>
                            <li>
                                <a href="<?php $site->echoURL("links"); ?>" class="link-styled">Links</a>
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
