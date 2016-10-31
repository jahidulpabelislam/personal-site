<?php
$title = "Contact";
$keywords = "";
$description = "Contact Or Find Contact Information for Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$description2 = "Send Your Feedback &amp; Enquires My Way";
include '../inc/header.php';
?>

    <p class="article">Please feel free to contact me. All my details are below.</p>

    <div class="article">
        <h3>Form</h3>
        <p>Use this contact form to give me a message quickly.</p>
        <p><span class="required">*</span> indicates a required field</p>

        <!--validate using JavaScript on submit-->
        <form id="contactForm" name="contactForm" method="post" onsubmit="return window.portfolio.form.validateForm()">

            <label for="email">Email Address <span class="required">*</span></label>
            <p id="emailFeedback"></p>
            <!--validate using JavaScript on input-->
            <input type="email" name="email" placeholder="e.g. joe@example.com" required tabindex="1"
                   oninput="window.portfolio.form.validateEmail(this.value);" class="input" id="email"
                   title="Email Address">

            <label for="subject">Subject</label>
            <input type="text" name="subject" placeholder="e.g. Site Feedback" tabindex="2" class="input" id="subject"
                   title="Subject of Message">

            <label for="message">Message <span class="required">*</span></label>
            <p id="messageFeedback"></p>
            <!--validate using JavaScript on input-->
            <textarea name="message" placeholder="e.g. Your site could do with more colour." required tabindex="3"
                      oninput="window.portfolio.form.validateMessage(this.value);" class="input" id="message"
                      title="The Message"></textarea>

            <p id="formFeedback"></p>
            <p id="emailFeedback2"></p>
            <p id="messageFeedback2"></p>

            <button name="submit" type="submit" class="btn btn-lg btn-primary btn-block">Submit</button>

        </form>
    </div>

    <div class="article">
        <h3>Email</h3>
        <p>Use the following email address to drop me a email.</p>
        <a href="mailto:jahidul.pabel.islam@hotmail.com" target="_blank" class="emailLink">
            <img src="../images/email.svg" alt="Email me" class="socialMediaImg emailImg">
            <p class="socialMediaText emailAddress"> jahidul.pabel.islam@hotmail.com</p>
        </a>
    </div>

    <div class="article">
        <h3>Linkedin</h3>
        <p>View my profile on Linkedin.</p>
        <a href="http://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="linkedinLink">
            <img src="/images/linkedin.svg" alt="Find me on Linkedin /jahidulpabelislam" class="socialMediaImg linkedinImg">
            <p class="socialMediaText" id="linkedinAt"> /jahidulpabelislam</p>
        </a>
    </div>

    <div class="article">
        <h3>GitHub</h3>
        <p>Look at all my code for projects i've done and follow future projects.</p>
        <a href="https://github.com/jahidulpabelislam" target="_blank" class="githubLink">
            <img src="/images/github.svg" alt="Find me on GitHub /jahidulpabelislam" class="socialMediaImg githubImg">
            <p class="socialMediaText" id="githubAt"> /jahidulpabelislam</p>
        </a>
    </div>

    <div class="article action">
        <div>
            <a class="btn btn-primary" href="/projects/">View My Work</a>
        </div>

        <div>
            <a class="btn btn-warning" href="/about/">Learn About Me</a>
        </div>
    </div>

    <script src="/lib/helperFunctions.js"></script>
    <script src="/lib/xhr.js"></script>
    <script src="/lib/formValidator.js"></script>

<?php
include '../inc/footer.html';
?>