<?php
if (!defined("ROOT")) {
    die();
}
?>

        <div class="cookie-banner">
            <div class="container clearfix">
                <div class="cookie-banner__text">
                    <p>
                        This website uses cookies via Google Analytics, by viewing the website you agree to use cookies. Learn more about this
                        <a class="link-styled cookie-banner__link" href="<?php Site::get()->echoURL("privacy-policy"); ?>">here</a>.
                    </p>
                </div>
                <div class="cookie-banner__actions">
                    <button type="button" class="cookie-banner__button js-close-cookie-banner btn btn--dark-green">OK</button>
                </div>
            </div>
        </div>
