<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/bootstrap.php");

$site = Site::get();
$page = Page::get();

$headDescription = "Site map for Jahidul Pabel Islam's Portfolio, a Web &amp; Software Developer based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "title" => "Site Map",
    "headDescription" => $headDescription,
    "navTint" => "light",
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();
?>

                <div class="row">
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
                                    <a class="link" href="<?php $site->echoURL($url); ?>"><?php echo $title ?></a>
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
        "colour" => "purple",
    ],
    [
        "title" => "Contact",
        "url" => "contact",
        "text" => "Get in Touch",
        "colour" => "red",
    ],
];
$page->renderFooter($similarLinks);
