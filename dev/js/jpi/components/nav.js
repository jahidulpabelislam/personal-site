;(new (function() {

    "use strict";

    var $window = jQuery(window);

    this.$element = jQuery(".nav");
    this.$menuButton = jQuery(".nav__mobile-toggle");
    this.$linksContainers = jQuery(".nav__links-container");

    var $header = jQuery(".header");

    this.toggleMobileMenu = function() {
        this.$element.toggleClass("nav--open");
        this.$linksContainers.slideToggle();
    };

    this.reset = function() {
        if (window.innerWidth >= JPI.getInt(JPI.breakpoints.tablet)) {
            this.$linksContainers.css("display", "");
        }

        // Set the correct class on nav depending on current scroll position
        var navHeight = this.$element.height();
        var scrollPos = $window.scrollTop() + navHeight;
        var headerHeight = $header.height();

        if (!headerHeight || scrollPos >= headerHeight) {
            this.$element.addClass("nav--scrolled");
        }
        else {
            this.$element.removeClass("nav--scrolled");
        }
    };

    // Code to collapse mobile menu when user clicks anywhere off it.
    this.onNavClick = function(e) {
        if (
            this.$element.hasClass("nav--open") &&
            !jQuery(e.target).closest(".nav").length &&
            this.$menuButton.css("display") !== "none"
        ) {
            this.$menuButton.click();
        }
    };

    this.init = function() {
        this.reset();

        $window.on("click", this.onNavClick.bind(this));
        $window.on("scroll orientationchange resize", JPI.debounce(this.reset.bind(this), 150));
        this.$menuButton.on("click", this.toggleMobileMenu.bind(this));
    };

    $window.on("jpi-css-loaded", this.init.bind(this));
}));
