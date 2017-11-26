//holds all functions needed to display latest 3 project on the home page
"use strict";

//prints out a error message provided
var renderProjectsPreviewError = function(error) {
        $(".error").text(error).show("fast");
        $(".projects-loading-img").hide("fast");
        delayExpand();
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
        $(".slideShowBullets").append(bullet_template);

        var projectLinks = $("#slide" + project.ID + " .project-description__links")[0];

        if (project.Link) {
            createElement(projectLinks, "a", {
                href: project.Link,
                innerHTML: "View",
                class: "btn btn--clear projectPreLink",
                target: "_blank"
            });
        }

        createElement(projectLinks, "a", {
            href: project.GitHub,
            innerHTML: "GitHub",
            class: "btn btn--clear projectPreGitHub",
            target: "_blank"
        });
    },

    //sets up events when projects is received
    gotProjectsPreview = function(result) {
        $(".error, .projects-loading-img").text("").hide("fast");

        //send the data, the function to do if data is valid
        var dataValid = loopThroughData(result, renderProjectPreview, renderProjectsPreviewError, "Error Getting the Projects.");

        if (dataValid)
            setUpSlideShow("#slide-show--projects-preview");

        delayExpand();
    };

$(document).on("ready", function() {
    if ($("#slide-show--projects-preview").length > 0) {
        $(".projects-loading-img").show("fast");
        sendRequest({
            method: "GET",
            url: "/admin/api/1/projects/",
            query: {limit: 3},
            load: gotProjectsPreview,
            error: renderProjectsPreviewError
        });
    }
});