//libary used for making footer sit either at the bottom of page if content bigger than screen or bottom of screen if content smaller than screen
window.portfolio = window.portfolio || {};
window.portfolio.height = (function () {

    "use strict";

    //used to expand height of section
    var expand = function () {

            //set header to be lower than fixed nav (to fix issue with Bootstrap fixed navs)
            $('header').css('margin-top', ($('.navbar-header').outerHeight(true) + 21) + 'px');

            //make section default height to work out if content is too small or big
            $('section').height("auto");

            //calculates the default height of the content
            var height = $('header').outerHeight(true) + $('section').outerHeight(true) + $('footer').outerHeight(true);

            //checks if default height of content is shorter than screen height
            if (height < $(window).height()) {

                //section is extended to fill the difference
                $('section').height(($(window).height() - height) + $('section').height());
            }
        },

        //used to expand height of section every 10 milliseconds
        //created to combact against the css transistion delays
        delayExpand = function () {
            var timer = setInterval(window.portfolio.height.expand, 100);
            setTimeout(function () {
                clearInterval(timer);
            }, 2500);
        };

    return {
        "expand": expand,
        "delayExpand": delayExpand
    };

}());

window.addEventListener("load", window.portfolio.height.expand);
window.addEventListener("orientationchange", window.portfolio.height.delayExpand);
window.addEventListener("resize", window.portfolio.height.delayExpand);
