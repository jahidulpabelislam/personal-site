window.portfolio = window.portfolio || {};
window.portfolio.form = (function () {

    "use strict";

    //validates the whole form
    var validateForm = function (form) {
            var validInputs;

            //validate each required user input
            validInputs = (validateEmail(form.email.value, true) & validateMessage(form.message.value, true)) ? true : false;

            //if invalid give user message
            if (!validInputs) {
                formFeedback.innerHTML = '<span class="formFeedback error">Please fix the following error/s:</span>';
            }

            if (validInputs) url += "/pro/";

            //return true if input is valid false if invalid
            return validInputs;
        },

        //validate the emaill address
        validateEmail = function (mail, form) {

            formFeedback.innerHTML = "";
            formConformation.innerHTML = "";

            var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
                result = validEmailPattern.test(mail);

            //checks if email is empty
            if (mail.trim() == "") {
                //give user message
                if (form) {
                    emailFeedback2.innerHTML = "<span class='formFeedback error'>Email Address must be provided and valid.</span>";
                    emailFeedback.innerHTML = "";
                }
                else {
                    emailFeedback.innerHTML = "<span class='formFeedback error'>Email Address must be provided and valid.</span>";
                    emailFeedback2.innerHTML = "";
                    messageFeedback2.innerHTML = "";
                }
                email.classList.add("invalid");
                return false
            }
            //checks if email is valid
            else if (!result) {
                //give user message
                if (form) {
                    emailFeedback2.innerHTML = "<span class='formFeedback error'>Email Address must be valid.</span>";
                    emailFeedback.innerHTML = "";
                }
                else {
                    emailFeedback.innerHTML = "<span class='formFeedback error'>Email Address must be valid.</span>";
                    emailFeedback2.innerHTML = "";
                    messageFeedback2.innerHTML = "";
                }
                email.classList.add("invalid");
                return false;
            }
            else {
                emailFeedback.innerHTML = "";
                emailFeedback2.innerHTML = "";
                if (!form) {
                    messageFeedback2.innerHTML = "";
                }
                email.classList.remove("invalid");
                removeErrors();
                return true;
            }
        },

        //validate the message input
        validateMessage = function (mess, form) {

            formFeedback.innerHTML = "";
            formConformation.innerHTML = "";

            //checks is message is empty
            if (mess.trim() == "") {
                //give user message
                if (form) {
                    messageFeedback2.innerHTML = "<span class='formFeedback error'>Message must be filled out.</span>";
                    messageFeedback.innerHTML = "";
                }
                else {
                    messageFeedback.innerHTML = "<span class='formFeedback error'>Message must be filled out.</span>";
                    messageFeedback2.innerHTML = "";
                    emailFeedback2.innerHTML = "";
                }
                message.classList.add("invalid");
                return false;
            }
            else {
                messageFeedback.innerHTML = "";
                messageFeedback2.innerHTML = "";
                if (!form) {
                    emailFeedback2.innerHTML = "";
                }
                message.classList.remove("invalid");
                removeErrors();
                return true;
            }
        },

        removeErrors = function () {
            if (emailFeedback.innerHTML == "" && messageFeedback.innerHTML == "") {
                formFeedback.innerHTML = "";
            }
        };

    return {
        "validateForm": validateForm,
        "validateEmail": validateEmail,
        "validateMessage": validateMessage
    };

}());