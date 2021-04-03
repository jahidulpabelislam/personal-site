<?php
$site = Site::get();
$page = Page::get();

$pageId = $page->id;
$title = $page->headerTitle ?? $page->title ?? "";
$description = $page->headerDescription ?? $page->description ?? "";
$showSocialLinksHeader = $page->showSocialLinksHeader ?? false;
?>

<header class="header header--<?php echo $pageId; ?>">
    <div class="header__overlay">
        <div class="container">
            <h1 class="header__title"><?php echo $title; ?></h1>
            <?php if (!$page->hideHeaderHr) {
                ?>
                <hr class="header__line-breaker" />
                <?php
            }
            ?>
            <h2 class="header__description"><?php echo $description; ?></h2>
            <?php
            if ($showSocialLinksHeader) {
                ?>
                <div class="header__links">
                    <a class="social-link social-link--linkedin" href="https://uk.linkedin.com/in/<?php echo $site::SOCIAL_LINKEDIN; ?>/" target="_blank" rel="noopener noreferrer">
                        <img class="social-link__image" src="<?php echo $site::asset("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /<?php echo $site::SOCIAL_LINKEDIN; ?>" />
                    </a>
                    <a class="social-link social-link--github" href="https://github.com/<?php echo $site::SOCIAL_GITHUB; ?>/" target="_blank" rel="noopener noreferrer">
                        <img class="social-link__image" src="<?php echo $site::asset("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /<?php echo $site::SOCIAL_GITHUB; ?>" />
                    </a>
                    <a class="social-link social-link--instagram" href="https://www.instagram.com/<?php echo $site::SOCIAL_INSTAGRAM; ?>" target="_blank" rel="noopener noreferrer">
                        <span class="social-link__image"><i></i></span>
                    </a>
                </div>
                <?php
            }
            ?>
            <button class="header__scroll-to-content js-scroll-to-content">
                <span class="screen-reader-text">Scroll to main content</span>
                <?php renderFile("/assets/images/down-arrow.svg"); ?>
            </button>
        </div>
    </div>
</header>
