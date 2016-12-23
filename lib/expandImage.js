//Used to expand a projects slide show
window.portfolio = window.portfolio || {};
window.portfolio.expandImage = (function () {

    "use strict";

    //grabs elements for later use
    var expandedImageDivContainer = document.getElementById("expandedImageDivContainer"),
        expandedImageNext = document.getElementById("expandedImageNext"),
        expandedImagePrevious = document.getElementById("expandedImagePrevious"),
        expandedImageClose = document.getElementById("expandedImageClose"),
        slideShowNum = document.getElementById("slideShowNum"),
        slideShowTotal = document.getElementById("slideShowTotal"),
        slideShowBullets = document.getElementById("slideShowBullets"),

        //initiates variables
        currentSlide = 0,
        slides = {},

        //changes current slide to new slide
        changeElement = function () {
            var expandedImage = document.getElementById("expandedImage"),
                expandedImage2 = document.getElementById("expandedImage2");

            expandedImage2.src = slides[currentSlide].src;
            expandedImage.style.opacity = "0";
            expandedImage2.style.opacity = "1";
            expandedImage.id = "expandedImage2";
            expandedImage2.id = "expandedImage";
            slideShowNum.innerHTML = (currentSlide + 1).toString();

            slideShowBullets.querySelectorAll(".bullet")[currentSlide].classList.add("active");
        },

        //sends event to change to next slide
        next = function () {
            slideShowBullets.querySelectorAll(".bullet")[currentSlide].classList.remove("active");
            currentSlide++;
            if (currentSlide >= slides.length) currentSlide = 0;
            changeElement();
        },

        //sends event to change to previous slide
        previous = function () {
            slideShowBullets.querySelectorAll(".bullet")[currentSlide].classList.remove("active");
            currentSlide--;
            if (currentSlide < 0) currentSlide = slides.length - 1;
            changeElement();
        },

        //closes expanded image div
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

            window.portfolio.slideShow.loopThroughSlideShows(window.portfolio.slideShow.startSlideShow);

            slideShowBullets.innerHTML = "";
        },

        //sets up slide show when image is clicked on
        setUp = function (e) {
            var expandedImage = document.getElementById("expandedImage"),
                i;

            //display the expanded image div
            expandedImage.src = e.target.src;
            expandedImageDivContainer.style.zIndex = "100";
            expandedImageDivContainer.style.top = "0";
            expandedImageDivContainer.style.left = "0";
            expandedImageDivContainer.style.width = "100%";
            expandedImageDivContainer.style.height = "100%";
            expandedImageDivContainer.style.opacity = "1";
            document.body.style.overflow = "hidden";

            //get all slides in slide show
            slides = e.target.parentElement.parentElement.parentElement.querySelectorAll("img");

            //loops through all slide shows images and set up a bullet navigation for each
            for (i = 0; i < slides.length; i++) {

                //checks if the current loop is the current image on slideShow
                if (slides[i] == e.target) {
                    currentSlide = i;
                }

                //set up bullet navigation for slide
                var bulletContainer = window.portfolio.helperFunctions.createElement(slideShowBullets, "div", {className: "bullet"}),
                bullet = window.portfolio.helperFunctions.createElement(bulletContainer, "label", {className: i});
                bullet.addEventListener("click", function (e) {
                    slideShowBullets.querySelectorAll(".bullet")[currentSlide].classList.remove("active");
                    currentSlide = parseInt(e.target.className);
                    changeElement();
                });
            }

            //display the current slide number and slide show length
            slideShowNum.innerHTML = (currentSlide + 1).toString();
            slideShowTotal.innerHTML = slides.length;

            //check there are more than one slide show image to slide through
            if (slides.length > 1) {
                //set up next and previous buttons
                expandedImageNext.style.display = expandedImagePrevious.style.display = slideShowBullets.style.display = "block";
                expandedImageNext.addEventListener("click", next);
                expandedImagePrevious.addEventListener("click", previous);
            }
            //only one slide show image so stop next and previous buttons
            else {
                expandedImageNext.style.display = expandedImagePrevious.style.display = slideShowBullets.style.display = "none";
            }

            //add listener for when the user wants to close expanded image
            expandedImageClose.addEventListener("click", close);

            //stops all the slide shows
            window.portfolio.slideShow.loopThroughSlideShows(window.portfolio.slideShow.stopSlideShow);

            //makes current slides bullet navigation display as active
            slideShowBullets.querySelectorAll(".bullet")[currentSlide].classList.add("active");
        };

    return {
        "setUp": setUp
    };

}());