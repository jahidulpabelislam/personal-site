window.portfolio = window.portfolio || {};
window.portfolio.slideShow = (function () {

    "use strict";

    //reset the transition duration of a slideShow to 2s
    var resetTransition = function (slidesContainer) {
            slidesContainer.style.transitionDuration = "2s";
            slidesContainer.style.WebkitTransitionDuration = "2s";
        },

        //widen slideShow to fit all slides
        widenSlideShow = function (slideShowViewpoint) {
            var width = slideShowViewpoint.clientWidth * slideShowViewpoint.firstElementChild.children.length;

            slideShowViewpoint.firstElementChild.style.width = width + "px";
        },

        repositionSlides = function (slideShow) {

            var i, slideShowViewpoint = slideShow.firstElementChild,
                slidesContainer = slideShowViewpoint.firstElementChild;

            widenSlideShow(slideShowViewpoint);

            for (i = 0; i < slidesContainer.children.length; i++) {

                slidesContainer.children[i].style.width = slideShow.clientWidth + "px";

                if (slidesContainer.children[i].style.display == "inline-block") {

                    var left = i * slideShowViewpoint.clientWidth;

                    slidesContainer.style.transitionDuration = "0s";
                    slidesContainer.style.WebkitTransitionDuration = "0s";

                    slidesContainer.style.left = "-" + left + "px";

                    setTimeout(resetTransition, 100, slidesContainer);

                }
            }
        },

        loopThroughSlideShows = function (afterLooped) {

            var i, slideShows = document.querySelectorAll(".slideShowViewpointContainer");

            for (i = 0; i < slideShows.length; i++) {
                afterLooped(slideShows[i]);
            }
        },

        fixSlides = function () {
            var timer = setInterval(loopThroughSlideShows, 10, repositionSlides);
            setTimeout(function () {
                clearInterval(timer);
            }, 1000);
        },

        moveSlide = function (slides, next) {

            //loops through all slideShows images
            for (var i = 0; i < slides.length; i++) {

                //checks if the current loop is the current image on slideShow
                if (slides[i].style.display == "inline-block") {

                    var left;

                    slides[i].style.display = "block";

                    resetTransition(slides[i].parentElement);

                    if (next && next === true) {
                        if (slides[i].nextElementSibling) {

                            slides[i].nextElementSibling.style.display = "inline-block";
                            i++;
                            left = i * slides[i].parentElement.parentElement.clientWidth;
                            slides[i--].parentElement.style.left = "-" + left + "px";

                        } else {

                            slides[i].parentElement.style.left = "0px";
                            slides[i].parentElement.firstElementChild.style.display = "inline-block";

                        }
                    } else {
                        if (slides[i].previousElementSibling) {

                            slides[i].previousElementSibling.style.display = "inline-block";
                            i--;
                            left = i * slides[i].parentElement.parentElement.clientWidth;
                            slides[i++].parentElement.style.left = "-" + left + "px";

                        } else {
                            left = (slides.length - 1) * slides[i].parentElement.parentElement.clientWidth;
                            slides[i].parentElement.style.left = "-" + left + "px";
                            slides[i].parentElement.lastElementChild.style.display = "inline-block";
                        }
                    }

                    return;
                }
            }
        },

        nextSlide = function (e) {
            moveSlide(e.target.parentElement.querySelectorAll(".slideContainer"), true);
        },

        previousSlide = function (e) {
            moveSlide(e.target.parentElement.querySelectorAll(".slideContainer"));
        },

        //set up a slide show
        setUpSlideShow = function (slidesContainer) {

            var slideShowViewpoint = slidesContainer.parentElement,
                slideShowViewpointContainer = slideShowViewpoint.parentElement,
                slideShow = slideShowViewpointContainer.parentElement;

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

                setInterval(function () {
                    moveSlide(slidesContainer.querySelectorAll(".slideContainer"), true);
                }, 5000);

            } else {

                slideShow.querySelector(".previous").style.display = "none";
                slideShow.querySelector(".next").style.display = "none";
            }

            slidesContainer.firstElementChild.style.display = "inline-block";
        };

    return {
        fixSlides: fixSlides,
        setUpSlideShow: setUpSlideShow
    };
}());

window.addEventListener("orientationchange", window.portfolio.slideShow.fixSlides);
window.addEventListener("resize", window.portfolio.slideShow.fixSlides);