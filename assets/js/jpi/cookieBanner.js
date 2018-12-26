window.jpi = window.jpi || {};
window.jpi.cookieBanner = (function(jQuery) {

	"use strict";

	var global = {
		container: ".cookie-banner",
		transitionSpeedSecs: 700,
		cookieKey: "cookie-banner-closed",
		bannerCookieExpirationDays: 30,
		bannerCookieClickedValue: "true"
	};

	var fn = {

		getHasClosedBannerBefore: function() {
			return jpi.helpers.checkCookieValue(global.cookieKey, global.bannerCookieClickedValue);
		},

		setCookie: function() {
			jpi.helpers.setCookie(global.cookieKey, global.bannerCookieClickedValue, global.bannerCookieExpirationDays);
		},

		closeBanner: function() {
			jQuery(global.container).fadeOut(global.transitionSpeedSecs, function() {
				jQuery(global.container).remove();
			});
			fn.setCookie();
		},

		showOrHideBanner: function() {
			var container = jQuery(global.container);
			if (container.length > 0) {
				var height = container.height();
				var scrollPos = jQuery(window).scrollTop();
				var lowestTop = jQuery("body").height() - (jQuery(window).height() + height);

				if (scrollPos < height || scrollPos > lowestTop) {
					container.slideUp(global.transitionSpeedSecs);
				}
				else {
					container.slideDown(global.transitionSpeedSecs);
				}
			}
		},

		initDisplayOfBanner: function() {
			var hasClosedBefore = fn.getHasClosedBannerBefore();
			if (hasClosedBefore) {
				fn.setCookie();
				jQuery(global.container).remove();
			}
			else {
				fn.showOrHideBanner();
			}
		},

		init: function() {
			if (jQuery(global.container).length > 0) {
				jQuery(window).on("scroll orientationchange resize", fn.showOrHideBanner);
				jQuery(".js-close-cookie-banner").on("click", fn.closeBanner);
				fn.initDisplayOfBanner();
			}
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));