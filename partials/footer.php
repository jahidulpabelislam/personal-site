<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
$page = Page::get();
?>

                <?php
                if (count($similarLinks)) {
                    echo "<div class='row row--split similar-links'>";
                    echo "<div class='container'>";

                    foreach ($similarLinks as $link) {
                        $pageTitle = $link["title"];
                        $buttonText = $link["text"] ?? $title;

                        $url = $link["url"];
                        $url = $site->getURL($url);

                        $buttonClasses = "button";
                        $buttonColour = $link["colour"] ?? "";
                        $buttonClasses .= !empty($buttonColour) ? " button--{$buttonColour}" : "";

                        echo "<div class='row__column'>";
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
                        <h1 class="social-links__heading">Follow Me Here!</h1>
                        <a class="social-link" href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                            <img class="social-links__image social-link__image social-link__image--linkedin" src="<?php echoWithAssetVersion("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" />
                        </a>
                        <a class="social-link" href="https://github.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                            <img class="social-links__image social-link__image social-link__image--github" src="<?php echoWithAssetVersion("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" />
                        </a>
                        <a class="social-link" href="https://www.instagram.com/jpi.dev/" target="_blank" rel="noopener noreferrer">
                            <span class="social-links__image social-link__image social-link__image--instagram"><i></i></span>
                        </a>
                    </div>
                </section>
            </div>
        </main>

        <!-- Footer for site -->
        <footer class="footer">
            <div class="container">
                <div class="footer__version">
                    <p><?php renderFile("/assets/version.txt"); ?></p>
                </div>

                <div class="footer__links">
                    <p>
                        <a class="footer__link" href="<?php $site->echoURL("site-map"); ?>">Site Map</a>
                        <a class="footer__link" href="<?php $site->echoURL("privacy-policy"); ?>">Privacy Policy</a>
                        <a class="footer__link" href="https://validator.w3.org/check/?uri=referer" target="_blank" rel="noopener">Valid HTML</a>
                        <a class="footer__link" href="https://jigsaw.w3.org/css-validator/check/referer/" target="_blank" rel="noopener">Valid CSS</a>
                    </p>
                </div>

                <div class="footer__legal">
                    <p>&copy; Jahidul Pabel Islam <?php echo $site->getYearStarted() . " - " . date("Y"); ?></p>
                </div>
            </div>
        </footer>

            <?php
            $page->renderCookieBanner();
            ?>

        </div>
        <!-- End of .page-container-->

        <?php
        // Either output a compiled js file for whole project & libraries js files, or include individual files if debug is specified
        $scripts = [["src" => "/assets/js/main.min.js"]];
        if ($site->getIsDebug()) {
            $scripts = [
                ["src" => "/assets/js/third-party/jquery.min.js", "ver" => "1.11.3"],
                ["src" => "/assets/js/third-party/waypoint.min.js", "ver" => "1.6.2"],
                ["src" => "/assets/js/third-party/jquery.countTo.js", "ver" => "1.2.0"],
                ["src" => "/assets/js/third-party/sticky-footer.min.js", "ver" => "1.1.2"],
                ["src" => "/assets/js/jpi/expanded-slide-show.js"],
                ["src" => "/assets/js/jpi/slide-show.js"],
                ["src" => "/assets/js/jpi/helpers.js"],
                ["src" => "/assets/js/jpi/templating.js"],
                ["src" => "/assets/js/jpi/ajax.js"],
                ["src" => "/assets/js/jpi/modal.js"],
                ["src" => "/assets/js/jpi/projects.js"],
                ["src" => "/assets/js/jpi/home.js"],
                ["src" => "/assets/js/jpi/form.js"],
                ["src" => "/assets/js/jpi/nav.js"],
                ["src" => "/assets/js/jpi/cookie-banner.js"],
                ["src" => "/assets/js/jpi/main.js"],
            ];
        }
        $page->addScripts($scripts);

        $page->renderJSGlobals();
        $page->renderScripts();
        ?>

        <script type="application/javascript">
            jQuery(document).on("ready", function() {
                jpi.helpers.loadStylesheets(<?php echo json_encode($page->stylesheets); ?>);
            });
        </script>
    </body>
</html>
