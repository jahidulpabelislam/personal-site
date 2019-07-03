<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$error = basename(__DIR__);
$errorDesc = "Forbidden Page";
$headDesc = "Error: {$error} - Forbidden Page message on the portfolio of Jahidul Pabel Islam, a Full Stack Web &amp; Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$pageData = [
    "headTitle" => "{$error} - {$errorDesc}",
    "headDesc" => $headDesc,
    "headerTitle" => $error,
    "headerDesc" => $errorDesc,
];
$pageRenderer->addPageData($pageData);

$pageRenderer->renderHTMLHead();
$pageRenderer->renderNav();
$pageRenderer->renderHeader();
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img class="error__img" src="<?php $site::echoWithAssetVersion("/assets/images/no-entry.png"); ?>" alt="No entry sign" />
                        </div>
                        <div class="article__half">
                            <p>Access to the requested page is strictly forbidden.</p>
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
        "colour" => "dark-blue",
    ],
];
$pageRenderer->renderFooter($similarLinks);
