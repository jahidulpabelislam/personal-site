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
                new JPI.SlideShow({
                    selector: "#latest-projects",
                });
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

