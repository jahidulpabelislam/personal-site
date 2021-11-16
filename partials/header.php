<?php
$site = site();
$page = page();
?>

<header class="header header--<?php echo $page->id; ?>">
    <div class="header__overlay">
        <div class="container">
            <h1 class="header__title"><?php echo $this->title; ?></h1>
            <?php if (!isset($this->hideHeaderHr) || !$this->hideHeaderHr) {
                ?>
                <hr class="header__line-breaker" />
                <?php
            }
            ?>
            <h2 class="header__description"><?php echo $this->description ?? ""; ?></h2>
            <?php
            if (isset($this->showSocialLinksHeader) && $this->showSocialLinksHeader) {
                ?>
                <div class="header__links">
                    <a class="social-link social-link--linkedin" href="https://linkto.jahidulpabelislam.com/linkedin/" target="_blank" rel="noopener noreferrer">
                        <img class="social-link__image" src="<?php echo $site::asset("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /<?php echo $site::SOCIAL_LINKEDIN; ?>" />
                    </a>
                    <a class="social-link social-link--github" href="https://linkto.jahidulpabelislam.com/github/" target="_blank" rel="noopener noreferrer">
                        <img class="social-link__image" src="<?php echo $site::asset("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /<?php echo $site::SOCIAL_GITHUB; ?>" />
                    </a>
                    <a class="social-link social-link--instagram" href="https://linkto.jahidulpabelislam.com/instagram/" target="_blank" rel="noopener noreferrer">
                        <span class="social-link__image"><i></i></span>
                    </a>
                </div>
                <?php
            }
            ?>
        </div>
    </div>
    <button class="header__scroll-to-content js-scroll-to-content">
        <span class="screen-reader-text">Scroll to main content</span>
        <?php renderFile("/assets/images/down-arrow.svg"); ?>
    </button>
</header>
