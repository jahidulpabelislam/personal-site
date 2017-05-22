//Used to expand a projects slide show

"use strict";

//initiates variables
var currentSlide = 0,
    slides = {},

    //changes current slide to new slide
    changeElement = function() {
        var expandedImage = $("#expandedImage"),
            expandedImage2 = $("#expandedImage2");

        expandedImage2.attr("src", slides[currentSlide].src);
        expandedImage.css("opacity", "0");
        expandedImage2.css("opacity", "1");
        expandedImage.attr("id", "expandedImage2");
        expandedImage2.attr("id", "expandedImage");
        $("#slideShowNum").text((currentSlide + 1).toString());

        $("#slideShowBullets .bullet:eq(" + currentSlide + ")").addClass("active");
    },

    //sends event to change to next slide
    next = function() {
        $("#slideShowBullets .bullet:eq(" + currentSlide + ")").removeClass("active");
        currentSlide++;
        if (currentSlide >= slides.length) currentSlide = 0;
        changeElement();
    },

    //sends event to change to previous slide
    previous = function() {
        $("#slideShowBullets .bullet:eq(" + currentSlide + ")").removeClass("active");
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        changeElement();
    },

    //closes expanded image div
    close = function() {

        $("#expandedImageDivContainer").css({
            "top": "50%",
            "left": "50%",
            "width": "1px",
            "height": "1px",
            "opacity": "0"
        });

        setTimeout(function() {
            document.body.style.overflow = "auto";
            $("#expandedImageDivContainer").css("zIndex", "-100");
        }, 990);

        loopThroughSlideShows(startSlideShow);

        $("#slideShowBullets").text("");
    },

    //sets up slide show when image is clicked on
    expandImageSetUp = function(e) {
        var expandedImage = $("#expandedImage"),
            i;

        //stops all the slide shows
        loopThroughSlideShows(stopSlideShow);

        //display the expanded image div
        expandedImage.attr("src", e.target.src);

        $("#expandedImageDivContainer").css({
            "top": "0",
            "left": "0",
            "width": "100%",
            "height": "100%",
            "opacity": "1",
            "zIndex": "10000"
        });

        document.body.style.overflow = "hidden";

        //get all slides in slide show
        slides = e.target.parentElement.parentElement.parentElement.querySelectorAll("img");

        //loops through all slide shows images and set up a bullet navigation for each
        for (i = 0; i < slides.length; i++) {

            //checks if the current loop is the current image on slideShow
            if (slides[i] === e.target) {
                currentSlide = i;
            }

            //set up bullet navigation for slide
            var bulletContainer = createElement($("#slideShowBullets")[0], "div", {className: "bullet"}),
                bullet = createElement(bulletContainer, "label", {className: i});

            bullet.addEventListener("click", function(e) {
                $("#slideShowBullets .bullet:eq(" + currentSlide + ")").removeClass("active");
                currentSlide = parseInt(e.target.className);
                changeElement();
            });
        }

        //display the current slide number and slide show length
        $("#slideShowNum").text((currentSlide + 1).toString());
        $("#slideShowTotal").text(slides.length);

        //check there are more than one slide show image to slide through
        if (slides.length > 1) {
            //set up next and previous buttons
            $("#expandedImageNext, #expandedImagePrevious, #slideShowBullets").show();
            $("#expandedImageNext").click(next);
            $("#expandedImagePrevious").click(previous);
        }
        //only one slide show image so stop next and previous buttons
        else {
            $("#expandedImageNext, #expandedImagePrevious, #slideShowBullets").hide();
        }

        //add listener for when the user wants to close expanded image
        $("#expandedImageClose").click(close);

        //makes current slides bullet navigation display as active
        $("#slideShowBullets .bullet:eq(" + currentSlide + ")").addClass("active");
    };