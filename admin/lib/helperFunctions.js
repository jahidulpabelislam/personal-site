window.portfolio = window.portfolio || {};
window.portfolio.helperFunctions = (function () {

    "use strict";

    //used to expand height of section if content is too short for screen
    var checkInputField = function (input) {
            if (input.value.trim() === "") {
                input.classList.add("invalid");
                return false;
            } else {
                input.classList.remove("invalid");
                return true;
            }
        },
        createElement = function (parent, elem, attributes) {
            var x = document.createElement(elem);
            for (var attribute in attributes) {
                if (attributes.hasOwnProperty(attribute)) {
                    x[attribute] = attributes[attribute];
                }
            }
            parent.appendChild(x);
            return x;
        };

    return {
        checkInputField: checkInputField,
        createElement: createElement
    };

}());
