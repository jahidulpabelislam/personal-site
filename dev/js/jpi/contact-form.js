;window.jpi = window.jpi || {};
(function(jQuery, jpi) {

    "use strict";

    var global = {
        form: null,
        inputs: null,
        emailInput: null,
        messageInput: null,
        subjectInput: null,
        emailFeedback: null,
        messageFeedback: null,
        formFeedback: null,
        submitButton: null,
    };

    var fn = {

        reset: function() {
            global.inputs.attr("disabled", false);
            global.submitButton.prop("disabled", false)
                .html(global.submitButton.attr("data-initial-text"))
            ;
        },

        // Show appropriate & relevant feedback to the user after an attempt of sending a message
        renderResponse: function(response) {
            fn.reset();

            // Check if message was sent
            if (response.ok) {
                if (response.feedback) {
                    global.formFeedback.removeClass("field__error").addClass("field__feedback");
                }

                global.emailInput.val("");
                global.messageInput.val("");
                global.subjectInput.val("");
                global.form.find(".field").hide();
                global.submitButton.hide();
            }
            else {
                if (response.feedback) {
                    global.formFeedback.removeClass("field__feedback").addClass("field__error");
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
        },

        // Render an error message when AJAX has errored
        renderErrorMessage: function() {
            global.formFeedback.text("Something went wrong, please try again later.")
                               .removeClass("field__feedback")
                               .addClass("field__error")
                               .show(200);

            fn.reset();
        },

        validateEmail: function(isForm) {
            var emailAddress = global.emailInput.val();

            global.formFeedback.hide(200);
            global.emailInput.removeClass("input--valid");

            if (emailAddress.trim() === "") {
                if (isForm) {
                    global.emailInput.addClass("input--invalid");
                    global.emailFeedback.text("Email address must be provided and valid.").show(200);
                }
                return false;
            }

            var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im;
            var emailValidationTest = validEmailPattern.test(emailAddress);

            if (emailValidationTest) {
                global.emailInput.removeClass("input--invalid").addClass("input--valid");
                global.emailFeedback.hide(200);
                return true;
            }

            if (isForm) {
                global.emailInput.addClass("input--invalid");
                global.emailFeedback.text("Email address must be valid.").show(200);
            }

            return false;
        },

        validateMessage: function(isForm) {
            var message = global.messageInput.val();

            global.formFeedback.hide(200);
            global.messageInput.removeClass("input--valid");

            if (message.trim() !== "") {
                global.messageInput.removeClass("input--invalid").addClass("input--valid");
                global.messageFeedback.hide(200);
                return true;
            }

            if (isForm) {
                global.messageInput.addClass("input--invalid");
                global.messageFeedback.text("Message must be filled out.").show(200);
            }

            return false;
        },

        submit: function() {
            global.inputs.attr("disabled", true);
            global.submitButton.prop("disabled", true)
                .html(global.submitButton.attr("data-loading-text"))
            ;

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
                fn.reset();
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

            global.inputs = global.form.find(".input");
            global.emailInput = jQuery(".contact-form__email");
            global.messageInput = jQuery(".contact-form__message");
            global.subjectInput = jQuery(".contact-form__subject");
            global.emailFeedback = jQuery(".contact-form__email-feedback");
            global.messageFeedback = jQuery(".contact-form__message-feedback");
            global.formFeedback = jQuery(".contact-form__feedback");
            global.submitButton = jQuery(".contact-form__submit");

            fn.initListeners();
        },
    };

    jQuery(fn.init);

})(jQuery, jpi);
