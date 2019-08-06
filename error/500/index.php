<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/classes/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/classes/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$error = basename(__DIR__);
$errorDesc = "Internal Server Error";
$headDesc = "Error: {$error} - Internal Server Error message on the portfolio of Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "{$error} - {$errorDesc}",
    "headDesc" => $headDesc,
    "headerTitle" => $error,
    "headerDesc" => $errorDesc,
    "navTint" => "light",
];
$pageRenderer->addPageData($pageData);

$pageRenderer->renderHTMLHead();
$pageRenderer->renderNav();
$pageRenderer->renderHeader();
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img class="error__img" src="<?php $site::echoWithAssetVersion("/assets/images/oops.png"); ?>" alt="Road sign with the words oops" />
                        </div>

                        <div class="article__half">
                            <p>The server couldn't follow your request so can't display the content.</p>
                            <p>You can either try refreshing the page or try again later.</p>
                            <p>If not it's not you, nor me, it's the SysAdmin guy...(Me)</p>
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
