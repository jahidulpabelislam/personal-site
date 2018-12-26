// Holds any helpers functions for whole project
window.jpi = window.jpi || {};
window.jpi.helpers = (function(jQuery) {

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

		// Creates an element with attributes appended to parent
		createElement: function(parent, element, attributes) {
			var elem = document.createElement(element);

			for (var attribute in attributes) {

				if (attributes.hasOwnProperty(attribute)) {
					if (attribute === "innerHTML") {
						elem[attribute] = attributes[attribute];
					}
					else {
						elem.setAttribute(attribute, attributes[attribute]);
					}
				}
			}

			parent.appendChild(elem);

			return elem;
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
			return (cookie && cookie != "" && cookie == valueToCheck);
		},

		setCookie: function(key, value, expirationDays) {
			var expiryDate = new Date();
			expiryDate.setTime(expiryDate.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
			var expires = "expires=" + expiryDate.toUTCString();
			document.cookie = key + "=" + value + ";" + expires + ";path=/";
		}
	};

	return {
		"checkInputField": fn.checkInputField,
		"createElement": fn.createElement,
		"getCookie": fn.getCookie,
		"checkCookieValue": fn.checkCookieValue,
		"setCookie": fn.setCookie
	};

}(jQuery));