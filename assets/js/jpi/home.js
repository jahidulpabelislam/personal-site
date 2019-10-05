;/*
 *Holds all functions needed for the homepage
 * eg. to display latest 3 project on the home page
 */
window.jpi = window.jpi || {};
window.jpi.home = (function(jQuery, jpi) {

    "use strict";

    var global = {
        slidesElem: null,
        bulletsElem: null,
        loadingElem: null,
        errorElem: null,
        slideTemplate: "",
        bulletTemplate: "",
        templateRegexes: {},
        dateFormat: false,
    };

    var fn = {

        initSecondsCounter: function() {
            var secsElems = jQuery(".js-seconds-on-site");
            if (secsElems.length) {
                var secsInMilliseconds = 1000;

                secsElems.each(function(i, secsElem) {
                    secsElem = jQuery(secsElem);
                    setTimeout(function() {
                        setInterval(function() {
                            var lastSec = secsElem.text();
                            lastSec = jpi.helpers.getInt(lastSec, 1);
                            secsElem.text(lastSec + 1);
                        }, secsInMilliseconds);
                    }, secsInMilliseconds);
                });
            }
        },

        renderError: function(error) {
            global.errorElem.text(error).show(200);
            global.loadingElem.hide(200);
        },

        getTemplateRegex: function(regex) {
            if (!global.templateRegexes[regex]) {
                global.templateRegexes[regex] = new RegExp("\{{2} {0,1}" + regex + " {0,1}\\}{2}", "g");
            }

            return global.templateRegexes[regex];
        },

        renderProject: function(project) {
            var slide = global.slideTemplate;
            var bullet = global.bulletTemplate;

            for (var field in project) {
                if (typeof field === "string" && project.hasOwnProperty(field)) {
                    var regex = fn.getTemplateRegex(field);

                    var value = project[field];
                    if (field === "date") {
                        var date = new Date(value);
                        value = global.dateFormat.format(date);
                    }

                    slide = slide.replace(regex, value);
                    bullet = bullet.replace(regex, value);
                }
            }

            if (project.images && project.images.length && project.images[0]) {
                var imageRegex = fn.getTemplateRegex("file");
                slide = slide.replace(imageRegex, project.images[0].file);
            }

            global.slidesElem.append(slide);
            global.bulletsElem.append(bullet);

            var slideId = "#slide-" + project.id;

            if (!project.images || !project.images.length || !project.images[0]) {
                jQuery(slideId + " .slide-show__img").remove();
            }

            var linksContainer = jQuery(slideId + " .slide-info__links");

            if (!project.link && !project.github) {
                linksContainer.remove();
                return;
            }

            linksContainer = linksContainer[0];

            if (project.link) {
                jpi.helpers.createElement(linksContainer, "a", {
                    href: project.link,
                    innerHTML: "<i class='fas fa-link fa-2x'></i>",
                    class: "btn btn--clear",
                    target: "_blank",
                    rel: "noopener",
                });
            }

            if (project.github) {
                jpi.helpers.createElement(linksContainer, "a", {
                    href: project.github,
                    innerHTML: "<i class='fab fa-github fa-2x'></i>",
                    class: "btn btn--clear",
                    target: "_blank",
                    rel: "noopener noreferrer",
                });
            }
        },

        // Sets up events when projects is received
        gotProjects: function(response) {
            global.errorElem.text("").hide(200);
            global.loadingElem.hide(200);

            global.slideTemplate = jQuery("#tmpl-slide-template").text();
            global.bulletTemplate = jQuery("#tmpl-slide-bullet-template").text();

            global.slidesElem = jQuery(".slide-show__slides-container");
            global.bulletsElem = jQuery(".slide-show__bullets");

            global.dateFormat = new Intl.DateTimeFormat(undefined, {month: "long", year: "numeric"});

            // Send the data, the function to do if data is valid
            var dataValid = jpi.ajax.renderRowsOrFeedback(
                response,
                fn.renderProject,
                fn.renderError,
                "Error Getting the Projects."
            );

            if (dataValid) {
                jpi.slideShow.setUp("#slide-show--home");
            }

            jpi.main.resetFooter();
        },

        init: function() {
            fn.initSecondsCounter();

            if (!jQuery("#slide-show--home").length) {
                return;
            }

            global.loadingElem = jQuery(".projects__loading-img");
            global.errorElem = jQuery(".feedback--error");

            global.loadingElem.show(200);

            jpi.ajax.sendRequest({
                method: "GET",
                url: jpi.config.jpiAPIEndpoint + "/projects/",
                params: {limit: 3},
                onSuccess: fn.gotProjects,
                onError: fn.renderError,
            });
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

    return {};

})(jQuery, jpi);
