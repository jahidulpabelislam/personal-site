//holds all the functions needed to display project in the projects page

"use strict";

//grabs elements for later use
var url = new URL(window.location),

    //prints out a error message provided
    renderError = function(error) {
        $(".error").text(error).show("fast");
        $(".projects-loading-img, .pagination").text("").hide("fast");
        delayExpand();
    },

    addSkills = function(project, divID) {
        var skills = project.Skills.split(","),
            skillsContainer = $(divID + " .project__skills")[0];

        for (var i = 0; i < skills.length; i++) {
            if (skills[i].trim() !== "") {

                var skill = createElement(skillsContainer, "p", {innerHTML: skills[i], class: "js-searchable-skill skill skill--"+project.Colour}),
                    searches = $(".search-input")[0].value.split(" ");

                for (var j = 0; j < searches.length; j++) {
                    if (searches[j].trim() !== "" && skills[i].toLowerCase().includes(searches[j].toLowerCase())) skill.className += " searched";
                }
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
                class: "project__link project__link--" + project.Colour
            });
        }

        if (project.Download) {
            createElement(linksp, "a", {
                href: project.Download,
                title: "Link to Download " + project.Name,
                target: "_blank",
                innerHTML: "Download",
                class: "project__link project__link--" + project.Colour
            });
        }

        createElement(linksp, "a", {
            href: project.GitHub,
            title: "Link to " + project.Name + "  Code On GitHub",
            target: "_blank",
            innerHTML: "GitHub",
            class: "project__link project__link--" + project.Colour
        });
    },

    addProjectPictures = function(project, slideShowId) {
        var slidesContainer = $(slideShowId + " .slide-show__slides-container"),
            slideShowBullets = $(slideShowId + " .slideShowBullets");

        //loop through each row of data in rows
        for (var i = 0; i < project.pictures.length; i++) {

            if (project.pictures.hasOwnProperty(i)) {

                var slide_template = jQuery('#tmpl-slide-template').text();
                var bullet_template = jQuery('#tmpl-slide-bullet-template').text();

                for (var data in project.pictures[i]) {
                    if (project.pictures[i].hasOwnProperty(data)) {
                        if (typeof data === "string") {
                            var reg = new RegExp("{{" + data + "}}", "g");
                            slide_template = slide_template.replace(reg, project.pictures[i][data]);
                            bullet_template = bullet_template.replace(reg, project.pictures[i][data]);
                        }
                    }
                }
                var colour_reg = new RegExp("{{Colour}}", "g");
                slide_template = slide_template.replace(colour_reg, project.Colour);
                bullet_template = bullet_template.replace(colour_reg, project.Colour);

                var id_reg = new RegExp("{{Slide-Show-ID}}", "g");
                bullet_template = bullet_template.replace(id_reg, slideShowId);

                slidesContainer.append(slide_template);
                slideShowBullets.append(bullet_template);
            }
        }

        if (project.pictures.length > 0) {
            setUpSlideShow(slideShowId);
        }
    },

    //renders a project
    renderProject = function(project) {

        if (!document.getElementById("project--" + project.ID)) {

            var template = jQuery('#tmpl-project-template').text();

            for (var data in project) {
                if (project.hasOwnProperty(data)) {
                    if (typeof data === "string") {
                        var reg = new RegExp("{{" + data + "}}", "g");
                        template = template.replace(reg, project[data]);
                    }
                }
            }
            $(".projects").append(template);

            addSkills(project, "#project--" + project.ID);
            addLinks(project, "#project--" + project.ID);
            addProjectPictures(project, "#slide-show--" + project.ID);

            $("#project--" + project.ID + " .viewMoreButton").data("projectData", project);
        }

        delayExpand();
    },

    scrollToProjects = function() {
        $('html, body').animate({
            scrollTop: jQuery(".projects").offset().top - jQuery(".nav").height()
        }, 2000);
    },

    //adds pagination to the page
    addPagination = function(count) {
        if ((parseInt(count)) > 10) {

            var page = 1,
                ul = $(".pagination")[0],
                path = url.pathname.substring(1).split('/');

            if (Number.isInteger(parseInt(path[1]))) {
                var currentPage = parseInt(path[1]);
            }

            if (!currentPage) currentPage = 1;

            for (var i = 0; i < count; i += 10, page++) {
                var attributes = {innerHTML: page, "class" : "pagination__item"};
                if (page === currentPage) {
                    attributes.class += " active";
                }
                createElement(ul, "li", attributes);
            }

            $(".pagination").show();
        } else {
            $(".pagination").hide();
        }
    },

    //set up events when projects were received
    gotProjects = function(result) {
        $(".error, .projects-loading-img").text("").hide("fast");
        $(".projects, .pagination").text("");

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

        $(".projects-loading-img").show("fast");

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
        if ($(".search-input")[0].value.trim() !== "") {
            url.search = "?search=" + $(".search-input")[0].value;
            query.search = $(".search-input")[0].value;
        } else {
            $(".search-input")[0].value = url.search = "";
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
            query.search = $(".search-input")[0].value = search;
        } else {
            $(".search-input").val("");
        }

        getProjects(query);
    },

    //set up page
    setUp = function() {
        if ($(".projects").length > 0)
        {
            $(".search-form").submit(doSearch);
            load();

            $("body").on("click", ".js-searchable-skill", function(e) {
                $(".search-input")[0].value = e.target.innerHTML;
                doSearch();
            });

            $(".pagination--projects").on("click", ".pagination__item", function(e) {
                scrollToProjects();

                url.pathname = "/projects/" + e.target.innerHTML + "/";
                history.pushState(null, null, url.toString());
                load();
            });

            $(".projects").on("click", ".viewMoreButton", function() {
                var project = $(this).data("projectData");

                $(".modal--detailed-project").addClass("open").show();
                document.body.style.overflow = "hidden";

                //stops all the slide shows
                loopThroughSlideShows(stopSlideShow);

                $(".modal--detailed-project .project__links, .modal--detailed-project .project__skills, .modal--detailed-project .slide-show__slides-container, .modal--detailed-project .slideShowBullets").text("");

                $(".modal--detailed-project .project-title").text(project.Name);
                $(".modal--detailed-project .project-date").text(project.Date);

                addSkills(project, ".modal--detailed-project");

                $(".modal--detailed-project .description").html(project.LongDescription);

                addLinks(project, ".modal--detailed-project");

                addProjectPictures(project, "#detailed-project__slide-show");

                var regx = new RegExp("slide-show__nav--\\w*", 'g');

                $(".modal--detailed-project .slide-show__nav").each(function() {
                    var classList = $(this).attr("class");
                    classList =  classList.replace(regx, 'slide-show__nav--'+project.Colour);
                    $(this).attr("class", classList);
                });
            });
        }
    };

window.addEventListener("load", setUp);

window.addEventListener('popstate', function() {
    url = new URL(window.location);
    scrollToProjects();
    load();
});

//Close the modal
$(".modal--detailed-project").click(function(event) {
     if(!$(event.target).closest('.modal__content').length && $(".modal--detailed-project").hasClass("open")) {
        $(".modal--detailed-project").removeClass("open").hide();
        document.body.style.overflow = "auto";
         $("#detailed-project__slide-show .slide-show__viewpoint")[0].removeEventListener("mousedown", dragStart);
         $("#detailed-project__slide-show .slide-show__viewpoint")[0].removeEventListener("touchstart", dragStart);
         $("#detailed-project__slide-show .slide-show__slides-container").css("left", "0px");
         clearInterval(autoSlide["#detailed-project__slide-show"]);
         $("#detailed-project__slide-show").removeClass("hasSlideShow");
         loopThroughSlideShows(startSlideShow);
    }
});