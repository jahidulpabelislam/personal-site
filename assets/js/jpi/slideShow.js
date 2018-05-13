//Holds all functions needed for a projects slide show
window.jpi = window.jpi || {};
window.jpi.slideShow = (function (jQuery) {

    "use strict";

    var autoSlide = {},

        //Resets the transition duration of a slide show to 2s
        resetTransition = function(slidesContainer) {
            slidesContainer.css("transitionDuration", "2s");
        },

        //Widens slide show to fit all slides
        widenSlideShow = function(slideShowViewpoint) {

            var width = slideShowViewpoint.innerWidth() * slideShowViewpoint.children().first().children().length;

            slideShowViewpoint.children().first().css("width", width + "px");
        },

        //adjusts all slides in slide show to fit
        repositionSlides = function(id) {

            var slidesContainer = jQuery("#" + id + " .slide-show__slides-container");

            var viewpoint = jQuery("#" + id + " .slide-show__viewpoint");

            var currentSlide = jQuery("#" + id + " .slide-show__slide-container.active");

            widenSlideShow(viewpoint);

            slidesContainer.children().css("width", jQuery("#" + id).innerWidth() + "px");
            var position = currentSlide.position();

            slidesContainer.css({
                "transitionDuration": "0s",
                "left": "-" + position["left"] + "px"
            });

            setTimeout(resetTransition, 100, slidesContainer);
        },

        //starts a slide show
        startSlideShow = function(id) {
            if (jQuery("#" + id + " .slide-show__slides-container").children().length > 1) {
                autoSlide["#"+id] = setInterval(function() {
                    moveSlide("#"+id, "next");
                }, 5000);
            }
        },

        //stops a slide show
        stopSlideShow = function(id) {
            clearInterval(autoSlide["#"+id]);
        },

        //loops through all slide shows
        loopThroughSlideShows = function(afterLooped) {
            var i, slideShows = jQuery(".hasSlideShow");

            for (i = 0; i < slideShows.length; i++) {
                afterLooped(slideShows[i].id);
            }
        },

        //fixes all slide shows
        fixSlides = function() {
            var timer = setInterval(loopThroughSlideShows, 10, repositionSlides);
            setTimeout(function() {
                clearInterval(timer);
            }, 1000);
        },

        moveToSlide = function(id, nextSlide) {
            var slidesContainer = jQuery(id + " .slide-show__slides-container");

            clearInterval(autoSlide[id]);

            resetTransition(slidesContainer);

            if (id == "#slide-show--projects-preview"){
                var colour = nextSlide.filter(".slide-show__slide-container").attr("data-slide-colour");
                var regx = new RegExp("slide-show__nav--\\w*", 'g');

                jQuery(id + " .slide-show__nav").each(function() {
                    var classList = jQuery(this).attr("class");
                    classList =  classList.replace(regx, 'slide-show__nav--'+colour);
                    jQuery(this).attr("class", classList);
                });
            }

            jQuery(id + " .active").removeClass("active");

            var position = nextSlide.position();
            nextSlide.addClass("active");
            var newSlideID = nextSlide[0].id;

            slidesContainer.css("left", "-" + position["left"] + "px");

            jQuery(id + " .slide-show__bullet[data-slide-id=" + newSlideID + "]").addClass("active");

            autoSlide[id] = setInterval(function() {
                moveSlide(id, "next");
            }, 5000);
        },

        //moves to next or previous slide
        moveSlide = function(id, direction) {

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

            moveToSlide(id, nextSlide);
        },

        //Function when bullet was clicked to change slide show to a particular slide
        changeToSlide = function() {

            var id = jQuery(this).data("slideShowId"),
                clickedSlide = jQuery(this).data("slideId");

            var nextSlide = jQuery(id + " #" + clickedSlide);

            moveToSlide(id, nextSlide);
        },

        //moves current slide to correct position
        resetToCurrentSlide = function(id) {

            var position = jQuery(id + " .slide-show__slide-container.active").position(),
                slidesContainer = jQuery(id + " .slide-show__slides-container");

            slidesContainer.css({"transitionDuration": "0s", "left": "-" + position["left"] + "px"});

            setTimeout(resetTransition, 100, slidesContainer);

            autoSlide[id] = setInterval(function() {
                moveSlide(id, "next");
            }, 5000);
        },

        //sets up events when the user wants to change slides with drag control
        dragStart = function(e) {

            var id = jQuery(this).data("slideShowId"),
                start = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
                slidesContainer = jQuery(id + " .slide-show__slides-container"),
                slidesContainerLeft = slidesContainer.css("left"),
                slideShowViewpoint = jQuery(id + " .slide-show__viewpoint"),

                dragMove = function(e) {

                    var diff = start - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),

                        left = parseInt(slidesContainerLeft);

                    if (!left) {
                        left = 0;
                    }

                    slidesContainer.css({"transitionDuration": "0s", left: (left - diff) + "px"});
                },

                dragEnd = function(e) {

                    var end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

                    if ((start - end) > 15) {
                        moveSlide(id, "next");
                    } else if ((start - end) < -15) {
                        moveSlide(id, "previous");
                    } else {
                        resetToCurrentSlide(id);
                    }

                    slideShowViewpoint[0].removeEventListener("touchmove", dragMove);
                    slideShowViewpoint[0].removeEventListener("touchend", dragEnd);
                    slideShowViewpoint[0].removeEventListener("mousemove", dragMove);
                    slideShowViewpoint[0].removeEventListener("mouseup", dragEnd);
                    slideShowViewpoint[0].removeEventListener("mouseleave", dragCancel);
                },

                dragCancel = function() {

                    resetToCurrentSlide(id);

                    slideShowViewpoint[0].removeEventListener("touchmove", dragMove);
                    slideShowViewpoint[0].removeEventListener("touchend", dragEnd);
                    slideShowViewpoint[0].removeEventListener("mousemove", dragMove);
                    slideShowViewpoint[0].removeEventListener("mouseup", dragEnd);
                    slideShowViewpoint[0].removeEventListener("mouseleave", dragCancel);
                };

            clearInterval(autoSlide[id]);

            slideShowViewpoint[0].addEventListener("touchmove", dragMove);
            slideShowViewpoint[0].addEventListener("touchend", dragEnd);
            slideShowViewpoint[0].addEventListener("mousemove", dragMove);
            slideShowViewpoint[0].addEventListener("mouseup", dragEnd);
            slideShowViewpoint[0].addEventListener("mouseleave", dragCancel);
        },

        //sets up a slide show
        setUp = function(id) {

            var slideShowViewpoint = jQuery(id + " .slide-show__viewpoint"),
                slideContainer = jQuery(id + " .slide-show__slide-container");

            jQuery(id).addClass("hasSlideShow").show();

            widenSlideShow(slideShowViewpoint);

            if (slideContainer.length > 1) {

                slideContainer.css("width", slideShowViewpoint.innerWidth() + "px");

                jQuery(id + " .js-move-slide, " + id + " .js-slide-show-bullets").show();

                setTimeout(function() {
                    moveToSlide(id, slideContainer.first());
                }, 100);

                slideShowViewpoint[0].addEventListener("mousedown", dragStart);
                slideShowViewpoint[0].addEventListener("touchstart", dragStart);
            }
            else {
                jQuery(id + " .js-move-slide, " + id + " .js-slide-show-bullets").hide();
            }
        },

        initListeners = function () {
            jQuery(window).on("orientationchange resize", fixSlides);

            jQuery("body").on("click", ".js-slide-show-bullet", changeToSlide);

            jQuery("body").on("click", ".js-move-slide", function() {
                moveSlide(jQuery(this).data("slideShowId"), jQuery(this).data("navDirection"));
            });

            jQuery("body").on("dragstart", ".slide", false);
        };

    jQuery(document).on("ready", initListeners);

    return {
        "setUp": setUp,
        "dragStart": dragStart,
        "loopThroughSlideShows": loopThroughSlideShows,
        "stopSlideShow": stopSlideShow,
        "startSlideShow": startSlideShow
    }

}(jQuery));