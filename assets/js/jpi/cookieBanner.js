window.jpi = window.jpi || {};
window.jpi.cookieBanner = (function (jQuery) {

	"use strict";

	var global = {
		container: jQuery(".cookie-banner"),
		transitionSpeedSecs: 700,
		cookieKey: "cookie-banner-closed",
		bannerCookieExpirationDays: 30,
		bannerCookieClickedValue: "true"
	};

	var fn = {

		getHasClosedBannerBefore: function () {
			return jpi.helpers.checkCookieValue(global.cookieKey, global.bannerCookieClickedValue);
		},

		setCookie: function (){
			jpi.helpers.setCookie(global.cookieKey, global.bannerCookieClickedValue, global.bannerCookieExpirationDays);
		},

		closeBanner: function () {
			global.container.fadeOut(global.transitionSpeedSecs, function () {
				global.container.remove();
			});
			fn.setCookie();
		},

		showOrHideBanner: function () {

			if (global.container.length > 0) {
				var height = global.container.height();
				var scrollPos = jQuery(window).scrollTop();
				var lowestTop = jQuery("body").height() - (jQuery(window).height() + height);

				if (scrollPos < height || scrollPos > lowestTop) {
					global.container.slideUp(global.transitionSpeedSecs);
				}
				else {
					global.container.slideDown(global.transitionSpeedSecs);
				}
			}
		},
		
		initDisplayOfBanner: function () {
			var hasClosedBefore = fn.getHasClosedBannerBefore();
			if (hasClosedBefore) {
				fn.setCookie();
				global.container.remove();
			}
			else {
				fn.showOrHideBanner();
			}
		},

		init: function () {
			if (global.container.length > 0 ) {
				jQuery(window).on("scroll orientationchange resize", fn.showOrHideBanner);
				jQuery(".js-close-cookie-banner").on("click", fn.closeBanner);
				fn.initDisplayOfBanner();
			}
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));