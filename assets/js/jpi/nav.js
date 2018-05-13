window.jpi = window.jpi || {};
window.jpi.nav = (function (jQuery) {

    "use strict";

    var toggleMobileMenu = function() {
            var container = jQuery(".nav__links-container");
            container.toggleClass("closed");
            container.toggleClass("opening");

            if (container[0].clientHeight) {
                container[0].style.height = 0;
            } else {
                var wrapper = jQuery(".nav__links")[0];
                container[0].style.height = wrapper.clientHeight + "px";
            }

            setTimeout(function() {
                container.toggleClass("opening");
            }, 670);

            jQuery(".nav").toggleClass("opened");
        },

        initDesktopNav = function () {
            if (jQuery(window).width() > 768) {
                var container = jQuery(".nav__links-container");
                container[0].style.height = "";
                container.addClass("closed");
                jQuery(".nav").removeClass("opened");
                container.removeClass("opening");
            }
        },

        //Custom code to collapse mobile menu when user clicks off it.
        closeMobileNav = function (event) {
            if(!jQuery(event.target).closest('.nav').length && !jQuery(".nav__links-container").hasClass("closed") && jQuery(".nav__links__toggle").css("display") !== "none") {
                jQuery(".nav__links__toggle").trigger("click");
            }
        },

        toggleNavBar = function () {
            var nav_height = jQuery(".nav").height();
            var scroll_pos = jQuery(window).scrollTop() + nav_height;
            var win_height = jQuery(window).height();

            if (scroll_pos >= win_height) {
                jQuery(".nav").addClass("scrolled");
            } else {
                jQuery(".nav").removeClass("scrolled");
            }
        },

        initListeners = function () {
            jQuery(document).on("click", closeMobileNav);

            jQuery(".nav__links__toggle").on("click", toggleMobileMenu);

            jQuery(window).on("orientationchange resize", initDesktopNav);

            jQuery(window).on("scroll", toggleNavBar);
        };

    jQuery(document).on("ready", initListeners);
}(jQuery));