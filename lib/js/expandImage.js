//Used to expand a projects slide show

"use strict";

//initiates variables
var currentSlide = 0,
    slides = {},
    expandedImageDivContainer = $("#expandedImageDivContainer"),

    //changes current slide to new slide
    changeElement = function(nextSlideId) {
        $("#slideShowBullets .bullet:eq(" + currentSlide + ")").removeClass("active");
        currentSlide = nextSlideId;

        if (currentSlide >= slides.length) currentSlide = 0;
        else  if (currentSlide < 0) currentSlide = slides.length - 1;

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
        changeElement(currentSlide+1);
    },

    //sends event to change to previous slide
    previous = function() {
        changeElement(currentSlide-1);
    },

    //closes expanded image div
    close = function() {

        expandedImageDivContainer.removeClass("active").addClass("hiding");

        setTimeout(function() {
            document.body.style.overflow = "auto";
            expandedImageDivContainer.removeClass("hiding");
        }, 990);

        loopThroughSlideShows(startSlideShow);

        $("#slideShowBullets").text("");
    },

    //sets up slide show when image is clicked on
    expandImageSetUp = function(e) {
        var expandedImage = $("#expandedImage");

        //stops all the slide shows
        loopThroughSlideShows(stopSlideShow);

        expandedImageDivContainer.addClass("active");

        //display the expanded image div
        expandedImage.attr("src", e.target.src).show();

        document.body.style.overflow = "hidden";

        var colour = $(e.target).attr("data-slide-colour");

        //get all slides in slide show
        var slideShowId = $(e.target).data("slideShowId");
        slides = $("#"+slideShowId+" .slide");

        //loops through all slide shows images and set up a bullet navigation for each
        for (var i = 0; i < slides.length; i++) {

            //checks if the current loop is the current image on slideShow
            if (slides[i] === e.target) {
                currentSlide = i;
            }

            //set up bullet navigation for slide
            createElement($("#slideShowBullets")[0], "label", {class: "bullet js-expanded-image-bullet bullet--"+colour, "data-slide-id": i});
        }

        //display the current slide number and slide show length
        $("#slideShowNum").text((currentSlide + 1).toString());
        $("#slideShowTotal").text(slides.length);

        //check there are more than one slide show image to slide through
        if (slides.length > 1) {
            //set up next and previous buttons
            $("#expandedImageNext, #expandedImagePrevious, #slideShowBullets").show();
        }
        //only one slide show image so stop next and previous buttons
        else {
            $("#expandedImageNext, #expandedImagePrevious, #slideShowBullets").hide();
        }

        var regx = new RegExp("slideShowNav--\\w*", 'g');

        $("#expandedImageDivContainer .slideShowNav").each(function() {
            var classList = $(this).attr("class");
            classList =  classList.replace(regx, 'slideShowNav--'+colour);
            $(this).attr("class", classList);
        });

        //makes current slides bullet navigation display as active
        $("#slideShowBullets .bullet:eq(" + currentSlide + ")").addClass("active");

        $("#projectsDetail").removeClass("open").hide();

        setTimeout(function() {
            //display the expanded image div
            expandedImage.attr("src", "");
            expandedImage.attr("src", e.target.src);
        }, 1000);
    };


$(document).on("ready", function() {
    $("body").on("click", ".js-expandable-image", expandImageSetUp);

    $("body").on("click", ".js-expanded-image-bullet", function(e) {
        changeElement(parseInt($(e.target).data("slideId")));
    });

    //add listener for when the user wants to close expanded image
    $("#expandedImageClose").click(close);

    $("#expandedImageNext").click(next);
    $("#expandedImagePrevious").click(previous);
});