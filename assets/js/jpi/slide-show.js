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
        repositionSlides: function(id) {

            var slidesContainer = jQuery("#" + id + " .slide-show__slides-container");

            var viewpoint = jQuery("#" + id + " .slide-show__viewpoint");

            var currentSlide = jQuery("#" + id + " .slide-show__slide.active");

            if (!currentSlide.length) {
                currentSlide = jQuery("#" + id + " .slide-show__slide").first();
            }

            fn.widenSlideShow(viewpoint);

            slidesContainer.children().css("width", jQuery("#" + id).innerWidth() + "px");
            var position = currentSlide.position();

            slidesContainer.css({
                transitionDuration: "0s",
                left: "-" + position["left"] + "px"
            });

            setTimeout(fn.resetTransition, 100, slidesContainer);
        },

        // Starts a slide show by slide show element id
        startSlideShow: function(id) {
            if (jQuery("#" + id + " .slide-show__slides-container").children().length > 1) {
                global.slideShows["#" + id] = setInterval(function() {
                    fn.moveSlide("#" + id, "next");
                }, 5000);
            }
        },

        // Stops a slide show by slide show element id
        stopSlideShow: function(id) {
            clearInterval(global.slideShows["#" + id]);
        },

        // Loops through all slide shows
        loopThroughSlideShows: function(afterLooped) {
            var i, slideShows = jQuery(".hasSlideShow");

            for (i = 0; i < slideShows.length; i++) {
                afterLooped(slideShows[i].id);
            }
        },

        // Fixes all slide shows
        fixSlides: function() {
            var timer = setInterval(fn.loopThroughSlideShows, 10, fn.repositionSlides);
            setTimeout(function() {
                clearInterval(timer);
            }, 1000);
        },

        moveToSlide: function(id, nextSlide) {
            var slidesContainer = jQuery(id + " .slide-show__slides-container");

            clearInterval(global.slideShows[id]);

            fn.resetTransition(slidesContainer);

            if (id == "#slide-show--home") {
                var colour = nextSlide.filter(".slide-show__slide").attr("data-slide-colour");
                var regx = new RegExp("slide-show__nav--\\w*", "g");

                jQuery(id + " .slide-show__nav").each(function() {
                    var classList = jQuery(this).attr("class");
                    classList = classList.replace(regx, "slide-show__nav--" + colour);
                    jQuery(this).attr("class", classList);
                });
            }

            jQuery(id + " .active").removeClass("active");

            var position = nextSlide.position();
            nextSlide.addClass("active");
            var newSlideID = nextSlide[0].id;

            slidesContainer.css("left", "-" + position["left"] + "px");

            jQuery(id + " .slide-show__bullet[data-slide-id=" + newSlideID + "]").addClass("active");

            global.slideShows[id] = setInterval(function() {
                fn.moveSlide(id, "next");
            }, 5000);
        },

        // Moves to next or previous slide
        moveSlide: function(id, direction) {

            var oldSlide = jQuery(id + " .active"),
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

            fn.moveToSlide(id, nextSlide);
        },

        // Function when bullet was clicked to change slide show to a particular slide
        changeToSlide: function() {

            var id = jQuery(this).attr("data-slideShowId"),
                clickedSlide = jQuery(this).attr("data-slideId");

            var nextSlide = jQuery(id + " #" + clickedSlide);

            fn.moveToSlide(id, nextSlide);
        },

        // Moves current slide to correct position
        resetToCurrentSlide: function(id) {

            var position = jQuery(id + " .slide-show__slide.active").position(),
                slidesContainer = jQuery(id + " .slide-show__slides-container");

            slidesContainer.css({
                transitionDuration: "0s",
                left: "-" + position["left"] + "px"
            });

            setTimeout(fn.resetTransition, 100, slidesContainer);

            global.slideShows[id] = setInterval(function() {
                fn.moveSlide(id, "next");
            }, 5000);
        },

        // Sets up events when the user wants to change slides with drag control
        dragStart: function(e) {

            var id = jQuery(this).attr("data-slideShowId"),
                start = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                slidesContainer = jQuery(id + " .slide-show__slides-container"),
                slidesContainerLeft = slidesContainer.css("left"),
                slideShowViewpoint = jQuery(id + " .slide-show__viewpoint")[0],

                dragMove = function(e) {

                    var diff = start - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),

                        left = parseInt(slidesContainerLeft);

                    if (!left) {
                        left = 0;
                    }

                    slidesContainer.css({transitionDuration: "0s", left: (left - diff) + "px"});
                },

                dragEnd = function(e) {

                    var end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

                    if ((start - end) > 15) {
                        fn.moveSlide(id, "next");
                    }
                    else if ((start - end) < -15) {
                        fn.moveSlide(id, "previous");
                    }
                    else {
                        fn.resetToCurrentSlide(id);
                    }

                    slideShowViewpoint.removeEventListener("touchmove", dragMove);
                    slideShowViewpoint.removeEventListener("touchend", dragEnd);
                    slideShowViewpoint.removeEventListener("mousemove", dragMove);
                    slideShowViewpoint.removeEventListener("mouseup", dragEnd);
                    slideShowViewpoint.removeEventListener("mouseleave", dragCancel);
                },

                dragCancel = function() {

                    fn.resetToCurrentSlide(id);

                    slideShowViewpoint.removeEventListener("touchmove", dragMove);
                    slideShowViewpoint.removeEventListener("touchend", dragEnd);
                    slideShowViewpoint.removeEventListener("mousemove", dragMove);
                    slideShowViewpoint.removeEventListener("mouseup", dragEnd);
                    slideShowViewpoint.removeEventListener("mouseleave", dragCancel);
                };

            clearInterval(global.slideShows[id]);

            slideShowViewpoint.addEventListener("touchmove", dragMove);
            slideShowViewpoint.addEventListener("touchend", dragEnd);
            slideShowViewpoint.addEventListener("mousemove", dragMove);
            slideShowViewpoint.addEventListener("mouseup", dragEnd);
            slideShowViewpoint.addEventListener("mouseleave", dragCancel);
        },

        // Sets up a slide show
        setUp: function(id) {

            var slideShowViewpoint = jQuery(id + " .slide-show__viewpoint"),
                slideContainer = jQuery(id + " .slide-show__slide");

            jQuery(id).addClass("hasSlideShow").show();

            fn.widenSlideShow(slideShowViewpoint);

            if (slideContainer.length > 1) {

                slideContainer.css("width", slideShowViewpoint.innerWidth() + "px");

                jQuery(id + " .js-move-slide, " + id + " .js-slide-show-bullets").show();

                setTimeout(function() {
                    fn.moveToSlide(id, slideContainer.first());
                }, 100);

                slideShowViewpoint[0].addEventListener("mousedown", fn.dragStart);
                slideShowViewpoint[0].addEventListener("touchstart", fn.dragStart);
            }
            else {
                jQuery(id + " .js-move-slide, " + id + " .js-slide-show-bullets").hide();
            }
        },

        initListeners: function() {
            jQuery(window).on("orientationchange resize", fn.fixSlides);

            jQuery("body").on("click", ".js-slide-show-bullet", fn.changeToSlide);

            jQuery("body").on("click", ".js-move-slide", function() {
                fn.moveSlide(jQuery(this).attr("data-slideShowId"), jQuery(this).attr("data-navDirection"));
            });

            jQuery("body").on("dragstart", ".slide-show__img", false);
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