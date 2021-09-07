var JPI = JPI || {};

//=include ./third-party/waypoint.min.js
//=include ./third-party/jquery.countTo.js
//=include ./jpi/plugins/slide-show.js
//=include ./jpi/plugins/templating.js
//=include ./jpi/plugins/ajax.js
//=include ./jpi/api.js

;/*
 *Holds all functions needed for the homepage
 * eg. to display latest 3 project on the home page
 */
(function() {

    "use strict";

    var Template = JPI.Template;

    var global = {
        slidesContainer: null,
        bulletsElem: null,
        loadingElem: null,
        errorElem: null,
        slideTemplate: "",
        bulletTemplate: "",
    };

    var fn = {

        renderError: function(error) {
            global.errorElem.text(error).show(200);
            global.loadingElem.hide(200);
        },

        renderProject: function(project) {
            project = JPI.api.formatProjectData(project);

            var slideTemplate = new Template(global.slideTemplate);
            var bulletTemplate = new Template(global.bulletTemplate);
            for (var field in project) {
                if ({}.hasOwnProperty.call(project, field)) {
                    var value = project[field];
                    slideTemplate.replace(field, value);
                    bulletTemplate.replace(field, value);
                }
            }

            slideTemplate.renderIn(global.slidesContainer);
            bulletTemplate.renderIn(global.bulletsElem);

            var slideId = "#slide-" + project.id;
            var slideElem = jQuery(slideId);

            if (!project.images || !project.images.length || !project.images[0]) {
                slideElem.find(".slide-show__image").remove();
            }

            var linksContainer = slideElem.find(".latest-project__links");

            if (!project.url && !project.github_url) {
                linksContainer.remove();
                return;
            }

            if (project.url) {
                JPI.renderNewElement("a", linksContainer, {
                    href: project.url,
                    html: "<i class='fas fa-link fa-2x'></i>",
                    class: "button button--clear latest-project__link",
                    target: "_blank",
                    rel: "noopener",
                });
            }

            if (project.github_url) {
                JPI.renderNewElement("a", linksContainer, {
                    href: project.github_url,
                    html: "<i class='fab fa-github fa-2x'></i>",
                    class: "button button--clear latest-project__link",
                    target: "_blank",
                    rel: "noopener noreferrer",
                });
            }
        },

        // Sets up events when projects is received
        gotProjects: function(response) {
            global.errorElem.text("").hide(200);
            global.loadingElem.hide(200);

            global.slideTemplate = jQuery("#slide-template").text();
            global.bulletTemplate = jQuery("#slide-bullet-template").text();

            global.slidesContainer = jQuery(".slide-show__slides");
            global.bulletsElem = jQuery(".slide-show__bullets");

            // Send the data, the function to do if data is valid
            var wasSuccessfullyRendered = JPI.ajax.renderRowsOrError(
                response,
                fn.renderProject,
                fn.renderError,
                "Error Getting the Projects."
            );

            if (wasSuccessfullyRendered) {
                var slideShow = new JPI.SlideShow({
                    selector: "#latest-projects",
                });
                slideShow.start();
            }
        },

        loadProjects: function() {
            JPI.ajax.request({
                method: "GET",
                url: JPI.projects.apiEndpoint + "/projects/",
                data: {limit: 3},
                onSuccess: fn.gotProjects,
                onError: fn.renderError,
            });
        },

        counterFormatter: function(value, options) {
            options = options || {};
            value = value.toFixed(options.decimals || 0);
            value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return value;
        },

        countTo: function(counter, options) {
            options = jQuery.extend(options || {}, counter.data("countToOptions") || {});
            counter.countTo(options);
        },

        initCounters: function() {
            var groups = jQuery(".js-counters");

            if (groups.length) {
                // Make the initial display be the from value
                jQuery(".js-counter").each(function(j, counterElem) {
                    var counter = jQuery(counterElem);
                    var start = counter.attr("data-from");
                    counter.text(start || 0);
                });

                var countToOptions = {
                    formatter: fn.counterFormatter,
                };
                var waypointArgs = {offset: "95%"};
                groups.each(function(i, groupElem) {
                    jQuery(groupElem).waypoint(function() {
                        var group = jQuery(this.element);
                        var counters = group.find(".js-counter");
                        counters.each(function(j, counter) {
                            fn.countTo(jQuery(counter), countToOptions);
                        });
                    }, waypointArgs);
                });
            }
        },

        initSecondsCounter: function() {
            var secsElems = jQuery(".js-seconds-on-site");
            if (secsElems.length) {
                var secsInMilliseconds = 1000;

                secsElems.each(function(i, secsElem) {
                    secsElem = jQuery(secsElem);
                    setTimeout(function() {
                        setInterval(function() {
                            var lastSec = secsElem.attr("data-current-second");
                            lastSec = JPI.getInt(lastSec, 0);
                            var newSec = lastSec + 1;
                            secsElem.attr("data-current-second", newSec);
                            newSec = fn.counterFormatter(newSec);
                            secsElem.text(newSec);
                        }, secsInMilliseconds);
                    }, secsInMilliseconds);
                });
            }
        },

        init: function() {
            global.loadingElem = jQuery(".latest-projects__loading");
            global.errorElem = jQuery(".latest-projects__error");

            global.loadingElem.show(200);

            fn.initSecondsCounter();
            fn.initCounters();

            jQuery(window).on("jpi-css-loaded", fn.loadProjects);
        },
    };

    fn.init();

})();

