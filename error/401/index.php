<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$error = basename(__DIR__);
$errorDesc = "Unauthorized";
$headDesc = "Error: {$error} - Unauthorized message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

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
                            <img src="<?php $site::echoWithAssetVersion("/assets/images/no-entry.png"); ?>" alt="No entry sign" class="error__img" />
                        </div>
                        <div class="article--halved">
                            <p>The requested page needs authorization. You either supplied the wrong credentials or your browser can't supply the necessary credentials.</p>
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
