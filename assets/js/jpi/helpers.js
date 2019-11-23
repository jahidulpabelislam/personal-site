;/**
 * Holds any helpers functions for whole project
 */
window.jpi = window.jpi || {};
window.jpi.helpers = (function(jQuery) {

    "use strict";

    var global = {
        templatingRegexes: {},
    };

    var fn = {

        getTemplatingRegex: function(regex) {
            if (!global.templatingRegexes[regex]) {
                global.templatingRegexes[regex] = new RegExp("\{{2} ?" + regex + " ?\\}{2}", "g");
            }

            return global.templatingRegexes[regex];
        },

        /**
         * Used to check if a input field is empty
         * add invalid class if empty and return false
         * or remove invalid class if not empty and return true
         */
        checkInputField: function(input) {
            if (input.value.trim() === "") {
                input.classList.remove("valid");
                input.classList.add("invalid");
                return false;
            }

            input.classList.remove("invalid");
            input.classList.add("valid");
            return true;
        },

        // Creates an element with attributes and appended to parent
        createElement: function(elementName, attributes) {
            return jQuery("<" + elementName + ">", attributes);
        },

        renderNewElement: function(elementName, parent, attributes) {
            var newElem = fn.createElement(elementName, attributes);
            parent.append(newElem);

            return newElem;
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

        loadCSSFiles: function(srcs) {
            var totalLoaded = 0;
            var totalSrcs = srcs.length;

            for (var i = 0; i < totalSrcs; i++) {
                var src = srcs[i];

                var newLink = jQuery("<link>", {
                    rel: "stylesheet",
                    type: "text/css",
                    media: "all",
                    title: "style",
                    href: src,
                });
                newLink.appendTo("head");

                newLink.on("load", function() {
                    totalLoaded++;
                    if (totalLoaded === totalSrcs) {
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
        getTemplatingRegex: fn.getTemplatingRegex,
        checkInputField: fn.checkInputField,
        createElement: fn.createElement,
        renderNewElement: fn.renderNewElement,
        getInt: fn.getInt,
        getCookie: fn.getCookie,
        checkCookieValue: fn.checkCookieValue,
        setCookie: fn.setCookie,
        loadCSSFiles: fn.loadCSSFiles,
        debounce: fn.debounce,
    };
})(jQuery);
