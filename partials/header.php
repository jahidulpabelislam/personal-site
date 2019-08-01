<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
?>

        <!-- Header to grab users attention -->
        <header class="header header--<?php echo $pageId; ?>">
            <div class="header__overlay">
                <div class="container">
                    <h1 class="header__title"><?php echo $title ?></h1>
                    <hr class="header__line-breaker" />
                    <h2 class="header__desc"><?php echo $desc ?></h2>
                    <img class="js-scroll-to-content header__scroll-to-content" src="<?php $site::echoWithAssetVersion("/assets/images/down-arrow.svg"); ?>" alt="Arrow point down" aria-label="Jump to content" />
                </div>
            </div>
        </header>

        <!-- Main content for page -->
        <main class="main-content">
            <div class="main-content__inner">
                <!-- Start dynamic content for page -->
