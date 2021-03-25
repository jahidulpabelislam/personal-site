<?php
if (!defined("ROOT")) {
    die();
}

$site = Site::get();
?>

<section class="social-links">
    <div class="container">
        <h1 class="social-links__heading">Follow Me Here!</h1>
        <a class="social-link social-link--linkedin" href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
            <img class="social-links__image social-link__image" src="<?php echo $site::asset("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" />
        </a>
        <a class="social-link social-link--github" href="https://github.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
            <img class="social-links__image social-link__image" src="<?php echo $site::asset("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" />
        </a>
        <a class="social-link social-link--instagram" href="https://www.instagram.com/jpi.dev/" target="_blank" rel="noopener noreferrer">
            <span class="social-links__image social-link__image"><i></i></span>
        </a>
    </div>
</section>
