//holds all functions needed to display latest 3 project on the home page
"use strict";

//prints out a error message provided
var renderProjectsPreviewError = function(error) {
        $("#errors").text(error).show("fast");
        $("#projectsLoading").hide("fast");
        delayExpand();
    },

    //renders a project
    renderProjectPreview = function(project) {
        var slidesContainer = document.querySelector(".slidesContainer"),

            slideContainer = createElement(slidesContainer, "div", {
                class: "slideContainer",
                id: "slide"+project.ID,
                "data-slide-colour": project.Colour
            }),

            projectDescriptionContainer = createElement(slideContainer, "div", {class: "projectDescriptionContainer"}),

            projectDescription = createElement(projectDescriptionContainer, "div", {class: "projectDescription projectDescription--"+project.Colour}),

            projectHeader = createElement(projectDescription, "div", {class: "projectHeader"}),

            projectName = createElement(projectHeader, "h3", {innerHTML: project.Name, class: "article__header projectTitle"}),

            projectDate = createElement(projectHeader, "h4", {innerHTML: project.Date, class: "projectDate"}),

            projectDescriptionText = createElement(projectDescription, "div", {innerHTML: project.ShortDescription, class: "projectDescriptionText"}),

            projectLinks = createElement(projectDescription, "div", {class: "projectLinks"});

        createElement(document.querySelector(".slideShowBullets"), "label", {
            class: "bullet js-slide-show-bullet bullet--"+project.Colour,
            "data-slide-show-id": "projectPreview",
            "data-slide-id": "slide" + project.ID
        });

         createElement(slideContainer, "img", {
            class: "slide",
            src: project.pictures[0].File,
            alt: "Screen shot of Project"
        });

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
        $("#errors, #projectsLoading").text("").hide("fast");

        //send the data, the function to do if data is valid
        var dataValid = loopThroughData(result, renderProjectPreview, renderProjectsPreviewError, "Error Getting the Projects.");

        if (dataValid)
            setUpSlideShow("projectPreview");

        delayExpand();
    };

$(document).on("ready", function() {
    if ($("#projectPreview").length > 0) {
        $("#projectsLoading").show("fast");
        sendRequest({
            method: "GET",
            url: "/admin/api/1/projects/",
            query: {limit: 3},
            load: gotProjectsPreview,
            error: renderProjectsPreviewError
        });
    }
});