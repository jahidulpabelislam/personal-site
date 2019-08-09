<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
$pageRenderer = PageRenderer::get();
?>

            </div>
        </main>

        <?php
        if (count($similarLinks)) {
            echo "<div class='article article--halved article--similar-links'>";
            echo "<div class='container'>";

            foreach ($similarLinks as $link) {
                $pageTitle = $link["title"];
                $buttonText = $link["text"] ?? $title ;

                $url = $link["url"];
                $url = $site->getURL($url);

                $buttonClasses = "btn";
                $buttonColour = $link["colour"] ?? "";
                $buttonClasses .= !empty($buttonColour) ? " btn--{$buttonColour}" : "";

                echo "<div class='article__half'>";
                echo "<a class='{$buttonClasses}' href='{$url}' title='Link to {$pageTitle} Page'>{$buttonText}</a>";
                echo "</div>";
            }

            echo "</div>";
            echo "</div>";
        }
        ?>

        <!-- End dynamic content -->
        <section class="social-links">
            <div class="container">
                <h5 class="social-links__header">Follow Me Here!</h5>
                <a class="social-link" href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                    <img class="social-links__img social-link__img social-link__img--linkedin" src="<?php $site::echoWithAssetVersion("/assets/images/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" />
                </a>
                <a class="social-link" href="https://github.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                    <img class="social-links__img social-link__img social-link__img--github" src="<?php $site::echoWithAssetVersion("/assets/images/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" />
                </a>
                <a class="social-link" href="https://www.instagram.com/jpi.dev/" target="_blank" rel="noopener noreferrer">
                    <span class="social-links__img social-link__img social-link__img--instagram"><i></i></span>
                </a>
            </div>
        </section>

        <!-- Footer for site -->
        <footer class="footer">
            <div class="container">
                <div class="footer__version">
                    <p><?php echo file_get_contents(ROOT . "/assets/version.txt") . PHP_EOL; ?></p>
                </div>

                <div class="footer__links">
                    <p>
                        <a class="footer__link" href="<?php $site->echoURL("site-map"); ?>">Site Map</a>
                        <a class="footer__link" href="<?php $site->echoURL("privacy-policy"); ?>">Privacy Policy</a>
                        <a class="footer__link" href="https://validator.w3.org/check/?uri=referer" target="_blank" rel="noopener noreferrer">Valid HTML</a>
                        <a class="footer__link" href="https://jigsaw.w3.org/css-validator/check/referer/" target="_blank" rel="noopener noreferrer">Valid CSS</a>
                    </p>
                </div>

                <div class="footer__legal">
                    <p>&copy; Jahidul Pabel Islam <?php echo $site->getYearStarted() . " - " . date("Y"); ?></p>
                </div>
            </div>
        </footer>

        <?php
        $pageRenderer->renderCookieBanner();

        $pageRenderer->renderJSGlobals();
        $pageRenderer->renderJSScripts();
        ?>

        <?php
        // Either output a compiled js file for all project & libraries js files, or include individual files if debug is specified
        if ($site->isDebug()) {
            ?>
            <!-- All individual js files for site as debug is specified -->
            <script src="<?php $site::echoWithAssetVersion("/assets/js/third-party/jquery.min.js", "1.11.3"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/third-party/waypoint.min.js", "1.6.2"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/third-party/jquery.countTo.js", "1.2.0"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/third-party/sticky-footer.min.js", "1.1.2"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/expanded-slide-show.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/slide-show.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/helpers.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/ajax.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/projects.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/home.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/form.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/nav.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/cookie-banner.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site::echoWithAssetVersion("/assets/js/jpi/main.js"); ?>" type="text/javascript"></script>
            <?php
        }
        else {
            ?>
            <!-- Compiled project & libraries js files -->
            <script src="<?php $site::echoWithAssetVersion("/assets/js/main.min.js"); ?>" type="text/javascript"></script>
            <?php
        }

        $cssDir = $site->isDebug() ? "/assets/css/jpi" : "/assets/css";
        $cssExtension = $site->isDebug() ? "css" : "min.css";
        ?>

        <script type="text/javascript">
            jQuery(document).on("ready", function() {
                jpi.helpers.loadCSSFile("<?php $site::echoWithAssetVersion("{$cssDir}/main.{$cssExtension}"); ?>");
            });
        </script>
    </body>
</html>
