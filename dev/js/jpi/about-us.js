;window.jpi = window.jpi || {};
(function(jQuery, jpi) {

    "use strict";

    var timelineItems = jQuery(".timeline__item");

    if (!timelineItems.length) {
        return;
    }

    var fn = {

        setHeights: function() {
            timelineItems.css("height", ""); // reset

            var maxHeight = 0;
            timelineItems.each(function(i, elem) {
                var height = jQuery(elem).outerHeight(true);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });

            timelineItems.css("height", maxHeight * 2);
        },

        initListeners: function() {
            jQuery(window).on("resize", fn.setHeights);
        },

        init: function() {
            fn.initListeners();
            fn.setHeights();

            var slideShow = new jpi.SlideShow({
                selector: ".timeline",
                viewportSelector: ".timeline__viewport",
                slidesContainerSelector: ".timeline__items",
                slideSelector: ".timeline__item",
                bulletsSelector: false,
                bulletSelector: false,
                navSelector: ".timeline__nav",
                slidesPerView: 3,
                autoplay: false,
                loop: false,
            });

            slideShow.start();
        },
    };

    jQuery(window).on("load", fn.init);

})(jQuery, jpi);
