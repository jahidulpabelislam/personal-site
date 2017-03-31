window.portfolio = window.portfolio || {};
window.portfolio.form = function() {

    "use strict";

    //grabs elements for later use
    var formFeedback = document.getElementById("formFeedback"),
        emailAddressFeedback = document.getElementById("emailFeedback"),
        messageFeedback = document.getElementById("messageFeedback"),
        emailInput = document.getElementById("emailInput"),
        messageInput = document.getElementById("messageInput"),
        subjectInput = document.getElementById("subjectInput"),

        //respond to the user with relevant feedback after attempt of sending a message
        sentMessage = function(result) {

            //if message was sent
            if (result.ok) {
                formFeedback.innerHTML = result.feedback;
                formFeedback.classList.add("success");
                emailInput.value = messageInput.value = subjectInput.value = "";
            } else {
                if (result.feedback) {
                    formFeedback.innerHTML = result.feedback;
                    formFeedback.classList.add("error");
                }

                if (result.messageFeedback) {
                    messageFeedback.innerHTML = result.messageFeedback;
                }

                if (result.emailAddressFeedback) {
                    emailAddressFeedback.innerHTML = result.emailAddressFeedback;
                }
            }

            $("#submit").button('reset');
        },

        //validates the whole form
        validateForm = function() {
            $("#submit").button('loading');

            //validate each required user input
            var emailValidation = validateEmail(emailInput.value, true),
                messageValidation = validateMessage(messageInput.value, true);

            //if form is valid send a request with necessary data to XHR
            if (emailValidation && messageValidation) {
                window.portfolio.xhr.sendRequest({
                    "method": "POST",
                    "url": "sendMessage.php",
                    "query": {emailAddress: emailInput.value, message: messageInput.value, subject: subjectInput.value},
                    "load": sentMessage
                });
            }

            return false;
        },

        //validate the email address
        validateEmail = function(mail, form) {
            var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
                result = validEmailPattern.test(mail);

            formFeedback.innerHTML = "";

            //checks if email is empty
            if (mail.trim() === "" && form) {
                //give user message
                emailAddressFeedback.innerHTML = "Email Address must be provided and valid.";

                emailInput.classList.add("invalid");

                return false;
            }
            //checks if email is valid
            else if (!result && form) {

                //give user message

                emailAddressFeedback.innerHTML = "Email Address must be valid.";

                emailInput.classList.add("invalid");

                return false;
            }
            //else remove feedback messages
            else if (mail.trim() !== "" && result) {
                emailAddressFeedback.innerHTML = "";

                emailInput.classList.remove("invalid");

                return true;
            }
        },

        //validate the message input
        validateMessage = function(mess, isForm) {

            formFeedback.innerHTML = "";

            //checks is message is empty
            if (mess.trim() === "" && isForm) {
                //give user message
                messageFeedback.innerHTML = "Message must be filled out.";
                messageInput.classList.add("invalid");
                return false;
            }
            //else remove feedback messages
            else if (mess.trim() !== "") {
                messageFeedback.innerHTML = "";

                messageInput.classList.remove("invalid");
                return true;
            }
        };

    return {
        "validateForm": validateForm,
        "validateEmail": validateEmail,
        "validateMessage": validateMessage
    };

}();