;/**
 * Holds all functions needed for a project slide show
 */
window.jpi = window.jpi || {};
(function(jQuery, jpi) {

    "use strict";

    var getXPosition = function(e) {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };

    var removeSelector = function(selector) {
        return selector.substring(1);
    }

    window.jpi.SlideShow = function(options) {

        var defaults = {
            selector: ".slide-show",
            viewportSelector: ".slide-show__viewport",
            slidesContainerSelector: ".slide-show__slides",
            slideSelector: ".slide-show__slide",
            bulletsSelector: ".slide-show__bullets",
            bulletSelector: ".slide-show__bullet",
            navSelector: ".slide-show__nav",

            slidesPerView: 1,

            durationPerSlide: 5000, // Milliseconds

            autoplay: true,

            loop: true,
        };

        options = jQuery.extend(defaults, options || {});

        var slideShow, viewport, container, slides, bulletsContainer, bullets, navs, internal;

        // Resets the transition duration of a slide show
        var resetTransition = function() {
            container.css("transition-duration", "");
        };

        // Widens slide show to fit all slides
        var widenSlideShow = function() {
            var slideWidth = viewport.innerWidth();
            var count = slides.length;

            if (options.slidesPerView > 1) {
                slideWidth = slideWidth / options.slidesPerView;
                count++;

                slides.first().css("margin-left", slideWidth);
            }

            slides.css("width", slideWidth + "px");

            container.css("width", slideWidth * count + "px");
        };

        var getPosition = function(slide) {
            var offset = 0;

            if (options.slidesPerView > 1 && !slide.is(":first-child")) {
                offset = slide.innerWidth();
            }

            var position = slide.position();

            return "-" + (position.left - offset) + "px";
        }

        // Moves current slide to correct position
        var resetToCurrentSlide = function() {
            var activeSlide = slideShow.find(options.slideSelector + "--active");
            container.css({
                transitionDuration: "0s",
                left: getPosition(activeSlide),
            });

            resetTransition();
        };

        // Adjusts all slides in slide show to fit
        var repositionSlides = function() {
            widenSlideShow();
            resetToCurrentSlide();
        };

        var setupNav = function() {
            if (navs && !options.loop) {
                var currentSlide = slideShow.find(options.slideSelector + "--active");
                navs.filter("[data-direction='previous']").attr("disabled", currentSlide.is(":first-child"));
                navs.filter("[data-direction='next']").attr("disabled", currentSlide.is(":last-child"));
            }
        }

        var moveToSlide = function(nextSlide) {
            var currentSlide = slideShow.find(options.slideSelector + "--active");

            currentSlide.removeClass(removeSelector(options.slideSelector) + "--active");

            if (bullets) {
                bullets.filter(options.bulletSelector + ".slide-show__bullet--active")
                    .removeClass(removeSelector(options.bulletSelector)  + "--active")
                ;
            }
            nextSlide.addClass(removeSelector(options.slideSelector) + "--active");

            container.css("left", getPosition(nextSlide));

            if (bullets) {
                var newSlideID = nextSlide.attr("id");
                bullets.filter("[data-slide-id='#" + newSlideID + "']")
                    .addClass(removeSelector(options.bulletSelector) + "--active")
                ;
            }

            setupNav();

            jpi.helpers.getFocusableChildren(currentSlide).attr("tabindex", -1);
            jpi.helpers.getFocusableChildren(nextSlide).attr("tabindex", "");
        };

        // Moves to next or previous slide
        var move = function(direction) {
            var oldSlide = slideShow.find(options.slideSelector + "--active");

            var nextSlide;
            if (direction === "previous") {
                nextSlide = oldSlide.prev();
                if (!nextSlide.length) {
                    nextSlide = slides.last();
                }
            }
            else {
                nextSlide = oldSlide.next();
                if (!nextSlide.length) {
                    nextSlide = slides.first();
                }
            }

            moveToSlide(nextSlide);
        };

        // Sets up events when the user wants to change slides with drag control
        var onSlideDrag = function(startEvent) {
            var dragMove, dragEnd;

            var slidesContainerDom = container[0];
            var slidesContainerLeft = container.position().left;

            var startX = getXPosition(startEvent);

            var removeListeners = function() {
                slidesContainerDom.removeEventListener("touchmove", dragMove);
                slidesContainerDom.removeEventListener("mousemove", dragMove);
                slidesContainerDom.removeEventListener("touchend", dragEnd);
                slidesContainerDom.removeEventListener("mouseup", dragEnd);
                slidesContainerDom.removeEventListener("mouseleave", dragEnd);
            };
            var dragCancel = function() {
                resetToCurrentSlide();
                if (options.autoplay) {
                    resume();
                }
                removeListeners();
            };
            dragMove = function(e) {
                var endX = getXPosition(e);
                var diff = startX - endX;

                container.css({
                    transitionDuration: "0s",
                    left: (slidesContainerLeft - diff) + "px",
                });
            };
            dragEnd = function(e) {
                var endX = getXPosition(e);

                var diff = startX - endX;
                if (Math.abs(diff) >= 15) {
                    resetTransition();
                    move(diff < 0 ? "previous" : "next");
                    if (options.autoplay) {
                        resume();
                    }
                    removeListeners();
                    return;
                }

                dragCancel();
            };

            pause();
            slidesContainerDom.addEventListener("touchmove", dragMove);
            slidesContainerDom.addEventListener("mousemove", dragMove);
            slidesContainerDom.addEventListener("touchend", dragEnd);
            slidesContainerDom.addEventListener("mouseup", dragEnd);
            slidesContainerDom.addEventListener("mouseleave", dragEnd);
        };

        // Pause a slide show by clearing the interval function on slide show id
        var pause = function() {
            clearInterval(internal);
        };

        var stop = function() {
            var slidesContainer = container[0];
            slidesContainer.removeEventListener("mousedown", onSlideDrag);
            slidesContainer.removeEventListener("touchstart", onSlideDrag);

            clearInterval(internal);
        };

        // Resumes a slide show by slide show element id
        var resume = function() {
            internal = setInterval(function() {
                move("next");
            }, options.durationPerSlide);
        };

        // Function when bullet was clicked to change slide show to a particular slide
        var changeToSlide = function(e) {
            var bulletElem = jQuery(e.target);
            var clickedSlideId = bulletElem.attr("data-slide-id");
            var nextSlide = slideShow.find(clickedSlideId);

            pause();
            moveToSlide(nextSlide);

            if (options.autoplay) {
                resume();
            }
        };

        var navigate = function(e) {
            pause();
            move(jQuery(e.target).attr("data-direction"));

            if (options.autoplay) {
                resume();
            }
        }

        var start = function() {
            if (bullets) {
                bullets.off("click", changeToSlide);
            }
            if (navs) {
                navs.off("click", navigate);
            }

            slideShow = jQuery(options.selector);
            viewport = slideShow.find(options.viewportSelector);
            container = slideShow.find(options.slidesContainerSelector);
            slides = slideShow.find(options.slideSelector);

            if (options.bulletsSelector && options.bulletSelector) {
                bulletsContainer = slideShow.find(options.bulletsSelector);
                bullets = slideShow.find(options.bulletSelector);
            }

            navs = slideShow.find(options.navSelector);

            slideShow.on("dragstart", ".slide-show__image", false); // todo: move

            if (bullets) {
                bullets.on("click", changeToSlide);
            }

            if (navs) {
                navs.on("click", navigate);
            }

            jQuery(window).on("orientationchange resize", jpi.helpers.debounce(repositionSlides, 150));

            var count = slides.length;

            if (count <= 0) {
                if (bulletsContainer) {
                    bulletsContainer.hide();
                }
                if (navs) {
                    navs.hide();
                }

                return;
            }

            var firstSlide = slides.first();

            var inactiveSlides = slides.not(firstSlide);

            jpi.helpers.getFocusableChildren(inactiveSlides).attr("tabindex", -1);

            firstSlide.addClass(removeSelector(options.slideSelector) + "--active");

            if (bullets) {
                bullets.first().addClass(removeSelector(options.bulletSelector) +  "--active");
            }

            if (count > 1) {
                widenSlideShow();

                if (bulletsContainer) {
                    bulletsContainer.show();
                }
                if (navs) {
                    navs.show();
                    setupNav();
                }

                container[0].addEventListener("mousedown", onSlideDrag);
                container[0].addEventListener("touchstart", onSlideDrag);

                if (options.autoplay) {
                    resume();
                }
            }
        };

        this.start = start;
        this.pause = pause;
        this.resume = resume;
        this.stop = stop;
    };

})(jQuery, jpi);

