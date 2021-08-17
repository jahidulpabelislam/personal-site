<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/../bootstrap.php");

$site = site();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $site->processFormSubmission();
    exit();
}

$page = page();

$name = $site::NAME;
$job = $site::JOB;

$headDescription = "Contact or find contact information for $name, a $job based at Bognor Regis, West Sussex down by the South Coast of England.";

$pageData = [
    "title" => "Contact Me",
    "headDescription" => $headDescription,
];
$page->addPageData($pageData);

$page->renderHtmlStart();
$page->renderHead();
$page->renderPageStart();
$page->renderNav();
$page->renderContentStart();
?>

<section class="contact-me">
    <div class="contact-me__column contact-me__column--header">
        <div>
            <h1 class="contact-me__title">Contact Me</h1>
            <hr class="contact-me__line-breaker" />
            <p>Drop Me An Email</p>
        </div>
    </div>
    <div class="contact-me__column contact-me__column--form">
        <form class="contact-me__form contact-form" name="contact-form" method="POST" action="/contact/form-submission.php">
            <div class="field">
                <label for="email-input" class="field__label">Your Email Address</label>
                <input type="email" class="contact-form__email input" id="email-input" name="email-input" placeholder="joe@example.com" title="Email Address" required />
                <p class="contact-form__email-feedback field__error"></p>
            </div>

            <div class="field">
                <label for="subject-input" class="field__label">Subject <span>(optional)</span></label>
                <input type="text" class="contact-form_subject input" id="subject-input" name="subject-input" placeholder="Site Feedback" title="Subject of Message" />
            </div>

            <div class="field">
                <label for="message-input" class="field__label">Your Message</label>
                <textarea class="contact-form__message input" id="message-input" name="message-input" placeholder="Your site could do with more colour." title="The Message" rows="10" required></textarea>
                <p class="contact-form__message-feedback field__error"></p>
            </div>

            <p class="contact-form__feedback"></p>
            <button
                type="submit"
                class="button button--dark-green contact-form__submit"
                id="submit"
                data-loading-text="<i class='fas fa-spinner fa-spin'></i> Sending"
                data-initial-text="Send Email"
            >
                Send Email
            </button>
        </form>
    </div>
</section>

<section class="connect">
    <div class="container">
        <div class="connect__column">
            <a class="social-link social-link--linkedin" href="https://uk.linkedin.com/in/<?php echo $site::SOCIAL_LINKEDIN; ?>/" target="_blank" rel="noopener noreferrer">
                <img class="social-link__image" src="<?php echo $site::asset("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /<?php echo $site::SOCIAL_LINKEDIN; ?>" />
                &nbsp;
                <p class="social-link__text">/<?php echo $site::SOCIAL_LINKEDIN; ?></p>
            </a>
            <a class="social-link social-link--github" href="https://github.com/<?php echo $site::SOCIAL_GITHUB; ?>/" target="_blank" rel="noopener noreferrer">
                <img class="social-link__image" src="<?php echo $site::asset("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /<?php echo $site::SOCIAL_GITHUB; ?>" />
                &nbsp;
                <p class="social-link__text">/<?php echo $site::SOCIAL_GITHUB; ?></p>
            </a>
            <a class="social-link social-link--instagram" href="https://www.instagram.com/<?php echo $site::SOCIAL_GITHUB; ?>/" target="_blank" rel="noopener noreferrer">
                <span class="social-link__image"><i></i></span>
                &nbsp;
                <p class="social-link__text">@<?php echo $site::SOCIAL_INSTAGRAM; ?></p>
            </a>
        </div>
        <div class="connect__column">
            <h2 class="connect__heading">Connect With Me</h2>
        </div>
    </div>
</section>

<?php
$similarLinks = [
    [
        "title" => "Projects",
        "url" => "/projects/",
        "text" => "View My Work",
        "colour" => "white",
    ],
    [
        "title" => "About",
        "url" => "/about/",
        "text" => "Learn About Me",
        "colour" => "white",
    ],
];
$page->similarLinksColour = "dark-blue";
$page->similarLinks = $similarLinks;
$page->renderSimilarLinks();
$page->renderContentEnd();
$page->renderFooter();
$page->renderCookieBanner();
$page->renderPageEnd();
$page->renderHtmlEnd();
