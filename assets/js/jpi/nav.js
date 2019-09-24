;window.jpi = window.jpi || {};
window.jpi.nav = (function(jQuery, jpi) {

    "use strict";

    var global = {
        nav: null,
        header: null,
        menuButton: null,
        linksContainer: null,
        window: null,
    };

    var fn = {

        toggleMobileMenu: function() {
            global.nav.toggleClass("opened");
            global.linksContainer.slideToggle();
        },

        initDesktopNav: function() {
            if (global.window.width() > 768) {
                global.linksContainer.show();
            }
        },

        // Code to collapse mobile menu when user clicks anywhere off it.
        closeMobileNav: function(e) {
            if (
                !jQuery(e.target).closest(".nav").length &&
                global.nav.hasClass("opened") &&
                global.menuButton.css("display") !== "none"
            ) {
                global.menuButton.trigger("click");
            }
        },

        toggleNavBarColour: function() {
            var navHeight = global.nav.height();
            var scrollPos = global.window.scrollTop() + navHeight;
            var headerHeight = global.header.height();

            if (scrollPos >= headerHeight) {
                global.nav.addClass("scrolled");
            }
            else {
                global.nav.removeClass("scrolled");
            }
        },

        initListeners: function() {
            jQuery(document).on("click", fn.closeMobileNav);
            global.window.on("orientationchange resize", jpi.helpers.debounce(fn.initDesktopNav, 150));
            global.window.on("scroll", jpi.helpers.debounce(fn.toggleNavBarColour, 150));
            global.menuButton.on("click", fn.toggleMobileMenu);
        },

        init: function() {
            global.window = jQuery(window);
            global.nav = jQuery(".nav");
            global.header = jQuery(".header");
            global.menuButton = jQuery(".nav__mobile-toggle");
            global.linksContainer = jQuery(".nav__links-container, .nav__social-links-container");

            fn.initListeners();
            fn.toggleNavBarColour();
        },
    };

    jQuery(document).on("ready", fn.init);

    return {};

})(jQuery, jpi);
