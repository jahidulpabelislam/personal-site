var JPI = JPI || {};

;// Handles all the general JS templating stuff - for use out of Template class as well

JPI.templating = (function() {



    "use strict";



    var global = {

        moustaches: {}, // `Cache` of moustaches

    };



    var fn = {



        // Get a ReEx of a 'moustache' for the field to replace (e.g. `{{ fieldName }}` or `{{fieldName}}`)

        getMoustache: function(field) {

            if (!global.moustaches[field]) {

                global.moustaches[field] = new RegExp("{{2} ?" + field + " ?}{2}", "g");

            }



            return global.moustaches[field];

        },

    };



    return {

        getMoustache: fn.getMoustache,

    };



})();



// A Template 'class' that holds all necessary logic to load a template, replace/process with data and render

JPI.Template = (function() {



    "use strict";



    return function(template, context) {



        context = context || {};



        var fn = {



            replace: function(field, value) {

                var type = typeof value;



                if (type === "string" || type === "number") {

                    var moustache = JPI.templating.getMoustache(field);

                    template = template.replace(moustache, value);

                }

                else if (type === "object") {

                    for (var innerField in value) {

                        if ({}.hasOwnProperty.call(value, innerField)) {

                            var innerKey = field ? field + "." + innerField : innerField;

                            template = fn.replace(innerKey, value[innerField]);

                        }

                    }

                }



                return template;

            },



            process: function(data) {

                if (data) {

                    fn.replace(null, data);

                }

            },



            get: function() {

                fn.process(context);

                return template;

            },



            renderIn: function(parentElem) {

                parentElem.append(fn.get());

            },

        };



        return {

            replace: fn.replace,

            process: fn.process,

            get: fn.get,

            renderIn: fn.renderIn,

        };

    };



})();




;JPI.ajax = (function() {

    "use strict";

    var fn = {

        // Display feedback from server if there is one otherwise output generic message
        checkAndRenderError: function(response, errorRenderer, genericMessage) {
            var message = genericMessage || "";
            if (response) {
                if (response.error) {
                    message = response.error;
                } else if (response.message) {
                    message = response.message;
                }
            }

            if (message) {
                errorRenderer(message);
            }
        },

        // Loop through data to see if it exists and if it does run a function on each row
        renderRowsOrError: function(response, rowRenderer, errorRenderer, genericMessage) {
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
            fn.checkAndRenderError(response, errorRenderer, genericMessage);
            return false;
        },

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
        request: function(request) {
            return jQuery.ajax({
                url: request.url,
                method: request.method.toUpperCase(),
                data: request.data,
                dataType: "json",
                success: request.onSuccess,
                error: function () {
                    request.onError("Error Loading Content.");
                },
            });
        },
    };

    return {
        renderRowsOrError: fn.renderRowsOrError,
        request: fn.request,
    };
})();

