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

        initListeners = function () {
            jQuery(".js-scroll-to-content").on("click", jumpToContent);

            jQuery(".js-expand-label").on("click", toggleLabelContent);
        },

        init = function () {
            initListeners();
            initCounters();
        };

    jQuery(document).on("ready", init);
}(jQuery));