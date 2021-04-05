<?php
$site = Site::get();
?>

<footer class="footer">
    <div class="container">
        <div class="footer__version">
            <p><?php renderFile("/assets/version.txt"); ?></p>
        </div>

        <div class="footer__links">
            <p>
                <a class="footer__link" href="<?php echo $site->getURL("/site-map/"); ?>">Site Map</a>
                <a class="footer__link" href="<?php echo $site->getURL("/privacy-policy/"); ?>">Privacy Policy</a>
            </p>
        </div>

        <div class="footer__legal">
            <p>&copy; <?php echo $site::NAME . " " . $site->getYearStarted() . " - " . date("Y"); ?></p>
        </div>
    </div>
</footer>
