<?php
if (!defined("ROOT")) {
    die();
}
$site = Site::get();
?>

<!DOCTYPE html>
<html lang="en-gb">

    <head>

        <?php
        $environment = getenv("APPLICATION_ENV") ?? "development";

        // Only want Google Analytic for live site
        if ($environment === "production") {
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

        <?php
        $localDomain = $localURL = $site->getLocalDomain();
        $liveDomain = $liveURl = $site->getLiveDomain();

        if ($pageId !== "home") {
            $liveURl .= "{$pageId}/";
            $localURL .= "{$pageId}/";
        }

        $indexedPages = [
            "home",
            "projects",
            "contact",
            "about",
            "links",
            "privacy-policy",
            "site-map",
        ];

        if (in_array($pageId, $indexedPages) && $environment === "production") {
            echo "<link rel='canonical' href='{$liveURl}' />" . PHP_EOL;
        }
        else {
            echo "<meta name='robots' content='noindex,nofollow' />" . PHP_EOL;
        }
        ?>

        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Jahidul Pabel Islam" />
        <meta name="description" content="<?php echo $desc; ?>" />

        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="<?php echo $title; ?>" />
        <meta property="og:url" content="<?php echo $localURL; ?>" />
        <meta property="og:description" content="<?php echo $desc; ?>" />
        <meta property="og:site_name" content="Jahidul Pabel Islam" />

        <?php
        $imageLocation = "assets/images/portfolio-{$pageId}-preview.png";
        $filePath = rtrim(ROOT, " /") . "/" . ltrim($imageLocation, " /");
        if (file_exists($filePath)) {
            $relativeImageURL = $site->getWithAssetVersion($imageLocation);
            $imageURL = "{$localDomain}{$relativeImageURL}";
            ?>
            <meta property="og:image" content="<?php echo $imageURL; ?>" />
            <?php
        }
        ?>

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="<?php echo $title; ?>" />

        <!-- Custom stylesheet for site -->
        <?php if ($site->isDebug()) {
            ?>
            <link href="<?php $site->echoWithAssetVersion("/assets/css/main.css"); ?>" rel="stylesheet" title="style" media="all" type="text/css">
            <?php
        }
        else {
            ?>
            <link href="<?php $site->echoWithAssetVersion("/assets/css/main.min.css"); ?>" rel="stylesheet" title="style" media="all" type="text/css">
            <?php
        };
        ?>

        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet" title="style" media="all" type="text/css">

        <?php $site->echoFavicons(); ?>
    </head>

    <body>
