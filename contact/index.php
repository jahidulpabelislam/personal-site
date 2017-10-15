<?php
$title = "Contact";
$keywords = "";
$description = "Contact Or Find Contact Information for Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$description2 = "Send Your Feedback &amp; Enquires My Way.";
include $_SERVER['DOCUMENT_ROOT'].'/inc/header.php';
?>
                <div class="article">
                    <div class="container">
                        <h3 class="article__header">Form</h3>
                        <p>Use this contact form to give me a message quickly.</p>
                        <p><span class="required">*</span> indicates a required field</p>

                        <!--validate using JavaScript on submit-->
                        <form id="contactForm" name="contactForm" method="post" onsubmit="return validateForm()">

                            <div class="input-group wow fadeInLeft" data-wow-delay="0.4s">
                                <label for="emailInput">Your Email Address <span class="required">*</span></label>
                                <!--validate using JavaScript on input-->
                                <input class="input" type="email" name="emailInput" placeholder="e.g. joe@example.com" required tabindex="1" oninput="validateEmail(this.value);" id="emailInput" title="Email Address">
                                <p id="emailFeedback" class="feedback error"></p>
                            </div>

                            <div class="input-group wow fadeInRight" data-wow-delay="0.8s">
                                <label for="subjectInput">The Message Subject</label>
                                <input class="input" type="text" name="subjectInput" placeholder="e.g. Site Feedback" tabindex="2" id="subjectInput" title="Subject of Message">
                            </div>

                            <div class="input-group wow fadeInDown" data-wow-delay="1.2s" id="messageFormGroup">
                                <label for="messageInput">Your Message <span class="required">*</span></label>
                                <!--validate using JavaScript on input-->
                                <textarea class="input" name="messageInput" placeholder="e.g. Your site could do with more colour." required tabindex="3" oninput="validateMessage(this.value);" id="messageInput" title="The Message" rows="10"></textarea>
                                <p id="messageFeedback" class="feedback error"></p>
                            </div>

                            <p id="formFeedback" class="feedback"></p>
                            <button id="submit" type="submit" class="btn btn--blue wow fadeInUp" data-wow-delay="1.4s" data-loading-text="<i class='fa fa-spinner fa-spin'></i> Sending" data-initial-text="Send">Send</button>

                        </form>
                    </div>
                </div>

                <div class="article linkContainer">
                    <div class="container">
                        <div class="wow fadeInLeft" data-wow-delay="0.4s">
                            <h3 class="article__header">Drop me a old fashioned email.</h3>
                        </div>
                        <div class="wow fadeInRight" data-wow-delay="0.4s">
                            <a href="mailto:jahidul.pabel.islam@hotmail.com" target="_blank" class="emailLink">
                                <img src="../images/email.svg" alt="Email me" class="socialMediaImg emailImg">
                                <p class="socialMediaText emailAddress"> jahidul.pabel.islam@hotmail.com</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="article linkContainer">
                    <div class="container">
                        <div class="wow fadeInLeft" data-wow-delay="0.4s">
                            <h3 class="article__header">View my Linkedin profile.</h3>
                        </div>
                        <div class="wow fadeInRight" data-wow-delay="0.4s">
                            <a href="http://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="linkedinLink">
                                <img src="/images/linkedin.svg" alt="Find me on Linkedin /jahidulpabelislam" class="socialMediaImg linkedinImg">
                                <p class="socialMediaText" id="linkedinAt"> /jahidulpabelislam</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="article linkContainer">
                    <div class="container">
                        <div class="wow fadeInLeft" data-wow-delay="0.4s">
                            <h3 class="article__header">View code for projects and follow future projects.</h3>
                        </div>
                        <div class="wow fadeInRight" data-wow-delay="0.4s">
                            <a href="https://github.com/jahidulpabelislam" target="_blank" class="githubLink">
                                <img src="/images/github.svg" alt="Find me on GitHub /jahidulpabelislam" class="socialMediaImg githubImg">
                                <p class="socialMediaText" id="githubAt"> /jahidulpabelislam</p>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="article action">
                    <div class="container">
                        <div class="wow fadeInLeft" data-wow-delay="0.4s">
                            <a class="btn btn--blue" href="/projects/">View My Work</a>
                        </div>

                        <div class="wow fadeInRight" data-wow-delay="0.4s">
                            <a class="btn btn--orange" href="/about/">Learn About Me</a>
                        </div>
                    </div>
                </div>

<?php
include $_SERVER['DOCUMENT_ROOT'].'/inc/footer.php';
?>