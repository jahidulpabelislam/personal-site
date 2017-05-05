//holds all the functions needed to display project in the projects page

"use strict";

//grabs elements for later use
var url = new URL(window.location),

    //prints out a error message provided
    renderError = function(error) {

        $("#errors").text("");

        //create the error message
        createElement($("#errors")[0], "p", {
            innerHTML: error,
            className: "formFeedback error"
        });

        delayExpand();
    },

    //renders a project image
    renderProjectImage = function(projectImage) {
        var slidesContainer = document.getElementById("project" + projectImage.ProjectID).querySelector(".slidesContainer"),

            slideContainer = createElement(slidesContainer, "div", {className: "slideContainer"}),

            slide = createElement(slideContainer, "div", {className: "slide" + projectImage.ID}),

            img = createElement(slide, "img", {
                src: projectImage.File,
                className: "slide",
                alt: "Screen shot of Project"
            }),

            slideShowBullets = document.getElementById("project" + projectImage.ProjectID).querySelector(".slideShowBullets"),

            bulletContainer = createElement(slideShowBullets, "div", {className: "bullet"}),

            bullet = createElement(bulletContainer, "label", {className: "slide" + projectImage.ID});

        bullet.addEventListener("click", changeToSlide);

        img.ondragstart = function() {
            return false;
        };

        img.addEventListener("click", expandImageSetUp);
    },

    //sets up events when projects images have been received
    gotProjectImages = function(result) {

        var dataExists = loopThroughData(result, renderProjectImage, renderError);

        if (dataExists) {
            var slidesContainer = document.getElementById("project" + result.rows[0].ProjectID).querySelector(".slidesContainer");
            setUpSlideShow(slidesContainer);
        }

        delayExpand();
    },

    //sends request to get projects images
    getProjectImages = function(id) {
        sendRequest({
            method: "GET",
            url: "/admin/api/1/pictures/" + id,
            load: gotProjectImages,
            error: renderError
        });
    },

    //renders a project
    renderProject = function(project) {

        if (!document.getElementById("project" + project.ProjectID)) {

            var article = createElement($("#projects")[0], "div", {
                    id: "project" + project.ID,
                    className: "project"
                }),

                projectHeader = createElement(article, "div", {className: "projectHeader"}),

                title = createElement(projectHeader, "h3", {
                    innerHTML: project.Name,
                    className: "projectTitle"
                }),

                date = createElement(projectHeader, "h4", {
                    innerHTML: project.Date,
                    className: "projectDate"
                }),

                skillsContainer = createElement(article, "div", {className: "skills"}),

                description = createElement(article, "div", {
                    innerHTML: project.Description,
                    className: "description"
                }),

                linksp = createElement(article, "p", {}),

                slideShowContainer = createElement(article, "div", {className: "slideShowContainer"}),

                slideShow = createElement(slideShowContainer, "div", {
                    className: "slideShow",
                    id: "slideShow" + project.ID
                }),

                slideShowViewpointContainer = createElement(slideShow, "div", {className: "slideShowViewpointContainer"}),

                slideShowViewpoint = createElement(slideShowViewpointContainer, "div", {className: "slideShowViewpoint"}),

                slidesContainer = createElement(slideShowViewpoint, "div", {className: "slidesContainer"}),

                previous = createElement(slideShow, "img", {
                    className: "slideShowNav previous",
                    src: "/images/previous.svg",
                    alt: "Click to View Previous Image"
                }),

                next = createElement(slideShow, "img", {
                    className: "slideShowNav next",
                    src: "/images/next.svg",
                    alt: "Click to View Next Image"
                }),

                slideShowBullets = createElement(slideShowContainer, "div", {className: "slideShowBullets"}),

                i, i2, searches,

                skills = project.Skills.split(",");

            for (i = 0; i < skills.length; i++) {
                if (skills[i].trim() !== "") {

                    var skill = createElement(skillsContainer, "p", {innerHTML: skills[i]});
                    searches = $("#searchInput")[0].value.split(" ");

                    for (i2 = 0; i2 < searches.length; i2++) {
                        if (searches[i2].trim() !== "" && skills[i].toLowerCase().includes(searches[i2].toLowerCase())) skill.className = "searched";
                    }

                    skill.addEventListener("click", function(e) {
                        $("#searchInput")[0].value = e.target.innerHTML;
                        doSearch();
                    });
                }
            }

            if (project.Link) {

                createElement(linksp, "a", {
                    href: project.Link,
                    title: "Link to " + project.Name + " Site",
                    target: "_blank",
                    innerHTML: "View"
                });

                linksp.innerHTML += " | ";
            }

            if (project.Download) {

                createElement(linksp, "a", {
                    href: project.Download,
                    title: "Link to Download " + project.Name,
                    target: "_blank",
                    innerHTML: "Download"
                });

                linksp.innerHTML += " | ";
            }

            createElement(linksp, "a", {
                href: project.GitHub,
                title: "Link to " + project.Name + "  Code On GitHub",
                target: "_blank",
                innerHTML: "GitHub"
            });

            getProjectImages(project.ID);
        }

        delayExpand();
    },

    clickedPagination = function(page) {
        url.pathname = "/projects/" + page + "/";
        history.pushState(null, null, url.toString());
        load();
    },

    //adds pagination to the page
    addPagination = function(count) {
        if ((parseInt(count)) > 10) {
            $("#pagination").text("");

            var page = 1,
                ul = createElement($("#pagination")[0], "ul", {className: "pagination"}),
                path = url.pathname.substring(1).split('/'),
                i,
                attributes = {};

            if (Number.isInteger(parseInt(path[1]))) {
                var currentPage = parseInt(path[1]);
            }

            if (!currentPage) currentPage = 1;

            if (currentPage !== 1) {
                var previousLi = createElement(ul, "li"),
                    previousA = createElement(previousLi, "a", {innerHTML: "Previous"});

                previousA.addEventListener("click", function() {
                    clickedPagination(currentPage - 1);
                });
            }

            for (i = 0; i < count; i += 10, page++) {
                if (page === currentPage) {
                    attributes = {className: "active"};
                } else {
                    attributes = {};
                }

                var li = createElement(ul, "li", attributes),

                    a = createElement(li, "a", {innerHTML: page});

                a.addEventListener("click", function(e) {
                    clickedPagination(e.target.innerHTML);
                });
            }

            if (currentPage < (page - 1)) {
                var nextLi = createElement(ul, "li"),

                    nextA = createElement(nextLi, "a", {innerHTML: "Next"});

                nextA.addEventListener("click", function() {
                    clickedPagination(currentPage + 1);
                });
            }

            $("#pagination")[0].style.display = "block";
        }
        else {
            $("#pagination")[0].style.display = "none";
        }
    },

    //set up events when projects were received
    gotProjects = function(result) {

        $("#pagination, #projects, #errors").text("");

        //send the data, the function to do if data is valid
        var dataExists = loopThroughData(result, renderProject, renderError, "No Projects Found.");

        if (dataExists && result.count) {
            addPagination(result.count);
        }

        delayExpand();
    },

    //send request when the user has done a search
    doSearch = function() {
        var query;

        url.pathname = "/projects/";
        if ($("#searchInput")[0].value.trim() !== "") {
            url.search = "?search=" + $("#searchInput")[0].value;
            query = {search: $("#searchInput")[0].value}
        } else {
            $("#searchInput")[0].value = url.search = "";
            query = {};
        }

        history.pushState(null, null, url.toString());

        sendRequest({
            method: "GET",
            url: "/admin/api/1/projects/",
            query: query,
            load: gotProjects,
            error: renderError
        });

        return false;
    },

    //get the search query from url if any
    getSearch = function() {
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

    //set up page
    load = function() {

        var query = {},
            path = url.pathname.substring(1).split('/');

        //check if pagination is involved
        if (path[1] && Number.isInteger(parseInt(path[1]))) {
            query.page = parseInt(path[1]);
        }

        //check if search in involved
        var search = getSearch();
        if (search) {
            query.search = $("#searchInput")[0].value = search;
        }

        $("#search").submit(doSearch);

        //send request to get projects
        sendRequest({
            method: "GET",
            url: "/admin/api/1/projects/",
            query: query,
            load: gotProjects,
            error: renderError
        });
    };

window.addEventListener("load", load);

window.addEventListener('popstate', function() {
    history.back();
    load();
});