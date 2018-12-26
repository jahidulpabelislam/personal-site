<?php
include_once($_SERVER["DOCUMENT_ROOT"] . "/site.php");

$site = Site::get();

$pageId = "contact";

$headTitle = $headerTitle = "Contact Me";

$headDesc = "Contact Or Find Contact Information for Jahidul Pabel Islam, a Full Stack Web & Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";

$site->echoHTMLHead($headTitle, $headDesc, $pageId);

$headerDesc = "Send Your Feedback &amp; Enquires My Way";
$navTint = "light";

$site->echoHeader($headerTitle, $headerDesc, $pageId, $navTint);
?>

				<section class="article">
					<div class="container">
						<h3 class="article__header">Form</h3>
						<p>Use this contact form to give me a message quickly.</p>
						<p><span class="required">*</span> indicates a required field</p>

						<form class="contact-form" name="contact-form" method="post">

							<div class="input-group">
								<label for="email-input">Your Email Address <span class="required">*</span></label>
								<input class="input" type="email" name="email-input" placeholder="e.g. joe@example.com" required tabindex="1" id="email-input" title="Email Address">
								<p id="contact-form__email-feedback" class="feedback feedback--error"></p>
							</div>

							<div class="input-group">
								<label for="subject-input">The Message Subject</label>
								<input class="input" type="text" name="subject-input" placeholder="e.g. Site Feedback" tabindex="2" id="subject-input" title="Subject of Message">
							</div>

							<div class="input-group input-group--message">
								<label for="message-input">Your Message <span class="required">*</span></label>
								<textarea class="input" name="message-input" placeholder="e.g. Your site could do with more colour." required tabindex="3" id="message-input" title="The Message" rows="10"></textarea>
								<p id="contact-form__message-feedback" class="feedback feedback--error"></p>
							</div>

							<p id="contact-form__feedback" class="feedback"></p>
							<button id="submit" type="submit" class="btn btn--green" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Sending" data-initial-text="Send">Send</button>

						</form>
					</div>
				</section>

				<section class="article article--halved">
					<div class="container">
						<div class="article__half">
							<h3 class="article__header">Drop me a old school email</h3>
						</div>
						<div class="article__half">
							<a href="mailto:me@jahidulpabelislam.com" class="social-link" target="_blank">
								<img src="/assets/images/email.svg?v=1" alt="Email me" class="social-link__img social-link__img--email">
								<p class="social-link__text social-link__text--email"> me@jahidulpabelislam.com</p>
							</a>
						</div>
					</div>
				</section>

				<section class="article">
					<div class="container">
						<h3 class="article__header article__header--no-padding">Stay up to date with me</h3>
					</div>
				</section>

				<section class="article article--halved">
					<div class="container">
						<div class="article__half">
							<h3 class="article__header">View my Linkedin profile</h3>
						</div>
						<div class="article__half">
							<a href="https://uk.linkedin.com/in/jahidulpabelislam/" class="social-link" target="_blank" >
								<img src="/assets/images/linkedin.svg?v=1" alt="Find me on Linkedin /jahidulpabelislam" class="social-link__img social-link__img--linkedin">
								<p class="social-link__text social-link__text--linkedin"> /jahidulpabelislam</p>
							</a>
						</div>
					</div>
				</section>

				<section class="article article--halved">
					<div class="container">
						<div class="article__half">
							<h3 class="article__header">View & follow code for projects</h3>
						</div>
						<div class="article__half">
							<a href="https://github.com/jahidulpabelislam/" class="social-link" target="_blank" >
								<img src="/assets/images/github.svg?v=1" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github">
								<p class="social-link__text social-link__text--github"> /jahidulpabelislam</p>
							</a>
						</div>
					</div>
				</section>

				<section class="article article--halved">
					<div class="container">
						<div class="article__half">
							<h3 class="article__header">Follow what I get up to</h3>
						</div>
						<div class="article__half">
							<a href="https://www.instagram.com/jahidulcodes/" target="_blank" class="social-link">
								<span class="social-link__img social-link__img--instagram"><i></i></span>
								<p class="social-link__text social-link__text--instagram"> @jahidulcodes</p>
							</a>
						</div>
					</div>
				</section>

				<div class="article article--halved">
					<div class="container">
						<div class="article__half">
							<a href="<?php $site->echoURL("projects"); ?>" class="btn btn--blue">View My Work</a>
						</div>

						<div class="article__half">
							<a href="<?php $site->echoURL("about"); ?>" class="btn btn--orange">Learn About Me</a>
						</div>
					</div>
				</div>

<?php
$site->echoFooter();
?>