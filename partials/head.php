<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
$pageRenderer = PageRenderer::get();
?>

<!DOCTYPE html>
<html lang="en-gb">

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
        ?>

        <!-- All meta data for page -->
        <?php
        $title = "{$title} | Jahidul Pabel Islam - Full Stack Web & Software Developer";
        if ($pageId === "home") {
            $title = "Full Stack Web & Software Developer, Jahidul Pabel Islam's Portfolio";
        }
        ?>

        <title><?php echo $title; ?></title>

        <?php $pageRenderer->renderCanonicalURLs(); ?>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Jahidul Pabel Islam" />
        <meta name="description" content="<?php echo $desc; ?>" />

        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="<?php echo $title; ?>" />

        <meta property="og:url" content="<?php echo $site->getRequestedLocalURL(); ?>" />
        <meta property="og:description" content="<?php echo $desc; ?>" />
        <meta property="og:site_name" content="Jahidul Pabel Islam" />

        <?php
        $imageLocation = "assets/images/portfolio-{$pageId}-preview.png";
        $filePath = ROOT . "/" . ltrim($imageLocation, " /");
        if (file_exists($filePath)) {
            $localDomain = $site->getLocalDomain();
            $relativeImageURL = $site::getWithAssetVersion($imageLocation);
            $imageURL = "{$localDomain}{$relativeImageURL}";
            ?>
            <meta property="og:image" content="<?php echo $imageURL; ?>" />
            <?php
        }
        ?>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="<?php echo $title; ?>" />

        <?php $pageRenderer->renderFavicons(); ?>

        <!-- Custom stylesheet for site -->
        <?php if ($site->getIsDebug()) {
            ?>
            <link href="<?php $site::echoWithAssetVersion("/assets/css/main.css"); ?>" rel="stylesheet" title="style" media="all" type="text/css" />
            <?php
        }
        else {
            ?>
            <link href="<?php $site::echoWithAssetVersion("/assets/css/main.min.css"); ?>" rel="stylesheet" title="style" media="all" type="text/css" />
            <?php
        };
        ?>

        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" title="style" media="all" type="text/css" />
    </head>

    <body>
