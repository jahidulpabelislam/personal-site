var JPI = JPI || {};

;// Handles all the general JS templating stuff - for use out of Template class as well

JPI.templating = new (function() {

    "use strict";



    this.moustaches = {};



    // Get a ReEx of a 'moustache' for the field to replace (e.g. `{{ fieldName }}` or `{{fieldName}}`)

    this.getMoustache = function(field) {

        if (!this.moustaches[field]) {

            this.moustaches[field] = new RegExp("{{2} ?" + field + " ?}{2}", "g");

        }



        return this.moustaches[field];

    };



    return {

        getMoustache: this.getMoustache.bind(this),

    };

})();



// A Template 'class' that holds all necessary logic to load a template, replace/process with data and render

JPI.Template = (function() {

    "use strict";



    return function(template, context) {

        this.context = context || {};



        this.replace = function(field, value) {

            var type = typeof value;



            if (type === "string" || type === "number") {

                var moustache = JPI.templating.getMoustache(field);

                template = template.replace(moustache, value);

            }

            else if (type === "object") {

                for (var innerField in value) {

                    if ({}.hasOwnProperty.call(value, innerField)) {

                        var innerKey = field ? field + "." + innerField : innerField;

                        template = this.replace(innerKey, value[innerField]);

                    }

                }

            }



            return template;

        };



        this.process = function(data) {

            if (data) {

                this.replace(null, data);

            }

        };



        this.get = function() {

            this.process(context);

            return template;

        };



        this.renderIn = function(parentElem) {

            parentElem.append(this.get());

        };

    };

})();


;JPI.ajax = new (function() {
    "use strict";

    // Display feedback from server if there is one otherwise output generic message
    this.checkAndRenderError = function(response, errorRenderer, genericMessage) {
        var message = genericMessage || "";
        if (response) {
            if (response.error) {
                message = response.error;
            }
            else if (response.message) {
                message = response.message;
            }
        }

        if (message) {
            errorRenderer(message);
        }
    };

    // Loop through data to see if it exists and if it does run a function on each row
    this.renderRowsOrError = function(response, rowRenderer, errorRenderer, genericMessage) {
        // If data/rows exists, For each row run a function
        if (response && response.data && response.data.length) {
            for (var i = 0; i < response.data.length; i++) {
                if ({}.hasOwnProperty.call(response.data, i)) {
                    rowRenderer(response.data[i]);
                }
            }

            return true;
        }

        // Otherwise check feedback and show user and return false as data isn't there
        this.checkAndRenderError(response, errorRenderer, genericMessage);
        return false;
    };

    /**
     * Function for sending XHR requests
     *
     * @param request Object of necessary data needed to do a HTTP request
     * {
     *     "method": HTTP Method (string),
     *     "url": URL to load (string),
     *     "data": object of payload,
     *     "onSuccess": function to run when XHR request is successful
     *     "onError": function to run when there's an error
     * }
     */
    this.request = function(request) {
        return jQuery.ajax({
            url: request.url,
            method: request.method.toUpperCase(),
            data: request.data,
            dataType: "json",
            success: request.onSuccess,
            error: function() {
                request.onError("Error Loading Content.");
            },
        });
    };

    return {
        renderRowsOrError: this.renderRowsOrError.bind(this),
        request: this.request.bind(this),
    };
})();

