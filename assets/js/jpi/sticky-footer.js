;window.jpi = window.jpi || {};
window.jpi.footer = (function(jQuery, jpi) {

    "use strict";

    var global = {
        header: jQuery(".jumbotron"),
        mainContent: jQuery(".main-content"),
        footer: jQuery(".footer"),
    };

    var fn = {

        // Expands height of main content element to create sticky footer
        expandContent: function() {
            // Makes section default height to work out if content is too small or big
            global.mainContent.height("auto");

            // Calculates the default height of the page
            var currentHeight =
                global.header.outerHeight(true) +
                global.mainContent.outerHeight(true) +
                global.footer.outerHeight(true);

            // If default height of content is shorter than screen height, main content is extended to fill the difference
            if (currentHeight < jQuery(window).height()) {
                var newHeight = jQuery(window).height() - currentHeight + global.mainContent.height();
                global.mainContent.height(newHeight);
            }
        },

        /*
         * Used to expand height of main content every 10 milliseconds
         * created to combat against the css transition delays
         */
        delayExpand: function() {
            var timer = setInterval(fn.expandContent, 100);
            setTimeout(function() {
                clearInterval(timer);
            }, 2500);
        },

        initListeners: function() {
            jQuery(window).on("load orientationchange resize", fn.delayExpand);
        },
    };

    jQuery(document).on("ready", fn.initListeners);

    return {
        expandContent: fn.expandContent,
    };

})(jQuery, jpi);
