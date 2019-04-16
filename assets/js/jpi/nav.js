;window.jpi = window.jpi || {};
window.jpi.nav = (function(jQuery, jpi) {

    "use strict";

    var global = {
        mainSelector: ".nav",
        linksElector: ".nav__links-container, .nav__social-links-container",
        mobileButtonElector: ".nav__mobile-toggle",
    };

    var fn = {

        toggleMobileMenu: function() {
            var container = jQuery(global.linksElector);
            jQuery(global.mainSelector).toggleClass("opened");
            container.slideToggle();
        },

        initDesktopNav: function() {
            if (jQuery(window).width() > 768) {
                var container = jQuery(global.linksElector);
                container.show();
            }
        },

        // Code to collapse mobile menu when user clicks anywhere off it.
        closeMobileNav: function(e) {
            if (
                !jQuery(e.target).closest(global.mainSelector).length &&
                jQuery(global.mainSelector).hasClass("opened") &&
                jQuery(global.mobileButtonElector).css("display") !== "none"
            ) {
                jQuery(global.mobileButtonElector).trigger("click");
            }
        },

        toggleNavBarColour: function() {
            var navHeight = jQuery(global.mainSelector).height();
            var scrollPos = jQuery(window).scrollTop() + navHeight;
            var headerHeight = jQuery(".jumbotron").height();

            if (scrollPos >= headerHeight) {
                jQuery(global.mainSelector).addClass("scrolled");
            }
            else {
                jQuery(global.mainSelector).removeClass("scrolled");
            }
        },

        initListeners: function() {
            jQuery(document).on("click", fn.closeMobileNav);
            jQuery(window).on("orientationchange resize", jpi.helpers.debounce(fn.initDesktopNav, 150));
            jQuery(window).on("scroll", jpi.helpers.debounce(fn.toggleNavBarColour, 150));
            jQuery(global.mobileButtonElector).on("click", fn.toggleMobileMenu);
        },

        init: function() {
            fn.initListeners();
            fn.toggleNavBarColour();
        },
    };

    jQuery(document).on("ready", fn.init);

    return {};

})(jQuery, jpi);
