<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
$page = Page::get();
?>

<!DOCTYPE html>
<html lang="en-GB">

    <head>
        <?php
        // Only want Google Analytic for live site
        if ($site->isProduction()) {
            ?>
            <!-- Global site tag (gtag.js) - Google Analytics -->
            <script async src="https://www.googletagmanager.com/gtag/js?id=UA-70803146-2" type="text/javascript"></script>
            <script type="text/javascript">window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","UA-70803146-2");</script>
            <?php
        }

        $title = "{$title} | Jahidul Pabel Islam - Full Stack Developer";
        if ($pageId === "home") {
            $title = "Jahidul Pabel Islam's Portfolio - Full Stack Developer";
        }
        ?>

        <!-- All meta data for page -->
        <title><?php echo $title; ?></title>

        <?php $page->renderCanonicalURLs(); ?>

        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Jahidul Pabel Islam" />
        <meta name="description" content="<?php echo $description; ?>" />

        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="<?php echo $title; ?>" />
        <meta property="og:description" content="<?php echo $description; ?>" />
        <meta property="og:url" content="<?php echo $site->getRequestedLocalURL(); ?>" />
        <meta property="og:site_name" content="Jahidul Pabel Islam" />

        <?php
        $imagePath = "/assets/images/social-cards/{$pageId}.png";
        if ((new File($imagePath))->exists()) {
            $relativeImageURL = addAssetVersion($imagePath);
            $imageURL = $site->getURL($relativeImageURL, false, true);
            ?>
            <meta property="og:image" content="<?php echo $imageURL; ?>" />
            <?php
        }
        ?>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="<?php echo $title; ?>" />

        <?php $page->renderFavicons(); ?>

        <?php
        $inlineStylesheets = $page->inlineStylesheets;
        if (count($inlineStylesheets)) {
            ?>
            <style>
                <?php
                foreach ($inlineStylesheets as $inlineStylesheet) {
                    renderFile($inlineStylesheet);
                }
                ?>
            </style>
            <?php
        }

        foreach ($page->stylesheets as $stylesheet) {
            ?>
            <link href="<?php echo $stylesheet; ?>" rel="stylesheet" type="text/css" media="all" title="style" />
            <?php
        }

        foreach ($page->deferredStylesheets as $stylesheet) {
            ?>
            <noscript><link href="<?php echo $stylesheet; ?>" rel="stylesheet" type="text/css" media="all" title="style" /></noscript>
            <?php
        }
        ?>

    </head>

    <body>
        <div class="page-container">
