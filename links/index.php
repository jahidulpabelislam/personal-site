<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$headDesc = "Social Media Links for Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$pageData = [
    "headTitle" => "Social Media Links",
    "headDesc" => $headDesc,
];
$pageRenderer->addPageData($pageData);

$pageRenderer->renderHTMLHead();
?>

        <main class="main-content social-links-page">
            <div class="container">
                <div class="social-link-container">
                    <a href="https://facebook.com/jahidulpabelislam/" class="social-link" target="_blank">
                        <img src="<?php $site->echoWithAssetVersion("/assets/images/facebook.svg"); ?>" alt="Add Me facebook.com/jahidulpabelislam" class="social-link__img social-link__img--facebook">
                        <p class="social-link__text social-link__text--facebook">/jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a href="https://twitter.com/itsjahidulislam/" class="social-link" target="_blank">
                        <img src="<?php $site->echoWithAssetVersion("/assets/images/twitter.png"); ?>" alt="Follow Me @ItsJahidulIslam" class="social-link__img social-link__img--twitter">
                        <p class="social-link__text social-link__text--twitter">@ItsJahidulIslam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a href="https://instagram.com/jahidulpabelislam/" class="social-link" target="_blank">
                        <span class="social-link__img social-link__img--instagram"><i></i></span>
                        <p class="social-link__text social-link__text--instagram">@jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container social-link-container--snapchat">
                    <a href="https://snapchat.com/add/jahidulpislam/" class="social-link" target="_blank">
                        <object data="https://feelinsonice-hrd.appspot.com/web/deeplink/snapcode?username=jahidulpislam&amp;type=PNG" type="image/png" class="social-link__img social-link__img--snapchat"></object>
                        <p class="social-link__text social-link__text--snapchat">jahidulpislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a href="https://uk.linkedin.com/in/jahidulpabelislam/" class="social-link" target="_blank">
                        <img src="<?php $site->echoWithAssetVersion("/assets/images/linkedin.svg"); ?>" alt="Find me on Linkedin /jahidulpabelislam" class="social-link__img social-link__img--linkedin">
                        <p class="social-link__text social-link__text--linkedin">/jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a href="https://github.com/jahidulpabelislam/" class="social-link" target="_blank">
                        <img src="<?php $site->echoWithAssetVersion("/assets/images/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github">
                        <p class="social-link__text social-link__text--github">/jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a href="https://instagram.com/jpi.dev/" class="social-link" target="_blank">
                        <span class="social-link__img social-link__img--instagram"><i></i></span>
                        <p class="social-link__text social-link__text--instagram">@jpi.dev</p>
                    </a>
                </div>
            </div>
        </main>

        <?php
        // Either output a compiled js file for the page & libraries js files, or include individual files if debug is specified
        if ($site->isDebug()) {
            ?>
            <!-- All individual js files for site as debug is specified -->
            <?php // Files necessary for StickyFooter js code ?>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/third-party/jquery.min.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/helpers.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/sticky-footer.js"); ?>" type="text/javascript"></script>
            <?php
        }
        else {
            ?>
            <!-- Compiled page & libraries js files -->
            <script src="<?php $site->echoWithAssetVersion("/assets/js/social-links.min.js"); ?>" type="text/javascript"></script>
            <?php
        }
        ?>
    </body>
</html>