;JPI.modal = function($modal) {
    "use strict";

    this.$body = jQuery("body");
    this.$page = jQuery(".page-container");

    this.lastFocused = null;

    this.$focusables = null;
    this.$firstFocusable = null;
    this.$lastFocusable = null;

    this.close = function() {
        if (!$modal.hasClass("is-open")) {
            return;
        }

        this.$body.removeClass("no-scroll");
        this.$page.attr("aria-hidden", "false");

        $modal.removeClass("is-open");
        $modal.attr({
            "tabindex": -1,
            "aria-hidden": true,
            "hidden": "hidden",
        });

        if (this.lastFocused) {
            this.lastFocused.focus();
        }

        $modal.trigger("closed");
    };

    this.triggerClose = function() {
        var $closeButton = $modal.find(".js-modal-close");
        if ($closeButton.length) {
            $closeButton.trigger("click");
            return;
        }

        this.close();
    };

    this.onModalClick = function(e) {
        // Close if clicked outside of the modal content elem
        var $clickedElem = jQuery(e.target);
        if ($clickedElem.children(".modal__content").length && !$clickedElem.closest(".modal__content").length) {
            this.triggerClose();
        }
    };

    this.onBackwardTab = function(e) {
        if (document.activeElement === this.$firstFocusable[0]) {
            e.preventDefault();
            this.$lastFocusable.focus();
        }
    };

    this.onForwardTab = function(e) {
        if (document.activeElement === this.$lastFocusable[0]) {
            e.preventDefault();
            this.$firstFocusable.focus();
        }
    };

    this.onKeyDown = function(e) {
        switch (e.keyCode || e.key) {
            case 9:
            case "Tab":
                if (this.$focusables.length <= 1) {
                    e.preventDefault();
                    break;
                }

                if (e.shiftKey) {
                    this.onBackwardTab(e);
                }
                else {
                    this.onForwardTab(e);
                }
                break;
            case 27:
            case "Escape":
                this.triggerClose();
                break;
        }
    };

    this.open = function() {
        this.lastFocused = document.activeElement;

        this.$body.addClass("no-scroll");
        this.$page.attr("aria-hidden", "true");

        $modal.attr({
            "tabindex": 0,
            "aria-hidden": false,
            "hidden": false,
        });
        $modal.addClass("is-open");

        this.$focusables = JPI.getFocusableChildren($modal);
        var focusablesLength = this.$focusables.length;
        if (focusablesLength) {
            this.$firstFocusable = jQuery(this.$focusables[0]);
            this.$lastFocusable = jQuery(this.$focusables[focusablesLength - 1]);

            this.$firstFocusable.focus();
        }
        else {
            $modal.focus();
        }

        $modal.trigger("opened");

        $modal.on("click", this.onModalClick.bind(this));
        $modal.on("click", ".js-modal-close", this.close.bind(this));
        $modal.on("keydown", this.onKeyDown.bind(this));
    };

    return {
        open: this.open.bind(this),
        close: this.close.bind(this),
    };
};

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

    this.getXPosition = function(e) {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };

    this.removeSelector = function(selector) {
        return selector.substring(1);
    };

    this.options = jQuery.extend(defaults, options || {});

    this.options.activeSlideClass = this.removeSelector(this.options.slideSelector) + "--active";
    if (this.options.bulletSelector) {
        this.options.activeBulletClass = this.removeSelector(this.options.bulletSelector) + "--active";
    }

    this.$slideShow;
    this.$viewport;
    this.$container;
    this.$slides;
    this.$bulletsContainer;
    this.$bullets;
    this.$navs;

    this.interval;

    this.getConfig = function(config) {
        if (window.innerWidth >= JPI.getInt(JPI.breakpoints.desktop)) {
            if (
                this.options.breakpoints &&
                this.options.breakpoints.desktop &&
                this.options.breakpoints.desktop[config]
            ) {
                return this.options.breakpoints.desktop[config];
            }
        }

        if (window.innerWidth >= JPI.getInt(JPI.breakpoints.tablet)) {
            if (
                this.options.breakpoints &&
                this.options.breakpoints.tablet &&
                this.options.breakpoints.tablet[config]
            ) {
                return this.options.breakpoints.tablet[config];
            }
        }

        return this.options[config];
    };

    // Resets the transition duration of a slide show
    this.resetTransition = function() {
        this.$container.css("transition-duration", "");
    };

    // Widens slide show to fit all slides
    this.widenSlideShow = function() {
        var slideWidth = this.$viewport.innerWidth();
        var count = this.$slides.length;

        var fullWidth = slideWidth * count;

        var slidesPerView = this.getConfig("slidesPerView");
        if (slidesPerView > 1) {
            slideWidth = slideWidth / slidesPerView;

            if (slidesPerView % 2 === 0) {
                fullWidth = slideWidth * count + slideWidth / 2;
                var offset = slideWidth / 2;
            }
            else {
                fullWidth = slideWidth * count + slideWidth;
                var offset = slideWidth;
            }

            this.$slides.first().css("margin-left", offset);
        }

        this.$slides.css("width", slideWidth + "px");
        this.$container.css("width", fullWidth + "px");
    };

    this.getPosition = function($slide) {
        var offset = 0;

        var slidesPerView = this.getConfig("slidesPerView");
        if (slidesPerView > 1 && !$slide.is(":first-child")) {
            offset = $slide.innerWidth();

            if (slidesPerView % 2 === 0) {
                offset = offset / 2;
            }
        }

        var position = $slide.position();

        return "-" + (position.left - offset) + "px";
    };

    // Moves current slide to correct position
    this.resetToCurrentSlide = function() {
        var $activeSlide = this.$slideShow.find("." + this.options.activeSlideClass);
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
            var $currentSlide = this.$slideShow.find("." + this.options.activeSlideClass);
            this.$navs.filter("[data-direction='previous']").attr("disabled", $currentSlide.is(":first-child"));
            this.$navs.filter("[data-direction='next']").attr("disabled", $currentSlide.is(":last-child"));
        }
    };

    this.moveToSlide = function($nextSlide) {
        var $currentSlide = this.$slideShow.find("." + this.options.activeSlideClass);

        $currentSlide.removeClass(this.options.activeSlideClass);

        if (this.$bullets) {
            this.$bullets.filter("." + this.options.activeBulletClass).removeClass(this.options.activeBulletClass);
        }
        $nextSlide.addClass(this.options.activeSlideClass);

        this.$container.css("left", this.getPosition($nextSlide));

        if (this.$bullets) {
            var newSlideID = $nextSlide.attr("id");
            this.$bullets.filter("[data-slide-id='#" + newSlideID + "']").addClass(this.options.activeBulletClass);
        }

        this.setupNav();

        JPI.getFocusableChildren($currentSlide).attr("tabindex", -1);
        JPI.getFocusableChildren($nextSlide).attr("tabindex", "");
    };

    // Moves to next or previous slide
    this.move = function(direction) {
        var $oldSlide = this.$slideShow.find("." + this.options.activeSlideClass);

        var $nextSlide;
        if (direction === "previous") {
            $nextSlide = $oldSlide.prev();
            if (!$nextSlide.length && this.options.loop) {
                $nextSlide = this.$slides.last();
            }
        }
        else {
            $nextSlide = $oldSlide.next();
            if (!$nextSlide.length && this.options.loop) {
                $nextSlide = this.$slides.first();
            }
        }

        if ($nextSlide.length) {
            this.moveToSlide($nextSlide);
        }
        else {
            this.resetToCurrentSlide();
        }
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
                left: slidesContainerLeft - diff + "px",
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
            this.$bullets.on("click", this.changeToSlide.bind(this));
        }

        this.$navs = this.$slideShow.find(this.options.navSelector);
        if (this.$navs) {
            this.$navs.on("click", this.navigate.bind(this));
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

        $firstSlide.addClass(this.options.activeSlideClass);

        if (this.$bullets) {
            this.$bullets.first().addClass(this.options.activeBulletClass);
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
    };
};

