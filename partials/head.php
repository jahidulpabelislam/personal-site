<?php
$site = site();
$page = page();

$name = $site::NAME;
$job = $site::JOB;

$pageId = $page->id;

$title = $this->title;
$description = $this->description ?? "";
?>

<head>
    <?php
    if ($pageId !== "home") {
        $suffix = " | $name - $job";

        if ($pageId === "portfolio") {
            $page->addJSGlobal("projects", "titleEnd", $suffix);
        }

        $title = "$title$suffix";
    }
    ?>

    <title><?php echo $title; ?></title>

    <?php $page->renderCanonicalUrls(); ?>

    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="author" content="<?php echo $name; ?>" />
    <meta name="description" content="<?php echo $description; ?>" />

    <meta http-equiv="X-UA-Compatible" content="IE=edge" />

    <meta property="og:locale" content="en_GB" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="<?php echo $title; ?>" />
    <meta property="og:description" content="<?php echo $description; ?>" />
    <meta property="og:url" content="<?php echo $site->getCurrentURL(true); ?>" />
    <meta property="og:site_name" content="<?php echo $name; ?>" />

    <?php
    $imagePath = "/assets/images/social-cards/$pageId.png";
    if (load($imagePath)->exists()) {
        $relativeImageURL = $site::asset($imagePath);
        $imageURL = $site->makeURL($relativeImageURL, true);
        ?>
        <meta property="og:image" content="<?php echo $imageURL; ?>" />
        <?php
    }
    ?>

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="<?php echo $title; ?>" />

    <?php $site->renderFavicons(); ?>

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
        <link href="<?php echo $site::asset($stylesheet); ?>" rel="stylesheet" type="text/css" media="all" title="style" />
        <?php
    }

    foreach ($page->deferredStylesheets as $stylesheet) {
        ?>
        <noscript><link href="<?php echo $site::asset($stylesheet["src"], $stylesheet["version"] ?? null); ?>" rel="stylesheet" type="text/css" media="all" title="style" /></noscript>
        <?php
    }
    ?>
</head>