;JPI.modal = (function() {

    "use strict";

    var global = {
        body: null,
        page: null,
        selector: ".modal",
        activeModal: null,
        lastFocused: null,
        focusables: null,
        firstFocusable: null,
        lastFocusable: null,
    };

    var fn = {

        close: function() {
            if (!global.activeModal) {
                return;
            }

            global.body.removeClass("no-scroll");
            global.page.attr("aria-hidden", "false");

            global.activeModal.removeClass("is-open");
            global.activeModal.attr({
                "tabindex": -1,
                "aria-hidden": true,
                "hidden": "hidden",
            });

            if (global.lastFocused) {
                global.lastFocused.focus();
            }

            global.activeModal.trigger("closed");

            global.activeModal = null;
            global.lastFocused = null;
            global.focusables = null;
            global.firstFocusable = null;
            global.lastFocusable = null;
        },

        triggerClose: function() {
            var closeButton = global.activeModal.find(".js-modal-close");
            if (closeButton.length) {
                closeButton.trigger("click");
                return;
            }

            fn.close();
        },

        open: function(modal) {
            if (global.activeModal) {
                fn.triggerClose();
            }

            global.activeModal = jQuery(modal);

            global.lastFocused = document.activeElement;

            global.body.addClass("no-scroll");
            global.page.attr("aria-hidden", "true");

            global.activeModal.attr({
                "tabindex": 0,
                "aria-hidden": false,
                "hidden": false,
            });
            global.activeModal.addClass("is-open");

            global.focusables = JPI.getFocusableChildren(global.activeModal);
            var focusablesLength = global.focusables.length;
            if (focusablesLength) {
                global.firstFocusable = jQuery(global.focusables[0]);
                global.lastFocusable = jQuery(global.focusables[focusablesLength - 1]);

                global.firstFocusable.focus();
            }
            else {
                global.activeModal.focus();
            }

            global.activeModal.trigger("opened");
        },

        onModalClick: function(e) {
            // Only close if clicked outside of the modal content elem
            var clickedElem = jQuery(e.target);
            if (
                clickedElem.children(".modal__content").length &&
                !clickedElem.closest(".modal__content").length
            ) {
                fn.triggerClose();
            }
        },

        onBackwardTab: function(e) {
            if (document.activeElement === global.firstFocusable[0]) {
                e.preventDefault();
                global.lastFocusable.focus();
            }
        },

        onForwardTab: function(e) {
            if (document.activeElement === global.lastFocusable[0]) {
                e.preventDefault();
                global.firstFocusable.focus();
            }
        },

        onKeyDown: function(e) {
            switch (e.keyCode || e.key) {
                case 9:
                case "Tab":
                    if (global.focusables.length <= 1) {
                        e.preventDefault();
                        break;
                    }

                    if (e.shiftKey) {
                        fn.onBackwardTab(e);
                    }
                    else {
                        fn.onForwardTab(e);
                    }
                    break;
                case 27:
                case "Escape":
                    fn.triggerClose();
                    break;
            }
        },

        onClose: function(e) {
            if (global.activeModal && global.activeModal.has(jQuery(e.target))) {
                fn.close();
            }
        },

        init: function() {
            global.body = jQuery("body");
            global.page = jQuery(".page-container");

            /**
             * Due to the way the modal's are rendered
             * move all modal's after the page element for accessibility
             */
            jQuery(global.selector).insertAfter(global.page);

            global.body.on("click", global.selector, fn.onModalClick);
            global.body.on("click", ".js-modal-close", fn.onClose);
            global.body.on("keydown", global.selector, fn.onKeyDown);
        },

    };

    jQuery(fn.init);

    return {
        open: fn.open,
        close: fn.close,
    };

})();

;/**
 * Holds all functions needed for a project slide show
 */
