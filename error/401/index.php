<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/classes/init.php");

$site = Site::get();
$page = Page::get();

$error = basename(__DIR__);
$errorDesc = "Unauthorized";
$headDesc = "Error: {$error} - Unauthorized message on the portfolio of Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "{$error} - {$errorDesc}",
    "headDesc" => $headDesc,
    "headerTitle" => $error,
    "headerDesc" => $errorDesc,
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img class="error__img" src="<?php echoWithAssetVersion("/assets/images/no-entry.png"); ?>" alt="No entry sign" />
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
$page->renderFooter($similarLinks);
