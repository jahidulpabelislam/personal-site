<?php
$site = site();
$page = page();

$isFull = $this->full ?? false;
?>

<header class="header <?php echo $isFull ? "header--full" : "" ?> header--<?php echo $page->id; ?>">
    <div class="header__overlay">
        <div class="container">
            <h1 class="header__title"><?php echo $this->title; ?></h1>
            <hr class="header__line-breaker" />
            <h2 class="header__description"><?php echo $this->description ?? ""; ?></h2>
        </div>
    </div>
    <?php if ($isFull): ?>
        <button class="header__scroll-to-content js-scroll-to-content">
            <span class="screen-reader-text">Scroll to main content</span>
            <?php renderFile("/assets/images/down-arrow.svg"); ?>
        </button>
    <?php endif; ?>
</header>
