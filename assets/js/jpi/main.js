window.jpi = window.jpi || {};
window.jpi.main = (function (jQuery) {

	"use strict";

	var fn = {
		
		initBognorRegisMap: function () {
			var bognorRegisLat = 50.78420;
			var bognorRegisLng = -0.67400;
			
			var bognorRegisLocation = new google.maps.LatLng(bognorRegisLat, bognorRegisLng);
			var zoomLevel = 12;
			
			var map = new google.maps.Map(jQuery(".js-bognor-regis-map")[0], {
				center: bognorRegisLocation,
				zoom: zoomLevel,
				zoomControl: true,
				mapTypeControl: false,
				scaleControl: false,
				streetViewControl: false,
				rotateControl: false,
				fullscreenControl: false,
				styles: jpi.config.googleMapStyles
			});
			
			var bognorRegisMarker = new google.maps.Marker({
				position: bognorRegisLocation,
				map: map
			});
			
			google.maps.event.addDomListener(window, 'resize', function () {
				map.setCenter(bognorRegisLocation);
			});
		},

		count: function (options) {
			var counter = jQuery(this);
			options = jQuery.extend({}, options || {}, counter.data('countToOptions') || {});
			counter.countTo(options);
		},

		initCounters: function () {
			var counters = jQuery('.counter');

			if (counters.length > 0) {
				jQuery('.counter').waypoint(function () {
					jQuery('.counter').each(fn.count);
				}, {offset: '100%'});
			}
		},

		jumpToContent: function () {
			jQuery('html, body').animate({
				scrollTop: jQuery("section").offset().top - jQuery(".nav").height()
			}, 1000);
		},

		toggleLabelContent: function () {
			var selected = jQuery(this).children(".skills-interests__item-expand-content"); // Get the new label that was clicked
			var selectedIcon = jQuery(this).children(".skills-interests__item-expand-icon");

			// Reset all other label to closed
			jQuery(".skills-interests__item-expand-content").not(selected).slideUp();
			jQuery(".skills-interests__item-expand-icon").not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");

			//Toggle the clicked label
			selectedIcon.toggleClass("fa-plus");
			selectedIcon.toggleClass("fa-minus");
			selected.slideToggle();

			jQuery(this).toggleClass("expanded-item");
			jQuery('.js-expand-skill-interest').not(this).removeClass("expanded-item");
		},

		initListeners: function () {
			jQuery(".js-scroll-to-content").on("click", fn.jumpToContent);

			jQuery(".js-expand-skill-interest").on("click", fn.toggleLabelContent);
		},

		init: function () {
			fn.initListeners();
			fn.initCounters();
			
			if (jQuery(".js-bognor-regis-map").length > 0) {
				google.maps.event.addDomListener(window, 'load', fn.initBognorRegisMap);
			}
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));