JPI.SlideShow = (function() {

    "use strict";

    var getXPosition = function(e) {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };

    var removeSelector = function(selector) {
        return selector.substring(1);
    }

    return function(options) {

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

            JPI.getFocusableChildren(currentSlide).attr("tabindex", -1);
            JPI.getFocusableChildren(nextSlide).attr("tabindex", "");
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

            jQuery(window).on("orientationchange resize", JPI.debounce(repositionSlides, 150));

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

            JPI.getFocusableChildren(inactiveSlides).attr("tabindex", -1);

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

})();

;/**
 * Used to expand a projects slide show
 */
(function() {

    "use strict";

    var global = {
        body: null,
        expandedImageDivContainer: null,
        bulletsContainer: null,
        currentElem: null,
        totalElem: null,
        nav: null,
        slides: {},
        currentSlide: 0,
        timeout: null,
    };

    var fn = {

        displaySlide: function(expandedImage) {
            expandedImage.attr("src", global.slides[global.currentSlide].src);

            global.currentElem.text(global.currentSlide + 1);
            var currentBullet = jQuery(".expanded-slide-show__bullet:eq(" + global.currentSlide + ")");
            currentBullet.addClass("expanded-slide-show__bullet--active");
        },

        // Changes the current slide to new slide
        changeSlide: function(newSlideIndex) {
            if (newSlideIndex >= global.slides.length) {
                newSlideIndex = 0;
            }
            else if (newSlideIndex < 0) {
                newSlideIndex = global.slides.length - 1;
            }

            if (newSlideIndex === global.currentSlide) {
                return;
            }

            global.currentSlide = newSlideIndex;

            var expandedImageOld = jQuery(".expanded-slide-show__image--active");
            var expandedImageNew = jQuery(".expanded-slide-show__image").not(expandedImageOld);

            jQuery(".expanded-slide-show__bullet--active").removeClass("expanded-slide-show__bullet--active");
            fn.displaySlide(expandedImageNew);

            expandedImageNew.addClass("expanded-slide-show__image--active");
            expandedImageOld.removeClass("expanded-slide-show__image--active");
        },
        next: function() {
            fn.changeSlide(global.currentSlide + 1);
        },
        previous: function() {
            fn.changeSlide(global.currentSlide - 1);
        },

        close: function(e) {
            e.stopPropagation();
            global.expandedImageDivContainer.removeClass("expanded-slide-show--open")
                .addClass("expanded-slide-show--closing");

            global.timeout = setTimeout(function() {
                global.expandedImageDivContainer.removeClass("expanded-slide-show--closing");
                JPI.modal.close();
                global.timeout = null;
            }, 990);
        },

        // Sets up slide show when image is clicked on
        open: function(e) {
            // Get all slides in group
            var slidesGroup = jQuery(e.target).parents(".js-expandable-image-group");
            global.slides = slidesGroup.find(".js-expandable-image");

            var slidesCount = global.slides.length;
            global.totalElem.text(slidesCount);

            // Only show navigations if there are more than one slide show image to slide through
            if (slidesCount > 1) {
                var bulletsContainer = global.bulletsContainer;
                bulletsContainer.text("");

                // Loops through all slide shows images and set up a bullet navigation for each
                for (var i = 0; i < slidesCount; i++) {
                    // Checks if the current loop is the current image on slideShow
                    if (global.slides[i] === e.target) {
                        global.currentSlide = i;
                    }

                    // Set up bullet navigation for slide
                    JPI.renderNewElement("button", bulletsContainer, {
                        "class": "expanded-slide-show__bullet",
                        "data-slide-id": i,
                    });
                }

                global.nav.show();
            }
            else {
                global.nav.hide();
            }

            clearTimeout(global.timeout);

            fn.displaySlide(jQuery(".expanded-slide-show__image--active"));
            JPI.modal.open(global.expandedImageDivContainer);
            global.expandedImageDivContainer.addClass("expanded-slide-show--open");
        },

        initListeners: function() {
            global.expandedImageDivContainer = jQuery(".expanded-slide-show");

            global.body = jQuery("body");
            global.bulletsContainer = jQuery(".expanded-slide-show__bullets");
            global.currentElem = jQuery(".expanded-slide-show__current-count");
            global.totalElem = jQuery(".expanded-slide-show__total-count");
            global.nav = jQuery(".expanded-slide-show__nav");

            global.body.on("click", ".expanded-slide-show__bullet", function(e) {
                var slideId = jQuery(e.target).attr("data-slide-id");
                slideId = JPI.getInt(slideId);
                fn.changeSlide(slideId);
            });

            global.body.on("click", ".js-expandable-image", fn.open);
            global.nav.on("click", function(e) {
                var direction = jQuery(e.target).attr("data-direction");
                fn[direction]();
            });
            jQuery(".expanded-slide-show__close").on("click", fn.close);
        },
    };

    jQuery(fn.initListeners);

})();

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
    }

})();


;/**
 * Holds all the functions needed for the projects page
 * e.g. display projects
 */
