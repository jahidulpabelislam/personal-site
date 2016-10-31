window.portfolio = window.portfolio || {};
window.portfolio.expandImage = (function () {

    "use strict";

    //grab elements for later use
    var expandedImageDivContainer = document.getElementById("expandedImageDivContainer"),
        expandedImageNext = document.getElementById("expandedImageNext"),
        expandedImagePrevious = document.getElementById("expandedImagePrevious"),
        expandedImageClose = document.getElementById("expandedImageClose"),
        slideShowNum = document.getElementById("slideShowNum"),
        slideShowTotal = document.getElementById("slideShowTotal"),

        //initiate variables
        currentSlide = 0,
        slides = {},

        //change current slide to new slide
        changeElement = function (slide) {
            var expandedImage = document.getElementById("expandedImage"),
                expandedImage2 = document.getElementById("expandedImage2");

            expandedImage2.src = slide.src;
            expandedImage.style.opacity = "0";
            expandedImage2.style.opacity = "1";
            expandedImage.id = "expandedImage2";
            expandedImage2.id = "expandedImage";
            slideShowNum.innerHTML = currentSlide + 1;
        },

        //
        next = function () {
            currentSlide++;
            if (currentSlide >= slides.length) currentSlide = 0;
            changeElement(slides[currentSlide]);
        },

        //
        previous = function () {
            currentSlide--;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            changeElement(slides[currentSlide]);
        },

        //close expanded image div
        close = function () {

            expandedImageDivContainer.style.top = "50%";
            expandedImageDivContainer.style.left = "50%";
            expandedImageDivContainer.style.width = "1px";
            expandedImageDivContainer.style.height = "1px";
            expandedImageDivContainer.style.opacity = "0";

            setTimeout(function () {

                document.body.style.overflow = "auto";
                expandedImageDivContainer.style.zIndex = "-100";

            }, 990);

            window.portfolio.slideShow.loopThroughSlideShows(window.portfolio.slideShow.startSlideShows);
        },

        //used to expand the image when clicked on
        expand = function (e) {
            var expandedImage = document.getElementById("expandedImage"),
                i;

            slides = e.target.parentElement.parentElement.querySelectorAll("img");
            expandedImage.src = e.target.src;

            expandedImageDivContainer.style.zIndex = "100";
            expandedImageDivContainer.style.top = "0";
            expandedImageDivContainer.style.left = "0";
            expandedImageDivContainer.style.width = "100%";
            expandedImageDivContainer.style.height = "100%";
            expandedImageDivContainer.style.opacity = "1";
            document.body.style.overflow = "hidden";

            //loops through all slideShows images
            for (i = 0; i < slides.length; i++) {

                //checks if the current loop is the current image on slideShow
                if (slides[i] == e.target) {
                    currentSlide = i;
                }
            }

            slideShowNum.innerHTML = currentSlide + 1;
            slideShowTotal.innerHTML = slides.length;

            //check there are more than one slide show image to slide through
            if (slides.length > 1) {
                //set up next and previous buttons
                expandedImageNext.style.display = "block";
                expandedImagePrevious.style.display = "block";

                expandedImageNext.addEventListener("click", next);
                expandedImagePrevious.addEventListener("click", previous);
            }
            //only one slide show image so stop next and previous buttons
            else {
                expandedImageNext.style.display = "none";

                expandedImagePrevious.style.display = "none";
            }

            //add listener for when user want to close expanded image
            expandedImageClose.addEventListener("click", close);

            setTimeout(function () {

            }, 990);

            window.portfolio.slideShow.loopThroughSlideShows(window.portfolio.slideShow.stopSlideShows);

        };

    return {
        "expand": expand
    };

}());