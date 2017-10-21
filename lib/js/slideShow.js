//Holds all functions needed for a projects slide show
"use strict";

var autoSlide = {},

    //Resets the transition duration of a slide show to 2s
    resetTransition = function(slidesContainer) {
        slidesContainer.style.transitionDuration = "2s";
    },

    //Widens slide show to fit all slides
    widenSlideShow = function(slideShowViewpoint) {
        var width = slideShowViewpoint.clientWidth * slideShowViewpoint.firstElementChild.children.length;

        slideShowViewpoint.firstElementChild.style.width = width + "px";
    },

    //adjusts all slides in slide show to fit
    repositionSlides = function(id) {

        var slidesContainer = $("#" + id + " .slidesContainer");

        widenSlideShow($("#" + id + " .slideShowViewpoint")[0]);

        slidesContainer.children().css("width", $("#" + id)[0].clientWidth + "px");
        var position = $("#" + id + " .slideContainer.active").position();

        slidesContainer.css({
            "transitionDuration": "0s",
            "left": "-" + position["left"] + "px"
        });

        setTimeout(resetTransition, 100, slidesContainer[0]);
    },

    //starts a slide show
    startSlideShow = function(id) {
        autoSlide[id] = setInterval(function() {
            moveSlide(id, "next");
        }, 5000);
    },

    //stops a slide show
    stopSlideShow = function(id) {
        clearInterval(autoSlide[id]);
    },

    //loops through all slide shows
    loopThroughSlideShows = function(afterLooped) {
        var i, slideShows = $(".hasSlideShow");

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

    //moves to next or previous slide
    moveSlide = function(id, direction) {

        var slidesContainer = $("#" + id + " .slidesContainer"),
            oldSlide = $("#" + id + " .active"),
            newSlide;

        clearInterval(autoSlide[id]);

        resetTransition(slidesContainer[0]);

        oldSlide.removeClass("active");

        if (direction === "next") {
            if (oldSlide.next().length > 0) {
                newSlide = oldSlide.next();
            }
            else {
                newSlide = oldSlide.parent().children().first();
            }
        }
        else {
            if (oldSlide.prev().length > 0) {
                newSlide = oldSlide.prev();
            }
            else {
                newSlide = oldSlide.parent().children().last();
            }
        }

        var position = newSlide.position();
        newSlide.addClass("active");
        var newSlideID = newSlide[0].id;

        slidesContainer.css("left", "-" + position["left"] + "px");

        $("#" + id + " .bullet[data-slide-id=" + newSlideID+"]").addClass("active");

        autoSlide[id] = setInterval(function() {
            moveSlide(id, "next");
        }, 5000);
    },

    //
    changeToSlide = function() {

        var id = $(this).data("slideShowId"),
            clickedSlide = $(this).data("slideId");

        clearInterval(autoSlide[id]);

        $("#" + id + " .active").removeClass("active");

        var newSlide = $("#" + id + " #" + clickedSlide);
        newSlide.addClass("active");
        $("#"+id+" .bullet[data-slide-id="+clickedSlide+"]").addClass("active");

        var position = newSlide.position();

        var slidesContainer = $("#" + id + " .slidesContainer");

        resetTransition(slidesContainer[0]);

        slidesContainer.css("left", "-" + position["left"] + "px");

        autoSlide[id] = setInterval(function() {
            moveSlide(id, "next");
        }, 5000);

    },

    //moves current slide to correct position
    resetToCurrentSlide = function(id) {

        var position = $("#" + id + " .slideContainer.active").position();

        $("#" + id + " .slidesContainer").css({"transitionDuration": "0s", "left": "-" + position["left"] + "px"});

        setTimeout(resetTransition, 100, $("#" + id + " .slidesContainer")[0]);

        autoSlide[id] = setInterval(function() {
            moveSlide(id, "next");
        }, 5000);
    },

    //sets up events when the user wants to change slides with drag control
    dragStart = function(e) {

        var id = $(this).data("slideShowId"),
            start = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            slidesContainerLeft = $("#" + id + " .slidesContainer").css("left"),

            dragMove = function(e) {

                var diff = start - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),

                    left = parseInt(slidesContainerLeft);

                if (!left) {
                    left = 0;
                }

                $("#" + id + " .slidesContainer").css({"transitionDuration": "0s", left: (left - diff) + "px"});

                setTimeout(resetTransition, 100, $("#" + id + " .slidesContainer")[0]);
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

                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("touchmove", dragMove);
                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("touchend", dragEnd);
                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("mousemove", dragMove);
                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("mouseup", dragEnd);
                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("mouseleave", dragCancel);
            },

            dragCancel = function() {

                resetToCurrentSlide(id);

                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("touchmove", dragMove);
                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("touchend", dragEnd);
                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("mousemove", dragMove);
                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("mouseup", dragEnd);
                $("#" + id + " .slideShowViewpoint")[0].removeEventListener("mouseleave", dragCancel);
            };

        clearInterval(autoSlide[id]);

        $("#" + id + " .slideShowViewpoint")[0].addEventListener("touchmove", dragMove);
        $("#" + id + " .slideShowViewpoint")[0].addEventListener("touchend", dragEnd);
        $("#" + id + " .slideShowViewpoint")[0].addEventListener("mousemove", dragMove);
        $("#" + id + " .slideShowViewpoint")[0].addEventListener("mouseup", dragEnd);
        $("#" + id + " .slideShowViewpoint")[0].addEventListener("mouseleave", dragCancel);
    },

    //sets up a slide show
    setUpSlideShow = function(id) {

        var slideShowViewpoint = $("#" + id + " .slideShowViewpoint");

        $("#" + id).show();

        widenSlideShow(slideShowViewpoint[0]);

        if ($("#" + id + " .slideContainer").length > 1) {

            $("#" + id).addClass("hasSlideShow");

            $("#" + id + " .slideContainer").css("width", slideShowViewpoint[0].clientWidth + "px");

            $("#" + id + " .moveSlide, #" + id + " .slideShowBullets").show();

            autoSlide[id] = setInterval(function() {
                moveSlide(id, "next");
            }, 5000);

            slideShowViewpoint.on("mousedown", dragStart);
            slideShowViewpoint[0].addEventListener("touchstart", dragStart);

            $("#" + id + " .slideContainer:first, #" + id + " .bullet:first").addClass("active");
        }
    };

$(document).on("ready", function() {
    $(window).on("orientationchange resize", fixSlides);

    $("body").on("click", ".bullet", changeToSlide);

    $("body").on("click", ".moveSlide", function() {
        moveSlide($(this).data("slideShowId"), $(this).data("navDirection"));
    });

    $("body").on("dragstart", ".slide", false);
});