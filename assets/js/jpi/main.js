window.jpi = window.jpi || {};
window.jpi.main = (function (jQuery) {

	"use strict";

	var fn = {

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
			var selected = jQuery(this).children(".label__more_content"); // Get the new label that was clicked
			var selectedIcon = jQuery(this).children(".label__expand-icon");

			// Reset all other label to closed
			jQuery(".label__more_content").not(selected).slideUp();
			jQuery(".label__expand-icon").not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");

			//Toggle the clicked label
			selectedIcon.toggleClass("fa-plus");
			selectedIcon.toggleClass("fa-minus");
			selected.slideToggle();

			jQuery(this).toggleClass("expanded-label");
			jQuery('.js-expand-label').not(this).removeClass("expanded-label");
		},

		initListeners: function () {
			jQuery(".js-scroll-to-content").on("click", fn.jumpToContent);

			jQuery(".js-expand-label").on("click", fn.toggleLabelContent);
		},

		init: function () {
			fn.initListeners();
			fn.initCounters();
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));