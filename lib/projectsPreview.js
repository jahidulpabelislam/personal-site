//holds all functions needed to display latest 3 project on the home page

"use strict";

//grabs element for later use
var errors = document.getElementById("errors"),

    //prints out a error message provided
    renderError = function(error) {
        //create the error message
        createElement(errors, "p", {className: "formFeedback error", innerHTML: error});

        delayExpand();
    },

    //renders a project image
    renderProjectImage = function(projectImage) {

        var slideContainer = document.querySelector(".slide" + projectImage.ProjectID),

            slideImg = createElement(slideContainer, "img", {
                className: "slide",
                src: projectImage.File,
                alt: "Screen shot of Project"
            });

        slideImg.ondragstart = function() {
            return false;
        };
        delayExpand();
    },

    //sets up event to render project image when projects image was received
    gotProjectImages = function(result) {
        //send the data, the function to do if data is valid
        loopThroughData(result, renderProjectImage, renderError);

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

            projectLinks = createElement(projectDescription, "div", {className: "projectLinks"});

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

        var slideShowBullets = document.querySelector(".slideShowBullets"),

            bulletContainer = createElement(slideShowBullets, "div", {className: "bullet"}),

            bullet = createElement(bulletContainer, "label", {className: "slide" + project.ID});

        bullet.addEventListener("click", changeToSlide);

        sendRequest({
            method: "GET",
            url: "pictures/" + project.ID,
            load: gotProjectImages,
            error: renderError,
            query: {limit: 1}
        });
    },

    //sets up events when projects is received
    gotProjects = function(result) {
        //send the data, the function to do if data is valid
        var dataValid = loopThroughData(result, renderProject, renderError, "Error Getting the Projects."),

            slidesContainer = document.querySelector(".slidesContainer");

        if (dataValid) {
            setUpSlideShow(slidesContainer);
        }

        delayExpand();
    },

    //set up page
    projectsPreviewLoad = function() {
        sendRequest({
            method: "GET",
            url: "projects/",
            query: {limit: 3},
            load: gotProjects,
            error: renderError
        });
    };

window.addEventListener("load", projectsPreviewLoad);