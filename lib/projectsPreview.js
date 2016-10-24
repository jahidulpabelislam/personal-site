window.portfolio = window.portfolio || {};
window.portfolio.projectsPreview = (function () {

    "use strict";

    //set up username variable for later use
    var errors = document.getElementById("errors"),

        //prints out a error message provided
        renderError = function (error) {
            //create the error message
            window.portfolio.helperFunctions.createElement(errors, "p", {className: "formFeedback error", innerHTML: error});
        },

        renderProjectImage = function (projectImage) {

            var slideContainer = document.querySelector("#slide" + projectImage.ProjectID),

            img = window.portfolio.helperFunctions.createElement(slideContainer, "img", {className: "slide", src: projectImage.File, alt: "Screenshot of Project"});

            img.ondragstart = function() { return false; };

            window.portfolio.height.delayExpand();
        },

        gotProjectImages = function (result) {
            //send the data, the function to do if data is valid
            window.portfolio.xhr.loopThroughData(result, renderProjectImage, renderError);

            window.portfolio.height.delayExpand();
        },

        getProjectImages = function (id) {
            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/pictures/" + id, load: gotProjectImages, query: {limit: 1}});
        },

        renderProject = function (project) {
            var classlist = "",

                slidesContainer = document.querySelector(".slidesContainer"),

                slideContainer = window.portfolio.helperFunctions.createElement(slidesContainer, "div", {className: "slideContainer", id: "slide" + project.ID});

            if (project.Link) {
                window.portfolio.helperFunctions.createElement(slideContainer, "a", {href: project.Link, innerHTML: "View", className: "btn btn-danger projectPreLink"});
                classlist = "projectPreGitHub";
            }

            window.portfolio.helperFunctions.createElement(slideContainer, "a", {href: project.GitHub, innerHTML: "GitHub", className: "btn btn-warning " + classlist});

            getProjectImages(project.ID);
        },

        gotProjects = function (result) {
            //send the data, the function to do if data is valid
            var dataValid = window.portfolio.xhr.loopThroughData(result, renderProject, renderError, "Error Getting the Projects."),

                slideShowViewpointContainer = document.querySelector(".slideShowViewpointContainer");

            if (dataValid) {
                window.portfolio.slideshow.setUpSlideShow(slideShowViewpointContainer);
            }

            window.portfolio.height.delayExpand();
        },

        //set up site
        load = function () {
            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/projects/", query: {limit: 3}, load: gotProjects});
        };

    return {"load": load};
}());

window.addEventListener("load", window.portfolio.projectsPreview.load);