;/**
 * Used to expand a projects slide show
 */
JPI.ExpandedSlideShow = function() {
    "use strict";

    this.$element = jQuery(".expanded-slide-show");
    this.$currentCount = jQuery(".expanded-slide-show__current-count");
    this.$nav = jQuery(".expanded-slide-show__nav");

    this.timeout;

    this.$slides = {};
    this.current = 0;

    this.modal;

    this.displaySlide = function($expandedImage) {
        $expandedImage.attr("src", this.$slides[this.current].src);

        this.$currentCount.text(this.current + 1);
        var $currentBullet = jQuery(".expanded-slide-show__bullet:eq(" + this.current + ")");
        $currentBullet.addClass("expanded-slide-show__bullet--active");
    };

    // Changes the current slide to new slide
    this.changeSlide = function(newSlideIndex) {
        if (newSlideIndex >= this.$slides.length) {
            newSlideIndex = 0;
        }
        else if (newSlideIndex < 0) {
            newSlideIndex = this.$slides.length - 1;
        }

        if (newSlideIndex === this.current) {
            return;
        }

        this.current = newSlideIndex;

        var $expandedImageOld = jQuery(".expanded-slide-show__image--active");
        var $expandedImageNew = jQuery(".expanded-slide-show__image").not($expandedImageOld);

        jQuery(".expanded-slide-show__bullet--active").removeClass("expanded-slide-show__bullet--active");
        this.displaySlide($expandedImageNew);

        $expandedImageNew.addClass("expanded-slide-show__image--active");
        $expandedImageOld.removeClass("expanded-slide-show__image--active");
    };
    this.next = function() {
        this.changeSlide(this.current + 1);
    };
    this.previous = function() {
        this.changeSlide(this.current - 1);
    };

    this.onNavClick = function(e) {
        var direction = jQuery(e.target).attr("data-direction");
        this[direction]();
    };

    this.onBulletClick = function(e) {
        var slideId = jQuery(e.target).attr("data-slide-id");
        slideId = JPI.getInt(slideId);
        this.changeSlide(slideId);
    };

    this.onClose = function() {
        this.$element.removeClass("expanded-slide-show--closing");
        this.modal.close();
        this.timeout = null;
    };

    this.close = function() {
        this.$element.removeClass("expanded-slide-show--open").addClass("expanded-slide-show--closing");

        this.timeout = setTimeout(this.onClose.bind(this), 990);

        jQuery(".expanded-slide-show__close").off("click", this.close);
    };

    this.onCloseClick = function(e) {
        e.stopPropagation();
        this.close();
    };

    // Sets up slide show when image is clicked on
    this.open = function(slide, groupSelector) {
        clearTimeout(this.timeout);

        this.$slides = jQuery(slide)
            .parents(groupSelector)
            .find(".js-expandable-image")
        ;

        var slidesCount = this.$slides.length;

        jQuery(".expanded-slide-show__total-count").text(slidesCount);

        var $bulletsContainer = jQuery(".expanded-slide-show__bullets");
        $bulletsContainer.text("");

        // Only show navigations if there are more than one slide show image to slide through
        if (slidesCount > 1) {
            // Loops through all slide shows images and set up a bullet navigation for each
            for (var i = 0; i < slidesCount; i++) {
                // Checks if the current loop is the current image on slideShow
                if (this.$slides[i] === slide) {
                    this.current = i;
                }

                // Set up bullet navigation for slide
                JPI.renderNewElement("button", $bulletsContainer, {
                    "class": "expanded-slide-show__bullet",
                    "data-slide-id": i,
                });
            }

            this.$nav.show();
        }
        else {
            this.$nav.hide();
        }

        this.displaySlide(jQuery(".expanded-slide-show__image--active"));
        this.modal = new JPI.modal(this.$element);
        this.modal.open();
        this.$element.addClass("expanded-slide-show--open");

        this.$nav.on("click", this.onNavClick.bind(this));
        jQuery(".expanded-slide-show__bullet").on("click", this.onBulletClick.bind(this));
        jQuery(".expanded-slide-show__close").on("click", this.onCloseClick.bind(this));
    };

    return {
        open: this.open.bind(this),
        next: this.next.bind(this),
        previous: this.previous.bind(this),
        close: this.close.bind(this),
    };
};

