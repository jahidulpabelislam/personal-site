;window.jpi = window.jpi || {};
window.jpi.cookieBanner = (function(jQuery, jpi) {

    "use strict";

    var global = {
        container: null,
        transitionSpeedSecs: 700,
        cookieKey: "cookie-banner-closed",
        cookieClickedValue: "true",
        cookieExpirationDays: 30,
    };

    var fn = {

        getHasClosedBannerBefore: function() {
            return jpi.helpers.checkCookieValue(global.cookieKey, global.cookieClickedValue);
        },

        setCookie: function() {
            jpi.helpers.setCookie(global.cookieKey, global.cookieClickedValue, global.cookieExpirationDays);
        },

        closeBanner: function() {
            global.container.fadeOut(global.transitionSpeedSecs, function() {
                global.container.remove();
            });
            fn.setCookie();
        },

        showOrHideBanner: function() {
            var container = global.container;
            if (container.length) {
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
                global.container.remove();
            }
            else {
                fn.showOrHideBanner();
            }
        },

        init: function() {
            global.container = jQuery(".cookie-banner");
            if (global.container.length) {
                jQuery(window).on("scroll orientationchange resize", jpi.helpers.debounce(fn.showOrHideBanner, 150));
                jQuery(".js-close-cookie-banner").on("click", fn.closeBanner);
                fn.initDisplayOfBanner();
            }
        },
    };

    jQuery(document).on("ready", fn.init);

    return {};

})(jQuery, jpi);
