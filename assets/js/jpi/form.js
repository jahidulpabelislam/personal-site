;window.jpi = window.jpi || {};
window.jpi.form = (function(jQuery, jpi) {

    "use strict";

    var global = {
        form: null,
        submitButton: null,
        emailInput: null,
        messageInput: null,
        subjectInput: null,
        emailFeedback: null,
        messageFeedback: null,
        formFeedback: null,
    };

    var fn = {

        // Show appropriate & relevant feedback to the user after an attempt of sending a message
        renderResponse: function(response) {
            // Check if message was sent
            if (response.ok) {
                if (response.feedback) {
                    global.formFeedback.removeClass("feedback--error").addClass("feedback--success");
                }

                jQuery(".contact-form__email, .contact-form__message, .contact-form__subject").val("");
            }
            else {
                if (response.feedback) {
                    global.formFeedback.removeClass("feedback--success").addClass("feedback--error");
                }
                if (response.messageFeedback) {
                    global.messageFeedback.text(response.messageFeedback).show(200);
                }
                if (response.emailAddressFeedback) {
                    global.emailFeedback.text(response.emailAddressFeedback).show(200);
                }
            }

            if (response.feedback) {
                global.formFeedback.text(response.feedback).show(200);
            }

            global.submitButton.prop("disabled", false).html(global.submitButton.attr("data-initial-text"));
        },

        // Render an error message when AJAX has errored
        renderErrorMessage: function() {
            global.formFeedback.text("Something went wrong, please try again later.")
                               .removeClass("feedback--success")
                               .addClass("feedback--error")
                               .show(200);

            global.submitButton.prop("disabled", false).html(global.submitButton.attr("data-initial-text"));
        },

        validateEmail: function(isForm) {
            var emailAddress = global.emailInput.val();

            global.formFeedback.hide(200);
            global.emailInput.removeClass("valid");

            if (emailAddress.trim() === "") {
                if (isForm) {
                    global.emailInput.addClass("invalid");
                    global.emailFeedback.text("Email address must be provided and valid.").show(200);
                }
                return false;
            }

            var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im;
            var emailValidationTest = validEmailPattern.test(emailAddress);

            if (emailValidationTest) {
                global.emailInput.removeClass("invalid").addClass("valid");
                global.emailFeedback.hide(200);
                return true;
            }

            if (isForm) {
                global.emailInput.addClass("invalid");
                global.emailFeedback.text("Email address must be valid.").show(200);
            }

            return false;
        },

        validateMessage: function(isForm) {
            var message = global.messageInput.val();

            global.formFeedback.hide(200);
            global.messageInput.removeClass("valid");

            if (message.trim() !== "") {
                global.messageInput.removeClass("invalid").addClass("valid");
                global.messageFeedback.hide(200);
                return true;
            }

            if (isForm) {
                global.messageInput.addClass("invalid");
                global.messageFeedback.text("Message must be filled out.").show(200);
            }

            return false;
        },

        submit: function() {
            global.submitButton.prop("disabled", true).html(global.submitButton.attr("data-loading-text"));

            var isEmailValid = fn.validateEmail(true);
            var isMessageValid = fn.validateMessage(true);

            if (isEmailValid && isMessageValid) {
                jpi.ajax.request({
                    method: "POST",
                    url: "/contact/form-submission.php",
                    data: {
                        emailAddress: global.emailInput.val(),
                        subject: global.subjectInput.val(),
                        message: global.messageInput.val(),
                    },
                    onSuccess: fn.renderResponse,
                    onError: fn.renderErrorMessage,
                });
            }
            else {
                global.submitButton.prop("disabled", false).html(global.submitButton.attr("data-initial-text"));
            }

            return false;
        },

        initListeners: function() {
            global.subjectInput.on("keyup", function() {
                global.formFeedback.hide(200);
            });
            global.emailInput.on("input", function() {
                fn.validateEmail();
            });
            global.messageInput.on("input", function() {
                fn.validateMessage();
            });

            global.form.on("submit", fn.submit);
        },

        init: function() {
            global.form = jQuery(".contact-form");
            if (!global.form.length) {
                return;
            }

            global.submitButton = jQuery(".contact-form__submit");
            global.emailInput = jQuery(".contact-form__email");
            global.messageInput = jQuery(".contact-form__message");
            global.subjectInput = jQuery(".contact-form__subject");
            global.emailFeedback = jQuery(".contact-form__email-feedback");
            global.messageFeedback = jQuery(".contact-form__message-feedback");
            global.formFeedback = jQuery(".contact-form__feedback");

            fn.initListeners();
        },
    };

    jQuery(document).on("ready", fn.init);

    return {};

})(jQuery, jpi);
