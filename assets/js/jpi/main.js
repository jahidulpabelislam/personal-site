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
            var zoomLevel = 12;
            var bognorRegisLat = 50.7842;
            var bognorRegisLng = -0.674;
            var bognorRegisLocation = new google.maps.LatLng(bognorRegisLat, bognorRegisLng);
            var config = {
                center: bognorRegisLocation,
                zoom: zoomLevel,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                styles: jpi.config.googleMapStyles || {},
            };
            var map = new google.maps.Map(global.map[0], config);

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
            var counterGroups = jQuery(".js-counters");

            if (counterGroups.length) {
                var waypointArgs = {offset: "50%"};
                counterGroups.each(function(i, groupElem) {
                    var group = jQuery(groupElem);

                    var counters = group.find(".js-counter");
                    counters.each(function(j, counterElem) {
                        var counter = jQuery(counterElem);
                        // Make the initial display be the from value
                        var start = counter.attr("data-from");
                        counter.text(start || 0);
                    });

                    group.waypoint(function() {
                        var wpGroup = jQuery(this);
                        var wpCounters = wpGroup.find(".js-counter");
                        wpCounters.each(fn.countTo);
                    }, waypointArgs);
                });
            }
        },

        scrollToContent: function() {
            global.body.animate({
                scrollTop: global.mainContentElem.offset().top - global.nav.height(),
            }, 1000);
        },

        toggleSkillInterestContent: function() {
            var item = jQuery(this);

            // Get the new item elems that was clicked
            var selected = item.children(".skills-interests__expand-content");
            var selectedIcon = item.children(".skills-interests__expand-icon");

            // Reset all other item to closed
            global.expandableContents.not(selected).slideUp();
            global.expandableIcons.not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");

            // Toggle the clicked item
            selectedIcon.toggleClass("fa-plus");
            selectedIcon.toggleClass("fa-minus");
            selected.slideToggle();
        },

        resetFooter: function() {
            if (jpi && jpi.stickyFooter) {
                jpi.stickyFooter.repositionFooter();
            }
        },

        initListeners: function() {
            jQuery(".js-scroll-to-content").on("click", fn.scrollToContent);

            global.skillsInterests = jQuery(".skills-interests__item--expandable");
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

            global.expandableContents = jQuery(".skills-interests__expand-content");
            global.expandableIcons = jQuery(".skills-interests__expand-icon");

            jpi.stickyFooter = new StickyFooter(".main-content");

            fn.initListeners();
            fn.initCounters();
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

    return {
        resetFooter: fn.resetFooter,
    };

})(jQuery, jpi, StickyFooter);
