<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/bootstrap.php");

$site = Site::get();
$page = Page::get();

$headDesc = "Social media links for Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "headTitle" => "Social Media Links",
    "headDesc" => $headDesc,
];
$page->addPageData($pageData);

$page->renderHTMLHead();
?>

        <main class="main-content social-links-page">
            <div class="container">
                <div class="social-link-container">
                    <a class="social-link" href="https://facebook.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                        <img class="social-link__image social-link__image--facebook" src="<?php echoWithAssetVersion("/assets/images/logos/facebook.svg"); ?>" alt="Add Me facebook.com/jahidulpabelislam" />
                        <p class="social-link__text social-link__text--facebook">/jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a class="social-link" href="https://twitter.com/itsjahidulislam/" target="_blank" rel="noopener noreferrer">
                        <img class="social-link__image social-link__image--twitter" src="<?php echoWithAssetVersion("/assets/images/logos/twitter.png"); ?>" alt="Follow Me @ItsJahidulIslam" />
                        <p class="social-link__text social-link__text--twitter">@ItsJahidulIslam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a class="social-link" href="https://instagram.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                        <span class="social-link__image social-link__image--instagram"><i></i></span>
                        <p class="social-link__text social-link__text--instagram">@jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container social-link-container--snapchat">
                    <a class="social-link" href="https://snapchat.com/add/jahidulpislam/" target="_blank" rel="noopener noreferrer">
                        <object class="social-link__image social-link__image--snapchat" data="https://feelinsonice-hrd.appspot.com/web/deeplink/snapcode?username=jahidulpislam&amp;type=PNG" type="image/png"></object>
                        <p class="social-link__text social-link__text--snapchat">jahidulpislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a class="social-link" href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                        <img class="social-link__image social-link__image--linkedin" src="<?php echoWithAssetVersion("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" />
                        <p class="social-link__text social-link__text--linkedin">/jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a class="social-link" href="https://github.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                        <img class="social-link__image social-link__image--github" src="<?php echoWithAssetVersion("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" />
                        <p class="social-link__text social-link__text--github">/jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a class="social-link" href="https://instagram.com/jpi.dev/" target="_blank" rel="noopener noreferrer">
                        <span class="social-link__image social-link__image--instagram"><i></i></span>
                        <p class="social-link__text social-link__text--instagram">@jpi.dev</p>
                    </a>
                </div>
            </div>
        </main>
        </div>

        <?php
        // Either output a compiled js file for whole page & libraries js files, or include individual files if debug is specified
        $scripts = [["src" => "/assets/js/social-links.min.js"]];
        if ($site->getIsDebug()) {
            $scripts = [
                ["src" => "/assets/js/third-party/jquery.min.js", "ver" => "1.11.3"],
                ["src" => "/assets/js/third-party/sticky-footer.min.js", "ver" => "1.1.2"],
                ["src" => "/assets/js/jpi/helpers.js"],
            ];
        }
        $page->addScripts($scripts);
        $page->renderScripts();

        $stylesheetsString = json_encode($page->stylesheets);
        $page->addInlineJS("
            jpi.helpers.loadStylesheets({$stylesheetsString});
            jpi.stickyFooter = new StickyFooter('.main-content');
        ", true);
        $page->renderInlineJS();
        ?>
    </body>
</html>
