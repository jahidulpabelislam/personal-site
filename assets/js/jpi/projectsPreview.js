//holds all functions needed to display latest 3 project on the home page
window.jpi = window.jpi || {};
window.jpi.projectsPreview = (function () {

    "use strict";

    //prints out a error message provided
    var renderProjectsPreviewError = function(error) {
            $(".feedback--error").text(error).show("fast");
            $(".projects-loading-img").hide("fast");
            jpi.footer.delayExpand();
        },

        //renders a project
        renderProjectPreview = function(project) {
            var slide_template = jQuery('#tmpl-slide-template').text();
            var bullet_template = jQuery('#tmpl-slide-bullet-template').text();

            for (var data in project) {
                if (project.hasOwnProperty(data)) {
                    if (typeof data === "string") {
                        var reg = new RegExp("{{" + data + "}}", "g");
                        slide_template = slide_template.replace(reg, project[data]);
                        bullet_template = bullet_template.replace(reg, project[data]);
                    }
                }
            }
            var image_reg = new RegExp("{{File}}", "g");
            slide_template = slide_template.replace(image_reg, project.pictures[0].File);

            $(".slide-show__slides-container").append(slide_template);
            $(".js-slide-show-bullets").append(bullet_template);

            var projectLinks = $("#slide--" + project.ID + " .project-description__links")[0];

            if (project.Link) {
                jpi.helpers.createElement(projectLinks, "a", {
                    href: project.Link,
                    innerHTML: "<i class='fa fa-external-link fa-2x'></i>",
                    class: "btn btn--clear",
                    target: "_blank"
                });
            }

            jpi.helpers.createElement(projectLinks, "a", {
                href: project.GitHub,
                innerHTML: "<i class='fa fa-github fa-2x'></i>",
                class: "btn btn--clear",
                target: "_blank"
            });
        },

        //sets up events when projects is received
        gotProjectsPreview = function(result) {
            $(".feedback--error, .projects-loading-img").text("").hide("fast");

            //send the data, the function to do if data is valid
            var dataValid = jpi.xhr.loopThroughData(result, renderProjectPreview, renderProjectsPreviewError, "Error Getting the Projects.");

            if (dataValid)
                jpi.slideShow.setUp("#slide-show--projects-preview");

            jpi.footer.delayExpand();
        },

        init = function () {
            if ($("#slide-show--projects-preview").length > 0) {
                $(".projects-loading-img").show("fast");
                jpi.xhr.sendRequest({
                    method: "GET",
                    url: "/admin/api/1/projects/",
                    query: {limit: 3},
                    load: gotProjectsPreview,
                    error: renderProjectsPreviewError
                });
            }
        };

    $(document).on("ready", init);
}());