<?php
$app = app();
?>

<section class="social-links">
    <div class="container">
        <h1 class="social-links__heading">Follow Me Here!</h1>
        <a class="social-link social-link--linkedin" href="<?php echo $app->getLinkToURL("linkedin") ?>" target="_blank" rel="noopener noreferrer">
            <img class="social-links__image social-link__image" src="<?php echo $app::asset("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /<?php echo $app::SOCIAL_LINKEDIN; ?>" />
        </a>
        <a class="social-link social-link--github" href="<?php echo $app->getLinkToURL("github") ?>" target="_blank" rel="noopener noreferrer">
            <img class="social-links__image social-link__image" src="<?php echo $app::asset("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /<?php echo $app::SOCIAL_GITHUB; ?>" />
        </a>
        <a class="social-link social-link--instagram" href="<?php echo $app->getLinkToURL("instagram") ?>" target="_blank" rel="noopener noreferrer">
            <span class="social-links__image social-link__image"><i></i></span>
        </a>
    </div>
</section>
