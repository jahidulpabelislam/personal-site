;/*
 *Holds all functions needed for the homepage
 * eg. to display latest 3 project on the home page
 */
window.jpi = window.jpi || {};
(function(jQuery, jpi) {

    "use strict";

    var Template = jpi.Template;

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
            project = jpi.projects.formatProjectData(project);

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
                jpi.helpers.renderNewElement("a", linksContainer, {
                    href: project.url,
                    html: "<i class='fas fa-link fa-2x'></i>",
                    class: "button button--clear latest-project__link",
                    target: "_blank",
                    rel: "noopener",
                });
            }

            if (project.github_url) {
                jpi.helpers.renderNewElement("a", linksContainer, {
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
            var wasSuccessfullyRendered = jpi.ajax.renderRowsOrError(
                response,
                fn.renderProject,
                fn.renderError,
                "Error Getting the Projects."
            );

            if (wasSuccessfullyRendered) {
                new jpi.SlideShow({
                    selector: "#latest-projects",
                });
            }
        },

        loadProjects: function() {
            jpi.ajax.request({
                method: "GET",
                url: jpi.config.jpiAPIEndpoint + "/projects/",
                data: {limit: 3},
                onSuccess: fn.gotProjects,
                onError: fn.renderError,
            });
        },

        init: function() {
            if (!jQuery(".latest-projects").length) {
                return;
            }

            global.loadingElem = jQuery(".latest-projects__loading");
            global.errorElem = jQuery(".latest-projects__error");

            global.loadingElem.show(200);

            jQuery(window).on("jpi-css-loaded", fn.loadProjects);
        },
    };

    fn.init();

})(jQuery, jpi);
