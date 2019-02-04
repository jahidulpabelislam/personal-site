window.jpi = window.jpi || {};
window.jpi.main = (function(jQuery) {

    "use strict";

    var global = {
        mapSelector: ".js-bognor-regis-map"
    };

    var fn = {

        initBognorRegisMap: function() {
            var zoomLevel = 12,
                bognorRegisLat = 50.7842,
                bognorRegisLng = -0.674,
                bognorRegisLocation = new google.maps.LatLng(bognorRegisLat, bognorRegisLng),
                config = {
                    center: bognorRegisLocation,
                    zoom: zoomLevel,
                    zoomControl: true,
                    mapTypeControl: false,
                    scaleControl: false,
                    streetViewControl: false,
                    rotateControl: false,
                    fullscreenControl: false,
                    styles: jpi.config.googleMapStyles
                },
                map = new google.maps.Map(jQuery(global.mapSelector)[0], config);

            new google.maps.Marker({
                position: bognorRegisLocation,
                map: map
            });

            google.maps.event.addDomListener(window, "resize", function() {
                map.setCenter(bognorRegisLocation);
            });
        },

        initCounter: function(options) {
            var counter = jQuery(this);
            options = jQuery.extend({}, options || {}, counter.data("countToOptions") || {});
            counter.countTo(options);
        },

        initCounters: function() {
            var counters = jQuery(".counter");

            if (counters.length) {
                counters.waypoint(function() {
                    counters.each(fn.initCounter);
                }, {offset: "100%"});
            }
        },

        jumpToContent: function() {
            jQuery("html, body").animate(
                {
                    scrollTop: jQuery(".main-content").offset().top - jQuery(".nav").height()
                },
                1000
            );
        },

        toggleLabelContent: function() {
            var label = jQuery(this);

            // Get the new label elems that was clicked
            var selected = label.children(".skills-interests__item-expand-content");
            var selectedIcon = label.children(".skills-interests__item-expand-icon");

            // Reset all other label to closed
            jQuery(".skills-interests__item-expand-content").not(selected).slideUp();

            jQuery(".skills-interests__item-expand-icon").not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");

            // Toggle the clicked label
            selectedIcon.toggleClass("fa-plus");
            selectedIcon.toggleClass("fa-minus");
            selected.slideToggle();

            label.toggleClass("expanded-item");
            jQuery(".js-expand-skill-interest").not(label).removeClass("expanded-item");
        },

        initListeners: function() {
            jQuery(".js-scroll-to-content").on("click", fn.jumpToContent);
            jQuery(".js-expand-skill-interest").on("click", fn.toggleLabelContent);

            if (jQuery(global.mapSelector).length) {
                google.maps.event.addDomListener(window, "load", fn.initBognorRegisMap);
            }
        },

        init: function() {
            fn.initListeners();
            fn.initCounters();
        }
    };

    jQuery(document).on("ready", fn.init);

})(jQuery);