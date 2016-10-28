window.portfolio = window.portfolio || {};
window.portfolio.slideshow = (function () {

    "use strict";

    var resetTransition = function (slidesContainer) {
            slidesContainer.style.transitionDuration = "2s";
            slidesContainer.style.WebkitTransitionDuration = "2s";
        },

        positionSlides = function (slideshowViewpoint) {
            var width = slideshowViewpoint.clientWidth * slideshowViewpoint.firstElementChild.children.length;

            slideshowViewpoint.firstElementChild.style.width = width + "px";
        },

        repositionSlides = function (slideshow) {

            var i, slideshowViewpoint = slideshow.firstElementChild,
                slidesContainer = slideshowViewpoint.firstElementChild;

            positionSlides(slideshowViewpoint);

            for (i = 0; i < slidesContainer.children.length; i++) {

                slidesContainer.children[i].style.width = slideshow.clientWidth + "px";

                if (slidesContainer.children[i].style.display == "inline-block") {

                    var left = i * slideshowViewpoint.clientWidth;

                    slidesContainer.style.transitionDuration = "0s";
                    slidesContainer.style.WebkitTransitionDuration = "0s";

                    slidesContainer.style.left = "-" + left + "px";

                    setTimeout(resetTransition, 100, slidesContainer);

                }
            }
        },

        fixSlides = function () {
            var timer = setInterval(loopThroughSlideshows, 10, repositionSlides);
            setTimeout( function () { clearInterval(timer); }, 1000);
        },

        loopThroughSlideshows = function (afterLooped) {

            var i, slideshows = document.querySelectorAll(".slideshowViewpointContainer");

            for (i = 0; i < slideshows.length; i++) afterLooped(slideshows[i]);
        },

        moveSlide = function (slides, next) {
            var i;

            //loops through all slideShows images
            for (i = 0; i < slides.length; i++) {

                //checks if the current loop is the current image on slideShow
                if (slides[i].style.display == "inline-block") {

                    slides[i].style.display = "block";

                    var left;

                    if (next && next == true) {
                        if (slides[i].nextElementSibling) {

                            slides[i].nextElementSibling.style.display = "inline-block";
                            i++;
                            left = i * slides[i].parentElement.parentElement.clientWidth;
                            slides[i--].parentElement.style.left = "-" + left + "px";

                        }else {

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

        setUpSlideshow = function (slideshow) {
            var i, slideshowViewpoint = slideshow.firstElementChild,
                slidesContainer = slideshowViewpoint.firstElementChild;

            positionSlides(slideshowViewpoint);

            for (i = 0; i < slidesContainer.children.length; i++) {
                slidesContainer.children[i].style.width = slideshowViewpoint.clientWidth + "px";
            }

            if (slidesContainer.children.length > 1) {

                slideshow.parentElement.querySelector(".previous").addEventListener("click", previousSlide);
                slideshow.parentElement.querySelector(".next").addEventListener("click", nextSlide);

            } else {

                slideshow.parentElement.querySelector(".previous").style.display = "none";
                slideshow.parentElement.querySelector(".next").style.display = "none";
            }

            slidesContainer.firstElementChild.style.display = "inline-block";

        };
    return {
        "fixSlides": fixSlides,
        "setUpSlideshow": setUpSlideshow
    };
}());

window.addEventListener("orientationchange", window.portfolio.slideshow.fixSlides);
document.addEventListener("onscoll", window.portfolio.slideshow.fixSlides);
window.addEventListener("resize", window.portfolio.slideshow.fixSlides);
