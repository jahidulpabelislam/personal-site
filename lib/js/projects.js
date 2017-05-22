//holds all the functions needed to display project in the projects page

"use strict";

//grabs elements for later use
var url = new URL(window.location),

    //prints out a error message provided
    renderError = function(error) {
        $("#errors").text(error).show("fast");
        delayExpand();
    },

    addSkills = function(skills, skillsContainer) {
        for (var i = 0; i < skills.length; i++) {
            if (skills[i].trim() !== "") {

                var skill = createElement(skillsContainer, "p", {innerHTML: skills[i]}),
                    searches = $("#searchInput")[0].value.split(" ");

                for (var j = 0; j < searches.length; j++) {
                    if (searches[j].trim() !== "" && skills[i].toLowerCase().includes(searches[j].toLowerCase())) skill.className = "searched";
                }

                skill.addEventListener("click", function(e) {
                    $("#searchInput")[0].value = e.target.innerHTML;
                    doSearch();
                    $("#projectsDetail").modal("hide");
                });
            }
        }
    },

    addLinks = function(project, linksp) {
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
    },

    addProjectPictures = function(project, slidesContainer, slideShowBullets, projectsElementName) {
        //loop through each row of data in rows
        for (var i = 0; i < project.pictures.length; i++) {

            if (project.pictures.hasOwnProperty(i)) {

                var slideContainer = createElement(slidesContainer, "div", {className: "slideContainer"}),

                    slide = createElement(slideContainer, "div", {className: "slide" + project.pictures[i].ID}),

                    img = createElement(slide, "img", {
                        src: project.pictures[i].File,
                        className: "slide",
                        alt: "Screen shot of Project"
                    }),

                    bulletContainer = createElement(slideShowBullets, "div", {className: "bullet"}),

                    bullet = createElement(bulletContainer, "label", {className: "slide" + project.pictures[i].ID});

                bullet.addEventListener("click", function() {
                    changeToSlide(projectsElementName, this.className);
                });

                img.ondragstart = function() {
                    return false;
                };

                img.addEventListener("click", expandImageSetUp);
            }
        }
    },

    //renders a project
    renderProject = function(project) {

        if (!document.getElementById("project" + project.ProjectID)) {

            var article = createElement($("#projects")[0], "div", {
                    id: "project" + project.ID,
                    className: "project hasSlideShow"
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
                    innerHTML: project.ShortDescription,
                    className: "description"
                }),

                viewMoreButton = createElement(article, "button", {
                    innerHTML: "View More",
                    className: "btn btn-primary viewMoreButton"
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

                i, i2, searches;

            addSkills(project.Skills.split(","), skillsContainer);

            addLinks(project, linksp);

            addProjectPictures(project, slidesContainer, slideShowBullets, "project" + project.ID);

            viewMoreButton.addEventListener("click", function() {

                $("#projectsDetail").modal("show");

                //stops all the slide shows
                loopThroughSlideShows(stopSlideShow);

                $("#projectsDetail .links, #projectsDetail .skills, #projectsDetail .slidesContainer, #projectsDetail .slideShowBullets").text("");

                $("#projectsDetail .projectTitle").text(project.Name);
                $("#projectsDetail .projectDate").text(project.Date);

                addSkills(project.Skills.split(","), $("#projectsDetail .skills")[0]);

                $("#projectsDetail .description")[0].innerHTML = project.LongDescription;

                addLinks(project, $("#projectsDetail .links")[0]);

                addProjectPictures(project, $("#projectsDetail .slidesContainer")[0], $("#projectsDetail .slideShowBullets")[0], "projectsDetail");

                setUpSlideShow("projectsDetail");
            });

            $('#modalClose').click(function() {
                loopThroughSlideShows(startSlideShow);
            });

            setUpSlideShow("project" + project.ID);
        }

        delayExpand();
    },

    scrollToProjects = function() {
        $('html, body').animate({
            scrollTop: $(".article").first().offset().top
        }, 2000);
    },

    //adds pagination to the page
    addPagination = function(count) {
        if ((parseInt(count)) > 10) {

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
                    scrollToProjects();

                    url.pathname = "/projects/" + (currentPage - 1) + "/";
                    history.pushState(null, null, url.toString());
                    load();
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
                    scrollToProjects();

                    url.pathname = "/projects/" + e.target.innerHTML + "/";
                    history.pushState(null, null, url.toString());
                    load();
                });
            }

            if (currentPage < (page - 1)) {
                var nextLi = createElement(ul, "li"),

                    nextA = createElement(nextLi, "a", {innerHTML: "Next"});

                nextA.addEventListener("click", function() {
                    scrollToProjects();

                    url.pathname = "/projects/" + (currentPage + 1) + "/";
                    history.pushState(null, null, url.toString());
                    load();
                });
            }

            $("#pagination").show();
        } else {
            $("#pagination").hide();
        }
    },

    //set up events when projects were received
    gotProjects = function(result) {

        $("#errors").text("").hide("fast");
        $("#projects, #pagination").text("");

        //send the data, the function to do if data is valid
        loopThroughData(result, renderProject, renderError, "No Projects Found.");

        if (result.count) {
            addPagination(result.count);
        }

        delayExpand();
    },

    getProjects = function(query) {
        //stops all the slide shows
        loopThroughSlideShows(stopSlideShow);

        //send request to get projects
        sendRequest({
            method: "GET",
            url: "/admin/api/1/projects/",
            query: query,
            load: gotProjects,
            error: renderError
        });
    },

    //send request when the user has done a search
    doSearch = function() {
        var query = {};

        url.pathname = "/projects/";
        if ($("#searchInput")[0].value.trim() !== "") {
            url.search = "?search=" + $("#searchInput")[0].value;
            query.search = $("#searchInput")[0].value;
        } else {
            $("#searchInput")[0].value = url.search = "";
        }

        history.pushState(null, null, url.toString());

        getProjects(query);
        return false;
    },

    //get the search query from URL if any
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

    //load projects
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
        } else {
            $("#searchInput").val("");
        }

        getProjects(query);
    },

    //set up page
    setUp = function() {
        $("#search").submit(doSearch);
        load();
    };

window.addEventListener("load", setUp);

window.addEventListener('popstate', function() {
    url = new URL(window.location);
    scrollToProjects();
    load();
});