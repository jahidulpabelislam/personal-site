<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/bootstrap.php");

$site = Site::get();
$page = Page::get();

$headDescription = "Social media links for Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "Social Media Links",
    "headDescription" => $headDescription,
];
$page->addPageData($pageData);

$page->renderHtmlStart();
$page->renderHead();
$page->renderPageStart();
?>

<main class="main-content social-links-page">
    <div class="container">
        <div class="social-link-container">
            <a class="social-link social-link--facebook" href="https://facebook.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                <img class="social-link__image" src="<?php echoWithAssetVersion("/assets/images/logos/facebook.svg"); ?>" alt="Add Me facebook.com/jahidulpabelislam" />
                <p class="social-link__text">/jahidulpabelislam</p>
            </a>
        </div>

        <div class="social-link-container">
            <a class="social-link social-link--twitter" href="https://twitter.com/itsjahidulislam/" target="_blank" rel="noopener noreferrer">
                <img class="social-link__image" src="<?php echoWithAssetVersion("/assets/images/logos/twitter.png"); ?>" alt="Follow Me @ItsJahidulIslam" />
                <p class="social-link__text">@ItsJahidulIslam</p>
            </a>
        </div>

        <div class="social-link-container">
            <a class="social-link social-link--instagram" href="https://instagram.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                <span class="social-link__image"><i></i></span>
                <p class="social-link__text">@jahidulpabelislam</p>
            </a>
        </div>

        <div class="social-link-container social-link-container--snapchat">
            <a class="social-link social-link--snapchat" href="https://snapchat.com/add/jahidulpislam/" target="_blank" rel="noopener noreferrer">
                <object class="social-link__image" data="https://feelinsonice-hrd.appspot.com/web/deeplink/snapcode?username=jahidulpislam&amp;type=PNG" type="image/png"></object>
                <p class="social-link__text">jahidulpislam</p>
            </a>
        </div>

        <div class="social-link-container">
            <a class="social-link social-link--linkedin" href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                <img class="social-link__image" src="<?php echoWithAssetVersion("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" />
                <p class="social-link__text">/jahidulpabelislam</p>
            </a>
        </div>

        <div class="social-link-container">
            <a class="social-link social-link--github" href="https://github.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                <img class="social-link__image" src="<?php echoWithAssetVersion("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" />
                <p class="social-link__text">/jahidulpabelislam</p>
            </a>
        </div>

        <div class="social-link-container">
            <a class="social-link social-link--instagram" href="https://instagram.com/jpi.dev/" target="_blank" rel="noopener noreferrer">
                <span class="social-link__image"><i></i></span>
                <p class="social-link__text">@jpi.dev</p>
            </a>
        </div>
    </div>
</main>

<?php
$page->addInlineJS("jQuery('.main-content').adjustHeightForScreen();", true);
$page->renderPageEnd();
$page->renderHtmlEnd();
?>
