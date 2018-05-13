window.jpi = window.jpi || {};
window.jpi.main = (function (jQuery) {

    "use strict";

    var count = function (options) {
            var $this = jQuery(this);
            options = jQuery.extend({}, options || {}, $this.data('countToOptions') || {});
            $this.countTo(options);
        },

        initCounters = function () {
            var counters = jQuery('.counter');

            if (counters.length > 0) {
                jQuery('.counter').waypoint(function(){
                    jQuery('.counter').each(count);
                },{offset:'100%'});
            }
        },

        toggleMobileMenu = function() {
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

        jumpToContent = function () {
            jQuery('html, body').animate({
                scrollTop: jQuery("section").offset().top - jQuery(".nav").height()
            }, 1000);
        },

        toggleLabelContent = function () {
            var selected = jQuery(this).children(".label__more_content"); // Get the new label that was clicked
            var selected_icon = jQuery(this).children(".label__expand-icon");

            // Reset all other label to closed
            jQuery(".label__more_content").not(selected).slideUp();
            jQuery(".label__expand-icon").not(selected_icon).addClass("fa-plus").removeClass("fa-minus");

            //Toggle the clicked label
            selected_icon.toggleClass("fa-plus");
            selected_icon.toggleClass("fa-minus");
            selected.slideToggle();

            jQuery(this).toggleClass("expanded-label");
            jQuery('.js-expand-label').not(this).removeClass("expanded-label");
        },

        initSecondsCounter = function () {
            var secsElem = jQuery(".js-seconds-on-site");
            if (secsElem.length > 0) {
                setTimeout(function() {
                    setInterval(function() {
                        var lastSec = secsElem.text();
                        lastSec = parseInt(lastSec);
                        secsElem.text(lastSec+1);
                    }, 1000);
                }, 1000);
            }
        },

        initListeners = function () {
            jQuery(document).on("click", closeMobileNav);

            jQuery(".nav__links__toggle").on("click", toggleMobileMenu);

            jQuery(window).on("orientationchange resize", initDesktopNav);

            jQuery(window).on("scroll", toggleNavBar);

            jQuery(".js-scroll-to-content").on("click", jumpToContent);

            jQuery(".js-expand-label").on("click", toggleLabelContent);
        },

        init = function () {
            initListeners();
            initCounters();
            initSecondsCounter();
        };

    jQuery(document).on("ready", init);
}(jQuery));