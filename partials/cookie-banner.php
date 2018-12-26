<?php
if (!defined("ROOT")) {
    die();
}
?>

<div class="cookie-banner">
    <div class="container clearfix">
        <div class="cookie-banner__text">
            <p>This website uses cookies via Google Analytics, by viewing the website you agree to use cookies. Learn more about this <a href="<?php Site::get()->echoURL("privacy-policy"); ?>" class="link-styled cookie-banner__link">here</a>.</p>
        </div>
        <div class="cookie-banner__actions">
            <button class="cookie-banner__button js-close-cookie-banner btn btn--green">OK</button>
        </div>
    </div>
</div>