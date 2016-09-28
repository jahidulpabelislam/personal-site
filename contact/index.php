<?php
    $title = "Contact";
    $keywords = "";
    $description = "Contact Or Find Contact Information for Jahidul Pabel Islam, a Web and Software Developer in Bognor Regis, West Sussex Down by the South Coast of England.";
    $description2 = "Send Your Feedback &amp; Enquires My Way";
    include '../inc/header.php';
?>
                <script src="/lib/formValidator.js"></script>

                <p id="formConformation">
                    <?php

                    //checks if user clicked submit
                    if (isset($_POST['submit'])) {

                        $fail = true;

                        //the address to send mail to
                        $to = 'jahidul.pabel.islam@hotmail.com';

                        //the subject user provided for message
                        $subject = $_POST['subject'];

                        //the message user wrote
                        $message = $_POST['message'];

                        //the email user provided to reply to
                        $email = trim($_POST['email']);

                        //creates the header for sending email
                        $headers = 'From: contact@jahidulpabelislam.net16.net' . "\r\n" . 'Reply-To: ' . $email;

                        //checks if message is not empty
                        if (trim($message) != "") {

                            //checks if email is not empty
                            if ($email != "") {

                                //checks if email provided is valid using REGEX
                                if (preg_match("/\b[\w._-]+@[\w-]+.[\w]{2,}\b/im", $email)) {

                                    //if user didn't provide subject create a default one
                                    if (trim($subject) == "") $subject = 'ePortfolio Contact Form';

                                    //try to send email
                                    if (mail($to, $subject, $message, $headers)) {
                                        echo "<span class='formFeedback correct'>Your message has been sent.</span>";
                                        $fail = false;
                                    }

                                    //if not sent give message
                                    else echo '<span class="formFeedback error">Something went wrong, please try again.</span>';
                                }
                            }
                        }
                    }

                    ?>
                </p>

                <p class="article">Please feel free to contact me. All my details are below.</p>

                <div class="article">
                    <h3>Form</h3>
                    <p>Use this contact form to give me a message quickly.</p>
                    <p><span class="required">*</span> indicates a required field</p>
                    
                    <!--validate using JavaScript on submit-->
                    <form id="contactForm" name="contactForm" method="post" onsubmit="return window.portfolio.form.validateForm(this)">

                        <label for="email">Email Address <span class="required">*</span></label>
                        <p id="emailFeedback">

                            <?php

                            if (isset($email)) {
                                //checks if email is empty
                                if ($email == "") {
                                    echo "<span class='formFeedback error'>Email Address isn't provided.</span>";

                                } else if (!preg_match("/\b[\w._-]+@[\w-]+.[\w]{2,}\b/im", $email)) { //checks if email isn't valid
                                    echo "<span class='formFeedback error'>Email Address isn't valid.</span>";
                                }
                            }

                            ?>

                        </p>

                        <input type="email" name="email" placeholder="e.g. joe@example.com" required tabindex="1" oninput="window.portfolio.form.validateEmail(this.value);" class="input" id="email"  title="Email Address" value="<?php if ($fail) echo $email ?>">
                        <!--validate using JavaScript on input-->

                        <label for="subject">Subject</label>
                        <input type="text" name="subject" placeholder="e.g. Site Feedback" tabindex="2" class="input" id="subject" title="Subject of Message" value="<?php if ($fail) echo $subject ?>">

                        <label for="message">Message <span class="required">*</span></label>

                        <p id="messageFeedback">

                            <?php
                                //checks if message is empty
                                if (isset($message) && trim($message) == "") echo "<span class='formFeedback error'>Message isn't provided.</span>";
                            ?>

                        </p>

                        <textarea name="message" placeholder="e.g. Your site could do with more colour." required tabindex="3" oninput="window.portfolio.form.validateMessage(this.value);" class="input" id="message" title="The Message" ><?php if ($fail) echo $message ?></textarea>
                        <!--validate using JavaScript on input-->
                        
                        <p id="formFeedback"></p>
                        <p id="emailFeedback2"> </p>

                        <p id="messageFeedback2"></p>

                        <button name="submit" type="submit" class="btn btn-lg btn-primary btn-block">Submit</button>

                    </form>
                </div>

                <div class="article">
                    <h3>Email</h3>
                    <p>Use the following email address to drop me a email.</p>
                    <a href="mailto:jahidul.pabel.islam@hotmail.com" target="_blank"><img src="../images/email.svg"
                                                                          alt="Email me" class="socialMedia email"></a>
                    <a href="mailto:jahidul.pabel.islam@hotmail.com" target="_blank"> jahidul.pabel.islam@hotmail.com</a>
                </div>

                <div class="article">
                    <h3>Linkedin</h3>
                    <p>View my profile on Linkedin.</p>
                    <a href="http://uk.linkedin.com/in/jahidulpabelislam" target="_blank"><img src="../images/linkedin.svg"
                                                                           alt="Find me on Linkedin /jahidulpabelislam" class="socialMedia linkedin"></a>
                    <a href="http://uk.linkedin.com/in/jahidulpabelislam" target="_blank">/jahidulpabelislam</a>
                </div>

                <div class="article">
                    <h3>GitHub</h3>
                    <p>Look at all my code for projects i've done and follow future projects.</p>
                    <a href="https://github.com/jahidulpabelislam" target="_blank"><img src="../images/github.svg"
                                                                                alt="Find me on GitHub /jahidulpabelislam" class="socialMedia github"></a>
                    <a href="https://github.com/jahidulpabelislam" target="_blank">/jahidulpabelislam</a>
                </div>

                <div class="article action">
                    <div>
                        <a class="btn btn-primary" href="/projects/">View My Work</a>
                    </div>
            
                    <div>
                        <a class="btn btn-warning" href="/about/">Learn About Me</a>
                    </div>
                </div>
<?php
include '../inc/footer.html';
?>