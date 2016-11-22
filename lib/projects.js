window.portfolio = window.portfolio || {};
window.portfolio.projects = (function () {

    "use strict";

    var url = new URL(window.location),
        errors = document.getElementById("errors"),
        projects = document.getElementById("projects"),
        searchInput = document.getElementById("search"),
        pagination = document.getElementById("pagination"),

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

                slide = window.portfolio.helperFunctions.createElement(slideContainer, "div", {className: "slide" + projectImage.ID}),

                img = window.portfolio.helperFunctions.createElement(slide, "img", {src: projectImage.File, className: "slide", alt: "Screen shot of Project"}),

                slideShowBullets = document.getElementById("project" + projectImage.ProjectID).querySelector(".slideShowBullets"),

                bulletContainer = window.portfolio.helperFunctions.createElement(slideShowBullets, "div", {className: "bullet"}),

                bullet = window.portfolio.helperFunctions.createElement(bulletContainer, "label", {className: "slide" + projectImage.ID});

            bullet.addEventListener("click", window.portfolio.slideShow.changeToSlide);

            img.ondragstart = function() { return false; };

            img.addEventListener("click", window.portfolio.expandImage.expand);
        },

        gotProjectImages = function (result) {

            var dataExists = window.portfolio.xhr.loopThroughData(result, renderProjectImage, renderError);
            if (dataExists) {
               var slidesContainer = document.getElementById("project" + result.rows[0].ProjectID).querySelector(".slidesContainer");
                window.portfolio.slideShow.setUpSlideShow(slidesContainer);
            }

            window.portfolio.height.delayExpand();
        },

        getProjectImages = function (id) {
            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/pictures/" + id, load: gotProjectImages, error: renderError});
        },

        renderProject = function (project) {

            if (!document.getElementById("project" + project.ProjectID)) {

                var article = window.portfolio.helperFunctions.createElement(projects, "div", {id: "project" + project.ID, className: "article project"}),

                    projectHeader = window.portfolio.helperFunctions.createElement(article, "div", {className: "projectHeader"}),

                    title = window.portfolio.helperFunctions.createElement(projectHeader, "h3", {innerHTML: project.Name, className: "projectTitle"}),

                    date = window.portfolio.helperFunctions.createElement(projectHeader, "h4", {innerHTML: project.Date, className: "projectDate"}),

                    skills = window.portfolio.helperFunctions.createElement(article, "div", {className: "skills"}),

                    description = window.portfolio.helperFunctions.createElement(article, "div", {innerHTML: project.Description, className: "description"}),

                    linksp = window.portfolio.helperFunctions.createElement(article, "p", {}),

                    slideShowContainer = window.portfolio.helperFunctions.createElement(article, "div", {className: "slideShowContainer"}),

                    slideShow = window.portfolio.helperFunctions.createElement(slideShowContainer, "div", {className: "slideShow", id: "slideShow" + project.ID}),

                    slideShowViewpointContainer = window.portfolio.helperFunctions.createElement(slideShow, "div", {className: "slideShowViewpointContainer"}),

                    slideShowViewpoint = window.portfolio.helperFunctions.createElement(slideShowViewpointContainer, "div", {className: "slideShowViewpoint"}),

                    slidesContainer = window.portfolio.helperFunctions.createElement(slideShowViewpoint, "div", {className: "slidesContainer"}),

                    previous = window.portfolio.helperFunctions.createElement(slideShow, "img", {className: "slideShowNav previous", src: "/images/previous.svg", alt: "Click to View Previous Image"}),

                    next = window.portfolio.helperFunctions.createElement(slideShow, "img", {className: "slideShowNav next", src: "/images/next.svg", alt: "Click to View Next Image"}),

                    slideShowBullets = window.portfolio.helperFunctions.createElement(slideShowContainer, "div", {className: "slideShowBullets"}),

                    i, parts = project.Skills.split(",");
                for (i = 0; i < parts.length; i++) {
                    if (parts[i].trim() !== "") {
                        var skill = window.portfolio.helperFunctions.createElement(skills, "p", {innerHTML: parts[i]});
                        if (searchInput.value == parts[i]) skill.className = "searched";
                        skill.addEventListener("click", function (e) {
                            searchInput.value = e.target.innerHTML;
                            doSearch();
                        });
                    }
                }

                if (project.Link) {

                    window.portfolio.helperFunctions.createElement(linksp, "a", {
                        href: project.Link,
                        title: "Link to " + project.Name + " Site",
                        target: "_blank",
                        innerHTML: "View"
                    });

                    linksp.innerHTML += " | ";
                }

                if (project.Download) {

                    window.portfolio.helperFunctions.createElement(linksp, "a", {
                        href: project.Download,
                        title: "Link to Download " + project.Name,
                        target: "_blank",
                        innerHTML: "Download"
                    });

                    linksp.innerHTML += " | ";
                }

                window.portfolio.helperFunctions.createElement(linksp, "a", {
                    href: project.GitHub,
                    title: "Link to " + project.Name + "  Code On GitHub",
                    target: "_blank",
                    innerHTML: "GitHub"
                });

                getProjectImages(project.ID);
            }

            window.portfolio.height.delayExpand();
        },

        addPagination = function (result) {
            if ((parseInt(result.Count)) > 10) {

                var page = 1,
                    ul = window.portfolio.helperFunctions.createElement(pagination, "ul", {className: "pagination"}),
                    path = url.pathname.substring(1).split('/'),
                    i,
                    attributes = {};

                if (Number.isInteger(parseInt(path[1]))) {
                    var currentPage = parseInt(path[1]);
                }

                if (!currentPage) {
                    currentPage = 1;
                }

               var search =  getSearch();

                if (currentPage != 1) {
                    var previousLi = window.portfolio.helperFunctions.createElement(ul, "li"),
                        previousA = window.portfolio.helperFunctions.createElement(previousLi, "a", {innerHTML: "Previous"});

                    if (search) {
                        previousA.addEventListener("click", function () {
                            //url.search = "?search=" + search;
                            url.pathname = "/projects/" + (currentPage - 1) + "/";
                            history.pushState(null, null, url.toString());
                            load();
                        });
                    }
                    else {
                        previousA.addEventListener("click", function () {
                            //url.search = "";
                            url.pathname = "/projects/" + (currentPage - 1) + "/";
                            history.pushState(null, null, url.toString());
                            load();
                        });
                    }
                }

                for (i = 0; i < result.Count; i+= 10, page++) {
                    if (page == currentPage) {
                        attributes = {className: "active"};
                    }
                    else {
                        attributes = {};
                    }
                    var li = window.portfolio.helperFunctions.createElement(ul, "li", attributes),

                        a = window.portfolio.helperFunctions.createElement(li, "a", {innerHTML: page});

                    if (search) {
                        a.addEventListener("click", function (e) {
                            //url.search = "?search=" + search;
                            url.pathname = "/projects/" + e.target.innerHTML + "/";
                            history.pushState(null, null, url.toString());
                            load();
                        });
                    }
                    else {
                        a.addEventListener("click", function (e) {
                            //url.search = "";
                            url.pathname = "/projects/" + e.target.innerHTML + "/";
                            history.pushState(null, null, url.toString());
                            load();
                        });
                    }
                }

                if (currentPage < (page - 1)) {
                    var nextLi = window.portfolio.helperFunctions.createElement(ul, "li"),
                        nextA = window.portfolio.helperFunctions.createElement(nextLi, "a", {innerHTML: "Next"});
                    if (search) {
                        nextA.addEventListener("click", function () {
                            //url.search = "?search=" + search;
                            url.pathname = "/projects/" + (currentPage + 1) + "/";
                            history.pushState(null, null, url.toString());
                            load();
                        });
                    }
                    else {
                        attributes = {href: "/projects/" + (currentPage + 1) + "/"};
                        nextA.addEventListener("click", function () {
                            //url.search = "";
                            url.pathname = "/projects/" + (currentPage + 1) + "/";
                            history.pushState(null, null, url.toString());
                            load();
                        });
                    }
                }

                pagination.style.display = "block";
            }
            else {
                pagination.style.display = "none";
            }
        },

        getPagination = function (result) {
            window.portfolio.xhr.loopThroughData(result, addPagination, renderError);
        },

        gotProjects = function (result) {
            pagination.innerHTML = "";
            projects.innerHTML = "";
            errors.innerHTML = "";
            //send the data, the function to do if data is valid
            var dataExists = window.portfolio.xhr.loopThroughData(result, renderProject, renderError, "No Projects Found.");

            if (dataExists) {
                var query = (searchInput.value.trim() !== "") ? {search: searchInput.value} : {};
                window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/countProjects/", query: query, load: getPagination, error: renderError});
            }
            window.portfolio.height.delayExpand();
        },

        doSearch = function () {
            var query;

            url.pathname = "/projects/";
            if (searchInput.value.trim() !== "") {
                url.search = "?search="+searchInput.value;
                query = {search: searchInput.value}
            } else {
                url.search = "";
                query = {};
            }

            history.pushState(null, null, url.toString());

            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/projects/", query: query, load: gotProjects, error: renderError});
        },

        //get the search query from url if any
        getSearch = function () {
            var searches = url.search.substring(1).split('&'),

                lookForSearch = /\bsearch=/im;

            //loop through each search query of data in rows
            for (var i = 0; i < searches.length; i++) {
                var regExResult = lookForSearch.test(searches[i]);
                if (regExResult) {
                    var searchSplit = searches[i].split('=');
                    return decodeURIComponent(searchSplit[1]);
                }
            }
        },

        //set up site
        load = function () {

            var query = {},
                path = url.pathname.substring(1).split('/');

            errors.innerHTML = "";
            projects.innerHTML = "";

            if (Number.isInteger(parseInt(path[1]))) {
                query.page = parseInt(path[1]);
            }

            var search = getSearch();
            if (search) {
                query.search = searchInput.value = search;
            }

            searchInput.addEventListener("input", doSearch);

            window.portfolio.xhr.sendRequests({method: "GET",url: "/admin/api/1/projects/", query: query, load: gotProjects, error: renderError});

        };

    return {
        "load": load
    };

}());

window.addEventListener("load", window.portfolio.projects.load);