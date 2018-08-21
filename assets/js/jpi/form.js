window.jpi = window.jpi || {};
window.jpi.form = (function (jQuery) {

	"use strict";

	var global = {
		submitButton: jQuery("#submit"),

		emailInput: jQuery("#email-input"),
		messageInput: jQuery("#message-input"),
		subjectInput: jQuery("#subject-input"),

		emailFeedback: jQuery("#contact-form__email-feedback"),
		messageFeedback: jQuery("#contact-form__message-feedback"),
		formFeedback: jQuery("#contact-form__feedback")
	};

	var fn = {

		//respond to the user with relevant feedback after attempt of sending a message
		renderFeedback: function (result) {

			global.formFeedback.show("fast").text(result.feedback);

			//if message was sent
			if (result.ok) {
				global.formFeedback.addClass("feedback--success");
				jQuery("#email-input, #message-input, #subject-input").val("");
			} else {
				if (result.feedback) {
					global.formFeedback.addClass("feedback--error");
				}

				if (result.messageFeedback) {
					global.messageFeedback.show("fast").text(result.messageFeedback);
				}

				if (result.emailAddressFeedback) {
					global.emailFeedback.show("fast").text(result.emailAddressFeedback);
				}
			}

			global.submitButton.prop('disabled', false).html(global.submitButton.data("initialText"));
		},

		//render a error message whe AJAX has error
		renderErrorMessage: function () {
			global.formFeedback.show("fast").text("Something went wrong, please try again later.").addClass("feedback--error");
			global.submitButton.prop('disabled', false).html(global.submitButton.data("initialText"));
		},

		//validates the whole form
		validateForm: function () {

			global.submitButton.prop('disabled', true).html(global.submitButton.data("loadingText"));

			//validate each required user input
			var messageValidation = fn.validateMessage(global.messageInput.val(), true),
					emailValidation = fn.validateEmail(global.emailInput.val(), true);

			//if form is valid send a request with necessary data to XHR
			if (emailValidation && messageValidation) {
				jpi.ajax.sendRequest({
					"method": "POST",
					"url": "sendMessage.php",
					"query": {
						emailAddress: global.emailInput.val(),
						message: global.messageInput.val(),
						subject: global.subjectInput.val()
					},
					"load": fn.renderFeedback,
					"error": fn.renderErrorMessage
				});
			} else {
				global.submitButton.prop('disabled', false).html(global.submitButton.data("initialText"));
			}

			return false;
		},

		//validate the email address
		validateEmail: function (email, isForm) {
			global.formFeedback.hide("fast");
			global.emailInput.removeClass("valid");

			var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
					result = validEmailPattern.test(email);

			//checks if email is empty
			if (email.trim() === "" && isForm) {
				global.emailInput.addClass("invalid");
				global.emailFeedback.show("fast").text("Email Address must be provided and valid.");
			}
			//checks if email is valid, then give user message
			else if (!result && isForm) {
				global.emailInput.addClass("invalid");
				global.emailFeedback.show("fast").text("Email Address must be valid.");
			}
			//else remove feedback message
			else if (email.trim() !== "" && result) {
				global.emailInput.removeClass("invalid");
				global.emailInput.addClass("valid");
				global.emailFeedback.hide("fast");
				return true;
			}

			return false;
		},

		//validate the message input
		validateMessage: function (message, isForm) {
			global.formFeedback.hide("fast");
			global.messageInput.removeClass("valid");

			//checks is message is empty
			if (message.trim() === "" && isForm) {
				//give user message
				global.messageInput.addClass("invalid");
				global.messageFeedback.show("fast").text("Message must be filled out.");
				return false;
			}
			//else remove feedback messages
			else if (message.trim() !== "") {
				global.messageInput.removeClass("invalid");
				global.messageInput.addClass("valid");
				global.messageFeedback.hide("fast");
				return true;
			}
		},

		initListeners: function () {
			global.subjectInput.keyup(function () {
				global.formFeedback.hide("fast");
			});
			global.emailInput.on("input", function () {
				fn.validateEmail(this.value);
			});
			global.messageInput.on("input", function () {
				fn.validateMessage(this.value);
			});

			jQuery(".contact-form").on("submit", fn.validateForm);
		}
	};

	jQuery(document).on("ready", fn.initListeners);

}(jQuery));