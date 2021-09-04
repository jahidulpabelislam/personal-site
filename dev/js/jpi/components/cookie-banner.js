;(function() {

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
            return JPI.checkCookieValue(global.cookieKey, global.cookieClickedValue);
        },

        setCookie: function() {
            JPI.setCookie(global.cookieKey, global.cookieClickedValue, global.cookieExpirationDays);
        },

        close: function() {
            global.banner.fadeOut(global.transitionSpeedSecs, function() {
                global.banner.remove();
            });
            fn.setCookie();
        },

        initDisplay: function() {
            var hasClosedBefore = fn.getHasClosedBefore();
            if (hasClosedBefore) {
                fn.setCookie();
                global.banner.remove();
            } else {
                global.banner.show();
            }
        },

        init: function() {
            global.banner = jQuery(".cookie-banner");
            if (global.banner.length) {
                global.window = jQuery(window);
                global.body = jQuery("body");

                jQuery(".cookie-banner__close").on("click", fn.close);

                fn.initDisplay();
            }
        },
    };

    jQuery(fn.init);

})();
