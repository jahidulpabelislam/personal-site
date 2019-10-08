<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/init.php");

$site = Site::get();
$page = Page::get();

$error = basename(__DIR__);
$errorDesc = "Page Not Found";
$headDesc = "Error: {$error} - Page Not Found message on the portfolio of Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$directory = __DIR__;
$url = turnPathToURL($directory);
$pageData = [
    "id" => $error,
    "headTitle" => "{$error} - {$errorDesc}",
    "headDesc" => $headDesc,
    "headerTitle" => $error,
    "headerDesc" => $errorDesc,
    "currentURL" => $site->getURL($url, false),
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();
?>

                <div class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <img class="error__img" src="<?php echoWithAssetVersion("/assets/images/404.jpg"); ?>" alt="Missing page image" />
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
        "colour" => "dark-blue",
    ],
];
$page->renderFooter($similarLinks);
