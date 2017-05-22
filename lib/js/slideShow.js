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

        var i, slideShowViewpoint = $("#" + id + " .slideShowViewpoint"),
            slidesContainer = $("#" + id + " .slidesContainer");

        widenSlideShow(slideShowViewpoint[0]);

        for (i = 0; i < slidesContainer.children().length; i++) {

            slidesContainer.children()[i].style.width = $("#" + id + " .slideShow")[0].clientWidth + "px";

            if (slidesContainer.children()[i].className.includes("active")) {

                $("#" + id + " .slidesContainer").css("transitionDuration", "0s");

                var left = i * slideShowViewpoint[0].clientWidth;

                slidesContainer[0].style.left = "-" + left + "px";

                setTimeout(resetTransition, 100, slidesContainer[0]);
            }
        }
    },

    //starts a slide show
    startSlideShow = function(id) {
        autoSlide[id] = setInterval(function() {
            moveSlide($("#" + id + " .slideContainer"), true, id);
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
    moveSlide = function(slides, isNext, id) {

        clearInterval(autoSlide[id]);

        resetTransition($("#" + id + " .slidesContainer")[0]);

        //loops through all slide shows images
        for (var i = 0; i < slides.length; i++) {

            //checks if the current loop is the current image on slideShow
            if (slides[i].className.includes("active")) {

                var left;

                $("#" + id + " .active").removeClass("active");

                if (isNext && isNext === true) {
                    if (slides[i].nextElementSibling) {

                        slides[i].nextElementSibling.classList.add("active");
                        i++;
                        left = i * slides[i].parentElement.parentElement.clientWidth;
                        slides[i--].parentElement.style.left = "-" + left + "px";

                    } else {

                        slides[i].parentElement.style.left = "0px";
                        slides[i].parentElement.firstElementChild.classList.add("active");
                    }
                } else {
                    if (slides[i].previousElementSibling) {

                        slides[i].previousElementSibling.classList.add("active");
                        i--;
                        left = i * slides[i].parentElement.parentElement.clientWidth;
                        slides[i++].parentElement.style.left = "-" + left + "px";

                    } else {
                        left = (slides.length - 1) * slides[i].parentElement.parentElement.clientWidth;
                        slides[i].parentElement.style.left = "-" + left + "px";
                        slides[i].parentElement.lastElementChild.classList.add("active");
                    }
                }

                var newSlide = $("#" + id + " .slideContainer.active")[0].firstElementChild.className;

                $("#" + id + " .bullet ." + newSlide).parent().addClass("active");

                autoSlide[id] = setInterval(function() {
                    moveSlide(slides, true, id);
                }, 5000);

                return;
            }
        }
    },

    //
    changeToSlide = function(id, clickedSlide) {

        clearInterval(autoSlide[id]);

        $("#" + id + " .active").removeClass("active");

        $("#" + id + " ." + clickedSlide).parent().addClass("active");

        var slidesContainer = $("#" + id + " .slidesContainer"),
            slides = $("#" + id + " .slideContainer");

        resetTransition(slidesContainer[0]);

        //loops through all slideShows images
        for (var i = 0; i < slides.length; i++) {

            //checks if the current loop is the current image on slideShow
            if (slides[i].className.includes("active")) {

                var left = i * $("#" + id + " .slideShowViewpoint")[0].clientWidth;
                $("#" + id + " .slidesContainer").css("left", "-" + left + "px");

                autoSlide[id] = setInterval(function() {
                    moveSlide(slides, true, id);
                }, 5000);
            }
        }
    },

    //moves current slide to correct position
    resetToCurrentSlide = function(id) {

        var slides = $("#" + id + " .slideContainer");

        //loops through all slideShows images
        for (var i = 0; i < slides.length; i++) {

            //checks if the current loop is the current image on slideShow
            if (slides[i].className.includes("active")) {

                var left = i * $("#" + id + " .slideShowViewpoint")[0].clientWidth;
                $("#" + id + " .slidesContainer").css({"transitionDuration": "0s", "left": "-" + left + "px"});
                setTimeout(resetTransition, 100, $("#" + id + " .slidesContainer")[0]);

                autoSlide[id] = setInterval(function() {
                    moveSlide(slides, true, id);
                }, 5000);
            }
        }
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
                    moveSlide($("#" + id + " .slideContainer"), true, id);
                } else if ((start - end) < -15) {
                    moveSlide($("#" + id + " .slideContainer"), false, id);
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
            slideShowViewpointContainer = $("#" + id + " .slideShowViewpointContainer"),
            slideShow = $("#" + id + " .slideShow"),
            slideShowContainer = $("#" + id + " .slideShowContainer");

        slideShow.show();

        widenSlideShow(slideShowViewpoint[0]);

        if ($("#" + id + " .slideContainer").length > 1) {

            $("#" + id + " .slideContainer").css("width", slideShowViewpoint.clientWidth + "px");

            $("#" + id + " .previous, #" + id + " .next").show();

            $("#" + id + " .previous").click(function() {
                moveSlide($("#" + id + " .slideContainer"), false, id);
            });
            $("#" + id + " .next").click(function() {
                moveSlide($("#" + id + " .slideContainer"), true, id);
            });

            autoSlide[id] = setInterval(function() {
                moveSlide($("#" + id + " .slideContainer"), true, id);
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