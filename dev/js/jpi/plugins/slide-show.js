;/**
 * Holds all functions needed for a project slide show
 */
JPI.SlideShow = function(options) {

    "use strict";

    var slideShow = this;

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

    this.options = jQuery.extend(defaults, options || {});

    this.$slideShow;
    this.$viewport;
    this.$container;
    this.$slides;
    this.$bulletsContainer;
    this.$bullets;
    this.$navs;

    this.interval;

    this.getXPosition = function(e) {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };

    this.removeSelector = function(selector) {
        return selector.substring(1);
    }

    // Resets the transition duration of a slide show
    this.resetTransition = function() {
        this.$container.css("transition-duration", "");
    };

    // Widens slide show to fit all slides
    this.widenSlideShow = function() {
        var slideWidth = this.$viewport.innerWidth();
        var count = this.$slides.length;

        if (this.options.slidesPerView > 1) {
            slideWidth = slideWidth / this.options.slidesPerView;
            count++;

            this.$slides.first().css("margin-left", slideWidth);
        }

        this.$slides.css("width", slideWidth + "px");
        this.$container.css("width", slideWidth * count + "px");
    };

    this.getPosition = function($slide) {
        var offset = 0;

        if (this.options.slidesPerView > 1 && !$slide.is(":first-child")) {
            offset = $slide.innerWidth();
        }

        var position = $slide.position();

        return "-" + (position.left - offset) + "px";
    };

    // Moves current slide to correct position
    this.resetToCurrentSlide = function() {
        var $activeSlide = this.$slideShow.find(this.options.slideSelector + "--active");
        this.$container.css({
            transitionDuration: "0s",
            left: this.getPosition($activeSlide),
        });

        this.resetTransition();
    };

    // Adjusts all slides in slide show to fit
    this.repositionSlides = function() {
        this.widenSlideShow();
        this.resetToCurrentSlide();
    };

    this.setupNav = function() {
        if (this.$navs && !this.options.loop) {
            var $currentSlide = this.$slideShow.find(this.options.slideSelector + "--active");
            this.$navs.filter("[data-direction='previous']").attr("disabled", $currentSlide.is(":first-child"));
            this.$navs.filter("[data-direction='next']").attr("disabled", $currentSlide.is(":last-child"));
        }
    };

    this.moveToSlide = function($nextSlide) {
        var $currentSlide = this.$slideShow.find(this.options.slideSelector + "--active");

        $currentSlide.removeClass(this.removeSelector(this.options.slideSelector) + "--active");

        if (this.$bullets) {
            this.$bullets.filter(this.options.bulletSelector + ".slide-show__bullet--active")
                .removeClass(this.removeSelector(this.options.bulletSelector)  + "--active")
            ;
        }
        $nextSlide.addClass(this.removeSelector(this.options.slideSelector) + "--active");

        this.$container.css("left", this.getPosition($nextSlide));

        if (this.$bullets) {
            var newSlideID = $nextSlide.attr("id");
            this.$bullets.filter("[data-slide-id='#" + newSlideID + "']")
                .addClass(this.removeSelector(this.options.bulletSelector) + "--active")
            ;
        }

        this.setupNav();

        JPI.getFocusableChildren($currentSlide).attr("tabindex", -1);
        JPI.getFocusableChildren($nextSlide).attr("tabindex", "");
    };

    // Moves to next or previous slide
    this.move = function(direction) {
        var $oldSlide = this.$slideShow.find(this.options.slideSelector + "--active");

        var $nextSlide;
        if (direction === "previous") {
            $nextSlide = $oldSlide.prev();
            if (!$nextSlide.length) {
                $nextSlide = this.$slides.last();
            }
        }
        else {
            $nextSlide = $oldSlide.next();
            if (!$nextSlide.length) {
                $nextSlide = this.$slides.first();
            }
        }

        this.moveToSlide($nextSlide);
    };

    // Sets up events when the user wants to change slides with drag control
    this.onSlideDrag = function(startEvent) {
        var dragMove, dragEnd;

        var container = this.$container[0];
        var slidesContainerLeft = this.$container.position().left;

        var startX = this.getXPosition(startEvent);

        var removeListeners = function() {
            container.removeEventListener("touchmove", dragMove);
            container.removeEventListener("mousemove", dragMove);
            container.removeEventListener("touchend", dragEnd);
            container.removeEventListener("mouseup", dragEnd);
            container.removeEventListener("mouseleave", dragEnd);
        };
        var dragCancel = function() {
            slideShow.resetToCurrentSlide();
            if (slideShow.options.autoplay) {
                slideShow.resume();
            }
            removeListeners();
        };
        dragMove = function(e) {
            var endX = slideShow.getXPosition(e);
            var diff = startX - endX;

            slideShow.$container.css({
                transitionDuration: "0s",
                left: (slidesContainerLeft - diff) + "px",
            });
        };
        dragEnd = function(e) {
            var endX = slideShow.getXPosition(e);

            var diff = startX - endX;
            if (Math.abs(diff) >= 15) {
                slideShow.resetTransition();
                slideShow.move(diff < 0 ? "previous" : "next");
                if (slideShow.options.autoplay) {
                    slideShow.resume();
                }
                removeListeners();
                return;
            }

            dragCancel();
        };

        this.pause();
        container.addEventListener("touchmove", dragMove);
        container.addEventListener("mousemove", dragMove);
        container.addEventListener("touchend", dragEnd);
        container.addEventListener("mouseup", dragEnd);
        container.addEventListener("mouseleave", dragEnd);
    };

    // Pause a slide show by clearing the interval function on slide show id
    this.pause = function() {
        clearInterval(this.interval);
    };

    this.stop = function() {
        var container = this.$container[0];
        container.removeEventListener("mousedown", this.onSlideDrag);
        container.removeEventListener("touchstart", this.onSlideDrag);

        clearInterval(this.interval);
    };

    // Resumes a slide show by slide show element id
    this.resume = function() {
        this.interval = setInterval(function() {
            slideShow.move("next");
        }, this.options.durationPerSlide);
    };

    // Function when bullet was clicked to change slide show to a particular slide
    this.changeToSlide = function(e) {
        var $bullet = jQuery(e.target);
        var clickedSlideId = $bullet.attr("data-slide-id");
        var $nextSlide = this.$slideShow.find(clickedSlideId);

        this.pause();
        this.moveToSlide($nextSlide);

        if (this.options.autoplay) {
            this.resume();
        }
    };

    this.navigate = function(e) {
        this.pause();
        this.move(jQuery(e.target).attr("data-direction"));

        if (this.options.autoplay) {
            this.resume();
        }
    };

    this.start = function() {
        if (this.$bullets) {
            this.$bullets.off("click", this.changeToSlide);
        }
        if (this.$navs) {
            this.$navs.off("click", this.navigate);
        }

        this.$slideShow = jQuery(this.options.selector);
        this.$viewport = this.$slideShow.find(this.options.viewportSelector);
        this.$container = this.$slideShow.find(this.options.slidesContainerSelector);
        this.$slides = this.$slideShow.find(this.options.slideSelector);

        if (this.options.bulletsSelector && this.options.bulletSelector) {
            this.$bulletsContainer = this.$slideShow.find(this.options.bulletsSelector);
            this.$bullets = this.$slideShow.find(this.options.bulletSelector);
        }

        this.$navs = this.$slideShow.find(this.options.navSelector);

        this.$slideShow.on("dragstart", ".slide-show__image", false); // todo: move

        if (this.$bullets) {
            this.$bullets.on("click", this.changeToSlide);
        }

        if (this.$navs) {
            this.$navs.on("click", this.navigate);
        }

        jQuery(window).on("orientationchange resize", JPI.debounce(this.repositionSlides.bind(this), 150));

        var count = this.$slides.length;

        if (count <= 0) {
            if (this.$bulletsContainer) {
                this.$bulletsContainer.hide();
            }
            if (this.$navs) {
                this.$navs.hide();
            }

            return;
        }

        var $firstSlide = this.$slides.first();

        var $inactiveSlides = this.$slides.not($firstSlide);

        JPI.getFocusableChildren($inactiveSlides).attr("tabindex", -1);

        $firstSlide.addClass(this.removeSelector(this.options.slideSelector) + "--active");

        if (this.$bullets) {
            this.$bullets.first().addClass(this.removeSelector(this.options.bulletSelector) +  "--active");
        }

        if (count > 1) {
            this.widenSlideShow();

            if (this.$bulletsContainer) {
                this.$bulletsContainer.show();
            }
            if (this.$navs) {
                this.$navs.show();
                this.setupNav();
            }

            this.$container[0].addEventListener("mousedown", this.onSlideDrag.bind(this));
            this.$container[0].addEventListener("touchstart", this.onSlideDrag.bind(this));

            if (this.options.autoplay) {
                this.resume();
            }
        }
    };

    return {
        start: this.start.bind(this),
        pause: this.pause.bind(this),
        resume: this.resume.bind(this),
        stop: this.stop.bind(this),
    }
};
