"use strict";

var submitButton = $("#submit"),

    emailInput = $("#email-input"),
    messageInput = $("#message-input"),
    subjectInput = $("#subject-input"),

    emailFeedback = $("#email-feedback"),
    messageFeedback = $("#message-feedback"),
    formFeedback = $("#form-feedback"),

    //respond to the user with relevant feedback after attempt of sending a message
    renderFeedback = function(result) {

        formFeedback.show("fast").text(result.feedback);

        //if message was sent
        if (result.ok) {
            formFeedback.addClass("success");
            $("#email-input, #message-input, #subject-input").val("");
        } else {
            if (result.feedback) {
                formFeedback.addClass("error");
            }

            if (result.messageFeedback) {
                messageFeedback.show("fast").text(result.messageFeedback);
            }

            if (result.emailAddressFeedback) {
                emailFeedback.show("fast").text(result.emailAddressFeedback);
            }
        }

        submitButton.prop('disabled', false).html(submitButton.data("initialText"));
    },

    //render a error message whe AJAX has error
    renderErrorMessage = function() {
        formFeedback.show("fast").text("Something went wrong, please try again later.").addClass("error");
        submitButton.prop('disabled', false).html(submitButton.data("initialText"));
    },

    //validates the whole form
    validateForm = function() {

        submitButton.prop('disabled', true).html(submitButton.data("loadingText"));

        //validate each required user input
        var messageValidation = validateMessage(messageInput.val(), true),
            emailValidation = validateEmail(emailInput.val(), true);

        //if form is valid send a request with necessary data to XHR
        if (emailValidation && messageValidation) {
            sendRequest({
                "method": "POST",
                "url": "sendMessage.php",
                "query": {emailAddress: emailInput.val(), message: messageInput.val(), subject: subjectInput.val()},
                "load": renderFeedback,
                "error": renderErrorMessage
            });
        } else {
            submitButton.prop('disabled', false).html(submitButton.data("initialText"));
        }

        return false;
    },

    //validate the email address
    validateEmail = function(email, isForm) {
        formFeedback.hide("fast");

        var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
            result = validEmailPattern.test(email);

        //checks if email is empty
        if (email.trim() === "" && isForm) {
            emailInput.addClass("invalid");
            emailFeedback.show("fast").text("Email Address must be provided and valid.");
        }
        //checks if email is valid, then give user message
        else if (!result && isForm) {
            emailInput.addClass("invalid");
            emailFeedback.show("fast").text("Email Address must be valid.");
        }
        //else remove feedback message
        else if (email.trim() !== "" && result) {
            emailInput.removeClass("invalid");
            emailFeedback.hide("fast");
            return true;
        }

        return false;
    },

    //validate the message input
    validateMessage = function(message, isForm) {
        formFeedback.hide("fast");

        //checks is message is empty
        if (message.trim() === "" && isForm) {
            //give user message
            messageInput.addClass("invalid");
            messageFeedback.show("fast").text("Message must be filled out.");
            return false;
        }
        //else remove feedback messages
        else if (message.trim() !== "") {
            messageInput.removeClass("invalid");
            messageFeedback.hide("fast");
            return true;
        }

    };



$(document).on("ready", function() {
    subjectInput.keyup(function() {
        formFeedback.hide("fast");
    });
    emailInput.on("input" , function() {
        validateEmail(this.value);
    });
    messageInput.on("input" , function() {
        validateMessage(this.value);
    });

    $(".contact-form").on("submit", validateForm);


});