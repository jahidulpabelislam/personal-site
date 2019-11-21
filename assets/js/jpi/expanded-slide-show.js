;/**
 * Used to expand a projects slide show
 */
window.jpi = window.jpi || {};
window.jpi.expandedSlideShow = (function(jQuery, jpi) {

    "use strict";

    var global = {
        expandedImageDivContainer: null,
        currentSlide: 0,
        slides: {},
        timeout: null,
    };

    var fn = {

        displaySlide: function(expandedImage) {
            expandedImage.attr("src", global.slides[global.currentSlide].src);

            jQuery(".js-expanded-slide-show-current-count").text(global.currentSlide + 1);
            jQuery(".expanded-slide-show__bullet:eq(" + global.currentSlide + ")").addClass("active");
        },

        // Changes the current slide to new slide
        changeElement: function(nextSlideIndex) {
            if (nextSlideIndex >= global.slides.length) {
                nextSlideIndex = 0;
            }
            else if (nextSlideIndex < 0) {
                nextSlideIndex = global.slides.length - 1;
            }
            global.currentSlide = nextSlideIndex;

            jQuery(".expanded-slide-show__bullet").removeClass("active");

            var expandedImage = jQuery(".expanded-slide-show__image.current"),
                expandedImage2 = jQuery(".expanded-slide-show__image:not(.current)");

            fn.displaySlide(expandedImage2);

            expandedImage2.addClass("current");
            expandedImage.removeClass("current");
        },
        next: function() {
            fn.changeElement(global.currentSlide + 1);
        },
        previous: function() {
            fn.changeElement(global.currentSlide - 1);
        },

        close: function() {
            global.expandedImageDivContainer.removeClass("active").addClass("hiding");

            global.timeout = setTimeout(function() {
                global.expandedImageDivContainer.removeClass("hiding");
                jpi.modal.close();
                jpi.slideShow.startSlideShows();
                global.timeout = null;
            }, 990);
        },

        // Sets up slide show when image is clicked on
        show: function(e) {
            // Get all slides in slide show
            var slideShowId = jQuery(e.target).attr("data-slide-show-id");
            global.slides = jQuery(slideShowId + " .slide-show__img");

            var bulletsContainer = jQuery(".expanded-slide-show__bullets");
            bulletsContainer.text("");

            // Loops through all slide shows images and set up a bullet navigation for each
            var slidesCount = global.slides.length;
            for (var i = 0; i < slidesCount; i++) {
                // Checks if the current loop is the current image on slideShow
                if (global.slides[i] === e.target) {
                    global.currentSlide = i;
                }

                // Set up bullet navigation for slide
                jpi.helpers.createElement(bulletsContainer[0], "button", {
                    "class": "expanded-slide-show__bullet js-expanded-image-bullet",
                    "data-slide-id": i,
                });
            }

            // Display the slide show length
            jQuery(".js-expanded-slide-show-total-count").text(slidesCount);

            // Check there are more than one slide show image to slide through
            if (slidesCount > 1) {
                // Sets up next and previous buttons
                jQuery(".expanded-slide-show__nav, .expanded-slide-show__bullet").show();
            }
            // Only one slide show image so stop next and previous buttons
            else {
                jQuery(".expanded-slide-show__nav, .expanded-slide-show__bullet").hide();
            }

            if (global.timeout) {
                clearTimeout(global.timeout);
            }

            jpi.slideShow.stopSlideShows();

            fn.displaySlide(jQuery(".expanded-slide-show__image.current"));
            jpi.modal.open(global.expandedImageDivContainer);
            global.expandedImageDivContainer.addClass("active");
        },

        initListeners: function() {
            global.expandedImageDivContainer = jQuery(".expanded-slide-show");
            if (!global.expandedImageDivContainer.length) {
                return;
            }

            jQuery("body").on("click", ".js-expanded-image-bullet", function(e) {
                var slideId = jQuery(e.target).attr("data-slide-id");
                slideId = jpi.helpers.getInt(slideId);
                fn.changeElement(slideId);
            });

            jQuery("body").on("click", ".js-expandable-image", fn.open);
            jQuery(".expanded-slide-show__nav").on("click", function() {
                var direction = jQuery(this).attr("data-direction");
                fn[direction]();
            });
            jQuery(".expanded-slide-show__close").on("click", fn.close);
        },
    };

    jQuery(document).on("ready", fn.initListeners);

    return {};

})(jQuery, jpi);
