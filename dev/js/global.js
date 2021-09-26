var JPI = JPI || {};

//=include ./third-party/jquery.min.js
//=include ./jpi/helpers.js
//=include ./jpi/components/nav.js
//=include ./jpi/components/cookie-banner.js

;(function() {

    "use strict";

    var $body = jQuery("html, body");
    var $nav = jQuery(".nav");
    var $mainContent = jQuery(".main-content");

    JPI.scrollTo = function($el, offset) {
        $body.animate({
            scrollTop: $el.offset().top - $nav.height() - offset,
        }, 1000);
    }

    jQuery(".js-scroll-to-content").on("click", function() {
        JPI.scrollTo($mainContent);
    });

    /**
     * Due to the way the modal's are rendered
     * move all modal's after the page element for accessibility
     */
    jQuery('.modal').insertAfter(jQuery('.page-container'));
})();
