window.portfolio = window.portfolio || {};
window.portfolio.form = (function () {

    "use strict";

    var formFeedback = document.getElementById("formFeedback"),
        emailAddressFeedback2 = document.getElementById("emailFeedback2"),
        emailAddressFeedback = document.getElementById("emailFeedback"),
        messageFeedback2 = document.getElementById("messageFeedback2"),
        messageFeedback = document.getElementById("messageFeedback"),
        email = document.getElementById("email"),
        message = document.getElementById("message"),
        subject = document.getElementById("subject"),

        sentMessage = function (result) {
            if (result.ok) {
                formFeedback.innerHTML = "<span class='formFeedback correct'>" + result.feedback + "</span>";
                email.value = message.value = subject.value = "";
            } else {
                if (result.feedback) {
                    formFeedback.innerHTML = "<span class='formFeedback error'>" + result.feedback + "</span>";
                }

                if (result.messageFeedback) {
                    messageFeedback.innerHTML = "<span class='formFeedback error'>" + result.messageFeedback + "</span>";
                }

                if (result.emailAddressFeedback) {
                    emailAddressFeedback.innerHTML = "<span class='formFeedback error'>" + result.emailAddressFeedback + "</span>";
                }
            }
        },

        //validates the whole form
        validateForm = function () {
            var validInputs,

            //validate each required user input
            emailValidation = validateEmail(email.value, true),
                messageValidation = validateMessage(message.value, true);

            validInputs = emailValidation && messageValidation;

            //if invalid give user message
            if (!validInputs) {
                formFeedback.innerHTML = "<span class='formFeedback error'>Please fix the following error/s:</span>";
            }
            else {
                //sends a object with necessary data to XHR
                window.portfolio.xhr.sendRequests({
                    "method": "POST",
                    "url": "sendMessage.php",
                    "query": {emailAddress: email.value, message: message.value, subject: subject.value},
                    "load": sentMessage
                });
            }

            return false;
        },

        //validate the emaill address
        validateEmail = function (mail, form) {
            var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
                result = validEmailPattern.test(mail);

            //checks if email is empty
            if (mail.trim() === "") {
                //give user message
                if (form) {
                    emailAddressFeedback2.innerHTML = "<span class='formFeedback error'>Email Address must be provided and valid.</span>";
                    emailAddressFeedback.innerHTML = "";
                }
                else {
                    emailAddressFeedback.innerHTML = "<span class='formFeedback error'>Email Address must be provided and valid.</span>";
                    emailAddressFeedback2.innerHTML = "";
                    messageFeedback2.innerHTML = "";
                    formFeedback.innerHTML = "";
                }
                email.classList.add("invalid");
                return false;
            }
            //checks if email is valid
            else if (!result) {
                //give user message
                if (form) {
                    emailAddressFeedback2.innerHTML = "<span class='formFeedback error'>Email Address must be valid.</span>";
                    emailAddressFeedback.innerHTML = "";
                }
                else {
                    emailAddressFeedback.innerHTML = "<span class='formFeedback error'>Email Address must be valid.</span>";
                    emailAddressFeedback2.innerHTML = "";
                    messageFeedback2.innerHTML = "";
                    formFeedback.innerHTML = "";
                }
                email.classList.add("invalid");
                return false;
            }
            else {
                emailAddressFeedback.innerHTML = "";
                emailAddressFeedback2.innerHTML = "";
                if (!form) {
                    messageFeedback2.innerHTML = "";
                    formFeedback.innerHTML = "";
                }
                email.classList.remove("invalid");

                return true;
            }
        },

        //validate the message input
        validateMessage = function (mess, form) {

            //checks is message is empty
            if (mess.trim() === "") {
                //give user message
                if (form) {
                    messageFeedback2.innerHTML = "<span class='formFeedback error'>Message must be filled out.</span>";
                    messageFeedback.innerHTML = "";
                }
                else {
                    messageFeedback.innerHTML = "<span class='formFeedback error'>Message must be filled out.</span>";
                    messageFeedback2.innerHTML = "";
                    emailAddressFeedback2.innerHTML = "";
                    formFeedback.innerHTML = "";
                }
                message.classList.add("invalid");
                return false;
            }
            else {
                messageFeedback.innerHTML = "";
                messageFeedback2.innerHTML = "";
                if (!form) {
                    emailAddressFeedback2.innerHTML = "";
                    formFeedback.innerHTML = "";
                }

                message.classList.remove("invalid");
                return true;
            }
        };

    return {
        "validateForm": validateForm,
        "validateEmail": validateEmail,
        "validateMessage": validateMessage
    };

}());