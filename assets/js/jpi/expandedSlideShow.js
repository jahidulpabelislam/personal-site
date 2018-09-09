//Used to expand a projects slide show
window.jpi = window.jpi || {};
window.jpi.expandedSlideShow = (function (jQuery) {

	"use strict";

	//initiates variables
	var global = {
		currentSlide: 0,
		slides: {},
		expandedImageDivContainer: jQuery(".expanded-slide-show")
	};

	var fn = {

		//changes current slide to new slide
		changeElement: function (nextSlideId) {
			jQuery(".expanded-image-slide-show__bullet").removeClass("active");
			global.currentSlide = nextSlideId;

			if (global.currentSlide >= global.slides.length) {
				global.currentSlide = 0;
			}
			else if (global.currentSlide < 0) {
				global.currentSlide = global.slides.length - 1;
			}

			var expandedImage = jQuery(".expanded-image.current"),
				expandedImage2 = jQuery(".expanded-image:not(.current)");

			expandedImage2.attr("src", global.slides[global.currentSlide].src);
			expandedImage.removeClass("current");
			expandedImage2.addClass("current");
			jQuery(".js-expanded-slide-show-current-count").text((global.currentSlide + 1).toString());

			jQuery(".expanded-image-slide-show__bullet:eq(" + global.currentSlide + ")").addClass("active");
		},

		//sends event to change to next slide
		next: function () {
			fn.changeElement(global.currentSlide + 1);
		},

		//sends event to change to previous slide
		previous: function () {
			fn.changeElement(global.currentSlide - 1);
		},

		//closes expanded image div
		close: function () {

			global.expandedImageDivContainer.removeClass("active").addClass("hiding");

			setTimeout(function () {
				document.body.style.overflow = "auto";
				global.expandedImageDivContainer.removeClass("hiding");
			}, 990);

			jpi.slideShow.loopThroughSlideShows(jpi.slideShow.startSlideShow);

			jQuery(".expanded-slide-show__bullets").text("");
		},

		//sets up slide show when image is clicked on
		setUp: function (e) {
			var expandedImage = jQuery(".expanded-image.current");

			//stops all the slide shows
			jpi.slideShow.loopThroughSlideShows(jpi.slideShow.stopSlideShow);

			global.expandedImageDivContainer.addClass("active");

			//display the expanded image div
			expandedImage.attr("src", e.target.src).show();

			document.body.style.overflow = "hidden";

			//get all slides in slide show
			var slideShowId = jQuery(e.target).data("slideShowId");
			global.slides = jQuery(slideShowId + " .slide-show__img");

			//loops through all slide shows images and set up a bullet navigation for each
			for (var i = 0; i < global.slides.length; i++) {

				//checks if the current loop is the current image on slideShow
				if (global.slides[i] === e.target) {
					global.currentSlide = i;
				}

				//set up bullet navigation for slide
				jpi.helpers.createElement(jQuery(".expanded-slide-show__bullets")[0], "label", {
					class: "slide-show__bullet expanded-image-slide-show__bullet js-expanded-image-bullet",
					"data-slide-id": i
				});
			}

			//display the current slide number and slide show length
			jQuery(".js-expanded-slide-show-current-count").text((global.currentSlide + 1).toString());
			jQuery(".js-expanded-slide-show-total-count").text(global.slides.length);

			//check there are more than one slide show image to slide through
			if (global.slides.length > 1) {
				//set up next and previous buttons
				jQuery(".js-expanded-slide-show-previous, .js-expanded-slide-show-next, .expanded-image-slide-show__bullet").show();
			}
			//only one slide show image so stop next and previous buttons
			else {
				jQuery(".js-expanded-slide-show-previous, .js-expanded-slide-show-next, .expanded-image-slide-show__bullet").hide();
			}

			//makes current slides bullet navigation display as active
			jQuery(".expanded-image-slide-show__bullet:eq(" + global.currentSlide + ")").addClass("active");

			jQuery(".detailed-project").removeClass("open").hide();

			setTimeout(function () {
				//display the expanded image div
				expandedImage.attr("src", "");
				expandedImage.attr("src", e.target.src);
			}, 1000);
		},

		initListeners: function () {
			jQuery("body").on("click", ".js-expandable-image", fn.setUp);

			jQuery("body").on("click", ".js-expanded-image-bullet", function (e) {
				fn.changeElement(parseInt(jQuery(e.target).data("slideId")));
			});

			//add listener for when the user wants to close expanded image
			jQuery(".expanded-slide-show__close").click(fn.close);

			jQuery(".js-expanded-slide-show-next").click(fn.next);
			jQuery(".js-expanded-slide-show-previous").click(fn.previous);
		}
	};

	jQuery(document).on("ready", fn.initListeners);

}(jQuery));