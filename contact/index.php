<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/Site.php");
include_once($_SERVER["DOCUMENT_ROOT"] . "/PageRenderer.php");

$site = Site::get();
$pageRenderer = PageRenderer::get();

$headDesc = "Contact Or Find Contact Information for Jahidul Pabel Islam, a Full Stack Web &amp; Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$headerDesc = "Send Your Feedback &amp; Enquires My Way";

$pageData = [
    "title" => "Contact Me",
    "headDesc" => $headDesc,
    "headerDesc" => $headerDesc,
    "navTint" => "light",
];
$pageRenderer->addPageData($pageData);

$pageRenderer->renderHTMLHead();
$pageRenderer->renderNav();
$pageRenderer->renderHeader();
?>

                <section class="article">
                    <div class="container">
                        <p>Use the form below to quickly send me a message.</p>

                        <form class="contact-form" name="contact-form" method="POST" action="/contact/form-submission.php">
                            <p><span class="required">*</span> indicates a required field</p>

                            <div class="input-group">
                                <label for="email-input">Your Email Address <span class="required">*</span></label>
                                <input type="email" class="input" id="email-input" name="email-input" placeholder="e.g. joe@example.com" tabindex="1" title="Email Address" required />
                                <p class="feedback feedback--error" id="contact-form__email-feedback"></p>
                            </div>

                            <div class="input-group">
                                <label for="subject-input">The Message Subject</label>
                                <input type="text" class="input" id="subject-input" name="subject-input" placeholder="e.g. Site Feedback" title="Subject of Message" tabindex="2"  />
                            </div>

                            <div class="input-group input-group--message">
                                <label for="message-input">Your Message <span class="required">*</span></label>
                                <textarea class="input" id="message-input" name="message-input" placeholder="e.g. Your site could do with more colour." title="The Message" rows="10" tabindex="3" required></textarea>
                                <p class="feedback feedback--error" id="contact-form__message-feedback"></p>
                            </div>

                            <p class="feedback" id="contact-form__feedback"></p>
                            <button type="submit" class="btn btn--dark-green" id="submit" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Sending" data-initial-text="Send">Send</button>
                        </form>
                    </div>
                </section>

                <section class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <h3 class="article__header">Drop me a old school email</h3>
                        </div>
                        <div class="article__half">
                            <a class="social-link" href="mailto:me@jahidulpabelislam.com" target="_blank">
                                <img class="social-link__img social-link__img--email" src="<?php $site::echoWithAssetVersion("/assets/images/email.svg"); ?>" alt="Email me" />
                                <p class="social-link__text social-link__text--email">me@jahidulpabelislam.com</p>
                            </a>
                        </div>
                    </div>
                </section>

                <section class="article article--lime-green">
                    <div class="container">
                        <h3 class="article__header">Stay up to date with me</h3>
                        <div>
                            <i class="fa fa-3x fa-arrow-circle-down"></i>
                        </div>
                    </div>
                </section>

                <section class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <h4 class="article__header">View my LinkedIn</h4>
                        </div>
                        <div class="article__half">
                            <a class="social-link" href="https://uk.linkedin.com/in/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                                <img class="social-link__img social-link__img--linkedin" src="<?php $site::echoWithAssetVersion("/assets/images/linkedin.svg"); ?>" alt="Find me on LinkedIn /jahidulpabelislam" />
                                <p class="social-link__text social-link__text--linkedin">/jahidulpabelislam</p>
                            </a>
                        </div>
                    </div>
                </section>

                <section class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <h4 class="article__header">See &amp; follow my code</h4>
                        </div>
                        <div class="article__half">
                            <a class="social-link" href="https://github.com/jahidulpabelislam/" target="_blank" rel="noopener noreferrer">
                                <img class="social-link__img social-link__img--github" src="<?php $site::echoWithAssetVersion("/assets/images/github.svg"); ?>" alt="Find me on GitHub /jahidulpabelislam" />
                                <p class="social-link__text social-link__text--github">/jahidulpabelislam</p>
                            </a>
                        </div>
                    </div>
                </section>

                <section class="article article--halved">
                    <div class="container">
                        <div class="article__half">
                            <h4 class="article__header">See what I get up to</h4>
                        </div>
                        <div class="article__half">
                            <a class="social-link" href="https://www.instagram.com/jpi.dev/" target="_blank" rel="noopener noreferrer">
                                <span class="social-link__img social-link__img--instagram"><i></i></span>
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
$pageRenderer->renderFooter($similarLinks);