;(function() {

    "use strict";

    var global = {
        form: null,
        inputs: null,
        emailInput: null,
        messageInput: null,
        subjectInput: null,
        emailFeedback: null,
        messageFeedback: null,
        formFeedback: null,
        submitButton: null,
    };

    var fn = {

        reset: function() {
            global.inputs.attr("disabled", false);
            global.submitButton.prop("disabled", false)
                .html(global.submitButton.attr("data-initial-text"))
            ;
        },

        // Show appropriate & relevant feedback to the user after an attempt of sending a message
        renderResponse: function(response) {
            fn.reset();

            // Check if message was sent
            if (response.ok) {
                if (response.feedback) {
                    global.formFeedback.removeClass("field__error").addClass("field__feedback");
                }

                global.emailInput.val("");
                global.messageInput.val("");
                global.subjectInput.val("");
                global.form.find(".field").hide();
                global.submitButton.hide();
            }
            else {
                if (response.feedback) {
                    global.formFeedback.removeClass("field__feedback").addClass("field__error");
                }
                if (response.messageFeedback) {
                    global.messageFeedback.text(response.messageFeedback).show(200);
                }
                if (response.emailAddressFeedback) {
                    global.emailFeedback.text(response.emailAddressFeedback).show(200);
                }
            }

            if (response.feedback) {
                global.formFeedback.text(response.feedback).show(200);
            }
        },

        // Render an error message when AJAX has errored
        renderErrorMessage: function() {
            global.formFeedback.text("Something went wrong, please try again later.")
                .removeClass("field__feedback")
                .addClass("field__error")
                .show(200);

            fn.reset();
        },

        validateEmail: function(isForm) {
            var emailAddress = global.emailInput.val();

            global.formFeedback.hide(200);
            global.emailInput.removeClass("input--valid");

            if (emailAddress.trim() === "") {
                if (isForm) {
                    global.emailInput.addClass("input--invalid");
                    global.emailFeedback.text("Email address must be provided and valid.").show(200);
                }
                return false;
            }

            var validEmailPattern = /\b[\w._-]+@[\w-]+.[\w]{2,}\b/im;
            var emailValidationTest = validEmailPattern.test(emailAddress);

            if (emailValidationTest) {
                global.emailInput.removeClass("input--invalid").addClass("input--valid");
                global.emailFeedback.hide(200);
                return true;
            }

            if (isForm) {
                global.emailInput.addClass("input--invalid");
                global.emailFeedback.text("Email address must be valid.").show(200);
            }

            return false;
        },

        validateMessage: function(isForm) {
            var message = global.messageInput.val();

            global.formFeedback.hide(200);
            global.messageInput.removeClass("input--valid");

            if (message.trim() !== "") {
                global.messageInput.removeClass("input--invalid").addClass("input--valid");
                global.messageFeedback.hide(200);
                return true;
            }

            if (isForm) {
                global.messageInput.addClass("input--invalid");
                global.messageFeedback.text("Message must be filled out.").show(200);
            }

            return false;
        },

        submit: function() {
            global.inputs.attr("disabled", true);
            global.submitButton.prop("disabled", true)
                .html(global.submitButton.attr("data-loading-text"))
            ;

            var isEmailValid = fn.validateEmail(true);
            var isMessageValid = fn.validateMessage(true);

            if (isEmailValid && isMessageValid) {
                JPI.ajax.request({
                    method: "POST",
                    url: "/contact/",
                    data: {
                        emailAddress: global.emailInput.val(),
                        subject: global.subjectInput.val(),
                        message: global.messageInput.val(),
                    },
                    onSuccess: fn.renderResponse,
                    onError: fn.renderErrorMessage,
                });
            }
            else {
                fn.reset();
            }

            return false;
        },

        initListeners: function() {
            global.subjectInput.on("keyup", function() {
                global.formFeedback.hide(200);
            });
            global.emailInput.on("input", function() {
                fn.validateEmail();
            });
            global.messageInput.on("input", function() {
                fn.validateMessage();
            });

            global.form.on("submit", fn.submit);
        },

        init: function() {
            global.form = jQuery(".contact-form");

            global.inputs = global.form.find(".input");
            global.emailInput = jQuery(".contact-form__email");
            global.messageInput = jQuery(".contact-form__message");
            global.subjectInput = jQuery(".contact-form__subject");
            global.emailFeedback = jQuery(".contact-form__email-feedback");
            global.messageFeedback = jQuery(".contact-form__message-feedback");
            global.formFeedback = jQuery(".contact-form__feedback");
            global.submitButton = jQuery(".contact-form__submit");

            fn.initListeners();
        },
    };

    jQuery(fn.init);

})();


;(function() {

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
                styles: JPI.googleMapStyles || {},
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

                var slideShow = new JPI.SlideShow({
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

})();
