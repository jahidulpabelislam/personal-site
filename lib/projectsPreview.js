window.portfolio = window.portfolio || {};
window.portfolio.projectsPreview = (function () {

    "use strict";

    var errors = document.getElementById("errors"),

        //prints out a error message provided
        renderError = function (error) {
            //create the error message
            window.portfolio.helperFunctions.createElement(errors, "p", {className: "formFeedback error", innerHTML: error});
            window.portfolio.height.delayExpand();
        },

        renderProjectImage = function (projectImage) {

            var slideContainer = document.querySelector(".slide" + projectImage.ProjectID),

            slideImg = window.portfolio.helperFunctions.createElement(slideContainer, "img", {className: "slide", src: projectImage.File, alt: "Screen shot of Project"});

            slideImg.ondragstart = function() {return false;};
        },

        gotProjectImages = function (result) {
            //send the data, the function to do if data is valid
            window.portfolio.xhr.loopThroughData(result, renderProjectImage, renderError);

            window.portfolio.height.delayExpand();
        },

        getProjectImages = function (id) {
            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/pictures/" + id, load: gotProjectImages, error: renderError, query: {limit: 1}});
        },

        renderProject = function (project) {
            var slidesContainer = document.querySelector(".slidesContainer"),

                slideContainer = window.portfolio.helperFunctions.createElement(slidesContainer, "div", {className: "slideContainer", id: "slide" + project.ID}),

                slide = window.portfolio.helperFunctions.createElement(slideContainer, "div", {className: "slide" + project.ID});

            if (project.Link) {
                window.portfolio.helperFunctions.createElement(slide, "a", {href: project.Link, innerHTML: "View", className: "btn btn-danger projectPreLink"});
            }

            window.portfolio.helperFunctions.createElement(slide, "a", {href: project.GitHub, innerHTML: "GitHub", className: "btn btn-warning projectPreGitHub"});

            var slideShowBullets = document.querySelector(".slideShowBullets"),

                bulletContainer = window.portfolio.helperFunctions.createElement(slideShowBullets, "div", {className: "bullet"}),

                bullet = window.portfolio.helperFunctions.createElement(bulletContainer, "label", {className: "slide" + project.ID});

            bullet.addEventListener("click", window.portfolio.slideShow.changeToSlide);

            getProjectImages(project.ID);
        },

        gotProjects = function (result) {
            //send the data, the function to do if data is valid
            var dataValid = window.portfolio.xhr.loopThroughData(result, renderProject, renderError, "Error Getting the Projects."),

                slidesContainer = document.querySelector(".slidesContainer");

            if (dataValid) {
                window.portfolio.slideShow.setUpSlideShow(slidesContainer);
            }

            window.portfolio.height.delayExpand();
        },

        //set up site
        load = function () {
            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/projects/", query: {limit: 3}, load: gotProjects, error: renderError});
        };

    return {"load": load};
}());

window.addEventListener("load", window.portfolio.projectsPreview.load);