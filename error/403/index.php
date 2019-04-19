<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$pageId = $title = basename(__DIR__);
$pageDesc = "Forbidden Page";
$headDesc = "Error: 403 - Forbidden Page message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$pageData = [
    "pageId" => $pageId,
    "headTitle" => "{$title} - {$pageDesc}",
    "headDesc" => $headDesc,
    "headerTitle" => $title,
    "headerDesc" => $pageDesc,
];
$pageRenderer->addPageData($pageData);

$pageRenderer->renderHTMLHead();
$pageRenderer->renderNav();
$pageRenderer->renderHeader();
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img src="<?php $site->echoWithAssetVersion("/assets/images/no-entry.png"); ?>" alt="No entry sign" class="error__img">
                        </div>
                        <div class="article__half">
                            <p>The access to the requested page is strictly forbidden.</p>
                        </div>
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
        "colour" => "blue",
    ],
];
$pageRenderer->renderFooter($similarLinks);
