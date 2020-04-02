<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
$page = Page::get();
?>

                    <?php
                    if (count($similarLinks)) {
                        $linksContent = "";
                        foreach ($similarLinks as $link) {
                            $pageTitle = $link["title"];
                            $buttonText = $link["text"] ?? $pageTitle;

                            $url = $link["url"];
                            $url = $site->getURL($url);

                            $buttonClasses = ["button"];

                            if (!empty($link["colour"])){
                                $buttonClasses[] =  "button--{$link["colour"]}";
                            }

                            $buttonClass = implode(" ", $buttonClasses);

                            $linksContent .= <<<HTML
                                <div class="row__column">
                                    <a class="{$buttonClass}" href="{$url}" title="Link to {$pageTitle} Page">
                                        {$buttonText}
                                    </a>
                                </div>
                                HTML;
                        }

                        echo <<<HTML
                            <div class="row row--split similar-links">
                                <div class="container">
                                    {$linksContent}
                                </div>
                            </div>
                            HTML;
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
        $page->renderJSTemplates();
        $page->renderScripts();
        $page->renderInlineJS();
        ?>
    </body>
</html>
