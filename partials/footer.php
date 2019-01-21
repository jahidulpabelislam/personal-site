<?php
if (!defined("ROOT")) {
    die();
}
$site = Site::get();
?>
                <!-- End dynamic content -->
                <section class="social-links">
                    <div class="container">
                        <h5 class="social-links__header">Follow Me Here!</h5>
                        <a href="https://uk.linkedin.com/in/jahidulpabelislam/" class="social-link" target="_blank"><img src="/assets/images/linkedin.svg?v=1" alt="Find me on Linkedin /jahidulpabelislam" class="social-links__img social-link__img social-link__img--linkedin"></a>
                        <a href="https://github.com/jahidulpabelislam/" class="social-link" target="_blank"><img src="/assets/images/github.svg?v=1" alt="Find me on GitHub /jahidulpabelislam" class="social-links__img social-link__img social-link__img--github"></a>
                        <a href="https://www.instagram.com/jahidulcodes/" class="social-link" target="_blank"><span class="social-links__img social-link__img social-link__img--instagram "><i></i></span></a>
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
        if (!$site->isDebug()) {
            ?>
            <!-- Compiled project & libraries js files -->
            <script src="/assets/js/main.min.js?v=1" type="text/javascript"></script>
            <?php
        }
        else {
            ?>
            <!-- All individual js files for site as debug is specified -->
            <script src="/assets/js/third-party/jquery.min.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/third-party/waypoint.min.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/third-party/jquery.countTo.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/expanded-slide-show.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/slide-show.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/helpers.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/ajax.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/projects.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/home.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/form.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/sticky-footer.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/nav.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/cookie-banner.js?v=1" type="text/javascript"></script>
            <script src="/assets/js/jpi/main.js?v=1" type="text/javascript"></script>
            <?php
        }
        ?>
    </body>
</html>