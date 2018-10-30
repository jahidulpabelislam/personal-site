window.jpi = window.jpi || {};
window.jpi.cookieBanner = (function (jQuery) {

	"use strict";

	var global = {
		container: jQuery(".cookie-banner"),
		storageKey: "cookie-banner-closed",
		transitionSpeedSecs: 700
	};

	var fn = {

		getHasClosedBannerBefore: function () {
			var storedValue = localStorage.getItem(global.storageKey);
			return (storedValue && storedValue == 'true');
		},

		closeBanner: function () {
			global.container.fadeOut(global.transitionSpeedSecs, function () {
				global.container.remove();
			});
			localStorage.setItem(global.storageKey, true);
		},

		showOrHideBanner: function () {

			var height = global.container.height();
			var scrollPos = jQuery(window).scrollTop();
			var lowestTop = jQuery("body").height() - (jQuery(window).height() + height);

			if (scrollPos < height || scrollPos > lowestTop) {
				global.container.slideUp(global.transitionSpeedSecs);
			}
			else {
				global.container.slideDown(global.transitionSpeedSecs);
			}
		},
		
		initDisplayOfBanner: function () {
			var hasClosedBefore = fn.getHasClosedBannerBefore();
			if (hasClosedBefore) {
				global.container.remove();
			}
			else {
				fn.showOrHideBanner();
			}
		},

		init: function () {
			jQuery(window).on("scroll orientationchange resize", fn.showOrHideBanner);
			jQuery(".js-close-cookie-banner").on("click", fn.closeBanner);
			fn.initDisplayOfBanner();
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));