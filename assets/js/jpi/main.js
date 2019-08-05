;window.jpi = window.jpi || {};
window.jpi.main = (function(jQuery, jpi, StickyFooter) {

    "use strict";

    var global = {
        mapSelector: ".js-bognor-regis-map",
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
                    styles: JSON.parse(jpi.config.googleMapStyles),
                },
                map = new google.maps.Map(jQuery(global.mapSelector)[0], config);

            new google.maps.Marker({
                position: bognorRegisLocation,
                map: map,
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
                    scrollTop: jQuery(".main-content").offset().top - jQuery(".nav").height(),
                },
                1000
            );
        },

        toggleSkillInterestContent: function() {
            var item = jQuery(this);

            // Get the new item elems that was clicked
            var selected = item.children(".skills-interests__item-expand-content");
            var selectedIcon = item.children(".skills-interests__item-expand-icon");

            // Reset all other item to closed
            jQuery(".skills-interests__item-expand-content").not(selected).slideUp();

            jQuery(".skills-interests__item-expand-icon").not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");

            // Toggle the clicked item
            selectedIcon.toggleClass("fa-plus");
            selectedIcon.toggleClass("fa-minus");
            selected.slideToggle();

            item.toggleClass("expanded-item");
            jQuery(".js-expand-skill-interest").not(item).removeClass("expanded-item");
        },

        resetFooter: function() {
            if (jpi && jpi.stickyFooter) {
                jpi.stickyFooter.repositionFooter();
            }
        },

        initListeners: function() {
            jQuery(".js-scroll-to-content").on("click", fn.jumpToContent);
            jQuery(".js-expand-skill-interest").on("click", fn.toggleSkillInterestContent);

            if (jQuery(global.mapSelector).length) {
                google.maps.event.addDomListener(window, "load", fn.initBognorRegisMap);
            }
        },

        init: function() {
            fn.initListeners();
            fn.initCounters();

            jpi.stickyFooter = new StickyFooter(".main-content");
        },
    };

    jQuery(document).on("ready", fn.init);

    return {
        resetFooter: fn.resetFooter,
    };

})(jQuery, jpi, StickyFooter);
