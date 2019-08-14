;/**
 * Holds all the functions needed for the projects page
 * e.g. display projects
 */
window.jpi = window.jpi || {};
window.jpi.projects = (function(jQuery, jpi) {

    "use strict";

    var global = {
        url: new URL(window.location),
        titleStart: "Projects",
        titleEnd: " | Jahidul Pabel Islam - Full Stack Developer",

        modalSelector: ".detailed-project",

        templateRegexes: {},
        navColourRegex: null,

        projects: {},
    };

    var fn = {

        getCurrentPageNum: function() {
            var currentPageNum = jQuery(".js-projects-page").val();
            currentPageNum = jpi.helpers.getInt(currentPageNum, 1);

            return currentPageNum;
        },

        // Prints out a error message provided
        renderError: function(error) {
            jQuery(".feedback--error").text(error).show("fast");
            jQuery(".projects__loading-img, .pagination").text("").hide("fast");
            jpi.main.resetFooter();
        },

        getTemplateRegex: function(regex) {
            if (!global.templateRegexes[regex]) {
                global.templateRegexes[regex] = new RegExp("\{{2} {0,1}" + regex + " {0,1}\\}{2}", "g");
            }

            return global.templateRegexes[regex];
        },

        addSkills: function(project, divID) {
            var skills = project.skills,
                skillsContainer = jQuery(divID + " .project__skills")[0],
                search = jQuery(".search-form__input").val().trim(),
                lowerCasedSearch = search.toLowerCase(),
                searches = lowerCasedSearch.split(" ");

            for (var i = 0; i < skills.length; i++) {
                var skill = skills[i].trim();

                if (skill === "") {
                    continue;
                }

                var lowerCasedSkill = skill.toLowerCase();

                var isInSearch = false;
                for (var j = 0; j < searches.length; j++) {
                    if (searches[j].trim() !== "" && lowerCasedSkill.includes(searches[j])) {
                        isInSearch = true;
                        break;
                    }
                }

                var classes = "skill skill--" + project.colour;
                classes += isInSearch ? " searched" : " js-searchable-skill";

                jpi.helpers.createElement(skillsContainer, "a", {
                    innerHTML: skill,
                    class: classes,
                    href: "/projects/" + skill + "/",
                });
            }
        },

        addLinks: function(project, containerSelector) {
            var linksContainer = jQuery(containerSelector + " .project__links");

            if (!project.link && !project.download && !project.github) {
                if (containerSelector !== global.modalSelector) {
                    linksContainer.remove();
                }
                return;
            }

            linksContainer = linksContainer[0];

            if (project.link) {
                jpi.helpers.createElement(linksContainer, "a", {
                    href: project.link,
                    title: "Link to " + project.name,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    innerHTML: "<i class='fas fa-link fa-2x'></i>",
                    class: "project__link project__link--" + project.colour,
                });
            }

            if (project.download) {
                jpi.helpers.createElement(linksContainer, "a", {
                    href: project.download,
                    title: "Link to download " + project.name,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    innerHTML: "<i class='fas fa-download fa-2x'></i>",
                    class: "project__link project__link--" + project.colour,
                });
            }

            if (project.github) {
                jpi.helpers.createElement(linksContainer, "a", {
                    href: project.github,
                    title: "Link to " + project.name + " code on GitHub",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    innerHTML: "<i class='fab fa-github fa-2x'></i>",
                    class: "project__link project__link--" + project.colour,
                });
            }
        },

        addProjectImages: function(project, containerSelector) {
            var slideShow = jQuery(containerSelector).find(".slide-show");
            var slideShowId = "#" + slideShow.attr("id");

            if (!project.images || !project.images.length) {
                if (containerSelector !== global.modalSelector) {
                    jQuery(slideShowId).remove();
                }
                return;
            }

            var slidesContainer = jQuery(slideShowId + " .slide-show__slides-container"),
                slideShowBullets = jQuery(slideShowId + " .js-slide-show-bullets");

            // Loop through each row of data in rows
            for (var i = 0; i < project.images.length; i++) {
                if (!project.images.hasOwnProperty(i)) {
                    continue;
                }

                var slideTemplate = jQuery("#tmpl-slide-template").text();
                var bulletTemplate = jQuery("#tmpl-slide-bullet-template").text();

                for (var field in project.images[i]) {
                    if (typeof field === "string" && project.images[i].hasOwnProperty(field)) {
                        var regex = fn.getTemplateRegex(field);
                        var data = project.images[i][field];
                        slideTemplate = slideTemplate.replace(regex, data);
                        bulletTemplate = bulletTemplate.replace(regex, data);
                    }
                }

                var colourRegex = fn.getTemplateRegex("colour");
                slideTemplate = slideTemplate.replace(colourRegex, project.colour);
                bulletTemplate = bulletTemplate.replace(colourRegex, project.colour);

                var idRegex = fn.getTemplateRegex("slide-show-id");
                bulletTemplate = bulletTemplate.replace(idRegex, slideShowId);

                slidesContainer.append(slideTemplate);
                slideShowBullets.append(bulletTemplate);
            }

            jpi.slideShow.setUp(slideShowId);
        },

        // Renders a single project
        renderProject: function(project) {
            var projectSelector = "#project--" + project.id;
            if (jQuery(projectSelector).length) {
                return;
            }

            global.projects[project.id] = project;

            var template = jQuery("#tmpl-project-template").text();
            for (var field in project) {
                if (project.hasOwnProperty(field) && typeof field === "string") {
                    var regex = fn.getTemplateRegex(field);

                    var value = project[field];
                    if (field === "date") {
                        value = new Date(value).toLocaleDateString();
                    }

                    template = template.replace(regex, value);
                }
            }
            jQuery(".projects").append(template);

            fn.addSkills(project, projectSelector);
            fn.addLinks(project, projectSelector);
            fn.addProjectImages(project, projectSelector);

            jpi.main.resetFooter();
        },

        openProjectsExpandModal: function() {
            var projectId = jQuery(this).attr("data-project-id"),
                project = global.projects[projectId],
                modal = jQuery(global.modalSelector);

            // Stops all the slide shows
            jpi.slideShow.stopSlideShows();

            modal.addClass("open").show();
            jQuery("body").css("overflow", "hidden");

            modal.find(".project__links, .project__skills, .slide-show__slides-container, .js-slide-show-bullets").text("");

            modal.find(".project__title").text(project.name);

            var projectDateString = new Date(project.date).toLocaleDateString();
            modal.find(".project__date").text(projectDateString);
            modal.find(".project__description").html(project.long_description);

            fn.addSkills(project, global.modalSelector);
            fn.addLinks(project, global.modalSelector);
            fn.addProjectImages(project, global.modalSelector);

            if (!global.navColourRegex) {
                global.navColourRegex = new RegExp("slide-show__nav--[\\w-]*", "g");
            }

            modal.find(".slide-show__nav").each(function() {
                var slideShowNav = jQuery(this);
                var classList = slideShowNav.attr("class");
                classList = classList.replace(global.navColourRegex, "slide-show__nav--" + project.colour);
                slideShowNav.attr("class", classList);
            });
        },

        closeProjectsExpandModal: function(e) {
            var modal = jQuery(global.modalSelector);
            if (!jQuery(e.target).closest(".modal__content").length && modal.hasClass("open")) {
                modal.removeClass("open").hide();

                jQuery("body").css("overflow", "auto");

                var viewpoint = jQuery(global.modalSelector + " .slide-show__viewpoint")[0];
                viewpoint.removeEventListener("mousedown", jpi.slideShow.dragStart);
                viewpoint.removeEventListener("touchstart", jpi.slideShow.dragStart);

                // Reset slide show
                jQuery(global.modalSelector + " .slide-show__slides-container").css("left", "0px");
                clearInterval(jpi.slideShow.slideShows["#detailed-project__slide-show"]);
                jQuery("#detailed-project__slide-show").removeClass("js-has-slide-show");

                jpi.slideShow.startSlideShows();
            }
        },

        // Adds pagination buttons/elements to the page
        addPagination: function(totalItems) {
            var paginationElem = jQuery(".pagination");

            if (jpi.helpers.getInt(totalItems) > 10) {
                var page = 1,
                    ul = paginationElem[0],
                    currentPage = fn.getCurrentPageNum();

                for (var i = 0; i < totalItems; i += 10, page++) {
                    var attributes = {class: "pagination__item"},
                        item = jpi.helpers.createElement(ul, "li", attributes),
                        url = fn.getNewURL(page);

                    url += global.url.search;

                    attributes = {
                        "innerHTML": page,
                        "class": "pagination__item-link js-pagination-item",
                        "data-page": page,
                        "href": url,
                    };
                    if (page === currentPage) {
                        attributes.class = "pagination__item-link active";
                    }
                    jpi.helpers.createElement(item, "a", attributes);
                }

                paginationElem.show();
            }
            else {
                paginationElem.hide();
            }
        },

        // Sets up events when projects were received
        gotProjects: function(response) {
            jQuery(".feedback--error, .projects__loading-img").text("").hide("fast");
            jQuery(".projects, .pagination").text("");

            // Send the data, the function to do if data is valid
            jpi.ajax.renderRowsOrFeedback(response, fn.renderProject, fn.renderError, "No Projects Found.");

            if (response && response.meta && response.meta.total_count) {
                fn.addPagination(response.meta.total_count);
            }

            jpi.main.resetFooter();
        },

        getProjects: function() {
            var page = fn.getCurrentPageNum(),
                search = jQuery(".search-form__input").val(),
                query = {
                    page: page,
                    search: search,
                };

            // Stops all the slide shows
            jpi.slideShow.stopSlideShows();

            // Send request to get projects for page and search
            jpi.ajax.sendRequest({
                method: "GET",
                url: jpi.config.jpiAPIEndpoint + "projects/",
                params: query,
                onSuccess: fn.gotProjects,
                onError: fn.renderError,
            });
        },

        getNewURL: function(page) {
            var url = "/projects/",
                searchValue = jQuery(".search-form__input").val();

            if (searchValue.trim() !== "") {
                url += searchValue + "/";
            }

            if (page > 1) {
                url += page + "/";
            }

            return url;
        },

        getNewTitle: function(page) {
            var title = global.titleStart,
                searchValue = jQuery(".search-form__input").val();

            if (searchValue.trim() !== "") {
                title += " with " + searchValue;
            }

            if (page > 1) {
                title += " - Page " + page;
            }

            title += global.titleEnd;

            return title;
        },

        storeLatestSearch: function() {
            var searchValue = jQuery(".search-form__input").val(),
                page = fn.getCurrentPageNum(),
                title = fn.getNewTitle(page),
                url = fn.getNewURL(page),
                state = {
                    search: searchValue,
                    page: page,
                };

            global.url.pathname = url;
            document.title = title;
            history.pushState(state, title, global.url.toString());

            if (typeof ga !== "undefined") {
                ga("set", "page", url);
                ga("send", "pageview");
            }
        },

        // Sends request when the user has done a search
        doSearch: function() {
            jQuery(".js-projects-page").val(1);

            fn.storeLatestSearch();

            fn.getProjects();
            return false;
        },

        scrollToProjects: function() {
            var projectsPos = jQuery(".projects").offset().top,
                navHeight = jQuery(".nav").height();

            jQuery("html, body").animate(
                {
                    scrollTop: projectsPos - navHeight - 20,
                },
                2000
            );
        },

        // Set up page
        initListeners: function() {
            jQuery(".search-form").on("submit", fn.doSearch);

            jQuery("body").on("click", ".skill", function(e) {
                e.preventDefault();
            });

            jQuery("body").on("click", ".js-searchable-skill", function(e) {
                jQuery(global.modalSelector).trigger("click");
                jQuery(".search-form__input").val(e.target.innerHTML);
                fn.scrollToProjects();
                fn.doSearch();
            });

            jQuery(".pagination--projects").on("click", ".js-pagination-item", function(e) {
                e.preventDefault();
                e.stopPropagation();

                fn.scrollToProjects();

                var page = jQuery(this).attr("data-page");
                if (!page) {
                    page = 1;
                }

                jQuery(".js-projects-page").val(page);

                fn.storeLatestSearch();
                fn.getProjects();
            });

            jQuery(".projects").on("click", ".js-open-modal", fn.openProjectsExpandModal);

            window.addEventListener("popstate", function(e) {
                var page = e.state.page;

                document.title = fn.getNewTitle(page);

                jQuery(".js-projects-page").val(page);
                jQuery(".search-form__input").val(e.state.search);

                fn.scrollToProjects();
                fn.getProjects();
            });

            // Close the modal
            jQuery(global.modalSelector).on("click", fn.closeProjectsExpandModal);
        },

        init: function() {
            if (jQuery(".js-all-projects").length) {
                fn.initListeners();
                fn.getProjects();
            }
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

    return {};

})(jQuery, jpi);
