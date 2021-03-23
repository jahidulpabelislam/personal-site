<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/bootstrap.php");

$site = Site::get();
$page = Page::get();

$error = basename(__DIR__);
$errorDescription = "Unauthorized";
$headDescription = "Error: {$error} - Unauthorized message on the portfolio of Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "{$error} - {$errorDescription}",
    "headDescription" => $headDescription,
    "headerTitle" => $error,
    "headerDescription" => $errorDescription,
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();
?>

                <div class="row row--split">
                    <div class="container">
                        <div class="row__column">
                            <img class="row__column-image" src="<?php echoWithAssetVersion("/assets/images/no-entry.png"); ?>" alt="No entry sign" />
                        </div>
                        <div class="row--split">
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
        "colour" => "dark-blue",
    ],
    [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
        "colour" => "dark-blue",
    ],
];
$page->renderFooter($similarLinks);
