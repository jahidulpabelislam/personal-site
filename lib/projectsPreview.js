//holds all functions needed to display latest 3 project on the home page
window.portfolio = window.portfolio || {};
window.portfolio.projectsPreview = (function () {

    "use strict";

    //grabs element for later use
    var errors = document.getElementById("errors"),

        //prints out a error message provided
        renderError = function (error) {
            //create the error message
            window.portfolio.helperFunctions.createElement(errors, "p", {className: "formFeedback error", innerHTML: error});

            window.portfolio.stickyFooter.delayExpand();
        },

        //renders a project image
        renderProjectImage = function (projectImage) {

            var slideContainer = document.querySelector(".slide" + projectImage.ProjectID),

            slideImg = window.portfolio.helperFunctions.createElement(slideContainer, "img", {className: "slide", src: projectImage.File, alt: "Screen shot of Project"});

            slideImg.ondragstart = function() {return false;};
            window.portfolio.stickyFooter.delayExpand();
        },

        //sets up event to render project image when projects image was received
        gotProjectImages = function (result) {
            //send the data, the function to do if data is valid
            window.portfolio.xhr.loopThroughData(result, renderProjectImage, renderError);

            window.portfolio.stickyFooter.delayExpand();
        },

        //renders a project
        renderProject = function (project) {
            var slidesContainer = document.querySelector(".slidesContainer"),

                slideContainer = window.portfolio.helperFunctions.createElement(slidesContainer, "div", {className: "slideContainer", id: "slide" + project.ID}),

                slide = window.portfolio.helperFunctions.createElement(slideContainer, "div", {className: "slide" + project.ID}),

                projectDescriptionContainer = window.portfolio.helperFunctions.createElement(slide, "div", {className: "projectDescriptionContainer"}),

                projectDescription = window.portfolio.helperFunctions.createElement(projectDescriptionContainer, "div", {className: "projectDescription"}),

                projectHeader = window.portfolio.helperFunctions.createElement(projectDescription, "div", {className: "projectHeader"}),

                projectName = window.portfolio.helperFunctions.createElement(projectHeader, "h3", {innerHTML: project.Name, className: "projectTitle"}),

                projectDate = window.portfolio.helperFunctions.createElement(projectHeader, "h4", {innerHTML: project.Date, className: "projectDate"}),

                projectLinks = window.portfolio.helperFunctions.createElement(projectDescription, "div", {className: "projectLinks"});

            if (project.Link) {
                window.portfolio.helperFunctions.createElement(projectLinks, "a", {href: project.Link, innerHTML: "View", className: "btn btn-default projectPreLink", target: "_blank"});
            }

            window.portfolio.helperFunctions.createElement(projectLinks, "a", {href: project.GitHub, innerHTML: "GitHub", className: "btn btn-default projectPreGitHub", target: "_blank"});

            var slideShowBullets = document.querySelector(".slideShowBullets"),

                bulletContainer = window.portfolio.helperFunctions.createElement(slideShowBullets, "div", {className: "bullet"}),

                bullet = window.portfolio.helperFunctions.createElement(bulletContainer, "label", {className: "slide" + project.ID});

            bullet.addEventListener("click", window.portfolio.slideShow.changeToSlide);

            window.portfolio.xhr.sendRequest({method: "GET", url: "/admin/api/1/pictures/" + project.ID, load: gotProjectImages, error: renderError, query: {limit: 1}});
        },

        //sets up events when projects is received
        gotProjects = function (result) {
            //send the data, the function to do if data is valid
            var dataValid = window.portfolio.xhr.loopThroughData(result, renderProject, renderError, "Error Getting the Projects."),

                slidesContainer = document.querySelector(".slidesContainer");

            if (dataValid) {
                window.portfolio.slideShow.setUpSlideShow(slidesContainer);
            }

            window.portfolio.stickyFooter.delayExpand();
        },

        //set up page
        load = function () {
            window.portfolio.xhr.sendRequest({method: "GET", url: "/admin/api/1/projects/", query: {limit: 3}, load: gotProjects, error: renderError});
        };

    return {load: load};

}());

window.addEventListener("load", window.portfolio.projectsPreview.load);