window.portfolio = window.portfolio || {};
window.portfolio.form = (function () {

    "use strict";

    //grabs elements for later use
    var formFeedback = document.getElementById("formFeedback"),
        emailAddressFeedback2 = document.getElementById("emailFeedback2"),
        emailAddressFeedback = document.getElementById("emailFeedback"),
        messageFeedback2 = document.getElementById("messageFeedback2"),
        messageFeedback = document.getElementById("messageFeedback"),
        emailInput = document.getElementById("emailInput"),
        messageInput = document.getElementById("messageInput"),
        subjectInput = document.getElementById("subjectInput"),

        //respond to the user with relevant feedback after attempt of sending a message
        sentMessage = function (result) {

            //if message was sent
            if (result.ok) {
                formFeedback.innerHTML = "<span class='formFeedback correct'>" + result.feedback + "</span>";
                emailInput.value = messageInput.value = subjectInput.value = "";
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
            //validate each required user input
            var emailValidation = validateEmail(emailInput.value, true),
                messageValidation = validateMessage(messageInput.value, true);

            //if form is invalid provide feedback
            if (!emailValidation || !messageValidation) {
                formFeedback.innerHTML = "<span class='formFeedback error'>Please fix the following error/s:</span>";
            }
            //else send a request with necessary data to XHR
            else {
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
        validateEmail = function (mail, form) {
            var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
                result = validEmailPattern.test(mail);

            //checks if email is empty
            if (mail.trim() === "") {
                //give user message
                if (form) {
                    emailAddressFeedback2.innerHTML = "<span class='formFeedback error'>Email Address must be provided and valid.</span>";
                    emailAddressFeedback.innerHTML = "";
                } else {
                    emailAddressFeedback.innerHTML = "<span class='formFeedback error'>Email Address must be provided and valid.</span>";
                    emailAddressFeedback2.innerHTML = messageFeedback2.innerHTML = formFeedback.innerHTML = "";
                }

                emailInput.classList.add("invalid");

                return false;
            }
            //checks if email is valid
            else if (!result) {

                //give user message
                if (form) {
                    emailAddressFeedback2.innerHTML = "<span class='formFeedback error'>Email Address must be valid.</span>";
                    emailAddressFeedback.innerHTML = "";
                } else {
                    emailAddressFeedback.innerHTML = "<span class='formFeedback error'>Email Address must be valid.</span>";
                    emailAddressFeedback2.innerHTML = messageFeedback2.innerHTML = formFeedback.innerHTML = "";
                }

                emailInput.classList.add("invalid");

                return false;
            }
            //else remove feedback messages
            else {
                emailAddressFeedback.innerHTML = emailAddressFeedback2.innerHTML = "";

                if (!form) {
                    messageFeedback2.innerHTML = formFeedback.innerHTML = "";
                }

                emailInput.classList.remove("invalid");

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
                } else {
                    messageFeedback.innerHTML = "<span class='formFeedback error'>Message must be filled out.</span>";
                    messageFeedback2.innerHTML = emailAddressFeedback2.innerHTML = formFeedback.innerHTML = "";
                }

                messageInput.classList.add("invalid");
                return false;
            }
            //else remove feedback messages
            else {
                messageFeedback.innerHTML = messageFeedback2.innerHTML = "";

                if (!form) {
                    emailAddressFeedback2.innerHTML = formFeedback.innerHTML = "";
                }

                messageInput.classList.remove("invalid");
                return true;
            }
        };

    return {
        "validateForm": validateForm,
        "validateEmail": validateEmail,
        "validateMessage": validateMessage
    };

}());