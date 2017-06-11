//holds all functions needed to display latest 3 project on the home page
"use strict";

//prints out a error message provided
var renderError = function(error) {
        $("#errors").text(error).show("fast");
        delayExpand();
    },

    //renders a project
    renderProject = function(project) {
        var slidesContainer = document.querySelector(".slidesContainer"),

            slideContainer = createElement(slidesContainer, "div", {
                className: "slideContainer",
                id: "slide" + project.ID
            }),

            slide = createElement(slideContainer, "div", {className: "slide" + project.ID}),

            projectDescriptionContainer = createElement(slide, "div", {className: "projectDescriptionContainer"}),

            projectDescription = createElement(projectDescriptionContainer, "div", {className: "projectDescription"}),

            projectHeader = createElement(projectDescription, "div", {className: "projectHeader"}),

            projectName = createElement(projectHeader, "h3", {innerHTML: project.Name, className: "projectTitle"}),

            projectDate = createElement(projectHeader, "h4", {innerHTML: project.Date, className: "projectDate"}),

            projectLinks = createElement(projectDescription, "div", {className: "projectLinks"}),

            slideShowBullets = document.querySelector(".slideShowBullets"),

            bulletContainer = createElement(slideShowBullets, "div", {className: "bullet"}),

            bullet = createElement(bulletContainer, "label", {className: "slide" + project.ID}),

            slideImg = createElement(slideContainer, "img", {
                className: "slide",
                src: project.pictures[0].File,
                alt: "Screen shot of Project"
            });

        if (project.Link) {
            createElement(projectLinks, "a", {
                href: project.Link,
                innerHTML: "View",
                className: "btn btn-default projectPreLink",
                target: "_blank"
            });
        }

        createElement(projectLinks, "a", {
            href: project.GitHub,
            innerHTML: "GitHub",
            className: "btn btn-default projectPreGitHub",
            target: "_blank"
        });

        bullet.addEventListener("click", function() {
            changeToSlide("projectPreview", this.className);
        });

        slideImg.ondragstart = function() {
            return false;
        };
    },

    //sets up events when projects is received
    gotProjects = function(result) {
        $("#errors, #projectsLoading").text("").hide("fast");

        //send the data, the function to do if data is valid
        var dataValid = loopThroughData(result, renderProject, renderError, "Error Getting the Projects.");

        if (dataValid) {
            setUpSlideShow("projectPreview");
        }

        delayExpand();
    };

$(window).load(function() {
    $("#projectsLoading").show("fast");
    sendRequest({
        method: "GET",
        url: "/admin/api/1/projects/",
        query: {limit: 3},
        load: gotProjects,
        error: renderError
    })
});