<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/bootstrap.php");

$site = Site::get();
$page = Page::get();

$error = basename(__DIR__);
$errorDescription = "Internal Server Error";
$headDescription = "Error: {$error} - Internal Server Error message on the portfolio of Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "{$error} - {$errorDescription}",
    "headDescription" => $headDescription,
    "headerTitle" => $error,
    "headerDescription" => $errorDescription,
    "navTint" => "light",
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();
?>

                <div class="row row--split">
                    <div class="container">
                        <div class="row__column">
                            <img class="row__column-image" src="<?php echoWithAssetVersion("/assets/images/oops.png"); ?>" alt="Road sign with the words oops" />
                        </div>

                        <div class="row__column">
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
    ],
    [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
    ],
];
$page->renderFooter($similarLinks);
