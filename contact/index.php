<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/src/init.php");

$site = Site::get();
$page = Page::get();

$headDesc = "Contact or find contact information for Jahidul Pabel Islam, a Full Stack Developer in Web &amp; Software based at Bognor Regis, West Sussex down by the South Coast of England.";
$headerDesc = "Send Your Feedback &amp; Enquires My Way";

$pageData = [
    "title" => "Contact Me",
    "headDesc" => $headDesc,
    "headerDesc" => $headerDesc,
    "navTint" => "light",
];
$page->addPageData($pageData);

$page->renderHTMLHead();
$page->renderNav();
$page->renderHeader();
?>

                <section class="row">
                    <div class="container">
                        <p>Use the form below to quickly send me a message.</p>

                        <form class="contact-form" name="contact-form" method="POST" action="/contact/form-submission.php">
                            <p><span class="required">*</span> indicates a required field</p>

                            <div class="input-group">
                                <label for="email-input">Your Email Address <span class="required">*</span></label>
                                <input type="email" class="input contact-form__email" id="email-input" name="email-input" placeholder="e.g. joe@example.com" title="Email Address" required />
                                <p class="feedback feedback--error contact-form__email-feedback"></p>
                            </div>

                            <div class="input-group">
                                <label for="subject-input">The Message Subject</label>
                                <input type="text" class="input contact-form_subject" id="subject-input" name="subject-input" placeholder="e.g. Site Feedback" title="Subject of Message" />
                            </div>

                            <div class="input-group input-group--full">
                                <label for="message-input">Your Message <span class="required">*</span></label>
                                <textarea class="input contact-form__message" id="message-input" name="message-input" placeholder="e.g. Your site could do with more colour." title="The Message" rows="10" required></textarea>
                                <p class="feedback feedback--error contact-form__message-feedback"></p>
                            </div>

                            <p class="feedback contact-form__feedback"></p>
                            <button type="submit" class="button button--dark-green contact-form__submit" id="submit" data-loading-text="<i class='fas fa-spinner fa-spin'></i> Sending" data-initial-text="Send">Send</button>
                        </form>
                    </div>
                </section>

                <section class="row row--split">
                    <div class="container">
                        <div class="row__column">
                            <h3 class="row__heading">Drop me a old school email</h3>
                        </div>
                        <div class="row__column">
                            <a class="social-link" href="mailto:me@jahidulpabelislam.com" target="_blank">
                                <img class="social-link__image social-link__image--email" src="<?php echoWithAssetVersion("/assets/images/email.svg"); ?>" alt="Email me" />
                                <p class="social-link__text social-link__text--email">me@jahidulpabelislam.com</p>
                            </a>
                        </div>
                    </div>
                </section>

                <section class="row row--lime-green">
                    <div class="container">
                        <h3 class="row__heading">Stay up to date with me</h3>
                        <div>
                            <i class="fa fa-3x fa-arrow-circle-down"></i>
                        </div>
                    </div>
                </section>

                <section class="row row--split">
                    <div class="container">
                        <div class="row__column">
                            <h4 class="row__heading">View my LinkedIn</h4>
                        </div>
                        <div class="row__column">
                            <a class="social-link" href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                                <img class="social-link__image social-link__image--linkedin" src="<?php echoWithAssetVersion("/assets/images/logos/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" />
                                <p class="social-link__text social-link__text--linkedin">/jahidulpabelislam</p>
                            </a>
                        </div>
                    </div>
                </section>

                <section class="row row--split">
                    <div class="container">
                        <div class="row__column">
                            <h4 class="row__heading">See &amp; follow my code</h4>
                        </div>
                        <div class="row__column">
                            <a class="social-link" href="https://github.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                                <img class="social-link__image social-link__image--github" src="<?php echoWithAssetVersion("/assets/images/logos/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" />
                                <p class="social-link__text social-link__text--github">/jahidulpabelislam</p>
                            </a>
                        </div>
                    </div>
                </section>

                <section class="row row--split">
                    <div class="container">
                        <div class="row__column">
                            <h4 class="row__heading">See what I get up to</h4>
                        </div>
                        <div class="row__column">
                            <a class="social-link" href="https://www.instagram.com/jpi.dev/" target="_blank" rel="noopener noreferrer">
                                <span class="social-link__image social-link__image--instagram"><i></i></span>
                                <p class="social-link__text social-link__text--instagram">@jpi.dev</p>
                            </a>
                        </div>
                    </div>
                </section>

<?php
$similarLinks = [
    [
        "title" => "Projects",
        "url" => "projects",
        "text" => "View My Work",
        "colour" => "dark-blue",
    ], [
        "title" => "About",
        "url" => "about",
        "text" => "Learn About Me",
        "colour" => "orange",
    ],
];
$page->renderFooter($similarLinks);
