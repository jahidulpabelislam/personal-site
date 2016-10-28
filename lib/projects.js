window.portfolio = window.portfolio || {};
window.portfolio.projects = (function () {

    "use strict";

    var errors = document.getElementById("errors"),
        projects = document.getElementById("projects"),

        //prints out a error message provided
        renderError = function (error) {
            errors.innerHTML = "";
            //create the error message
            window.portfolio.helperFunctions.createElement(errors, "p", {innerHTML: error, className: "formFeedback error"});
            window.portfolio.height.delayExpand();
        },

        renderProjectImage = function (projectImage) {

            var slidesContainer = document.getElementById("project" + projectImage.ProjectID).querySelector(".slidesContainer"),

                slideContainer = window.portfolio.helperFunctions.createElement(slidesContainer, "div", {className: "slideContainer"}),

                slide = window.portfolio.helperFunctions.createElement(slideContainer, "img", {src: projectImage.File, className: "slide", alt: "Screenshot of Project"});

            slide.ondragstart = function() { return false; };

            window.portfolio.expandImage.setUp(slide);
        },

        gotProjectImages = function (result) {
            //send the data, the function to do if data is valid
            var dataValid = window.portfolio.xhr.loopThroughData(result, renderProjectImage, renderError);

            if (dataValid && result.rows[0].ProjectID) {
                var slidesContainer = document.getElementById("project" + result.rows[0].ProjectID).querySelector(".slidesContainer");
                window.portfolio.slideShow.setUpSlideShow(slidesContainer);
            }

            window.portfolio.height.delayExpand();
        },

        getProjectImages = function (id) {
            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/pictures/" + id, load: gotProjectImages, error: renderError});
        },

        renderProject = function (project) {

            var article = window.portfolio.helperFunctions.createElement(projects, "div", {id: "project" + project.ID, className: "article project"}),

                projectHeader = window.portfolio.helperFunctions.createElement(article, "div", {className: "projectHeader"}),

                title = window.portfolio.helperFunctions.createElement(projectHeader, "h3", {innerHTML: project.Name, className: "projectTitle"}),

                date = window.portfolio.helperFunctions.createElement(projectHeader, "h4", {innerHTML: project.Date, className: "projectDate"}),

                skills = window.portfolio.helperFunctions.createElement(article, "div", {className: "skills"}),

                description = window.portfolio.helperFunctions.createElement(article, "div", {innerHTML: project.Description}),

                linksp = window.portfolio.helperFunctions.createElement(article, "p", {}),

                slideShow = window.portfolio.helperFunctions.createElement(article, "div", {className: "slideShow", id: "slideShow" + project.ID}),

                slideShowViewpointContainer = window.portfolio.helperFunctions.createElement(slideShow, "div", {className: "slideShowViewpointContainer"}),

                slideShowViewpoint = window.portfolio.helperFunctions.createElement(slideShowViewpointContainer, "div", {className: "slideShowViewpoint"}),

                slidesContainer = window.portfolio.helperFunctions.createElement(slideShowViewpoint, "div", {className: "slidesContainer"}),

                previous = window.portfolio.helperFunctions.createElement(slideShow, "img", {className: "slideShowNav previous", src: "/images/previous.svg", alt: "Click to View Previous Image"}),

                next = window.portfolio.helperFunctions.createElement(slideShow, "img", {className: "slideShowNav next", src: "/images/next.svg", alt: "Click to View Next Image"}),

            i, parts = project.Skills.split(",");
            for (i = 0; i < parts.length; i++) {
                if (parts[i].trim() !== "") {
                    window.portfolio.helperFunctions.createElement(skills, "p", {innerHTML: parts[i]});
                }
            }

            if (project.Link) {

                window.portfolio.helperFunctions.createElement(linksp, "a", {href: project.Link, title: "Link to " + project.Name + " Site",target: "_blank", innerHTML: "View"});

                linksp.innerHTML += " | ";
            }

            if (project.Download) {

                window.portfolio.helperFunctions.createElement(linksp, "a", {href: project.Download, title: "Link to Download " + project.Name,target: "_blank", innerHTML: "Download"});

                linksp.innerHTML += " | ";
            }

            window.portfolio.helperFunctions.createElement(linksp, "a", {href: project.GitHub, title: "Link to " + project.Name + "  Code On GitHub",target: "_blank", innerHTML: "GitHub"});

            getProjectImages(project.ID);

            window.portfolio.height.delayExpand();
        },

        gotProjects = function (result) {
            //send the data, the function to do if data is valid
            window.portfolio.xhr.loopThroughData(result, renderProject, renderError, "No Projects Found.");

            window.portfolio.height.delayExpand();
        },

        //set up site
        load = function () {
            window.portfolio.xhr.sendRequests({method: "GET",url: "/admin/api/1/projects/", load: gotProjects, error: renderError});
        };

    return {
        "load": load
    };

}());

window.addEventListener("load", window.portfolio.projects.load);