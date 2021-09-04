var JPI = JPI || {};

//=include ./jpi/plugins/slide-show.js

;(function() {

    "use strict";

    var global = {
        map: null,

        skills: null,
        expandableContents: null,
        expandableIcons: null,

        timelineItems: null,
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
                styles: JPI.googleMapStyles || {},
            };
            var map = new google.maps.Map(global.map[0], config);

            new google.maps.Marker({
                position: bognorRegisLocation,
                icon: window.location.origin + "/assets/images/marker.png",
                map: map,
            });

            google.maps.event.addDomListener(window, "resize", function() {
                map.setCenter(bognorRegisLocation);
            });
        },

        setTimelineItemHeights: function() {
            global.timelineItems.css("height", ""); // reset

            var maxHeight = 0;
            global.timelineItems.each(function(i, elem) {
                var height = jQuery(elem).outerHeight(true);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });

            global.timelineItems.css("height", maxHeight * 2);
        },

        toggleSkillContent: function(e) {
            var item = jQuery(e.target);

            // Get the new item elems that was clicked
            var selected = item.find(".skills__description");
            var selectedIcon = item.find(".skills__toggle");

            // Reset all other item to closed
            global.expandableContents.not(selected).slideUp();
            global.expandableIcons.not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");

            // Toggle the clicked item
            selectedIcon.toggleClass("fa-plus");
            selectedIcon.toggleClass("fa-minus");
            selected.slideToggle();
        },

        initListeners: function() {
            jQuery(window).on("resize", fn.setTimelineItemHeights);

            global.skills.on("click", fn.toggleSkillContent);

            jQuery(function() {
                if (global.map.length) {
                    google.maps.event.addDomListener(window, "load", fn.initBognorRegisMap);
                }
            });
        },

        init: function() {
            global.map = jQuery(".js-bognor-regis-map");

            global.skills = jQuery(".skills__item--expandable");
            if (global.skills.length) {
                global.expandableContents = jQuery(".skills__description");
                global.expandableIcons = jQuery(".skills__toggle");
            }

            global.timelineItems = jQuery(".timeline__item");

            fn.initListeners();

            jQuery(window).on("load", function() {
                fn.setTimelineItemHeights();

                var slideShow = new JPI.SlideShow({
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
            });
        },
    };

    fn.init();

})();
