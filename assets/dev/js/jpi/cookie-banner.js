;window.jpi = window.jpi || {};
(function(jQuery, jpi) {

    "use strict";

    var global = {
        window: null,
        body: null,
        banner: null,
        transitionSpeedSecs: 700,
        cookieKey: "cookie-banner-closed",
        cookieClickedValue: "true",
        cookieExpirationDays: 30,
    };

    var fn = {

        getHasClosedBefore: function() {
            return jpi.helpers.checkCookieValue(global.cookieKey, global.cookieClickedValue);
        },

        setCookie: function() {
            jpi.helpers.setCookie(global.cookieKey, global.cookieClickedValue, global.cookieExpirationDays);
        },

        close: function() {
            global.banner.fadeOut(global.transitionSpeedSecs, function() {
                global.banner.remove();
            });
            fn.setCookie();
        },

        showOrHide: function() {
            var banner = global.banner;
            if (banner.length) {
                var height = banner.height();
                var scrollPos = global.window.scrollTop();
                var lowestTop = global.body.height() - (global.window.height() + height);

                if (scrollPos < height || scrollPos > lowestTop) {
                    banner.slideUp(global.transitionSpeedSecs);
                }
                else {
                    banner.slideDown(global.transitionSpeedSecs);
                }
            }
        },

        initDisplay: function() {
            var hasClosedBefore = fn.getHasClosedBefore();
            if (hasClosedBefore) {
                fn.setCookie();
                global.banner.remove();
            }
            else {
                fn.showOrHide();
            }
        },

        init: function() {
            global.banner = jQuery(".cookie-banner");
            if (global.banner.length) {
                global.window = jQuery(window);
                global.body = jQuery("body");

                global.window.on("scroll orientationchange resize", jpi.helpers.debounce(fn.showOrHide, 150));
                jQuery(".cookie-banner__close").on("click", fn.close);

                fn.initDisplay();
            }
        },
    };

    jQuery(fn.init);

})(jQuery, jpi);