;JPI.api = (function() {
    "use strict";

    var dateFormat = new Intl.DateTimeFormat("default", {
        month: "long",
        year: "numeric",
    });

    // Helper function to format Project data from the API to the necessary format for the Website
    var formatProjectData = function(project) {
        if (project.date) {
            var date = new Date(project.date);
            project.date = dateFormat.format(date);
        }

        return project;
    };

    return {
        formatProjectData: formatProjectData,
    };
})();

;new (function() {
    "use strict";

    var projects = this;

    this.url = new URL(window.location);

    this.$body = jQuery("body");

    this.$projectType = jQuery(".js-project-type");

    this.$loading = jQuery(".projects__loading");
    this.$paginationStatus = jQuery(".projects__pagination-status");
    this.$error = jQuery(".projects__error");
    this.$projects = jQuery(".projects__items");
    this.$pagination = jQuery(".projects__pagination");

    this.modalSelector = ".detailed-project";

    this.$modal = jQuery(this.modalSelector);
    this.modal = new JPI.modal(this.$modal);
    this.$modalSlidesContainer = this.$modal.find(".slide-show__slides");
    this.modalSlideShow = new JPI.SlideShow({
        selector: "#detailed-project-slide-show",
    });

    this.page = JPI.getInt(jQuery(".js-page").val(), 1);

    this.projectTemplate = jQuery("#project-template").text();
    this.slideTemplate = jQuery("#slide-template").text();
    this.bulletTemplate = jQuery("#slide-bullet-template").text();

    this.projects = {};

    this.renderError = function(error) {
        this.$error.text(error).show();
        this.$pagination.text("").hide();
        this.$projects.hide();
        this.$loading.hide();
    };

    this.renderPaginationItem = function(page, $container, isCurrent) {
        var url = new URL(window.location);

        if (page > 1) {
            url.searchParams.set("page", page);
        } else {
            url.searchParams.delete("page");
        }

        var classes = ["pagination__link"];
        if (isCurrent) {
            classes.push("pagination__link--active");
        }
        var $link = JPI.createElement("a", {
            class: classes.join(" "),
            text: page,
            href: url.toString(),
        });

        JPI.renderNewElement("li", $container, {
            class: "pagination__item",
            html: $link,
        });
    };

    // Adds pagination buttons/elements to the page
    this.renderPagination = function(totalProjects) {
        if (totalProjects > JPI.projects.perPage) {
            var currentPage = this.page;

            var totalPages = Math.ceil(totalProjects / JPI.projects.perPage);
            for (var page = 1; page <= totalPages; page++) {
                var isCurrent = page === currentPage;
                this.renderPaginationItem(page, this.$pagination, isCurrent);
            }

            this.$pagination.css("display", "inline-block");
        }
    };

    this.renderProjectTags = function(project, containerSelector) {
        var $tags = jQuery(containerSelector).find(".project__tags");
        if (!$tags.length) {
            return;
        }

        var tags = project.tags;
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i].trim();

            if (tag === "") {
                continue;
            }

            JPI.renderNewElement("span", $tags, {
                text: tag,
                class: "project__tag",
            });
        }
    };

    this.renderProjectLinks = function(project, containerSelector) {
        var $links = jQuery(containerSelector).find(".project__links");

        if (!project.url && !project.download_url && !project.github_url) {
            if (containerSelector !== this.modalSelector) {
                $links.remove();
            }
            return;
        }

        var defaultAttributes = {
            target: "_blank",
            rel: "noopener",
            classes: ["project__link"],
        };

        defaultAttributes.class = defaultAttributes.classes.join(" ");
        delete defaultAttributes.classes;

        if (project.url) {
            defaultAttributes.href = project.url;
            defaultAttributes.title = "Link to " + project.name;
            defaultAttributes.html = "<i class='fas fa-link fa-2x'></i>";
            JPI.renderNewElement("a", $links, defaultAttributes);
        }

        if (project.download_url) {
            defaultAttributes.href = project.download_url;
            defaultAttributes.title = "Link to download " + project.name;
            defaultAttributes.html = "<i class='fas fa-download fa-2x'></i>";
            JPI.renderNewElement("a", $links, defaultAttributes);
        }

        if (project.github_url) {
            defaultAttributes.href = project.github_url;
            defaultAttributes.title = "Link to " + project.name + " code on GitHub";
            defaultAttributes.html = "<i class='fab fa-github fa-2x'></i>";
            JPI.renderNewElement("a", $links, defaultAttributes);
        }
    };

    this.renderProjectImages = function(project, containerSelector) {
        if (!project.images || !project.images.length) {
            return;
        }

        var $slideShow = jQuery(containerSelector).find(".slide-show");
        var $slidesContainer = $slideShow.find(".slide-show__slides");
        var $slideShowBullets = $slideShow.find(".slide-show__bullets");

        // Loop through each image in project
        var images = project.images;
        for (var i = 0; i < images.length; i++) {
            if (!{}.hasOwnProperty.call(images, i)) {
                continue;
            }

            var slideTemplate = new JPI.Template(this.slideTemplate);
            var bulletTemplate = new JPI.Template(this.bulletTemplate);

            var image = images[i];
            for (var field in image) {
                if ({}.hasOwnProperty.call(image, field)) {
                    var value = image[field];
                    slideTemplate.replace(field, value);
                    bulletTemplate.replace(field, value);
                }
            }

            slideTemplate.renderIn($slidesContainer);
            bulletTemplate.renderIn($slideShowBullets);
        }
    };

    this.renderProject = function(project) {
        var projectSelector = "#project-" + project.id;
        if (jQuery(projectSelector).length) {
            return;
        }

        project = JPI.api.formatProjectData(project);

        this.projects[project.id] = project;

        new JPI.Template(this.projectTemplate, project).renderIn(this.$projects);

        this.renderProjectImages(project, projectSelector);
        this.renderProjectLinks(project, projectSelector);
    };

    // Sets up events when projects were received
    this.gotProjects = function(response) {
        this.$error.text("").hide();
        this.$projects.text("").show();
        this.$pagination.text("").hide();
        this.$loading.hide();

        // Send the data, the function to do if data is valid
        JPI.ajax.renderRowsOrError(
            response,
            this.renderProject.bind(this),
            this.renderError.bind(this),
            "No Projects Found."
        );

        this.renderPagination(JPI.getInt(response._total_count));

        var paginationStatus = this.$paginationStatus.attr("data-format");

        paginationStatus = paginationStatus.replace("{start}", (response._total_count ? 1 : 0) + (this.page - 1) * JPI.projects.perPage);
        paginationStatus = paginationStatus.replace("{end}", (this.page - 1) * JPI.projects.perPage + response.data.length);
        paginationStatus = paginationStatus.replace("{total}", response._total_count);

        this.$paginationStatus.html(paginationStatus);
    };

    this.getProjects = function() {
        var query = {
            filters: {
                type_id: this.$projectType.val(),
            },
            page: this.page,
            limit: JPI.projects.perPage,
        };

        JPI.ajax.request({
            method: "GET",
            url: JPI.projects.apiEndpoint + "/projects/",
            data: query,
            onSuccess: this.gotProjects.bind(this),
            onError: this.renderError.bind(this),
        });
    };

    this.openProjectModal = function(e) {
        var projectId = jQuery(e.target).attr("data-project-id");
        var project = this.projects[projectId];
        var $modal = this.$modal;

        $modal.find(".project__links, .project__tags, .slide-show__slides, .slide-show__bullets").text("");

        $modal.find(".modal__heading").text(project.name);
        $modal.find(".project__date").text(project.date);
        $modal.find(".project__description").html(project.long_description);
        $modal.find(".project__type").text(project.type);

        this.renderProjectTags(project, this.modalSelector);
        this.renderProjectLinks(project, this.modalSelector);
        this.renderProjectImages(project, this.modalSelector);

        this.modal.open();

        this.modalSlideShow.start();
    };

    this.onProjectModalClose = function() {
        this.modalSlideShow.stop();
        this.$modalSlidesContainer.css({
            width: "",
            left: "",
        });
    };

    this.storeLatestSearch = function() {
        if (this.page > 1) {
            this.url.searchParams.set("page", this.page);
        } else {
            projects.url.searchParams.delete("page");
        }

        var state = {
            page: this.page,
            type: this.$projectType.val(),
        };

        history.pushState(state, window.title, this.url.toString());

        if (typeof ga !== "undefined") {
            ga("set", "page", url);
            ga("send", "pageview");
        }
    };

    this.scrollToProjects = function() {
        JPI.scrollTo(this.$projects, 20);
    };

    this.initListeners = function() {
        this.$projectType.on("change", function(e) {
            projects.page = 1;

            if (jQuery(this).val()) {
                projects.url.searchParams.set("type", jQuery(this).find("option:selected").attr("data-urlname"));
            } else {
                projects.url.searchParams.delete("type");
            }

            projects.storeLatestSearch();
            projects.getProjects();
        });

        this.$projects.on("click", ".project__read-more", this.openProjectModal.bind(this));

        this.$modal.on("closed", this.onProjectModalClose.bind(this));

        this.$pagination.on("click", ".pagination__link", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var page = jQuery(e.target).text();
            page = JPI.getInt(page, 1);

            if (projects.page === page) {
                return;
            }

            projects.page = page;
            projects.scrollToProjects();
            projects.storeLatestSearch();
            projects.getProjects();
        });

        window.addEventListener("popstate", function(e) {
            var state = e.state || {};

            var page = state.page || 1;
            var type = state.type || "";

            projects.page = JPI.getInt(page, 1);
            projects.$projectType.val(type);

            projects.scrollToProjects();

            projects.getProjects();
        });
    };

    this.init = function() {
        this.initListeners();

        this.gotProjects(JPI.projects.apiResponse);

        this.$body.on("click", ".js-expandable-image", function(e) {
            var expandedSlideShow = new JPI.ExpandedSlideShow();
            expandedSlideShow.open(e.target, ".js-expandable-image-group");
        });
    };

    jQuery(window).on("jpi-css-loaded", this.init.bind(this));
})();


//# sourceMappingURL=maps/portfolio.js.map
