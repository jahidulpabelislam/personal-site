<?php
$title = "Contact";
$keywords = "";
$description = "Contact Or Find Contact Information for Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
$description2 = "Send Your Feedback &amp; Enquires My Way.";
include '../inc/header.php';
?>
    <div class="article">
        <div class="container">
            <h3>Form</h3>
            <p>Use this contact form to give me a message quickly.</p>
            <p><span class="required">*</span> indicates a required field</p>

            <!--validate using JavaScript on submit-->
            <form id="contactForm" name="contactForm" method="post" onsubmit="return validateForm()">

                <div class="form-group">
                    <label for="emailInput">Your Email Address <span class="required">*</span></label>
                    <!--validate using JavaScript on input-->
                    <input class="form-control" type="email" name="emailInput" placeholder="e.g. joe@example.com" required tabindex="1"
                           oninput="validateEmail(this.value);" id="emailInput"
                           title="Email Address">
                    <p id="emailFeedback" class="feedback error"></p>
                </div>

                <div class="form-group">
                    <label for="subjectInput">The Message Subject</label>
                    <input class="form-control" type="text" name="subjectInput" placeholder="e.g. Site Feedback" tabindex="2" id="subjectInput"
                           title="Subject of Message">
                </div>

                <div class="form-group">
                    <label for="messageInput">Your Message <span class="required">*</span></label>
                    <!--validate using JavaScript on input-->
                    <textarea class="form-control" name="messageInput" placeholder="e.g. Your site could do with more colour." required tabindex="3"
                              oninput="validateMessage(this.value);" id="messageInput"
                              title="The Message" rows="10"></textarea>
                    <p id="messageFeedback" class="feedback error"></p>
                </div>

                <p id="formFeedback" class="feedback"></p>
                <button id="submit" type="submit" class="btn btn-lg btn-primary btn-block" data-loading-text="<i class='fa fa-spinner fa-spin '></i> Sending">Send</button>

            </form>
        </div>
    </div>

    <div class="article">
        <div class="container">
            <h3>Email</h3>
            <p>Use the following email address to drop me a email.</p>
            <a href="mailto:jahidul.pabel.islam@hotmail.com" target="_blank" class="emailLink">
                <img src="../images/email.svg" alt="Email me" class="socialMediaImg emailImg">
                <p class="socialMediaText emailAddress"> jahidul.pabel.islam@hotmail.com</p>
            </a>
        </div>
    </div>

    <div class="article">
        <div class="container">
            <h3>Linkedin</h3>
            <p>View my profile on Linkedin.</p>
            <a href="http://uk.linkedin.com/in/jahidulpabelislam" target="_blank" class="linkedinLink">
                <img src="/images/linkedin.svg" alt="Find me on Linkedin /jahidulpabelislam" class="socialMediaImg linkedinImg">
                <p class="socialMediaText" id="linkedinAt"> /jahidulpabelislam</p>
            </a>
        </div>
    </div>

    <div class="article">
        <div class="container">
            <h3>GitHub</h3>
            <p>Look at all my code for projects i've done and follow future projects.</p>
            <a href="https://github.com/jahidulpabelislam" target="_blank" class="githubLink">
                <img src="/images/github.svg" alt="Find me on GitHub /jahidulpabelislam" class="socialMediaImg githubImg">
                <p class="socialMediaText" id="githubAt"> /jahidulpabelislam</p>
            </a>
        </div>
    </div>

    <div class="article action">
        <div class="container">
            <div>
                <a class="btn btn-primary" href="/projects/">View My Work</a>
            </div>

            <div>
                <a class="btn btn-warning" href="/about/">Learn About Me</a>
            </div>
        </div>
    </div>

    <script src="/lib/helperFunctions.js"></script>
    <script src="/lib/xhr.js"></script>
    <script src="/lib/form.js"></script>
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">

<?php
include '../inc/footer.html';
?>