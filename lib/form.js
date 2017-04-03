"use strict";

//respond to the user with relevant feedback after attempt of sending a message
var renderFeedback = function(result) {

        $("#formFeedback").text(result.feedback);

        //if message was sent
        if (result.ok) {
            $("#formFeedback").addClass("success");
            emailInput.value = messageInput.value = subjectInput.value = "";
        } else {
            if (result.feedback) {
                $("#formFeedback").addClass("error");
            }

            if (result.messageFeedback) {
                $("#messageFeedback").text(result.messageFeedback);
            }

            if (result.emailAddressFeedback) {
                $("#emailAddressFeedback").text(result.emailAddressFeedback);
            }
        }

        $("#submit").button('reset');
    },

    //render a error message whe AJAX has error
    renderErrorMessage = function() {
        $("#formFeedback").text("Something went wrong, please try again later.").addClass("error");
        $("#loading").hide();
    },

    //validates the whole form
    validateForm = function() {

        $("#submit").button('loading');

        //validate each required user input
        var messageValidation = validateMessage($("#messageInput").val(), true),

            emailValidation = validateEmail($("#emailInput").val(), true);

        //if form is valid send a request with necessary data to XHR
        if (emailValidation && messageValidation) {
            window.portfolio.xhr.sendRequest({
                "method": "POST",
                "url": "sendMessage.php",
                "query": {emailAddress: emailInput.value, message: messageInput.value, subject: subjectInput.value},
                "load": renderFeedback,
                "error": renderErrorMessage
            });
        } else {
            $("#submit").button('reset');
        }

        return false;
    },

    //validate the email address
    validateEmail = function(email, isForm) {
        $("#feedback").text("");

        var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
            result = validEmailPattern.test(email);

        //checks if email is empty
        if (email.trim() === "" && isForm) {
            $("#emailInput").addClass("invalid");
            $("#emailFeedback").text("Email Address must be provided and valid.").addClass("error");
            return false;
        }
        //checks if email is valid
        else if (!result && isForm) {
            //give user message
            $("#emailInput").addClass("invalid");
            $("#emailFeedback").text("Email Address must be valid.").addClass("error");
            return false;
        }
        //else remove feedback message
        else if (email.trim() !== "" && result) {
            $("#emailInput").removeClass("invalid");
            $("#emailFeedback").text("").removeClass("error");
            return true;
        }
    },

    //validate the message input
    validateMessage = function(message, isForm) {
        $("#feedback").text("");

        //checks is message is empty
        if (message.trim() === "" && isForm) {
            //give user message
            $("#messageInput").addClass("invalid");
            $("#messageFeedback").text("Message must be filled out.").addClass("error");
            return false;
        }
        //else remove feedback messages
        else if (message.trim() !== "") {
            $("#messageInput").removeClass("invalid");
            $("#messageFeedback").text("").removeClass("error");
            return true;
        }

    };