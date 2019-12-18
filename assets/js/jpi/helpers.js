;/**
 * Holds any helpers functions for whole project
 */
window.jpi = window.jpi || {};
window.jpi.helpers = (function(jQuery) {

    "use strict";

    var global = {
    };

    var fn = {

        /**
         * Used to check if a input field is empty
         * add invalid class if empty and return false
         * or remove invalid class if not empty and return true
         */
        checkInputField: function(input) {
            if (input.val().trim() === "") {
                input.removeClass("valid").addClass("invalid");
                return false;
            }

            input.removeClass("invalid").addClass("valid");
            return true;
        },

        createElement: function(elementName, attributes) {
            return jQuery("<" + elementName + ">", attributes || {});
        },

        renderNewElement: function(elementName, parent, attributes) {
            var newElement = fn.createElement(elementName, attributes || {});
            parent.append(newElement);

            return newElement;
        },

        getInt: function(value, defaultInt) {
            var parsedInt = parseInt(value, 10);

            var int = isNaN(parsedInt) ? defaultInt : parsedInt;

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
            return cookie && cookie == valueToCheck;
        },

        setCookie: function(key, value, expirationDays) {
            var oneDayInMilliSecs = 24 * 60 * 60 * 1000;
            var expiryDate = new Date();
            expiryDate.setTime(expiryDate.getTime() + (expirationDays * oneDayInMilliSecs));
            var expires = "expires=" + expiryDate.toUTCString();
            document.cookie = key + "=" + value + ";" + expires + ";path=/";
        },

        loadStylesheets: function(stylesheets) {
            var count = stylesheets.length;
            if (!count) {
                return;
            }

            var head = jQuery("head");
            var totalLoaded = 0;

            for (var i = 0; i < count; i++) {
                var stylesheet = stylesheets[i];

                var newLink = fn.renderNewElement("link", head, {
                    rel: "stylesheet",
                    type: "text/css",
                    media: "all",
                    title: "style",
                    href: stylesheet,
                });

                newLink.on("load", function() {
                    totalLoaded++;
                    if (totalLoaded === count) {
                        jQuery(window).trigger("jpi-css-loaded");
                    }
                });
            }
        },

        /**
         * http://davidwalsh.name/javascript-debounce-function
         */
        debounce: function(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this,
                    args = arguments;

                var later = function() {
                    timeout = null;
                    if (!immediate) {
                        func.apply(context, args);
                    }
                };

                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) {
                    func.apply(context, args);
                }
            };
        },
    };

    return {
        checkInputField: fn.checkInputField,
        createElement: fn.createElement,
        renderNewElement: fn.renderNewElement,
        getInt: fn.getInt,
        getCookie: fn.getCookie,
        checkCookieValue: fn.checkCookieValue,
        setCookie: fn.setCookie,
        loadStylesheets: fn.loadStylesheets,
        debounce: fn.debounce,
    };
})(jQuery);
