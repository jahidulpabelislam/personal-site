<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
?>

        <!-- Header to grab users attention -->
        <header class="jumbotron jumbotron--<?php echo $pageId; ?>">
            <div class="jumbotron__overlay">
                <div class="container">
                    <h1 class="jumbotron__title"><?php echo $title ?></h1>
                    <hr class="jumbotron__line-breaker">
                    <p class="jumbotron__desc"><?php echo $desc ?></p>
                    <img src="<?php $site->echoWithAssetVersion("/assets/images/down-arrow.svg"); ?>" class="js-scroll-to-content jumbotron__scroll-to-content" alt="Arrow point down" aria-label="Jump to content">
                </div>
            </div>
        </header>

        <!-- Main content for page -->
        <main class="main-content">
            <div class="main-content__inner">
                <!-- Start dynamic content for page -->
