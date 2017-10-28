//holds all the functions needed to display project in the projects page

"use strict";

//grabs elements for later use
var url = new URL(window.location),

    //prints out a error message provided
    renderError = function(error) {
        $("#errors").text(error).show("fast");
        $("#projectsLoading, #projects, .pagination").text("").hide("fast");
        delayExpand();
    },

    addSkills = function(project, divID) {
        var skills = project.Skills.split(","),
            skillsContainer = $(divID + " .skills")[0];

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
                });
            }
        }
    },

    addLinks = function(project, divID) {
        var linksp = $(divID + " .project__links")[0];

        if (project.Link) {
            createElement(linksp, "a", {
                href: project.Link,
                title: "Link to " + project.Name + " Site",
                target: "_blank",
                innerHTML: "View",
                class: "project__link"
            });
        }

        if (project.Download) {
            createElement(linksp, "a", {
                href: project.Download,
                title: "Link to Download " + project.Name,
                target: "_blank",
                innerHTML: "Download",
                class: "project__link"
            });
        }

        createElement(linksp, "a", {
            href: project.GitHub,
            title: "Link to " + project.Name + "  Code On GitHub",
            target: "_blank",
            innerHTML: "GitHub",
            class: "project__link"
        });
    },

    addProjectPictures = function(project, slideShowId) {
        var slidesContainer = $("#" + slideShowId + " .slidesContainer")[0],
            slideShowBullets = $("#" + slideShowId + " .slideShowBullets")[0];

        //loop through each row of data in rows
        for (var i = 0; i < project.pictures.length; i++) {

            if (project.pictures.hasOwnProperty(i)) {

                var slideContainer = createElement(slidesContainer, "div", {class: "slideContainer", id: "slide" + project.pictures[i].ID});

                createElement(slideContainer, "img", {
                    src: project.pictures[i].File,
                    class: "slide js-expandable-image",
                    alt: "Screen shot of Project",
                    "data-slide-show-id": slideShowId
                });

                createElement(slideShowBullets, "label", {class: "bullet js-slide-show-bullet", "data-slide-show-id": slideShowId, "data-slide-id": "slide"+project.pictures[i].ID});
            }
        }

        if (project.pictures.length > 0) {
            setUpSlideShow(slideShowId);
        }
    },

    //renders a project
    renderProject = function(project) {

        if (!document.getElementById("project" + project.ID)) {

            var template = jQuery('#tmpl-project-template').text();

            for (var data in project) {
                if (typeof data === "string") {
                    var reg = new RegExp("{{" + data + "}}", "g");
                    template = template.replace(reg, project[data]);
                }
            }
            $("#projects").append(template);

            addSkills(project, "#project" + project.ID);
            addLinks(project, "#project" + project.ID);
            addProjectPictures(project, "slideShow" + project.ID);

            var viewMoreButton = $("#project" + project.ID + " .viewMoreButton")[0];

            viewMoreButton.addEventListener("click", function() {

                $("#projectsDetail").addClass("open").show();
                document.body.style.overflow = "hidden";

                //stops all the slide shows
                loopThroughSlideShows(stopSlideShow);

                $("#projectsDetail .project__links, #projectsDetail .skills, #projectsDetail .slidesContainer, #projectsDetail .slideShowBullets").text("");

                $("#projectsDetail .projectTitle").text(project.Name);
                $("#projectsDetail .projectDate").text(project.Date);

                addSkills(project, "#projectsDetail");

                $("#projectsDetail .description")[0].innerHTML = project.LongDescription;

                addLinks(project, "#projectsDetail");

                addProjectPictures(project, "projectsDetailSlideShow");
            });
        }

        delayExpand();
    },

    scrollToProjects = function() {
        $('html, body').animate({
            scrollTop: jQuery("#projects").offset().top - jQuery(".nav").height()
        }, 2000);
    },

    //adds pagination to the page
    addPagination = function(count) {
        if ((parseInt(count)) > 10) {

            var page = 1,
                ul = $(".pagination")[0],
                path = url.pathname.substring(1).split('/'),
                i,
                attributes = {};

            if (Number.isInteger(parseInt(path[1]))) {
                var currentPage = parseInt(path[1]);
            }

            if (!currentPage) currentPage = 1;

            for (i = 0; i < count; i += 10, page++) {
                if (page === currentPage) {
                    attributes = {class: "active"};
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

            $(".pagination").show();
        } else {
            $(".pagination").hide();
        }
    },

    //set up events when projects were received
    gotProjects = function(result) {
        $("#errors, #projectsLoading").text("").hide("fast");
        $("#projects, .pagination").text("");

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

        $("#errors").text("").hide("fast");
        $("#projectsLoading").show("fast");

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
        if ($("#projects").length > 0)
        {
            $(".search").submit(doSearch);
            load();
        }
    };

window.addEventListener("load", setUp);

window.addEventListener('popstate', function() {
    url = new URL(window.location);
    scrollToProjects();
    load();
});

//Close the modal
$("#projectsDetail").click(function(event) {
     if(!$(event.target).closest('.modal__content').length && $("#projectsDetail").hasClass("open")) {
        $("#projectsDetail").removeClass("open").hide();
        document.body.style.overflow = "auto";
         $("#projectsDetailSlideShow .slideShowViewpoint")[0].removeEventListener("mousedown", dragStart);
         $("#projectsDetailSlideShow .slideShowViewpoint")[0].removeEventListener("touchstart", dragStart);
         $("#projectsDetailSlideShow .slidesContainer").css("left", "0px");
         clearInterval(autoSlide["projectsDetailSlideShow"]);
         $("#projectsDetailSlideShow").removeClass("hasSlideShow");
         loopThroughSlideShows(startSlideShow);
    }
});