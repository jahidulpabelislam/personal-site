//Holds all functions needed for a projects slide show
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

        var slidesContainer = $("#" + id + " .slidesContainer");

        widenSlideShow($("#" + id + " .slideShowViewpoint"));

        slidesContainer.children().css("width", $("#" + id).innerWidth() + "px");
        var position = $("#" + id + " .slideContainer.active").position();

        slidesContainer.css({
            "transitionDuration": "0s",
            "left": "-" + position["left"] + "px"
        });

        setTimeout(resetTransition, 100, slidesContainer);
    },

    //starts a slide show
    startSlideShow = function(id) {
        if ($("#" + id + " .slidesContainer").children().length > 1) {
            autoSlide[id] = setInterval(function() {
                moveSlide(id, "next");
            }, 5000);
        }
    },

    //stops a slide show
    stopSlideShow = function(id) {
        clearInterval(autoSlide[id]);
    },

    //loops through all slide shows
    loopThroughSlideShows = function(afterLooped) {
        var i, slideShows = $(".hasSlideShow");

        for (i = 0; i < slideShows.length; i++) {
            afterLooped(slideShows[i].attr("id"));
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
        var slidesContainer = $("#" + id + " .slidesContainer");

        clearInterval(autoSlide[id]);

        resetTransition(slidesContainer);

        $("#" + id + " .active").removeClass("active");

        var position = nextSlide.position();
        nextSlide.addClass("active");
        var newSlideID = nextSlide.attr("id");

        slidesContainer.css("left", "-" + position["left"] + "px");

        $("#" + id + " .bullet[data-slide-id=" + newSlideID + "]").addClass("active");

        autoSlide[id] = setInterval(function() {
            moveSlide(id, "next");
        }, 5000);
    },

    //moves to next or previous slide
    moveSlide = function(id, direction) {

        var oldSlide = $("#" + id + " .active"),
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

        var id = $(this).data("slideShowId"),
            clickedSlide = $(this).data("slideId");

        var nextSlide = $("#" + id + " #" + clickedSlide);

        moveToSlide(id, nextSlide);
    },

    //moves current slide to correct position
    resetToCurrentSlide = function(id) {

        var position = $("#" + id + " .slideContainer.active").position(),
            slidesContainer = $("#" + id + " .slidesContainer");

        slidesContainer.css({"transitionDuration": "0s", "left": "-" + position["left"] + "px"});

        setTimeout(resetTransition, 100, slidesContainer);

        autoSlide[id] = setInterval(function() {
            moveSlide(id, "next");
        }, 5000);
    },

    //sets up events when the user wants to change slides with drag control
    dragStart = function(e) {

        var id = $(this).data("slideShowId"),
            start = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            slidesContainer = $("#" + id + " .slidesContainer"),
            slidesContainerLeft = slidesContainer.css("left"),
            slideShowViewpoint = $("#" + id + " .slideShowViewpoint"),

            dragMove = function(e) {

                var diff = start - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),

                    left = parseInt(slidesContainerLeft);

                if (!left) {
                    left = 0;
                }

                slidesContainer.css({"transitionDuration": "0s", left: (left - diff) + "px"});

                setTimeout(resetTransition, 100, slidesContainer);
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
    setUpSlideShow = function(id) {

        var slideShowViewpoint = $("#" + id + " .slideShowViewpoint"),
            slideContainer = $("#" + id + " .slideContainer");

        $("#" + id).addClass("hasSlideShow").show();

        widenSlideShow(slideShowViewpoint);

        if (slideContainer.length > 1) {

            slideContainer.css("width", slideShowViewpoint.innerWidth() + "px");

            $("#" + id + " .moveSlide, #" + id + " .slideShowBullets").show();

            autoSlide[id] = setInterval(function() {
                moveSlide(id, "next");
            }, 5000);

            slideShowViewpoint.on("mousedown", dragStart);
            slideShowViewpoint[0].addEventListener("touchstart", dragStart);
        }
        else {
            $("#" + id + " .moveSlide, #" + id + " .slideShowBullets").hide();
        }

        slideContainer.first().addClass("active");
        $("#" + id + " .bullet:first").addClass("active");
    };

$(document).on("ready", function() {
    $(window).on("orientationchange resize", fixSlides);

    $("body").on("click", ".bullet", changeToSlide);

    $("body").on("click", ".moveSlide", function() {
        moveSlide($(this).data("slideShowId"), $(this).data("navDirection"));
    });

    $("body").on("dragstart", ".slide", false);
});