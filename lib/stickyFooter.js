"use strict";

//expands height of section to create sticky footer
var expandSection = function() {

        //sets the header to be positioned lower than fixed nav (to fix issue with Bootstrap fixed navs)
        $('header').css('margin-top', $('.navbar-header').outerHeight(true) + 'px');

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
    delayExpand = function() {
        var timer = setInterval(expandSection, 100);
        setTimeout(function() {
            clearInterval(timer);
        }, 2500);
    };

$(window).on("load, orientationchange, resize", expandSection);