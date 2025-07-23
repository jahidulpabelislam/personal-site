<?php
$site = site();
$page = page();
?>

<header class="header header--<?php echo $page->id; ?>">
    <div class="header__overlay">
        <div class="container">
            <h1 class="header__title"><?php echo $this->title; ?></h1>
            <?php if (!empty($this->description)): ?>
                <hr class="header__line-breaker" />
                <h2 class="header__description"><?php echo $this->description; ?></h2>
            <?php endif; ?>
        </div>
    </div>
</header>
