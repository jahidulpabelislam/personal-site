<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$error = basename(__DIR__);
$errorDesc = "Page Not Found";
$headDesc = "Error: {$error} - Page Not Found message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$directory = __DIR__;
$url = $site->turnPathToURL($directory);
$pageData = [
    "pageId" => $error,
    "headTitle" => "{$error} - {$errorDesc}",
    "headDesc" => $headDesc,
    "headerTitle" => $error,
    "headerDesc" => $errorDesc,
    "currentURL" => $site->getURL($url, false),
];
$pageRenderer->addPageData($pageData);

$pageRenderer->renderHTMLHead();
$pageRenderer->renderNav();
$pageRenderer->renderHeader();
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img src="<?php $site->echoWithAssetVersion("/assets/images/404.jpg"); ?>" alt="Missing page image" class="error__img" />
                        </div>
                        <div class="article__half">
                            <p>The requested page can not be found.</p>
                            <p>Please consider going back to the previous page or try retyping the URL.</p>
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
