var JPI = JPI || {};

;JPI.ajax = (function() {



    "use strict";



    var fn = {



        // Display feedback from server if there is one otherwise output generic message

        checkAndRenderError: function(response, errorRenderer, genericMessage) {

            var message = genericMessage || "";

            if (response) {

                if (response.error) {

                    message = response.error;

                } else if (response.message) {

                    message = response.message;

                }

            }



            if (message) {

                errorRenderer(message);

            }

        },



        // Loop through data to see if it exists and if it does run a function on each row

        renderRowsOrError: function(response, rowRenderer, errorRenderer, genericMessage) {

            // If data/rows exists, For each row run a function

            if (response && response.data && response.data.length) {

                for (var i = 0; i < response.data.length; i++) {

                    if ({}.hasOwnProperty.call(response.data, i)) {

                        rowRenderer(response.data[i]);

                    }

                }



                return true;

            }



            // Otherwise check feedback and show user and return false as data isn't there

            fn.checkAndRenderError(response, errorRenderer, genericMessage);

            return false;

        },



        /**

         * Function for sending XHR requests

         *

         * @param request Object of necessary data needed to do a HTTP request

         * {

         *     "method": HTTP Method (string),

         *     "url": URL to load (string),

         *     "data": object of payload,

         *     "onSuccess": function to run when XHR request is successful

         *     "onError": function to run when there's an error

         * }

         */

        request: function(request) {

            return jQuery.ajax({

                url: request.url,

                method: request.method.toUpperCase(),

                data: request.data,

                dataType: "json",

                success: request.onSuccess,

                error: function () {

                    request.onError("Error Loading Content.");

                },

            });

        },

    };



    return {

        renderRowsOrError: fn.renderRowsOrError,

        request: fn.request,

    };

})();



;(function() {

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
                JPI.ajax.request({
                    method: "POST",
                    url: "/contact/",
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

})();

//# sourceMappingURL=public/assets/js/maps/contact.js.map
