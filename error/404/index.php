<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/bootstrap.php");

$site = Site::get();
$page = Page::get();

$name = $site::NAME;

$error = basename(__DIR__);
$errorDescription = "Page Not Found";
$headDescription = "Error: {$error} - Page Not Found message on the portfolio of $name, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$directory = __DIR__;
$url = turnPathToURL($directory);
$pageData = [
    "id" => $error,
    "headTitle" => "{$error} - {$errorDescription}",
    "headDescription" => $headDescription,
    "headerTitle" => $error,
    "headerDescription" => $errorDescription,
    "currentURL" => $site->getURL($url, false),
];
$page->addPageData($pageData);

$page->renderHtmlStart();
$page->renderHead();
$page->renderPageStart();
$page->renderNav();
$page->renderHeader();
$page->renderContentStart();
?>

<div class="row row--split">
    <div class="container">
        <div class="row__column">
            <img class="row__column-image" src="<?php echo $site::asset("/assets/images/404.jpg"); ?>" alt="Missing page image" />
        </div>
        <div class="row__column">
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
        "colour" => "dark-blue",
    ],
    [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
        "colour" => "dark-blue",
    ],
];
$page->similarLinks = $similarLinks;
$page->renderSimilarLinks();
$page->renderSocialLinks();
$page->renderContentEnd();
$page->renderFooter();
$page->renderCookieBanner();
$page->renderPageEnd();
$page->renderHtmlEnd();
