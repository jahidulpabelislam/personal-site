//holds all functions needed for a projects slide show
"use strict";

var autoSlide = {},

    //resets the transition duration of a slideShow to 2s
    resetTransition = function(slidesContainer) {
        slidesContainer.style.transitionDuration = "2s";
    },

    //widens slide show to fit all slides
    widenSlideShow = function(slideShowViewpoint) {
        var width = slideShowViewpoint.clientWidth * slideShowViewpoint.firstElementChild.children.length;

        slideShowViewpoint.firstElementChild.style.width = width + "px";
    },

    //adjusts all slides in slide show to fit
    repositionSlides = function(id) {

        var slidesContainer = $("#" + id + " .slidesContainer");

        widenSlideShow($("#" + id + " .slideShowViewpoint")[0]);

        slidesContainer.children().css("width", $("#" + id + " .slideShow")[0].clientWidth + "px");
        var position = $("#" + id + " .slideContainer.active").position();

        $("#" + id + " .slidesContainer").css({
            "transitionDuration": "0s",
            "left": "-" + position["left"] + "px"
        });

        setTimeout(resetTransition, 100, slidesContainer[0]);
    },

    //starts a slide show
    startSlideShow = function(id) {
        autoSlide[id] = setInterval(function() {
            moveSlide(id, true);
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
    moveSlide = function(id, isNext) {

        clearInterval(autoSlide[id]);

        resetTransition($("#" + id + " .slidesContainer")[0]);

        var position = [],
            oldSlide = $("#" + id + " .active");

        if (isNext && isNext === true) {
            if ($("#" + id + " .slideContainer.active").next().length > 0) {

                position = $("#" + id + " .slideContainer.active").next().position();
                $("#" + id + " .slideContainer.active").next().addClass("active");
            }
            else {
                position["left"] = "0";
                $("#" + id + " .slideContainer.active").parent().children().first().addClass("active");
            }
        }
        else {
            if ($("#" + id + " .slideContainer.active").prev().length > 0) {

                position = $("#" + id + " .slideContainer.active").prev().position();
                $("#" + id + " .slideContainer.active").prev().addClass("active");
            }
            else {

                position = $("#" + id + " .slideContainer.active").parent().children().last().position();
                $("#" + id + " .slideContainer.active").parent().children().last().addClass("active");
            }
        }

        oldSlide.removeClass("active");

        $("#" + id + " .slidesContainer").css("left", "-" + position["left"] + "px");

        var newSlide = $("#" + id + " .slideContainer.active")[0].firstElementChild.className;

        $("#" + id + " .bullet ." + newSlide).parent().addClass("active");

        autoSlide[id] = setInterval(function() {
            moveSlide(id, true);
        }, 5000);
    },

    //
    changeToSlide = function(id, clickedSlide) {

        clearInterval(autoSlide[id]);

        $("#" + id + " .active").removeClass("active");

        $("#" + id + " ." + clickedSlide).parent().addClass("active");

        var slidesContainer = $("#" + id + " .slidesContainer"),
            slides = $("#" + id + " .slideContainer");

        resetTransition(slidesContainer[0]);

        var position = $("#" + id + " .slideContainer.active").position();

        $("#" + id + " .slidesContainer").css("left", "-" + position["left"] + "px");

        autoSlide[id] = setInterval(function() {
            moveSlide(id, true);
        }, 5000);

    },

    //moves current slide to correct position
    resetToCurrentSlide = function(id) {

        var position = $("#" + id + " .slideContainer.active").position();

        $("#" + id + " .slidesContainer").css({"transitionDuration": "0s", "left": "-" + position["left"] + "px"});

        setTimeout(resetTransition, 100, $("#" + id + " .slidesContainer")[0]);

        autoSlide[id] = setInterval(function() {
            moveSlide(id, true);
        }, 5000);
    },

    //sets up events when the user wants to change slides with drag control
    touchStart = function(e, id) {

        var start = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            end = 0,
            slidesContainerLeft = $("#" + id + " .slidesContainer").css("left"),

            touchMove = function(e) {

                var diff = start - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),

                    left = parseInt(slidesContainerLeft);
                if (!left) {
                    left = 0;
                }

                $("#" + id + " .slidesContainer").css({"transitionDuration": "0s", left: (left - diff) + "px"});

                setTimeout(resetTransition, 100, $("#" + id + " .slidesContainer")[0]);
            },

            touchEnd = function(e) {

                end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

                if ((start - end) > 15) {
                    moveSlide(id, true);
                } else if ((start - end) < -15) {
                    moveSlide(id);
                } else {
                    resetToCurrentSlide(id);
                }

                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("touchmove", touchMove);
                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("touchend", touchEnd);
                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("mousemove", touchMove);
                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("mouseup", touchEnd);
                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("mouseleave", touchCancel);
            },

            touchCancel = function() {

                resetToCurrentSlide(id);

                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("touchmove", touchMove);
                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("touchend", touchEnd);
                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("mousemove", touchMove);
                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("mouseup", touchEnd);
                $("#" + id + " .slideShowViewpointContainer")[0].removeEventListener("mouseleave", touchCancel);
            };

        clearInterval(autoSlide[id]);

        $("#" + id + " .slideShowViewpointContainer")[0].addEventListener("touchmove", touchMove);
        $("#" + id + " .slideShowViewpointContainer")[0].addEventListener("touchend", touchEnd);
        $("#" + id + " .slideShowViewpointContainer")[0].addEventListener("mousemove", touchMove);
        $("#" + id + " .slideShowViewpointContainer")[0].addEventListener("mouseup", touchEnd);
        $("#" + id + " .slideShowViewpointContainer")[0].addEventListener("mouseleave", touchCancel);
    },

    //sets up a slide show
    setUpSlideShow = function(id) {

        var slideShowViewpoint = $("#" + id + " .slideShowViewpoint"),
            slideShowViewpointContainer = $("#" + id + " .slideShowViewpointContainer");

        $("#" + id + " .slideShow").show();

        widenSlideShow(slideShowViewpoint[0]);

        if ($("#" + id + " .slideContainer").length > 1) {

            $("#" + id + " .slideContainer").css("width", slideShowViewpoint[0].clientWidth + "px");

            $("#" + id + " .previous, #" + id + " .next").show();

            $("#" + id + " .previous").click(function() {
                moveSlide(id);
            });
            $("#" + id + " .next").click(function() {
                moveSlide(id, true);
            });

            autoSlide[id] = setInterval(function() {
                moveSlide(id, true);
            }, 5000);

            slideShowViewpointContainer[0].addEventListener("mousedown", function(e) {
                touchStart(e, id);
            });

            slideShowViewpointContainer[0].addEventListener("touchstart", function(e) {
                touchStart(e, id);
            });

        } else {
            $("#" + id + " .previous, #" + id + " .next, #" + id + " .slideShowBullets").hide();
        }

        $("#" + id + " .slidesContainer")[0].firstElementChild.classList.add("active");
        $("#" + id + " .slideShowBullets")[0].firstElementChild.classList.add("active");
    };

$(window).on("orientationchange resize", fixSlides);