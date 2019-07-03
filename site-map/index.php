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
                                <a class="link-styled" href="<?php $site->echoURL(); ?>">Home</a>
                            </li>
                            <li>
                                <a class="link-styled" href="<?php $site->echoURL("projects"); ?>">Projects</a>
                                <ul>
                                    <li>
                                        <a class="link-styled" href="<?php $site->echoURL("projects/mind-map"); ?>">Mind Map</a>
                                    </li>
                                    <li>
                                        <a class="link-styled" href="<?php $site->echoURL("projects/bubbles-bargain-world"); ?>">BubblesBargainWorld</a>
                                    </li>
                                    <li>
                                        <a class="link-styled" href="<?php $site->echoURL("projects/lials"); ?>">Lials</a>
                                    </li>
                                    <li>
                                        <a class="link-styled" href="<?php $site->echoURL("projects/muesli"); ?>">Muesli</a>
                                    </li>
                                    <li>
                                        <a class="link-styled" href="/projects/izibalo-android/frame.html">Izibalo - Android</a>
                                    </li>
                                    <li>
                                        <a class="link-styled" href="<?php $site->echoURL("projects/e-games"); ?>">e-games</a>
                                    </li>
                                    <li>
                                        <a class="link-styled" href="<?php $site->echoURL("projects/sportsite-universal"); ?>">Sportsite Universal</a>
                                    </li>
                                </ul>
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
