// Used to expand a projects slide show
window.jpi = window.jpi || {};
window.jpi.expandedSlideShow = (function(jQuery) {

    "use strict";

    var global = {
        expandedImageDivContainer: jQuery(".expanded-slide-show"),
        currentSlide: 0,
        slides: {},
    };

    var fn = {

        // Changes the current slide to new slide
        changeElement: function(nextSlideId) {
            jQuery(".expanded-image-slide-show__bullet").removeClass("active");

            if (nextSlideId >= global.slides.length) {
                nextSlideId = 0;
            }
            else if (nextSlideId < 0) {
                nextSlideId = global.slides.length - 1;
            }
            global.currentSlide = nextSlideId;

            var expandedImage = jQuery(".expanded-image.current"),
                expandedImage2 = jQuery(".expanded-image:not(.current)");

            expandedImage2.attr("src", global.slides[global.currentSlide].src).addClass("current");
            expandedImage.removeClass("current");

            jQuery(".js-expanded-slide-show-current-count").text(global.currentSlide + 1);
            jQuery(".expanded-image-slide-show__bullet:eq(" + global.currentSlide + ")").addClass("active");
        },

        next: function() {
            fn.changeElement(global.currentSlide + 1);
        },

        previous: function() {
            fn.changeElement(global.currentSlide - 1);
        },

        close: function() {
            global.expandedImageDivContainer.removeClass("active").addClass("hiding");

            setTimeout(function() {
                document.body.style.overflow = "auto";
                global.expandedImageDivContainer.removeClass("hiding");
            }, 990);

            jpi.slideShow.loopThroughSlideShows(jpi.slideShow.startSlideShow);

            jQuery(".expanded-slide-show__bullets").text("");
        },

        // Sets up slide show when image is clicked on
        setUp: function(e) {
            // Stops all the slide shows
            jpi.slideShow.loopThroughSlideShows(jpi.slideShow.stopSlideShow);

            // Get all slides in slide show
            var slideShowId = jQuery(e.target).attr("data-slide-show-id");
            global.slides = jQuery(slideShowId + " .slide-show__img");

            var slidesCount = global.slides.length;

            // Loops through all slide shows images and set up a bullet navigation for each
            for (var i = 0; i < slidesCount; i++) {
                // Checks if the current loop is the current image on slideShow
                if (global.slides[i] === e.target) {
                    global.currentSlide = i;
                }

                // Set up bullet navigation for slide
                jpi.helpers.createElement(jQuery(".expanded-slide-show__bullets")[0], "label", {
                    "class": "slide-show__bullet expanded-image-slide-show__bullet js-expanded-image-bullet",
                    "data-slide-id": i,
                });
            }

            // Display the current slide number and slide show length
            jQuery(".js-expanded-slide-show-current-count").text(global.currentSlide + 1);
            jQuery(".js-expanded-slide-show-total-count").text(slidesCount);

            // Check there are more than one slide show image to slide through
            if (slidesCount > 1) {
                // Sets up next and previous buttons
                jQuery(".expanded-slide-show__nav, .expanded-image-slide-show__bullet").show();
            }
            // Only one slide show image so stop next and previous buttons
            else {
                jQuery(".expanded-slide-show__nav, .expanded-image-slide-show__bullet").hide();
            }

            jQuery(".detailed-project").removeClass("open").hide();

            jQuery(".expanded-image.current").attr("src", e.target.src).show();

            // Makes current slides bullet navigation display as active
            jQuery(".expanded-image-slide-show__bullet:eq(" + global.currentSlide + ")").addClass("active");

            // Display the expanded image div
            global.expandedImageDivContainer.addClass("active");
            document.body.style.overflow = "hidden";
        },

        initListeners: function() {
            jQuery("body").on("click", ".js-expanded-image-bullet", function(e) {
                var slideId = jQuery(e.target).attr("data-slide-id");
                slideId = jpi.helpers.getInt(slideId);
                fn.changeElement(slideId);
            });

            jQuery("body").on("click", ".js-expandable-image", fn.setUp);
            jQuery(".expanded-slide-show__close").click(fn.close);
            jQuery(".js-expanded-slide-show-next").click(fn.next);
            jQuery(".js-expanded-slide-show-previous").click(fn.previous);
        },
    };

    jQuery(document).on("ready", fn.initListeners);

})(jQuery);