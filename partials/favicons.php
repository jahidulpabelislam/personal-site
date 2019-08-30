<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
?>

        <!-- Favicons/Icons for devices -->
        <link rel="apple-touch-icon" sizes="57x57" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-57x57.png"); ?>" />
        <link rel="apple-touch-icon" sizes="60x60" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-60x60.png"); ?>" />
        <link rel="apple-touch-icon" sizes="72x72" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-72x72.png"); ?>" />
        <link rel="apple-touch-icon" sizes="76x76" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-76x76.png"); ?>" />
        <link rel="apple-touch-icon" sizes="114x114" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-114x114.png"); ?>" />
        <link rel="apple-touch-icon" sizes="120x120" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-120x120.png"); ?>" />
        <link rel="apple-touch-icon" sizes="144x144" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-144x144.png"); ?>" />
        <link rel="apple-touch-icon" sizes="152x152" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-152x152.png"); ?>" />
        <link rel="apple-touch-icon" sizes="180x180" href="<?php echoWithAssetVersion("/assets/favicons/apple-touch-icon-180x180.png"); ?>" />
        <link rel="icon" type="image/png" sizes="32x32" href="<?php echoWithAssetVersion("/assets/favicons/favicon-32x32.png"); ?>" />
        <link rel="icon" type="image/png" sizes="194x194" href="<?php echoWithAssetVersion("/assets/favicons/favicon-194x194.png"); ?>" />
        <link rel="icon" type="image/png" sizes="192x192" href="<?php echoWithAssetVersion("/assets/favicons/android-chrome-192x192.png"); ?>" />
        <link rel="icon" type="image/png" sizes="16x16" href="<?php echoWithAssetVersion("/assets/favicons/favicon-16x16.png"); ?>" />
        <link rel="manifest" href="<?php echoWithAssetVersion("/assets/favicons/site.webmanifest"); ?>" />
        <link rel="mask-icon" href="<?php echoWithAssetVersion("/assets/favicons/safari-pinned-tab.svg"); ?>" color="#0375b4" />
        <link rel="shortcut icon" href="<?php echoWithAssetVersion("/favicon.ico"); ?>" />
        <meta name="msapplication-TileColor" content="#0375b4" />
        <meta name="msapplication-TileImage" content="<?php echoWithAssetVersion("/assets/favicons/mstile-144x144.png"); ?>" />
        <meta name="msapplication-config" content="<?php echoWithAssetVersion("/assets/favicons/browserconfig.xml"); ?>" />
        <meta name="theme-color" content="#f5f5f5" />
