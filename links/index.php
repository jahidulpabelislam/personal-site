<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");

$pageId = "links";

$headTitle = "Social Media Links";
$headDesc = "Social Media Links for Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
Site::get()->echoHTMLHead($headTitle, $headDesc, $pageId);
?>

        <main class="main-content social-links-page">
            <div class="container">
                <div class="social-link-container">
                    <a href="https://facebook.com/jahidulpabelislam/" class="social-link" target="_blank">
                        <img src="<?php $site->echoWithAssetVersion("/assets/images/facebook.svg"); ?>" alt="Add Me facebook.com/jahidulpabelislam" class="social-link__img social-link__img--facebook">
                        <p class="social-link__text social-link__text--facebook"> /jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a href="https://twitter.com/itsjahidulislam/" class="social-link" target="_blank">
                        <img src="<?php $site->echoWithAssetVersion("/assets/images/twitter.png"); ?>" alt="Follow Me @ItsJahidulIslam" class="social-link__img social-link__img--twitter">
                        <p class="social-link__text social-link__text--twitter"> @ItsJahidulIslam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a href="https://instagram.com/jahidulpabelislam/" class="social-link" target="_blank">
                        <span class="social-link__img social-link__img--instagram"><i></i></span>
                        <p class="social-link__text social-link__text--instagram"> @jahidulpabelislam</p>
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
                        <p class="social-link__text social-link__text--linkedin"> /jahidulpabelislam</p>
                    </a>
                </div>

                <div class="social-link-container">
                    <a href="https://github.com/jahidulpabelislam/" class="social-link" target="_blank">
                        <img src="<?php $site->echoWithAssetVersion("/assets/images/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github">
                        <p class="social-link__text social-link__text--github"> /jahidulpabelislam</p>
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

        <!-- jQuery <?php //Necessary for StickyFooter js code ?> -->
        <script src="<?php $site->echoWithAssetVersion("/assets/js/third-party/jquery.min.js"); ?>" type="text/javascript"></script>
        <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/sticky-footer.js"); ?>" type="text/javascript"></script>
    </body>
</html>
