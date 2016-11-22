<?php

//title of page to use
$title = "Contact";

//the description to use for page
$description = "Contact Information for our shop Bubbles Bargain World.";

//the keywords to use for pages
$keywords = "shop, savings, discount, bubbles, bargain, world, west, sussex, bognor, regis, local, cards, toys, sweets, character, merchandise, party, arts, craft, novelty, gifts, stationary, glassware, baby, plaque, sign, souvenirs";

//include the header for page
include '../inc/header.php';

?>

    <!-- Start Dynamic content for page -->

    <p>Have any questions you want to ask or feedback you want to tell us use any of the following to contact us and we'll try and get back to your enquires as soon as possible.</p>

    <h2>Form</h2>
    <p>Use this contact form to give us a message quickly.</p>
    <p id="formFeedback">
        <?php
        //checks if user clicked submit
        if (isset($_POST['submit'])) {
            //the address to send mail to
            $to = 'jahidul.pabel.islam@hotmail.com';
            //the subject user provided for message
            $subject = $_POST['subject'];
            //the message user wrote
            $message = $_POST['message'];
            //the email user provided to reply to
            $email = trim($_POST['email']);
            //creates the header for sending email
            $headers = 'From: contact@bubblesbargainworld.co.uk' . "\r\n" . 'Reply-To: ' . $email;
            //checks if message is not empty
            if (trim($message) != "") {
                //checks if email is not empty
                if ($email != "") {
                    //checks if email provided is valid using REGEX
                    if (preg_match("/\b[\w._-]+@[\w-]+.[\w]{2,}\b/im", $email)) {
                        //if user didn't provide subject create a default one
                        if (trim($subject) == "") {
                            $subject = 'Bubbles Bargain World Contact Form';
                        }
                        //try to send email
                        if (mail($to, $subject, $message, $headers)) {
                            //if sent give message letting user know
                            echo 'Your message has been sent!';
                        } else {
                            //if not sent give message
                            echo '<span class="error">Something went wrong, please try again!</span>';
                        }
                    }
                }
            }
        }
        ?>
    </p>

    <p id="emailFeedback" class="error">
        <?php
        if (isset($email)) {
            //checks if email is empty
            if ($email == "") {
                echo "Email wasn't provided!";
            } else if (!preg_match("/\b[\w._-]+@[\w-]+.[\w]{2,}\b/im", $email)) { //checks if email isn't valid
                echo "Email wasn't valid!";
            }
        }
        ?>
    </p>

    <p id="messageFeedback" class="error">
        <?php
        if (isset($message)) {
            //checks if message is empty
            if (trim($message) == "") {
                echo "Message wasn't provided!";
            }
        }
        ?>
    </p>

    <!--validate using JavaScript on submit-->
    <form name="contactForm" method="post" onsubmit="return validateForm(this)">

        <p><span class="required">*</span> indicates a required field</p>

        <label for="email">Email <span class="required">*</span></label>
        <input type="email" name="email" placeholder="Enter your email here." required tabindex="1"
               oninput="validateEmail(this.value);" id="email">
        <!--validate using JavaScript on input-->

        <label for="subject">Subject</label>
        <input type="text" name="subject" placeholder="Enter the subject here." tabindex="2" id="subject">

        <label for="message">Message <span class="required">*</span></label>
        <textarea name="message" placeholder="Enter your message here." required tabindex="3"
                  oninput="validateMessage(this.value);" id="message"></textarea>
        <!--validate using JavaScript on input-->

        <button name="submit" type="submit">Submit</button>

    </form>

    <h2>Phone Number</h2>
    <p>Use this phone number below to give us a ring.</p>
    <p><a class="link" href="tel:+441243842209">+44 1243 842209</a></p>

    <h2>Email</h2>
    <p>Send us a email to this email address below.</p>
    <p><a class="link" href="mailto:contact@bubblesbargainworld.co.uk">contact@bubblesbargainworld.co.uk</a></p>

    <h2>Social Media</h2>
    <p>Follow and like us on our social media pages linked below to stay update to date. Or use it to contact us.</p>
    <p>Facebook: <a class="link" href="https://www.facebook.com/Bubbles-Bargain-World-1553944361587066"
                    target="_blank">/bubblesbargainworld</a></p>
    <p>Twitter: <a class="link" href="https://twitter.com/BubblesBognor" target="_blank">@BubblesBognor</a></p>

    <h2>Address</h2>
    <p>This address below is where we are based. Come and see us. Or write us the address for any enquires.</p>
    <p>39 High Street,<br>
        Bognor Regis,<br>
        West Sussex,<br>
        PO21 1RS</p>

    <!-- A map from google maps of location -->
    <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.596676121986!2d-0.6760231847678816!3d50.783049771225144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875ac42278a5aa5%3A0x843154c27bf11a78!2sBubbles+Bargain+World!5e0!3m2!1sen!2suk!4v1450465572350"
        allowfullscreen></iframe>

    <!-- Script to validate contact form -->
    <script type="text/javascript" src="/lib/formValidator.js"></script>

    <!-- End dynamic content -->

<?php

//include the footer for page
include '../inc/footer.html';

?>