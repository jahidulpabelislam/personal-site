//holds all functions needed for a projects slide show
"use strict";

var autoSlide = {},

    //resets the transition duration of a slideShow to 2s
    resetTransition = function(slidesContainer) {
        slidesContainer.style.transitionDuration = "2s";
        slidesContainer.style.WebkitTransitionDuration = "2s";
    },

    //widens slide show to fit all slides
    widenSlideShow = function(slideShowViewpoint) {
        var width = slideShowViewpoint.clientWidth * slideShowViewpoint.firstElementChild.children.length;

        slideShowViewpoint.firstElementChild.style.width = width + "px";
    },

    //adjusts all slides in slide show to fit
    repositionSlides = function(slideShow) {

        var i, slideShowViewpoint = slideShow.firstElementChild,
            slidesContainer = slideShowViewpoint.firstElementChild;

        widenSlideShow(slideShowViewpoint);

        for (i = 0; i < slidesContainer.children.length; i++) {

            slidesContainer.children[i].style.width = slideShow.clientWidth + "px";

            if (slidesContainer.children[i].className.includes("active")) {

                var left = i * slideShowViewpoint.clientWidth;

                slidesContainer.style.transitionDuration = "0s";
                slidesContainer.style.WebkitTransitionDuration = "0s";

                slidesContainer.style.left = "-" + left + "px";

                setTimeout(resetTransition, 100, slidesContainer);

            }
        }
    },

    //starts a slide show
    startSlideShow = function(slideShowViewpointContainer) {
        var slideShow = slideShowViewpointContainer.parentElement,
            id = slideShow.id;

        autoSlide[id] = setInterval(function() {
            moveSlide(slideShowViewpointContainer.querySelectorAll(".slideContainer"), true);
        }, 5000);
    },

    //stops a slide show
    stopSlideShow = function(slideShowViewpointContainer) {
        var slideShow = slideShowViewpointContainer.parentElement,
            id = slideShow.id;

        clearInterval(autoSlide[id]);
    },

    //loops through all slide shows
    loopThroughSlideShows = function(afterLooped) {

        var i, slideShows = document.querySelectorAll(".slideShowViewpointContainer");

        for (i = 0; i < slideShows.length; i++) {
            afterLooped(slideShows[i]);
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
    moveSlide = function(slides, next) {
        var slideShow = slides[0].parentElement.parentElement.parentElement.parentElement,
            slideShowContainer = slideShow.parentElement,
            id = slideShow.id,
            slidesContainer = slideShowContainer.querySelector(".slidesContainer");

        clearInterval(autoSlide[id]);

        resetTransition(slidesContainer);

        //loops through all slide shows images
        for (var i = 0; i < slides.length; i++) {

            //checks if the current loop is the current image on slideShow
            if (slides[i].className.includes("active")) {

                var left;

                slides[i].classList.remove("active");

                slideShowContainer.querySelector(".bullet.active").classList.remove("active");

                if (next && next === true) {
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

                var classl = slideShow.querySelector(".slideContainer.active").firstElementChild.className;

                slideShowContainer.querySelector(".bullet ." + classl).parentElement.classList.add("active");

                autoSlide[id] = setInterval(function() {
                    moveSlide(slides, true);
                }, 5000);

                return;
            }
        }
    },

    //sets up event to move to next slide
    nextSlide = function(e) {
        moveSlide(e.target.parentElement.querySelectorAll(".slideContainer"), true);
    },

    //sets up event to move to previous slide
    previousSlide = function(e) {
        moveSlide(e.target.parentElement.querySelectorAll(".slideContainer"));
    },

    //
    changeToSlide = function(e) {
        var id = e.target.parentElement.parentElement.parentElement.id;

        clearInterval(autoSlide[id]);

        var slideNum = e.target.className,
            activeSlide = e.target.parentElement.parentElement.parentElement.querySelector(".slidesContainer .active");

        activeSlide.classList.remove("active");

        var next = e.target.parentElement.parentElement.parentElement.querySelector(".slidesContainer ." + slideNum);
        next.parentElement.classList.add("active");

        e.target.parentElement.parentElement.querySelector(".bullet.active").classList.remove("active");
        e.target.parentElement.classList.add("active");

        var slideShow = e.target.parentElement.parentElement.parentElement,
            slidesContainer = slideShow.querySelector(".slidesContainer"),
            slides = e.target.parentElement.parentElement.parentElement.querySelectorAll(".slideContainer");

        resetTransition(slidesContainer);

        //loops through all slideShows images
        for (var i = 0; i < slides.length; i++) {

            //checks if the current loop is the current image on slideShow
            if (slides[i].className.includes("active")) {

                var left = i * slidesContainer.parentElement.clientWidth;
                slidesContainer.style.left = "-" + left + "px";

                autoSlide[id] = setInterval(function() {
                    moveSlide(slides, true);
                }, 5000);

            }
        }
    },

    //moves current slide to correct position
    resetToCurrentSlide = function(slidesContainer) {

        var slideShow = slidesContainer.parentElement.parentElement.parentElement,

            slides = slidesContainer.querySelectorAll(".slideContainer");

        //loops through all slideShows images
        for (var i = 0; i < slides.length; i++) {

            //checks if the current loop is the current image on slideShow
            if (slides[i].className.includes("active")) {

                slidesContainer.style.transitionDuration = "0s";
                var left = i * slidesContainer.parentElement.clientWidth;
                slidesContainer.style.left = "-" + left + "px";
                setTimeout(resetTransition, 100, slidesContainer);

                var id = slideShow.id;

                autoSlide[id] = setInterval(function() {
                    moveSlide(slidesContainer.querySelectorAll(".slideContainer"), true);
                }, 5000);
            }
        }
    },

    //sets up events when the user wants to change slides with drag control
    touchStart = function(e, slideShowViewpointContainer, slidesContainer) {

        var start = e.changedTouches ? e.changedTouches[0].clientX : e.clientX,
            end = 0,
            slidesContainerLeft = slidesContainer.style.left,

            touchMove = function(e) {

                var diff = start - (e.changedTouches ? e.changedTouches[0].clientX : e.clientX),

                    left = parseInt(slidesContainerLeft);
                if (!left) {
                    left = 0;
                }

                slidesContainer.style.transitionDuration = "0s";
                slidesContainer.style.left = (left - diff) + "px";
                setTimeout(resetTransition, 100, slidesContainer);
            },

            touchEnd = function(e) {

                end = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

                if ((start - end) > 15) {
                    moveSlide(slidesContainer.querySelectorAll(".slideContainer"), true);
                } else if ((start - end) < -15) {
                    moveSlide(slidesContainer.querySelectorAll(".slideContainer"));
                } else {
                    resetToCurrentSlide(slidesContainer);
                }

                slideShowViewpointContainer.removeEventListener("touchmove", touchMove);
                slideShowViewpointContainer.removeEventListener("touchend", touchEnd);
                slideShowViewpointContainer.removeEventListener("mousemove", touchMove);
                slideShowViewpointContainer.removeEventListener("mouseup", touchEnd);
                slideShowViewpointContainer.removeEventListener("mouseleave", touchCancel);
            },

            touchCancel = function() {

                resetToCurrentSlide(slidesContainer);

                slideShowViewpointContainer.removeEventListener("touchmove", touchMove);
                slideShowViewpointContainer.removeEventListener("touchend", touchEnd);
                slideShowViewpointContainer.removeEventListener("mousemove", touchMove);
                slideShowViewpointContainer.removeEventListener("mouseup", touchEnd);
                slideShowViewpointContainer.removeEventListener("mouseleave", touchCancel);
            },

            id = slideShowViewpointContainer.parentElement.id;

        clearInterval(autoSlide[id]);

        slideShowViewpointContainer.addEventListener("touchmove", touchMove);
        slideShowViewpointContainer.addEventListener("touchend", touchEnd);
        slideShowViewpointContainer.addEventListener("mousemove", touchMove);
        slideShowViewpointContainer.addEventListener("mouseup", touchEnd);
        slideShowViewpointContainer.addEventListener("mouseleave", touchCancel);
    },

    //sets up a slide show
    setUpSlideShow = function(slidesContainer) {

        var slideShowViewpoint = slidesContainer.parentElement,
            slideShowViewpointContainer = slideShowViewpoint.parentElement,
            slideShow = slideShowViewpointContainer.parentElement,
            slideShowContainer = slideShow.parentElement;

        slideShow.style.display = "block";

        widenSlideShow(slideShowViewpoint);

        if (slidesContainer.children.length > 1) {

            for (var i = 0; i < slidesContainer.children.length; i++) {
                slidesContainer.children[i].style.width = slideShowViewpoint.clientWidth + "px";
            }

            slideShow.querySelector(".previous").style.display = "block";
            slideShow.querySelector(".next").style.display = "block";

            slideShow.querySelector(".previous").addEventListener("click", previousSlide);
            slideShow.querySelector(".next").addEventListener("click", nextSlide);

            var id = slideShow.id;

            autoSlide[id] = setInterval(function() {
                moveSlide(slidesContainer.querySelectorAll(".slideContainer"), true);
            }, 5000);

            slideShowViewpointContainer.addEventListener("mousedown", function(e) {
                touchStart(e, slideShowViewpointContainer, slidesContainer);
            });

            slideShowViewpointContainer.addEventListener("touchstart", function(e) {
                touchStart(e, slideShowViewpointContainer, slidesContainer);
            });

        } else {

            slideShow.querySelector(".previous").style.display = "none";
            slideShow.querySelector(".next").style.display = "none";
            slideShowContainer.querySelector(".slideShowBullets").style.display = "none";
        }

        slidesContainer.firstElementChild.classList.add("active");
        slideShowContainer.querySelector(".slideShowBullets").firstElementChild.classList.add("active");
    };

$(window).on("orientationchange, resize", fixSlides);