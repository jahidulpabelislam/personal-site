//validates the whole form
var validateForm = function (form) {
        var message, validInputs;

        //validate each required user input
        validInputs = validateMessage(form.message.value);

        if (validInputs) {
            validInputs = validateEmail(form.email.value);
        }
        validateEmail(form.email.value);

        //if invalid give user message
        if (!validInputs) {
            message = '<span class="required">Please fix the following errors:</span>';
            document.getElementById("errors").innerHTML = message;
        }
         console.log(validInputs);
        //return true if input is valid false if invalid
        return validInputs;
    },
//validate the message input
    validateMessage = function (mess) {
        //checks is message is empty
        if (mess.trim() == "") {
            //give user message
            document.getElementById("messageFeedback").innerHTML = "Message must be filled out.";
            document.getElementById("message").style.borderColor = "red";
            return false;
        }
        else {
            document.getElementById("message").style.borderColor = "initial";
            document.getElementById("messageFeedback").innerHTML = "";
            removeErrors();
            return true;
        }
    },
//validate the emaill address
    validateEmail = function (mail) {
        var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im,
            result = validEmailPattern.test(mail);

        //checks if email is empty
        if (mail.trim() == "") {
            //give user message
            document.getElementById("emailFeedback").innerHTML = "Email must be provided.";
            document.getElementById("email").style.borderColor = "red";
            return false
        }
        //checks if email is valid
        else if (!result) {
            //give user message
            document.getElementById("emailFeedback").innerHTML = "Email must be a valid email.";
            document.getElementById("email").style.borderColor = "red";
            return false;
        }
        else {
            document.getElementById("email").style.borderColor = "initial";
            document.getElementById("emailFeedback").innerHTML = "";
            removeErrors();
            return true;
        }
    },
    removeErrors = function () {
        if (document.getElementById("emailFeedback").innerHTML == "" && document.getElementById("messageFeedback").innerHTML == "") {
            document.getElementById("errors").innerHTML = "";
        }
    };