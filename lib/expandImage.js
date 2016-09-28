window.portfolio = window.portfolio || {};
window.portfolio.expandImage = (function () {

    "use strict";

    var currentSlide = 0,
        slides,

        changeElement = function (slide) {

            expandedImage2.src = slide.src;
            expandedImage.style.opacity = "0";
            expandedImage2.style.opacity = "1";
            var a = expandedImage2;
            expandedImage.id = "expandedImage2";
            a.id = "expandedImage";

        },

        next = function () {
            currentSlide++;
            if (currentSlide >= slides.length) currentSlide = 0;
            changeElement(slides[currentSlide]);
        },

        previous = function () {
            currentSlide--;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            changeElement(slides[currentSlide]);
        },

        close = function () {

            expandedImageDiv.style.top = "50%";
            expandedImageDiv.style.left = "50%";
            expandedImageDiv.style.width = "1px";
            expandedImageDiv.style.height = "1px";
            expandedImageDiv.style.opacity = "0";

            setTimeout(function () {

                document.body.style.overflow = "auto";
                expandedImageDiv.style.zIndex = "-100";

            }, 990);

        },

        //used to expand the image when clicked on
        expand = function (e) {
            currentSlide = 0;
            expandedImage.src = e.target.src;

            expandedImageDiv.style.zIndex = "100";
            expandedImageDiv.style.top = "0";
            expandedImageDiv.style.left = "0";
            expandedImageDiv.style.width = "100%";
            expandedImageDiv.style.height = "100%";
            expandedImageDiv.style.opacity = "1";

            slides = e.target.parentElement.parentElement.querySelectorAll("img");

            if (slides.length > 1) {
                expandedImageNext.style.display = "block";
                expandedImagePrevious.style.display = "block";

                expandedImageNext.addEventListener("click", next);
                expandedImagePrevious.addEventListener("click", previous);
            }
            else {
                expandedImageNext.style.display = "none";

                expandedImagePrevious.style.display = "none";
            }

            //add listener for when user want to close expanded image
            expandedImageClose.addEventListener("click", close);

            setTimeout(function () {document.body.style.overflow = "hidden";}, 990);

        },

        setUp = function () {
            var slides = document.querySelectorAll(".slide");

            var slide;

            //loop through each work images slideshow
            for (slide = 0; slide < slides.length; slide++) {

                    slides[slide].addEventListener("click", expand);
            }
        };

    return {
        "setUp": setUp
    };

}());

window.addEventListener("load", window.portfolio.expandImage.setUp);

