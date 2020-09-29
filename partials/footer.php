<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
?>

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
