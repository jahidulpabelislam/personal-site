<?php
$page_title = "Contact";
$header_title = "Contact Me";
$keywords = "";
$description = "Contact Or Find Contact Information for Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$header_description = "Send Your Feedback &amp; Enquires My Way";
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>
                <div class="article">
                    <div class="container">
                        <h3 class="article__header">Form</h3>
                        <p>Use this contact form to give me a message quickly.</p>
                        <p><span class="required">*</span> indicates a required field</p>

                        <!--validate using JavaScript on submit-->
                        <form class="contact-form" name="contact-form" method="post">

                            <div class="input-group">
                                <label for="email-input">Your Email Address <span class="required">*</span></label>
                                <!--validate using JavaScript on input-->
                                <input class="input" type="email" name="email-input" placeholder="e.g. joe@example.com" required tabindex="1" id="email-input" title="Email Address">
                                <p id="email-feedback" class="feedback feedback--error"></p>
                            </div>

                            <div class="input-group">
                                <label for="subject-input">The Message Subject</label>
                                <input class="input" type="text" name="subject-input" placeholder="e.g. Site Feedback" tabindex="2" id="subject-input" title="Subject of Message">
                            </div>

                            <div class="input-group input-group--message">
                                <label for="message-input">Your Message <span class="required">*</span></label>
                                <!--validate using JavaScript on input-->
                                <textarea class="input" name="message-input" placeholder="e.g. Your site could do with more colour." required tabindex="3" id="message-input" title="The Message" rows="10"></textarea>
                                <p id="message-feedback" class="feedback feedback--error"></p>
                            </div>

                            <p id="form-feedback" class="feedback"></p>
                            <button id="submit" type="submit" class="btn btn--blue" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Sending" data-initial-text="Send">Send</button>

                        </form>
                    </div>
                </div>

                <div class="article article--50-50">
                    <div class="container">
                        <div class="article-50">
                            <h3 class="article__header">Drop me a old fashioned email.</h3>
                        </div>
                        <div class="article-50">
                            <a href="mailto:jahidul.pabel.islam@hotmail.com" target="_blank" class="social-link">
                                <img src="/assets/images/email.svg" alt="Email me" class="social-link__img social-link__img--email">
                                <p class="social-link__text social-link__text--email"> jahidul.pabel.islam@hotmail.com</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="article article--50-50">
                    <div class="container">
                        <div class="article-50">
                            <h3 class="article__header">View my Linkedin profile.</h3>
                        </div>
                        <div class="article-50">
                            <a href="https://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="social-link">
                                <img src="/assets/images/linkedin.svg" alt="Find me on Linkedin /jahidulpabelislam" class="social-link__img social-link__img--linkedin">
                                <p class="social-link__text social-link__text--linkedin"> /jahidulpabelislam</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="article article--50-50">
                    <div class="container">
                        <div class="article-50">
                            <h3 class="article__header">View code for projects and follow future projects.</h3>
                        </div>
                        <div class="article-50">
                            <a href="https://github.com/jahidulpabelislam" target="_blank" class="social-link">
                                <img src="/assets/images/github.svg" alt="Find me on GitHub /jahidulpabelislam" class="social-link__img social-link__img--github">
                                <p class="social-link__text social-link__text--github"> /jahidulpabelislam</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="article article--50-50">
                    <div class="container">
                        <div class="article-50">
                            <h3 class="article__header">Follow what I get up to.</h3>
                        </div>
                        <div class="article-50">
                            <a href="https://github.com/jahidulpabelislam" target="_blank" class="social-link">
                                <span class="social-link__img social-link__img--instagram"><i></i></span>
                                <p class="social-link__text social-link__text--instagram"> @jahidulcodes</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="article article--50-50">
                    <div class="container">
                        <div class="article-50">
                            <a class="btn btn--blue" href="/projects/">View My Work</a>
                        </div>

                        <div class="article-50">
                            <a class="btn btn--orange" href="/about/">Learn About Me</a>
                        </div>
                    </div>
                </div>

<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>