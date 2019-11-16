;window.jpi = window.jpi || {};
window.jpi.cookieBanner = (function(jQuery, jpi) {

    "use strict";

    var global = {
        window: null,
        body: null,
        container: null,
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
            global.container.fadeOut(global.transitionSpeedSecs, function() {
                global.container.remove();
            });
            fn.setCookie();
        },

        showOrHide: function() {
            var container = global.container;
            if (container.length) {
                var height = container.height();
                var scrollPos = global.window.scrollTop();
                var lowestTop = global.body.height() - (global.window.height() + height);

                if (scrollPos < height || scrollPos > lowestTop) {
                    container.slideUp(global.transitionSpeedSecs);
                }
                else {
                    container.slideDown(global.transitionSpeedSecs);
                }
            }
        },

        initDisplay: function() {
            var hasClosedBefore = fn.getHasClosedBefore();
            if (hasClosedBefore) {
                fn.setCookie();
                global.container.remove();
            }
            else {
                fn.showOrHide();
            }
        },

        init: function() {
            global.container = jQuery(".cookie-banner");
            if (global.container.length) {
                global.window = jQuery(window);
                global.body = jQuery("body");

                global.window.on("scroll orientationchange resize", jpi.helpers.debounce(fn.showOrHide, 150));
                jQuery(".js-close-cookie-banner").on("click", fn.close);

                fn.initDisplay();
            }
        },
    };

    jQuery(document).on("ready", fn.init);

    return {};

})(jQuery, jpi);
