;window.jpi = window.jpi || {};
(function(jQuery, jpi) {

    "use strict";

    var timelineItems = jQuery(".timeline__item");

    if (!timelineItems.length) {
        return;
    }

    var fn = {

        setHeights: function() {
            timelineItems.css("min-height", ""); // reset

            var maxHeight = 0;
            timelineItems.each(function(i, elem) {
                var height = jQuery(elem).outerHeight(true);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });

            timelineItems.css("min-height", maxHeight * 2);
        },

        initListeners: function() {
            jQuery(window).on("resize", fn.setHeights);
        },

        init: function() {
            fn.initListeners();
            fn.setHeights();

            new jpi.SlideShow({
                selector: ".timeline",
                viewportSelector: ".timeline__viewport",
                slidesContainerSelector: ".timeline__items",
                slideSelector: ".timeline__item",
                bulletsSelector: false,
                bulletSelector: false,
                navSelector: false,
                slidesPerView : 3,
            });
        },

    };

    jQuery(window).on("jpi-css-loaded", fn.init);

})(jQuery, jpi);
