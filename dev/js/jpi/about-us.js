;window.jpi = window.jpi || {};
(function(jQuery, jpi) {

    "use strict";

    var fn = {
        setHeights: function() {
            var items = jQuery(".timeline__item");
            items.css("min-height", ""); // reset

            var maxHeight = 0;
            items.each(function(i, elem) {
                var height = jQuery(elem).outerHeight(true);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });

            items.css("min-height", maxHeight * 2);
        },
    };

    jQuery(window).on("jpi-css-loaded resize", fn.setHeights);

})(jQuery, jpi);
