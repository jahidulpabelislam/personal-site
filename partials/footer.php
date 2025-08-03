<?php
$app = app();
?>

<footer class="footer">
    <div class="container">
        <div class="footer__version">
            <?php renderFile(APP_ROOT . "/assets/version.txt", false); ?>
        </div>

        <div class="footer__links">
            <a class="footer__link" href="<?php echo $app->makeURL("/privacy-policy/"); ?>">Privacy Policy</a>
            <a class="footer__link" href="<?php echo $app->getLinksUrl(); ?>" target="_blank">My Links</a>
        </div>

        <div class="footer__legal">
            &copy; <?php echo date("Y") . " " . $app::NAME; ?>
        </div>

        <img
            class="footer__logo"
            src="<?php echo $app::asset("/logo.png", null, JPI_CORE_ROOT . "/assets"); ?>"
            alt="<?php echo $app::NAME; ?>'s Logo"
        />
    </div>
</footer>
