;/*
 *Holds all functions needed for the homepage
 * eg. to display latest 3 project on the home page
 */
window.jpi = window.jpi || {};
window.jpi.home = (function(jQuery, jpi) {

    "use strict";

    var global = {
        templateRegexes: {},
        dateFormat: false,
    };

    var fn = {

        initSecondsCounter: function() {
            var secsElem = jQuery(".js-seconds-on-site");
            if (secsElem.length) {
                var secsInMilliseconds = 1000;

                setTimeout(function() {
                    setInterval(function() {
                        var lastSec = secsElem.text();
                        lastSec = jpi.helpers.getInt(lastSec, 1);
                        secsElem.text(lastSec + 1);
                    }, secsInMilliseconds);
                }, secsInMilliseconds);
            }
        },

        renderError: function(error) {
            jQuery(".feedback--error").text(error).show("fast");
            jQuery(".projects__loading-img").hide("fast");
        },

        getTemplateRegex: function(regex) {
            if (!global.templateRegexes[regex]) {
                global.templateRegexes[regex] = new RegExp("\{{2} {0,1}" + regex + " {0,1}\\}{2}", "g");
            }

            return global.templateRegexes[regex];
        },

        renderProject: function(project) {
            var slideTemplate = jQuery("#tmpl-slide-template").text();
            var bulletTemplate = jQuery("#tmpl-slide-bullet-template").text();

            // Make sure colour placeholders are replaced in content
            var colourRegex = fn.getTemplateRegex("colour");
            var fields = ["short_description"];
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                project[field] = project[field].replace(colourRegex, project.colour);
            }

            for (var field in project) {
                if (typeof field === "string" && project.hasOwnProperty(field)) {
                    var regex = fn.getTemplateRegex(field);

                    var value = project[field];
                    if (field === "date") {
                        var date = new Date(value);
                        value = global.dateFormat.format(date);
                    }

                    slideTemplate = slideTemplate.replace(regex, value);
                    bulletTemplate = bulletTemplate.replace(regex, value);
                }
            }

            if (project.images && project.images.length && project.images[0]) {
                var imageRegex = fn.getTemplateRegex("file");
                slideTemplate = slideTemplate.replace(imageRegex, project.images[0].file);
            }

            jQuery(".slide-show__slides-container").append(slideTemplate);
            jQuery(".js-slide-show-bullets").append(bulletTemplate);

            if (!project.images || !project.images.length || !project.images[0]) {
                jQuery("#slide-" + project.id + " .slide-show__img").remove();
            }

            var linksContainer = jQuery("#slide-" + project.id + " .project-info__links");

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
            jQuery(".feedback--error, .projects__loading-img").text("").hide("fast");

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

            if (jQuery("#slide-show--home").length) {
                jQuery(".projects__loading-img").show("fast");

                jpi.ajax.sendRequest({
                    method: "GET",
                    url: jpi.config.jpiAPIEndpoint + "projects/",
                    params: {limit: 3},
                    onSuccess: fn.gotProjects,
                    onError: fn.renderError,
                });
            }
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

    return {};

})(jQuery, jpi);
