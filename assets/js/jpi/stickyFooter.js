window.jpi = window.jpi || {};
window.jpi.footer = (function (jQuery) {

	"use strict";

	//expands height of section to create sticky footer
	var expandSection = function () {
				//makes section default height to work out if content is too small or big
				jQuery('section').height("auto");

				//calculates the default height of the content
				var height = jQuery('header').outerHeight(true) + jQuery('section').outerHeight(true) + jQuery('footer').outerHeight(true);

				//checks if default height of content is shorter than screen height
				if (height < jQuery(window).height()) {

					//section is extended to fill the difference
					jQuery('section').height((jQuery(window).height() - height) + jQuery('section').height());
				}
			},

			/*
			 * used to expand height of section every 10 milliseconds
			 * created to combat against the css transition delays
			 */
			delayExpand = function () {
				var timer = setInterval(expandSection, 100);
				setTimeout(function () {
					clearInterval(timer);
				}, 2500);
			},

			initListeners = function () {
				jQuery(window).on("load orientationchange resize", expandSection);
			};

	jQuery(document).on("ready", initListeners);

	return {
		"delayExpand": delayExpand
	};

}(jQuery));