// Holds all functions needed for a project slide show
window.jpi = window.jpi || {};
window.jpi.slideShow = (function(jQuery) {

    "use strict";

    var global = {
        slideShows: {}
    };

    var fn = {

        // Resets the transition duration of a slide show to 2s
        resetTransition: function(slidesContainer) {
            slidesContainer.css("transitionDuration", "2s");
        },

        // Widens slide show to fit all slides
        widenSlideShow: function(slideShowViewpoint) {
            var width = slideShowViewpoint.innerWidth() * slideShowViewpoint.children().first().children().length;

            slideShowViewpoint.children().first().css("width", width + "px");
        },

        // Adjusts all slides in slide show to fit
        repositionSlides: function(slideShowId) {
            var slidesContainer = jQuery("#" + slideShowId + " .slide-show__slides-container"),
                viewpoint = jQuery("#" + slideShowId + " .slide-show__viewpoint"),
                currentSlide = jQuery("#" + slideShowId + " .slide-show__slide.active");

            if (!currentSlide.length) {
                currentSlide = jQuery("#" + slideShowId + " .slide-show__slide").first();
            }

            fn.widenSlideShow(viewpoint);

            slidesContainer.children().css("width", jQuery("#" + slideShowId).innerWidth() + "px");
            var position = currentSlide.position();

            slidesContainer.css({
                transitionDuration: "0s",
                left: "-" + position["left"] + "px"
            });

            setTimeout(fn.resetTransition, 100, slidesContainer);
        },

        // Starts a slide show by slide show element id
        startSlideShow: function(slideShowId) {
            if (jQuery("#" + slideShowId + " .slide-show__slides-container").children().length > 1) {
                global.slideShows["#" + slideShowId] = setInterval(function() {
                    fn.moveSlide("#" + slideShowId, "next");
                }, 5000);
            }
        },

        // Stops a slide show by slide show element id
        stopSlideShow: function(slideShowId) {
            clearInterval(global.slideShows["#" + slideShowId]);
        },

        // Loops through all slide shows
        loopThroughSlideShows: function(afterLoopedFunc) {
            var i, slideShows = jQuery(".hasSlideShow");

            for (i = 0; i < slideShows.length; i++) {
                afterLoopedFunc(slideShows[i].id);
            }
        },

        // Fixes all slide shows
        fixSlides: function() {
            var timer = setInterval(fn.loopThroughSlideShows, 10, fn.repositionSlides);
            setTimeout(function() {
                clearInterval(timer);
            }, 1000);
        },

        moveToSlide: function(slideShowId, nextSlide) {
            var slidesContainer = jQuery(slideShowId + " .slide-show__slides-container");

            clearInterval(global.slideShows[slideShowId]);

            fn.resetTransition(slidesContainer);

            if (slideShowId === "#slide-show--home") {
                var colour = nextSlide.filter(".slide-show__slide").attr("data-slide-colour"),
                    regx = new RegExp("slide-show__nav--\\w*", "g");

                jQuery(slideShowId + " .slide-show__nav").each(function() {
                    var classList = jQuery(this).attr("class");
                    classList = classList.replace(regx, "slide-show__nav--" + colour);
                    jQuery(this).attr("class", classList);
                });
            }

            jQuery(slideShowId + " .active").removeClass("active");

            var newSlideID = nextSlide[0].id,
                position = nextSlide.position();

            nextSlide.addClass("active");

            slidesContainer.css("left", "-" + position["left"] + "px");

            jQuery(slideShowId + " .slide-show__bullet[data-slide-id=" + newSlideID + "]").addClass("active");

            global.slideShows[slideShowId] = setInterval(function() {
                fn.moveSlide(slideShowId, "next");
            }, 5000);
        },

        // Moves to next or previous slide
        moveSlide: function(slideShowId, direction) {
            var oldSlide = jQuery(slideShowId + " .active"),
                nextSlide;

            if (direction === "next") {
                if (oldSlide.next().length > 0) {
                    nextSlide = oldSlide.next();
                }
                else {
                    nextSlide = oldSlide.parent().children().first();
                }
            }
            else {
                if (oldSlide.prev().length > 0) {
                    nextSlide = oldSlide.prev();
                }
                else {
                    nextSlide = oldSlide.parent().children().last();
                }
            }

            fn.moveToSlide(slideShowId, nextSlide);
        },

        // Function when bullet was clicked to change slide show to a particular slide
        changeToSlide: function() {
            var slideShowId = jQuery(this).attr("data-slide-show-id"),
                clickedSlideId = jQuery(this).attr("data-slide-id"),
                nextSlide = jQuery(slideShowId + " #" + clickedSlideId);

            fn.moveToSlide(slideShowId, nextSlide);
        },

        // Moves current slide to correct position
        resetToCurrentSlide: function(slideShowId) {
            var position = jQuery(slideShowId + " .slide-show__slide.active").position(),
                slidesContainer = jQuery(slideShowId + " .slide-show__slides-container");

            slidesContainer.css({
                transitionDuration: "0s",
                left: "-" + position["left"] + "px"
            });

            setTimeout(fn.resetTransition, 100, slidesContainer);

            global.slideShows[slideShowId] = setInterval(function() {
                fn.moveSlide(slideShowId, "next");
            }, 5000);
        },

        // Sets up events when the user wants to change slides with drag control
        dragStart: function(e) {
            var slideShowId = jQuery(this).attr("data-slide-show-id"),
                start = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                slidesContainer = jQuery(slideShowId + " .slide-show__slides-container"),
                slidesContainerLeft = slidesContainer.css("left"),
                slideShowViewpoint = jQuery(slideShowId + " .slide-show__viewpoint")[0],

                removeListeners = function () {
                    slideShowViewpoint.removeEventListener("touchmove", dragMove);
                    slideShowViewpoint.removeEventListener("touchend", dragEnd);
                    slideShowViewpoint.removeEventListener("mousemove", dragMove);
                    slideShowViewpoint.removeEventListener("mouseup", dragEnd);
                    slideShowViewpoint.removeEventListener("mouseleave", dragCancel);
                },

                dragMove = function(e) {
                    var diff = start - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),
                        left = jpi.helpers.getInt(slidesContainerLeft, 0);

                    slidesContainer.css({
                        transitionDuration: "0s",
                        left: (left - diff) + "px"
                    });
                },

                dragEnd = function(e) {
                    var end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

                    if ((start - end) > 15) {
                        fn.moveSlide(slideShowId, "next");
                    }
                    else if ((start - end) < -15) {
                        fn.moveSlide(slideShowId, "previous");
                    }
                    else {
                        fn.resetToCurrentSlide(slideShowId);
                    }

                    removeListeners();
                },

                dragCancel = function() {
                    fn.resetToCurrentSlide(slideShowId);
                    removeListeners();
                };

            clearInterval(global.slideShows[slideShowId]);

            slideShowViewpoint.addEventListener("touchmove", dragMove);
            slideShowViewpoint.addEventListener("touchend", dragEnd);
            slideShowViewpoint.addEventListener("mousemove", dragMove);
            slideShowViewpoint.addEventListener("mouseup", dragEnd);
            slideShowViewpoint.addEventListener("mouseleave", dragCancel);
        },

        // Sets up a slide show
        setUp: function(slideShowId) {
            var slideShowViewpoint = jQuery(slideShowId + " .slide-show__viewpoint"),
                slideContainer = jQuery(slideShowId + " .slide-show__slide");

            jQuery(slideShowId).addClass("hasSlideShow").show();

            fn.widenSlideShow(slideShowViewpoint);

            if (slideContainer.length > 1) {

                slideContainer.css("width", slideShowViewpoint.innerWidth() + "px");

                jQuery(slideShowId + " .js-move-slide, " + slideShowId + " .js-slide-show-bullets").show();

                setTimeout(function() {
                    fn.moveToSlide(slideShowId, slideContainer.first());
                }, 100);

                slideShowViewpoint[0].addEventListener("mousedown", fn.dragStart);
                slideShowViewpoint[0].addEventListener("touchstart", fn.dragStart);
            }
            else {
                jQuery(slideShowId + " .js-move-slide, " + slideShowId + " .js-slide-show-bullets").hide();
            }
        },

        initListeners: function() {
            jQuery(window).on("orientationchange resize", fn.fixSlides);
            jQuery("body").on("dragstart", ".slide-show__img", false);
            jQuery("body").on("click", ".js-slide-show-bullet", fn.changeToSlide);

            jQuery("body").on("click", ".js-move-slide", function() {
                fn.moveSlide(jQuery(this).attr("data-slide-show-id"), jQuery(this).attr("data-nav-direction"));
            });
        }
    };

    jQuery(document).on("ready", fn.initListeners);

    return {
        "setUp": fn.setUp,
        "dragStart": fn.dragStart,
        "loopThroughSlideShows": fn.loopThroughSlideShows,
        "stopSlideShow": fn.stopSlideShow,
        "startSlideShow": fn.startSlideShow,
        "slideShows": global.slideShows
    };

}(jQuery));