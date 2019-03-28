;/*
 * Holds any helpers functions for whole project
 */
window.jpi = window.jpi || {};
window.jpi.helpers = (function(jQuery, jpi) {

    "use strict";

    var fn = {

        /*
         * Used to check if a input field is empty
         * add invalid class if empty and return false
         * or remove invalid class if  not empty and return true
         */
        checkInputField: function(input) {
            if (input.value.trim() === "") {
                input.classList.add("invalid");
                input.classList.remove("valid");
                return false;
            }
            else {
                input.classList.remove("invalid");
                input.classList.add("valid");
                return true;
            }
        },

        // Creates an element with attributes and appended to parent
        createElement: function(parentElem, elementName, attributes) {
            var newElem = document.createElement(elementName);

            for (var attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                    if (attribute === "innerHTML") {
                        newElem[attribute] = attributes[attribute];
                    }
                    else {
                        newElem.setAttribute(attribute, attributes[attribute]);
                    }
                }
            }
            parentElem.appendChild(newElem);

            return newElem;
        },

        getInt: function(value, defaultInt) {
            var int = defaultInt;

            if (!isNaN(value)) {
                int = parseInt(value, 10);
            }

            return int;
        },

        getCookie: function(key) {
            key += "=";

            var cookies = document.cookie.split(";");

            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i];

                cookie = cookie.toString().trim();

                if (cookie.indexOf(key) === 0) {
                    return cookie.substring(key.length);
                }
            }

            return false;
        },

        checkCookieValue: function(key, valueToCheck) {
            var cookie = fn.getCookie(key);
            return cookie && cookie != "" && cookie == valueToCheck;
        },

        setCookie: function(key, value, expirationDays) {
            var expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + expirationDays * 24 * 60 * 60 * 1000);
            var expires = "expires=" + expiryDate.toUTCString();
            document.cookie = key + "=" + value + ";" + expires + ";path=/";
        },
    };

    return {
        checkInputField: fn.checkInputField,
        createElement: fn.createElement,
        getInt: fn.getInt,
        getCookie: fn.getCookie,
        checkCookieValue: fn.checkCookieValue,
        setCookie: fn.setCookie,
    };

})(jQuery, jpi);
