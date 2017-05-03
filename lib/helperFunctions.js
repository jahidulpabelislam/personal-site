//Holds any helpers functions for whole project
"use strict";

/*
 * used to check if input field is empty
 * add invalid class if empty and return false
 * or remove invalid class if  not empty and return true
 */
var checkInputField = function(input) {
        if (input.value.trim() === "") {
            input.classList.add("invalid");
            return false;
        } else {
            input.classList.remove("invalid");
            return true;
        }
    },

    //creates a element with attributes appended to parent
    createElement = function(parent, element, attributes) {
        var elem = document.createElement(element);
        for (var attribute in attributes) {
            if (attributes.hasOwnProperty(attribute)) {
                elem[attribute] = attributes[attribute];
            }
        }
        parent.appendChild(elem);
        return elem;
    };