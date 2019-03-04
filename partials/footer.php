<?php
if (!defined("ROOT")) {
    die();
}
$site = Site::get();
?>

                <?php
                if (!empty($similarLinks)) {
                    echo "<div class='article article--halved article--similar-links'>";
                    echo "<div class='container'>";

                    foreach ($similarLinks as $link) {
                        $pageTitle = $link["title"];
                        $buttonText = !empty($link["text"]) ? $link["text"] : $title ;

                        $url = $link["url"];
                        $url = $site->getURL($url);

                        $buttonClasses = "btn";
                        $buttonColour = $link["colour"] ?? "";
                        $buttonClasses .= !empty($buttonColour) ? " btn--{$buttonColour}" : "";

                        echo "<div class='article__half'>";
                        echo "<a href='{$url}' class='{$buttonClasses}' title='Link to {$pageTitle} Page'>{$buttonText}</a>";
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
                        <a href="https://uk.linkedin.com/in/jahidulpabelislam/" class="social-link" target="_blank">
                            <img src="<?php $site->echoWithAssetVersion("/assets/images/linkedin.svg"); ?>" alt="Find me on Linkedin /jahidulpabelislam" class="social-links__img social-link__img social-link__img--linkedin">
                        </a>
                        <a href="https://github.com/jahidulpabelislam/" class="social-link" target="_blank">
                            <img src="<?php $site->echoWithAssetVersion("/assets/images/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" class="social-links__img social-link__img social-link__img--github">
                        </a>
                        <a href="https://www.instagram.com/jahidulcodes/" class="social-link" target="_blank">
                            <span class="social-links__img social-link__img social-link__img--instagram "><i></i></span>
                        </a>
                    </div>
                </section>
            </div>
        </main>

        <!-- Footer for site -->
        <footer class="footer">
            <div class="container">
                <div class="footer__version">
                    <p><?php echo file_get_contents(ROOT . "/assets/version.txt") . PHP_EOL; ?></p>
                </div>

                <div class="footer__links">
                    <p>
                        <a href="<?php $site->echoURL("site-map"); ?>" class="footer__link">Site Map</a>
                        <a href="<?php $site->echoURL("privacy-policy"); ?>" class="footer__link">Privacy Policy</a>
                        <a href="https://validator.w3.org/check/?uri=referer" class="footer__link" target="_blank">Valid HTML</a>
                        <a href="https://jigsaw.w3.org/css-validator/check/referer/" class="footer__link" target="_blank">Valid CSS</a>
                    </p>
                </div>

                <div class="footer__legal">
                    <?php
                    $orig = date_default_timezone_get();
                    date_default_timezone_set("Europe/London");
                    ?>
                    <p>&copy; Jahidul Pabel Islam 2010-<?php echo date("y"); ?> All Rights Reserved</p>
                    <?php date_default_timezone_set($orig); ?>
                </div>
            </div>
        </footer>

        <?php
        $site->echoCookieBanner();

        // Either output a compiled js file for all project & libraries js files, or include individual files if debug is specified
        if ($site->isDebug()) {
            ?>
            <!-- All individual js files for site as debug is specified -->
            <script src="<?php $site->echoWithAssetVersion("/assets/js/third-party/jquery.min.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/third-party/waypoint.min.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/third-party/jquery.countTo.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/expanded-slide-show.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/slide-show.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/helpers.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/ajax.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/projects.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/home.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/form.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/sticky-footer.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/nav.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/cookie-banner.js"); ?>" type="text/javascript"></script>
            <script src="<?php $site->echoWithAssetVersion("/assets/js/jpi/main.js"); ?>" type="text/javascript"></script>
            <?php
        }
        else {
            ?>
            <!-- Compiled project & libraries js files -->
            <script src="<?php $site->echoWithAssetVersion("/assets/js/main.min.js"); ?>" type="text/javascript"></script>
            <?php
        }
        ?>
    </body>
</html>