<?php
$site = site();
?>

<footer class="footer">
    <div class="container">
        <div class="footer__version">
            <p><?php renderFile(ROOT . "/assets/version.txt", false); ?></p>
        </div>

        <div class="footer__links">
            <p>
                <a class="footer__link" href="<?php echo $site->makeURL("/privacy-policy/"); ?>">Privacy Policy</a>
            </p>
            <p>
                <a class="footer__link" href="https://links.jahidulpabelislam.com/" target="_blank">My Links</a>
            </p>
        </div>

        <div class="footer__legal">
            <p>&copy; <?php echo $site::NAME . " " . $site->getYearStarted() . " - " . date("Y"); ?></p>
        </div>
    </div>
</footer>
