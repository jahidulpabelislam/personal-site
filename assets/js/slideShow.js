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

        var slidesContainer = $("#" + id + " .slide-show__slides-container");

        widenSlideShow($("#" + id + " .slide-show__viewpoint"));

        slidesContainer.children().css("width", $("#" + id).innerWidth() + "px");
        var position = $("#" + id + " .slide-show__slide-container.active").position();

        slidesContainer.css({
            "transitionDuration": "0s",
            "left": "-" + position["left"] + "px"
        });

        setTimeout(resetTransition, 100, slidesContainer);
    },

    //starts a slide show
    startSlideShow = function(id) {
        if ($("#" + id + " .slide-show__slides-container").children().length > 1) {
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

    moveToSlide = function(id, nextSlide) {
        var slidesContainer = $(id + " .slide-show__slides-container");

        clearInterval(autoSlide[id]);

        resetTransition(slidesContainer);

        if (id == "#slide-show--projects-preview"){
            var colour = nextSlide.filter(".slide-show__slide-container").attr("data-slide-colour");
            var regx = new RegExp("slide-show__nav--\\w*", 'g');

            $(id + " .slide-show__nav").each(function() {
                var classList = $(this).attr("class");
                classList =  classList.replace(regx, 'slide-show__nav--'+colour);
                $(this).attr("class", classList);
            });

            $(id + " .slide-show__viewpoint").height(nextSlide.children().filter(".slide").height());
        }

        $(id + " .active").removeClass("active");

        var position = nextSlide.position();
        nextSlide.addClass("active");
        var newSlideID = nextSlide[0].id;

        slidesContainer.css("left", "-" + position["left"] + "px");

        $(id + " .slide-show__bullet[data-slide-id=" + newSlideID + "]").addClass("active");

        autoSlide[id] = setInterval(function() {
            moveSlide(id, "next");
        }, 5000);
    },

    //moves to next or previous slide
    moveSlide = function(id, direction) {

        var oldSlide = $(id + " .active"),
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

        var nextSlide = $(id + " #" + clickedSlide);

        moveToSlide(id, nextSlide);
    },

    //moves current slide to correct position
    resetToCurrentSlide = function(id) {

        var position = $(id + " .slide-show__slide-container.active").position(),
            slidesContainer = $(id + " .slide-show__slides-container");

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
            slidesContainer = $(id + " .slide-show__slides-container"),
            slidesContainerLeft = slidesContainer.css("left"),
            slideShowViewpoint = $(id + " .slide-show__viewpoint"),

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
    setUpSlideShow = function(id) {

        var slideShowViewpoint = $(id + " .slide-show__viewpoint"),
            slideContainer = $(id + " .slide-show__slide-container");

        $(id).addClass("hasSlideShow").show();

        widenSlideShow(slideShowViewpoint);

        if (slideContainer.length > 1) {

            slideContainer.css("width", slideShowViewpoint.innerWidth() + "px");

            $(id + " .js-move-slide, " + id + " .js-slide-show-bullets").show();

            autoSlide[id] = setInterval(function() {
                moveSlide(id, "next");
            }, 5000);

            slideShowViewpoint[0].addEventListener("mousedown", dragStart);
            slideShowViewpoint[0].addEventListener("touchstart", dragStart);
        }
        else {
            $(id + " .js-move-slide, " + id + " .js-slide-show-bullets").hide();
        }

        slideContainer.first().addClass("active");
        $(id + " .slide-show__bullet:first").addClass("active");

        if (id == "#slide-show--projects-preview"){
            $(id + " .slide-show__viewpoint").height(slideContainer.first().children().filter(".slide").height());
        }
    };

$(document).on("ready", function() {
    $(window).on("orientationchange resize", fixSlides);

    $("body").on("click", ".js-slide-show-bullet", changeToSlide);

    $("body").on("click", ".js-move-slide", function() {
        moveSlide($(this).data("slideShowId"), $(this).data("navDirection"));
    });

    $("body").on("dragstart", ".slide", false);
});