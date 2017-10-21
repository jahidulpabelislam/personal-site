//Holds all functions needed for a projects slide show
"use strict";

var dragStartFunction,
    autoSlide = {},

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
        if ($("#" + id + " .slidesContainer")[0].children.length > 1) {
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

        clearInterval(autoSlide[id]);

        resetTransition($("#" + id + " .slidesContainer")[0]);

        var position = [],
            oldSlide = $("#" + id + " .active");

        if (direction === "next") {
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

        var newSlide = $("#" + id + " .slideContainer.active")[0].id;

        $("#" + id + " .bullet[data-slide-id=" + newSlide+"]").addClass("active");

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

        $("#" + id + " #" + clickedSlide).addClass("active");
        $("#"+id+" .bullet[data-slide-id="+clickedSlide+"]").addClass("active");

        var slidesContainer = $("#" + id + " .slidesContainer");

        resetTransition(slidesContainer[0]);

        var position = $("#" + id + " .slideContainer.active").position();

        $("#" + id + " .slidesContainer").css("left", "-" + position["left"] + "px");

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
    dragStart = function(e, id) {

        var start = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            end = 0,
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

                end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

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

        $("#" + id + " .slideShow").show();

        widenSlideShow(slideShowViewpoint[0]);

        $("#" + id).addClass("hasSlideShow");

        if ($("#" + id + " .slideContainer").length > 1) {

            $("#" + id + " .slideContainer").css("width", slideShowViewpoint[0].clientWidth + "px");

            $("#" + id + " .previous, #" + id + " .next, #" + id + " .slideShowBullets").show();

            autoSlide[id] = setInterval(function() {
                moveSlide(id, "next");
            }, 5000);

            dragStartFunction = function(e) {
                dragStart(e, id);
            };

            slideShowViewpoint[0].addEventListener("mousedown", dragStartFunction);

            slideShowViewpoint[0].addEventListener("touchstart", dragStartFunction);

        } else {
            $("#" + id + " .previous, #" + id + " .next, #" + id + " .slideShowBullets").hide();
        }

        $("#" + id + " .slidesContainer")[0].firstElementChild.classList.add("active");
        $("#" + id + " .slideShowBullets")[0].firstElementChild.classList.add("active");
    };

$(document).on("ready", function() {
    $(window).on("orientationchange resize", fixSlides);

    $("body").on("click", ".bullet", changeToSlide);

    $("body").on("click", ".moveSlide", function() {
        moveSlide($(this).data("slideShowId"), $(this).data("navDirection"));
    });
});