;window.jpi = window.jpi || {};
(function(jQuery, jpi) {

    "use strict";

    var global = {
        map: null,

        skills: null,
        expandableContents: null,
        expandableIcons: null,

        timelineItems: null,
    };

    var fn = {

        initBognorRegisMap: function() {
            var zoomLevel = 12;
            var bognorRegisLat = 50.7842;
            var bognorRegisLng = -0.674;
            var bognorRegisLocation = new google.maps.LatLng(bognorRegisLat, bognorRegisLng);
            var config = {
                center: bognorRegisLocation,
                zoom: zoomLevel,
                zoomControl: true,
                mapTypeControl: false,
                scaleControl: false,
                streetViewControl: false,
                rotateControl: false,
                fullscreenControl: false,
                styles: jpi.config.googleMapStyles || {},
            };
            var map = new google.maps.Map(global.map[0], config);

            new google.maps.Marker({
                position: bognorRegisLocation,
                icon: window.location.origin + "/assets/images/marker.png",
                map: map,
            });

            google.maps.event.addDomListener(window, "resize", function() {
                map.setCenter(bognorRegisLocation);
            });
        },

        setTimelineItemHeights: function() {
            global.timelineItems.css("height", ""); // reset

            var maxHeight = 0;
            global.timelineItems.each(function(i, elem) {
                var height = jQuery(elem).outerHeight(true);
                if (height > maxHeight) {
                    maxHeight = height;
                }
            });

            global.timelineItems.css("height", maxHeight * 2);
        },

        toggleSkillContent: function(e) {
            var item = jQuery(e.target);

            // Get the new item elems that was clicked
            var selected = item.find(".skills__description");
            var selectedIcon = item.find(".skills__toggle");

            // Reset all other item to closed
            global.expandableContents.not(selected).slideUp();
            global.expandableIcons.not(selectedIcon).addClass("fa-plus").removeClass("fa-minus");

            // Toggle the clicked item
            selectedIcon.toggleClass("fa-plus");
            selectedIcon.toggleClass("fa-minus");
            selected.slideToggle();
        },

        initListeners: function() {
            jQuery(window).on("resize", fn.setTimelineItemHeights);

            global.skills.on("click", fn.toggleSkillContent);

            jQuery(function() {
                if (global.map.length) {
                    google.maps.event.addDomListener(window, "load", fn.initBognorRegisMap);
                }
            });
        },

        init: function() {
            global.map = jQuery(".js-bognor-regis-map");

            global.skills = jQuery(".skills__item--expandable");
            if (global.skills.length) {
                global.expandableContents = jQuery(".skills__description");
                global.expandableIcons = jQuery(".skills__toggle");
            }

            global.timelineItems = jQuery(".timeline__item");

            fn.initListeners();

            jQuery(window).on("load", function() {
                fn.setTimelineItemHeights();

                var slideShow = new jpi.SlideShow({
                    selector: ".timeline",
                    viewportSelector: ".timeline__viewport",
                    slidesContainerSelector: ".timeline__items",
                    slideSelector: ".timeline__item",
                    bulletsSelector: false,
                    bulletSelector: false,
                    navSelector: ".timeline__nav",
                    slidesPerView: 3,
                    autoplay: false,
                    loop: false,
                });

                slideShow.start();
            });
        },
    };

    fn.init();

})(jQuery, jpi);

