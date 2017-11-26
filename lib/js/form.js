"use strict";

//respond to the user with relevant feedback after attempt of sending a message
var renderFeedback = function(result) {

        $("#form-feedback").show("fast").text(result.feedback);

        //if message was sent
        if (result.ok) {
            $("#form-feedback").addClass("success");
            $("#email-input, #message-input, #subject-input").val("");
        } else {
            if (result.feedback) {
                $("#form-feedback").addClass("error");
            }

            if (result.messageFeedback) {
                $("#message-feedback").show("fast").text(result.messageFeedback);
            }

            if (result.emailAddressFeedback) {
                $("#emailAddressFeedback").show("fast").text(result.emailAddressFeedback);
            }
        }

        $("#submit").prop('disabled', false).html($("#submit").data("initialText"));
    },

    //render a error message whe AJAX has error
    renderErrorMessage = function() {
        $("#form-feedback").show("fast").text("Something went wrong, please try again later.").addClass("error");
        $("#submit").prop('disabled', false).html($("#submit").data("initialText"));
    },

    //validates the whole form
    validateForm = function() {

        $("#submit").prop('disabled', true).html($("#submit").data("loadingText"));

        //validate each required user input
        var messageValidation = validateMessage($("#message-input").val(), true),
            emailValidation = validateEmail($("#email-input").val(), true);

        //if form is valid send a request with necessary data to XHR
        if (emailValidation && messageValidation) {
            sendRequest({
                "method": "POST",
                "url": "sendMessage.php",
                "query": {emailAddress: emailInput.value, message: messageInput.value, subject: subjectInput.value},
                "load": renderFeedback,
                "error": renderErrorMessage
            });
        } else {
            $("#submit").prop('disabled', false).html($("#submit").data("initialText"));
        }

        return false;
    },

    //validate the email address
    validateEmail = function(email, isForm) {
        $("#form-feedback").hide("fast");

        var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
            result = validEmailPattern.test(email);

        //checks if email is empty
        if (email.trim() === "" && isForm) {
            $("#email-input").addClass("invalid");
            $("#email-feedback").show("fast").text("Email Address must be provided and valid.");
        }
        //checks if email is valid, then give user message
        else if (!result && isForm) {
            $("#email-input").addClass("invalid");
            $("#email-feedback").show("fast").text("Email Address must be valid.");
        }
        //else remove feedback message
        else if (email.trim() !== "" && result) {
            $("#email-input").removeClass("invalid");
            $("#email-feedback").hide("fast");
            return true;
        }

        return false;
    },

    //validate the message input
    validateMessage = function(message, isForm) {
        $("#form-feedback").hide("fast");

        //checks is message is empty
        if (message.trim() === "" && isForm) {
            //give user message
            $("#message-input").addClass("invalid");
            $("#message-feedback").show("fast").text("Message must be filled out.");
            return false;
        }
        //else remove feedback messages
        else if (message.trim() !== "") {
            $("#message-input").removeClass("invalid");
            $("#message-feedback").hide("fast");
            return true;
        }

    };

$("#subject-input").keyup(function() {
    $("#form-feedback").hide("fast");
});