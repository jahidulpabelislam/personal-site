<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/../bootstrap.php");

$site = Site::get();
$page = Page::get();

$name = $site::NAME;
$job = $site::JOB;

$headDescription = "Site map for $name's Portfolio, a {$job} based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "title" => "Site Map",
    "headDescription" => $headDescription,
    "navTint" => "light",
];
$page->addPageData($pageData);

$page->renderHtmlStart();
$page->renderHead();
$page->renderPageStart();
$page->renderNav();
$page->renderHeader();
$page->renderContentStart();
?>

<div class="row row--grey">
    <div class="container">
        <ul class="site-map">
            <?php
            $pages = [
                "Home" => "/",
                "Projects" => "/projects",
                "Contact" => "/contact",
                "About" => "/about",
                "Privacy Policy" => "/privacy-policy",
            ];

            foreach ($pages as $title => $url) {
                ?>
                <li>
                    <a class="link" href="<?php $site->echoURL($url); ?>"><?php echo $title; ?></a>
                </li>
                <?php
            }
            ?>
        </ul>
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