(function() {

    "use strict";

    var Template = JPI.Template;

    var global = {
        url: null,

        htmlElem: null,
        body: null,

        nav: null,

        loading: null,
        errorElem: null,
        projectsElem: null,
        pagination: null,

        modalSelector: ".detailed-project",
        modal: null,
        modalSlidesContainer: null,

        searchInput: null,
        pageNumber: 1,

        slideTemplate: "",
        bulletTemplate: "",

        projects: {},
        slideShows: [],

        modalSlideShow: null,
    };

    var fn = {

        bottomAlignProjectFooters: function() {
            var projects = jQuery(".project");
            var numOfProjects = projects.length;
            if (!numOfProjects) {
                return;
            }

            jQuery(".project .project__description").css("min-height", "");

            if (window.innerWidth < JPI.getInt(JPI.breakpoints.tablet)) {
                return;
            }

            projects.each(function(i, projectElem) {
                var project = jQuery(projectElem);
                var height = project.height();

                var projectDescription = project.children(".project__description");

                var otherElems = project.children().not(projectDescription);
                var totalAllHeight = 0;
                otherElems.each(function(j, elem) {
                    totalAllHeight += jQuery(elem).outerHeight(true);
                });

                // Expand the description element to fit remaining space
                var maxHeight = projectDescription.outerHeight(true);
                var innerHeight = projectDescription.height();
                var padding = maxHeight - innerHeight;

                var newHeight = height - totalAllHeight - padding;
                projectDescription.css("min-height", newHeight);
            });
        },

        renderError: function(error) {
            global.errorElem.text(error).show(600);
            global.pagination.text("").hide(600);
            global.loading.hide(600);
        },

        renderPaginationItem: function(page, containerElem, isCurrent) {
            var url = fn.getNewURL(page);
            url += global.url.search;

            var classes = ["pagination__link"];
            if (isCurrent) {
                classes.push("pagination__link--active");
            }
            var link = JPI.createElement("a", {
                "class": classes.join(" "),
                "text": page,
                "data-page": page,
                "href": url,
            });

            JPI.renderNewElement("li", containerElem, {
                class: "pagination__item",
                html: link,
            });
        },

        // Adds pagination buttons/elements to the page
        renderPagination: function(totalProjects) {
            totalProjects = JPI.getInt(totalProjects);
            if (totalProjects > JPI.projects.perPage) {
                var paginationElem = global.pagination;

                var currentPage = global.pageNumber;

                var totalPages = Math.ceil(totalProjects / JPI.projects.perPage);

                for (var page = 1; page <= totalPages; page++) {
                    var isCurrent = page === currentPage;
                    fn.renderPaginationItem(page, paginationElem, isCurrent);
                }

                paginationElem.css("display", "inline-block");
            }
        },

        renderProjectSkills: function(project, containerSelector) {
            var skills = project.skills;

            var skillsContainer = jQuery(containerSelector).find(".project__skills");
            if (!skillsContainer.length) {
                return;
            }

            var search = global.searchInput.val().trim().toLowerCase();
            var searches = search.split(" ");

            for (var i = 0; i < skills.length; i++) {
                var skill = skills[i].trim();

                if (skill === "") {
                    continue;
                }

                var lowerCasedSkill = skill.toLowerCase();

                var isInSearch = false;
                for (var j = 0; j < searches.length; j++) {
                    if (searches[j].trim() !== "" && lowerCasedSkill.includes(searches[j])) {
                        isInSearch = true;
                        break;
                    }
                }

                var classes = ["project__skill"];
                if (isInSearch) {
                    classes.push("project__skill--searched");
                }

                JPI.renderNewElement("a", skillsContainer, {
                    text: skill,
                    class: classes.join(" "),
                    href: "/projects/" + skill + "/",
                });
            }
        },

        renderProjectLinks: function(project, containerSelector) {
            var linksContainer = jQuery(containerSelector).find(".project__links");

            if (!project.url && !project.download_url && !project.github_url) {
                if (containerSelector !== global.modalSelector) {
                    linksContainer.remove();
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
                JPI.renderNewElement("a", linksContainer, defaultAttributes);
            }

            if (project.download_url) {
                defaultAttributes.href = project.download_url;
                defaultAttributes.title = "Link to download " + project.name;
                defaultAttributes.html = "<i class='fas fa-download fa-2x'></i>";
                JPI.renderNewElement("a", linksContainer, defaultAttributes);
            }

            if (project.github_url) {
                defaultAttributes.href = project.github_url;
                defaultAttributes.title = "Link to " + project.name + " code on GitHub";
                defaultAttributes.html = "<i class='fab fa-github fa-2x'></i>";
                JPI.renderNewElement("a", linksContainer, defaultAttributes);
            }
        },

        renderProjectImages: function(project, containerSelector) {
            var slideShow = jQuery(containerSelector).find(".slide-show");
            var slideShowId = "#" + slideShow.attr("id");

            if (!project.images || !project.images.length) {
                if (containerSelector !== global.modalSelector) {
                    slideShow.remove();
                }
                return;
            }

            var slidesContainer = slideShow.find(".slide-show__slides");
            var slideShowBullets = slideShow.find(".slide-show__bullets");

            // Loop through each image in project
            var images = project.images;
            var numberOfImages = images.length;
            for (var i = 0; i < numberOfImages; i++) {
                if (!{}.hasOwnProperty.call(images, i)) {
                    continue;
                }

                var slideTemplate = new Template(global.slideTemplate);
                var bulletTemplate = new Template(global.bulletTemplate);

                var image = images[i];
                for (var field in image) {
                    if ({}.hasOwnProperty.call(image, field)) {
                        var value = image[field];
                        slideTemplate.replace(field, value);
                        bulletTemplate.replace(field, value);
                    }
                }

                slideTemplate.renderIn(slidesContainer);

                bulletTemplate.replace("slideShowId", slideShowId);
                bulletTemplate.renderIn(slideShowBullets);
            }

            // Realign the project footers when the first (displayed) image is loaded
            slideShow.find("img:first").on("load", function() {
                fn.bottomAlignProjectFooters();
            });

            if (containerSelector !== global.modalSelector) {
                var slidesShow = new JPI.SlideShow({
                    selector: slideShowId,
                });
                global.slideShows.push(slidesShow);
                slidesShow.start();
            }
        },

        renderProject: function(project) {
            var projectSelector = "#project-" + project.id;
            if (jQuery(projectSelector).length) {
                return;
            }

            project = JPI.api.formatProjectData(project);

            global.projects[project.id] = project;

            (new Template(global.projectTemplate, project)).renderIn(global.projectsElem);

            fn.renderProjectImages(project, projectSelector);
            fn.renderProjectLinks(project, projectSelector);
        },

        // Sets up events when projects were received
        gotProjects: function(response) {
            global.slideShows = [];

            global.errorElem.text("").hide(600);
            global.loading.hide(600);
            global.projectsElem.text("");
            global.pagination.text("").hide();

            // Send the data, the function to do if data is valid
            JPI.ajax.renderRowsOrError(
                response,
                fn.renderProject,
                fn.renderError,
                "No Projects Found."
            );

            if (response && response._total_count) {
                fn.renderPagination(response._total_count);
            }

            fn.bottomAlignProjectFooters();
        },

        getProjects: function() {
            var query = {
                page: global.pageNumber,
                search: global.searchInput.val(),
                limit: JPI.projects.perPage,
            };

            JPI.ajax.request({
                method: "GET",
                url: JPI.projects.apiEndpoint + "/projects/",
                data: query,
                onSuccess: fn.gotProjects,
                onError: fn.renderError,
            });
        },

        pauseSlideShows: function() {
            for (var i = 0; i < global.slideShows.length; i++) {
                if ({}.hasOwnProperty.call(global.slideShows, i)) {
                    global.slideShows[i].pause();
                }
            }
        },

        resumeSlideShows: function() {
            for (var i = 0; i < global.slideShows.length; i++) {
                if ({}.hasOwnProperty.call(global.slideShows, i)) {
                    global.slideShows[i].resume();
                }
            }
        },

        openProjectModal: function(e) {
            var projectId = jQuery(e.target).attr("data-project-id");
            var project = global.projects[projectId];
            var modal = global.modal;

            modal.find(".project__links, .project__skills, .slide-show__slides, .slide-show__bullets").text("");

            modal.find(".modal__heading").text(project.name);
            modal.find(".project__date").text(project.date);
            modal.find(".project__description").html(project.long_description);

            var projectTypeElem = modal.find(".project__type");

            projectTypeElem.text(project.type);

            fn.renderProjectSkills(project, global.modalSelector);
            fn.renderProjectLinks(project, global.modalSelector);
            fn.renderProjectImages(project, global.modalSelector);

            fn.pauseSlideShows();

            JPI.modal.open(modal);

            global.modalSlideShow.start();
        },

        onProjectModalClose: function() {
            global.modalSlideShow.stop();
            global.modalSlidesContainer.css({
                width: "",
                left: "",
            });

            fn.resumeSlideShows();
        },

        getNewURL: function(page) {
            var urlParts = ["projects"];

            var search = global.searchInput.val();
            if (search.trim() !== "") {
                urlParts.push(search);
            }

            if (page > 1) {
                urlParts.push(page);
            }

            return  "/" + urlParts.join("/") + "/";
        },

        getNewTitle: function(page) {
            var title = global.titleStart;
            var search = global.searchInput.val();

            if (search.trim() !== "") {
                title += " with " + search;
            }

            if (page > 1) {
                title += " - Page " + page;
            }

            title += global.titleEnd;

            return title;
        },

        storeLatestSearch: function() {
            var search = global.searchInput.val();
            var page = global.pageNumber;
            var title = fn.getNewTitle(page);
            var url = fn.getNewURL(page);
            var state = {
                search: search,
                page: page,
            };

            global.url.pathname = url;
            document.title = title;
            history.pushState(state, title, global.url.toString());

            if (typeof ga !== "undefined") {
                ga("set", "page", url);
                ga("send", "pageview");
            }
        },

        // Sends request when the user has done a search
        doSearch: function() {
            global.pageNumber = 1;
            fn.storeLatestSearch();
            fn.getProjects();
            return false;
        },

        scrollToProjects: function() {
            var projectsPos = global.projectsElem.offset().top;
            var navHeight = global.nav.height();

            global.htmlElem.animate({
                scrollTop: projectsPos - navHeight - 20,
            }, 2000);
        },

        initListeners: function() {
            jQuery(window).on("orientationchange resize", JPI.debounce(fn.bottomAlignProjectFooters, 200));

            jQuery(".search-form").on("submit", fn.doSearch);

            global.projectsElem.on("click", ".project__read-more", fn.openProjectModal);

            global.modal.on("closed", fn.onProjectModalClose);

            var expandedSlideShow = jQuery(".expanded-slide-show");
            expandedSlideShow.on("opened", fn.pauseSlideShows);
            expandedSlideShow.on("closed", fn.resumeSlideShows);

            global.body.on("click", ".project__skill", function(e) {
                JPI.modal.close();
                e.preventDefault();
                fn.scrollToProjects();

                var skill = e.target.innerHTML;

                if (skill === global.searchInput.val() && global.pageNumber === 1) {
                    return;
                }

                global.searchInput.val(skill);
                fn.doSearch();
            });

            global.pagination.on("click", ".pagination__link", function(e) {
                e.preventDefault();
                e.stopPropagation();

                var page = jQuery(e.target).attr("data-page");
                page = JPI.getInt(page, 1);

                if (global.pageNumber === page) {
                    return;
                }

                global.pageNumber = page;
                fn.scrollToProjects();
                fn.storeLatestSearch();
                fn.getProjects();
            });

            window.addEventListener("popstate", function(e) {
                var state = e.state || {};
                var page = state.page || 1;

                document.title = fn.getNewTitle(page);

                global.pageNumber = JPI.getInt(page, 1);
                global.searchInput.val(state.search || "");

                fn.scrollToProjects();
                fn.getProjects();
            });
        },

        init: function() {
            global.projectsElem = jQuery(".projects__items");

            global.url = new URL(window.location);

            global.htmlElem = jQuery("html, body");
            global.body = jQuery("body");

            global.nav = jQuery(".nav");

            global.loading = jQuery(".projects__loading");
            global.errorElem = jQuery(".projects__error");
            global.searchInput = jQuery(".search-form__input");
            global.pagination = jQuery(".pagination");

            global.modal = jQuery(global.modalSelector);
            global.modalSlidesContainer = global.modal.find(".slide-show__slides");
            global.modalSlideShow = new JPI.SlideShow({
                selector: "#detailed-project-slide-show",
            });

            global.pageNumber = JPI.getInt(jQuery(".js-page").val(), 1);

            global.projectTemplate = jQuery("#project-template").text();
            global.slideTemplate = jQuery("#slide-template").text();
            global.bulletTemplate = jQuery("#slide-bullet-template").text();

            var state = {
                search: global.searchInput.val(),
                page: global.pageNumber,
            };

            history.replaceState(state, document.title);

            fn.initListeners();

            fn.gotProjects(JPI.projects.apiResponse);
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

})();

