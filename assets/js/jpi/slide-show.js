;/**
 * Holds all functions needed for a project slide show
 */
window.jpi = window.jpi || {};
window.jpi.slideShow = (function(jQuery, jpi) {

    "use strict";

    var global = {
        slideShows: {},
        durationPerSlide: 5000, // Milliseconds
    };

    var fn = {

        // Loops through all slide shows
        loopThroughAll: function(afterLoopedFunc) {
            var slideShows = jQuery(".js-slide-show");

            for (var i = 0; i < slideShows.length; i++) {
                afterLoopedFunc("#" + slideShows[i].id);
            }
        },

        setNavColour: function(slideShow, slide) {
            if (slideShow.attr("id") === "latest-projects") {
                var colour = slide.attr("data-slide-colour");
                slideShow.find(".slide-show__nav").attr("data-colour", colour);
            }
        },

        // Resets the transition duration of a slide show
        resetTransition: function(slidesContainer) {
            slidesContainer.css("transition-duration", "");
        },

        // Widens slide show to fit all slides
        widenSlideShow: function(slideShowId) {
            var slideShow = jQuery(slideShowId);
            var slideShowViewport = slideShow.find(".slide-show__viewport");
            var slidesContainer = slideShow.find(".slide-show__slides");
            var slides = slideShow.find(".slide-show__slide");

            var slideWidth = slideShowViewport.innerWidth();

            slides.css("width", slideWidth + "px");

            slidesContainer.css("width", slideWidth * slides.length + "px");
        },

        // Moves current slide to correct position
        resetToCurrentSlide: function(slideShowId) {
            var slideShow = jQuery(slideShowId);
            var slidesContainer = slideShow.find(".slide-show__slides");

            var position = slideShow.find(".slide-show__slide.active").position();
            slidesContainer.css({
                transitionDuration: "0s",
                left: "-" + position.left + "px",
            });

            fn.resetTransition(slidesContainer);
        },

        // Adjusts all slides in slide show to fit
        repositionSlides: function(slideShowId) {
            fn.widenSlideShow(slideShowId);
            fn.resetToCurrentSlide(slideShowId);
        },

        fixSlides: function() {
            fn.loopThroughAll(fn.repositionSlides);
        },

        moveToSlide: function(slideShowId, nextSlide) {
            var slideShow = jQuery(slideShowId);
            fn.setNavColour(slideShow, nextSlide);

            slideShow.find(".active").removeClass("active");
            nextSlide.addClass("active");

            var position = nextSlide.position();

            var slidesContainer = slideShow.find(".slide-show__slides");
            slidesContainer.css("left", "-" + position.left + "px");

            var newSlideID = nextSlide.attr("id");
            slideShow.find(".slide-show__bullet[data-slide-id=#" + newSlideID + "]").addClass("active");
        },

        // Moves to next or previous slide
        move: function(slideShowId, direction) {
            var slideShow = jQuery(slideShowId);
            var oldSlide = slideShow.find(".slide-show__slide.active");

            var nextSlide;
            if (direction === "previous") {
                nextSlide = oldSlide.prev();
                if (!nextSlide.length) {
                    nextSlide = slideShow.find(".slide-show__slide").last();
                }
            }
            else {
                nextSlide = oldSlide.next();
                if (!nextSlide.length) {
                    nextSlide = slideShow.find(".slide-show__slide").first();
                }
            }

            fn.moveToSlide(slideShowId, nextSlide);
        },

        // Function when bullet was clicked to change slide show to a particular slide
        changeToSlide: function() {
            var bulletElem = jQuery(this);
            var slideShowId = bulletElem.attr("data-slide-show-id");
            var clickedSlideId = bulletElem.attr("data-slide-id");
            var nextSlide = jQuery(slideShowId).find(clickedSlideId);

            fn.pause(slideShowId);
            fn.moveToSlide(slideShowId, nextSlide);
            fn.resume(slideShowId);
        },

        // Sets up events when the user wants to change slides with drag control
        onSlideDrag: function(startEvent) {
            var getXPosition = function(e) {
                return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            };

            var slideShowId = jQuery(this).attr("data-slide-show-id");
            var slideShow = jQuery(slideShowId);

            var slidesContainer = slideShow.find(".slide-show__slides");
            var slidesContainerDom = slidesContainer[0];
            var slidesContainerLeft = slidesContainer.position().left;

            var startX = getXPosition(startEvent);

            var removeListeners = function() {
                slidesContainerDom.removeEventListener("touchmove", dragMove);
                slidesContainerDom.removeEventListener("mousemove", dragMove);
                slidesContainerDom.removeEventListener("touchend", dragEnd);
                slidesContainerDom.removeEventListener("mouseup", dragEnd);
                slidesContainerDom.removeEventListener("mouseleave", dragEnd);
            };
            var dragCancel = function() {
                fn.resetToCurrentSlide(slideShowId);
                fn.resume(slideShowId);
                removeListeners();
            };
            var dragMove = function(e) {
                var endX = getXPosition(e);
                var diff = startX - endX;

                slidesContainer.css({
                    transitionDuration: "0s",
                    left: (slidesContainerLeft - diff) + "px",
                });
            };
            var dragEnd = function(e) {
                var endX = getXPosition(e);

                var diff = startX - endX;
                if (Math.abs(diff) >= 15) {
                    fn.resetTransition(slidesContainer);
                    fn.move(slideShowId, diff < 0 ? "previous" : "next");
                    fn.resume(slideShowId);
                    removeListeners();
                    return;
                }

                dragCancel();
            };

            fn.pause(slideShowId);
            slidesContainerDom.addEventListener("touchmove", dragMove);
            slidesContainerDom.addEventListener("mousemove", dragMove);
            slidesContainerDom.addEventListener("touchend", dragEnd);
            slidesContainerDom.addEventListener("mouseup", dragEnd);
            slidesContainerDom.addEventListener("mouseleave", dragEnd);
        },

        start: function(slideShowId) {
            var slideShow = jQuery(slideShowId);
            var slides = slideShow.find(".slide-show__slide");
            var count = slides.length;

            if (count <= 0) {
                slideShow.find(".slide-show__nav, .slide-show__bullets").hide();
                return;
            }

            var firstSlide = slides.first();

            firstSlide.addClass("active");
            slideShow.find(".slide-show__bullet").first().addClass("active");

            fn.setNavColour(slideShow, firstSlide);

            if (count > 1) {
                slideShow.addClass("js-slide-show");
                fn.widenSlideShow(slideShowId);
                slideShow.find(".slide-show__nav, .slide-show__bullets").show();

                slideShow.find(".slide-show__slides")[0].addEventListener("touchstart", fn.onSlideDrag);

                global.slideShows[slideShowId] = setInterval(function() {
                    fn.move(slideShowId, "next");
                }, global.durationPerSlide);
            }
        },

        // Pause a slide show by clearing the interval function on slide show id
        pause: function(slideShowId) {
            clearInterval(global.slideShows[slideShowId]);
        },
        pauseAll: function() {
            fn.loopThroughAll(fn.pause);
        },

        stop: function(slideShowId) {
            jQuery(slideShowId).removeClass("js-slide-show");
            clearInterval(global.slideShows[slideShowId]);
        },

        // Resumes a slide show by slide show element id
        resume: function(slideShowId) {
            global.slideShows[slideShowId] = setInterval(function() {
                fn.move(slideShowId, "next");
            }, global.durationPerSlide);
        },
        resumeAll: function() {
            fn.loopThroughAll(fn.resume);
        },

        initListeners: function() {
            if (!jQuery(".slide-show").length) {
                return;
            }

            var body = jQuery("body");
            body.on("dragstart", ".slide-show__image", false);
            // body.on("mousedown touchstart", ".js-slide-show .slide-show__slides", fn.onSlideDrag);
            body.on("click", ".slide-show__bullet", fn.changeToSlide);

            body.on("click", ".slide-show__nav", function() {
                var nav = jQuery(this);
                var slideShowId = nav.attr("data-slide-show-id");
                fn.pause(slideShowId);
                fn.move(slideShowId, nav.attr("data-direction"));
                fn.resume(slideShowId);
            });

            jQuery(window).on("orientationchange resize", jpi.helpers.debounce(fn.fixSlides, 150));
        },
    };

    jQuery(document).on("ready", fn.initListeners);

    return {
        start: fn.start,
        stop: fn.stop,
        pauseAll: fn.pauseAll,
        resumeAll: fn.resumeAll,
        reposition: fn.repositionSlides,
    };

})(jQuery, jpi);
