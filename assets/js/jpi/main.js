;window.jpi = window.jpi || {};
window.jpi.main = (function(jQuery, jpi, StickyFooter) {

    "use strict";

    var global = {
        body: null,
        nav: null,
        mainContentElem: null,
        map: null,
        skillsInterests: null,
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
                map = new google.maps.Map(global.map[0], config);

            new google.maps.Marker({
                position: bognorRegisLocation,
                map: map,
            });

            google.maps.event.addDomListener(window, "resize", function() {
                map.setCenter(bognorRegisLocation);
            });
        },

        countTo: function() {
            var counter = jQuery(this);
            var options = jQuery.extend({}, counter.data("countToOptions") || {});
            counter.countTo(options);
        },

        initCounters: function() {
            var counters = jQuery(".counter");

            if (counters.length) {
                var waypointArgs = {offset: "66%"};
                counters.each(function(i, elem) {
                    var counter = jQuery(elem);

                    // Make the initial display be the from value
                    var start = counter.attr("data-from");
                    counter.text(start || 0);

                    counter.waypoint(fn.countTo, waypointArgs);
                });
            }
        },

        jumpToContent: function() {
            global.body.animate({
                scrollTop: global.mainContentElem.offset().top - global.nav.height(),
            }, 1000);
        },

        toggleSkillInterestContent: function() {
            var item = jQuery(this);

            // Get the new item elems that was clicked
            var selected = item.children(".skills-interests__item-expand-content");
            var selectedIcon = item.children(".skills-interests__item-expand-icon");

            // Reset all other item to closed
            global.expandableContents.not(selected).slideUp();
            global.expandableIcons.not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");
            global.skillsInterests.not(item).removeClass("expanded-item");

            // Toggle the clicked item
            selectedIcon.toggleClass("fa-plus");
            selectedIcon.toggleClass("fa-minus");
            selected.slideToggle();

            item.toggleClass("expanded-item");
        },

        resetFooter: function() {
            if (jpi && jpi.stickyFooter) {
                jpi.stickyFooter.repositionFooter();
            }
        },

        initListeners: function() {
            jQuery(".js-scroll-to-content").on("click", fn.jumpToContent);

            global.skillsInterests = jQuery(".js-expand-skill-interest");
            global.skillsInterests.on("click", fn.toggleSkillInterestContent);

            global.map = jQuery(".js-bognor-regis-map");
            if (global.map.length) {
                google.maps.event.addDomListener(window, "load", fn.initBognorRegisMap);
            }
        },

        init: function() {
            global.body = jQuery("html, body");
            global.nav = jQuery(".nav");
            global.mainContentElem = jQuery(".main-content");

            global.expandableContents = jQuery(".skills-interests__item-expand-content");
            global.expandableIcons = jQuery(".skills-interests__item-expand-icon");

            fn.initListeners();
            fn.initCounters();

            jpi.stickyFooter = new StickyFooter(".main-content");
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

    return {
        resetFooter: fn.resetFooter,
    };

})(jQuery, jpi, StickyFooter);
