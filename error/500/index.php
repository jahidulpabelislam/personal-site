<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");

$site = Site::get();

$pageId = $title = basename(__DIR__);
$pageDesc = "Internal Server Error";
$headDesc = "Error: 500 - Internal Server Error message on the portfolio of Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$pageData = [
    "pageId" => $pageId,
    "headTitle" => "{$title} - {$pageDesc}",
    "headDesc" => $headDesc,
    "headerTitle" => $title,
    "headerDesc" => $pageDesc,
    "navTint" => "light",
];
$site->addPageData($pageData);

$site->renderHTMLHead();
$site->renderNav();
$site->renderHeader();
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img src="<?php $site->echoWithAssetVersion("/assets/images/oops.png"); ?>" alt="Road sign with the words oops" class="error__img">
                        </div>

                        <div class="article__half">
                            <p>The server couldn't follow your request and can not displayed content.</p>
                            <p>Either refresh the page or try again later.</p>
                            <p>If not it's not you, nor me, its the sysadmin guy (ME!)!</p>
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
$site->renderFooter($similarLinks);
