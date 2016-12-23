//library used to create sticky footer
window.portfolio = window.portfolio || {};
window.portfolio.stickyFooter = (function () {

    "use strict";

    //expands height of section to create sticky footer
    var expandSection = function () {

            //sets the header to be positioned lower than fixed nav (to fix issue with Bootstrap fixed navs)
            $('header').css('margin-top', ($('.navbar-header').outerHeight(true) + 21) + 'px');

            //makes section default height to work out if content is too small or big
            $('section').height("auto");

            //calculates the default height of the content
            var height = $('header').outerHeight(true) + $('section').outerHeight(true) + $('footer').outerHeight(true);

            //checks if default height of content is shorter than screen height
            if (height < $(window).height()) {

                //section is extended to fill the difference
                $('section').height(($(window).height() - height) + $('section').height());
            }
        },

        /*
        * used to expand height of section every 10 milliseconds
        * created to combat against the css transition delays
        */
        delayExpand = function () {
            var timer = setInterval(window.portfolio.stickyFooter.expandSection, 100);
            setTimeout(function () {
                clearInterval(timer);
            }, 2500);
        };

    return {
        expandSection: expandSection,
        delayExpand: delayExpand
    };

}());

window.addEventListener("load", window.portfolio.stickyFooter.expandSection);
window.addEventListener("orientationchange", window.portfolio.stickyFooter.delayExpand);
window.addEventListener("resize", window.portfolio.stickyFooter.delayExpand);
