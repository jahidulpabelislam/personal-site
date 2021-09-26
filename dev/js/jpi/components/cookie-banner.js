;(new (function() {

    "use strict";

    this.$banner = jQuery(".cookie-banner");
    this.transitionSpeedSecs = 700;
    this.cookieKey = "cookie-banner-closed";
    this.cookieClickedValue = "true";
    this.cookieExpirationDays = 30;

    this.hasClosedBefore = function() {
        return JPI.checkCookieValue(this.cookieKey, this.cookieClickedValue);
    };

    this.setCookie = function() {
        JPI.setCookie(this.cookieKey, this.cookieClickedValue, this.cookieExpirationDays);
    };

    this.close = function() {
        this.$banner.fadeOut(this.transitionSpeedSecs, function() {
            this.$banner.remove();
        }.bind(this));
        this.setCookie();
    };

    this.initDisplay = function() {
        if (this.hasClosedBefore()) {
            this.setCookie();
            this.$banner.remove();
        } else {
            this.$banner.show();
        }
    };

    this.init = function() {
        jQuery(".cookie-banner__close").on("click", this.close.bind(this));

        this.initDisplay();
    };

    this.init();
}));
