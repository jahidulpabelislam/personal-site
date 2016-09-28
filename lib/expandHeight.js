window.portfolio = window.portfolio || {};
window.portfolio.height = (function () {

    "use strict";

    //used to expand height of section if content is too short for screen
    var expand = function () {

            document.querySelector("section").style.height = "auto";

            //calculates the height of view at the moment
            var height = $('header').outerHeight(true) + $('section').outerHeight(true) + $('footer').outerHeight(true);

            //checks if height is shorter than screen height
            if (height < $(window).height()) {

                //section is extended to fill the difference
                $('section').height(($(window).height() - height) + $('section').height());
            }
        },

        delayExpand = function () {
            var timer = setInterval(window.portfolio.height.expand, 10);
            setTimeout(function () {
                clearInterval(timer);
            }, 1000);
        };

    return {
        "expand": expand,
        "delayExpand": delayExpand
    };

}());

window.addEventListener("load", window.portfolio.height.expand);
window.addEventListener("orientationchange", window.portfolio.height.delayExpand);
document.addEventListener("onscoll", window.portfolio.height.delayExpand);
window.addEventListener("resize", window.portfolio.height.delayExpand);
