<?php
$site = site();
?>

<footer class="footer">
    <div class="container">
        <p class="footer__version">
            <?php renderFile(ROOT . "/assets/version.txt", false); ?>
        </p>

        <div class="footer__links">
            <a class="footer__link" href="<?php echo $site->makeURL("/privacy-policy/"); ?>">Privacy Policy</a>
            <a class="footer__link" href="https://links.jahidulpabelislam.com/" target="_blank">My Links</a>
        </div>

        <p class="footer__legal">
            &copy; <?php echo date("Y") . " " . $site::NAME; ?>
        </p>

        <img
            class="footer__logo"
            src="<?php echo $site::asset("/assets/images/logo-v2-2.png"); ?>"
            alt="<?php echo $site::NAME; ?>'s Logo"
        />
    </div>
</footer>
