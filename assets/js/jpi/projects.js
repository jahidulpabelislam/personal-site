;/**
 * Holds all the functions needed for the projects page
 * e.g. display projects
 */
window.jpi = window.jpi || {};
window.jpi.projects = (function(jQuery, jpi) {

    "use strict";

    var global = {
        url: null,
        titleStart: "Projects",
        titleEnd: " | Jahidul Pabel Islam - Full Stack Developer",

        htmlElem: null,
        body: null,

        nav: null,

        loading: null,
        errorElem: null,
        projectsElem: null,
        pagination: null,

        modalSelector: ".detailed-project",
        modal: null,

        modalSlideShow: null,
        modalSlideShowViewpoint: null,
        modalSlides: null,

        searchInput: null,
        pageNum: 1,

        slideTemplate: "",
        bulletTemplate: "",

        templateRegexes: {},
        navColourRegex: null,

        projects: {},

        dateFormat: false,
    };

    var fn = {

        getCurrentPageNum: function() {
            var currentPageNum = global.pageNum;
            currentPageNum = jpi.helpers.getInt(currentPageNum, 1);

            return currentPageNum;
        },

        bottomAlignProjectFooters: function() {
            var projects = jQuery(".project");
            var numOfProjects = projects.length;
            if (!numOfProjects) {
                return;
            }

            jQuery(".project .project__description").css("min-height", 0);

            if (window.innerWidth < 768) {
                return;
            }

            for (var i = numOfProjects - 1; i >= 0; i--) {
                var project = jQuery(projects[i]);
                var height = project.height();

                var projectDesc = project.find(".project__description");

                var otherElems = project.find("> *").not(projectDesc);
                var totalAllHeight = 0;
                otherElems.each(function(j, elem) {
                    totalAllHeight += jQuery(elem).outerHeight(true);
                });

                // Expand the description element to fit remaing space
                var maxHeight = projectDesc.outerHeight(true);
                var innerHeight = projectDesc.height();
                var padding = maxHeight - innerHeight;

                var newHeight = height - totalAllHeight - padding;
                projectDesc.css('min-height', newHeight);
            }
        },

        // Prints out a error message provided
        renderError: function(error) {
            global.errorElem.text(error).show(600);
            global.pagination.text("").hide(600);
            global.loading.hide(600);
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

                search = global.searchInput.val().trim(),
                lowerCasedSearch = search.toLowerCase(),
                searches = lowerCasedSearch.split(" ");

            if (!skillsContainer) {
                return;
            }

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

                var classes = "project__skill project__skill--" + project.colour;
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
                    rel: "noopener",
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
                slideShowBullets = jQuery(slideShowId + " .slide-show__bullets");

            // Loop through each row of data in rows
            for (var i = 0; i < project.images.length; i++) {
                if (!project.images.hasOwnProperty(i)) {
                    continue;
                }

                var slide = global.slideTemplate;
                var bullet = global.bulletTemplate;

                for (var field in project.images[i]) {
                    if (typeof field === "string" && project.images[i].hasOwnProperty(field)) {
                        var regex = fn.getTemplateRegex(field);
                        var data = project.images[i][field];
                        slide = slide.replace(regex, data);
                        bullet = bullet.replace(regex, data);
                    }
                }

                var colourRegex = fn.getTemplateRegex("colour");
                slide = slide.replace(colourRegex, project.colour);
                bullet = bullet.replace(colourRegex, project.colour);

                var idRegex = fn.getTemplateRegex("slide-show-id");
                bullet = bullet.replace(idRegex, slideShowId);

                slidesContainer.append(slide);
                slideShowBullets.append(bullet);
            }

            jpi.slideShow.setUp(slideShowId);
        },

        // Renders a single project
        renderProject: function(project) {
            var projectSelector = "#project--" + project.id;
            if (jQuery(projectSelector).length) {
                return;
            }

            if (project.date) {
                var date = new Date(project.date);
                project.date = global.dateFormat.format(date);
            }

            global.projects[project.id] = project;

            var template = global.projectTemplate;
            for (var field in project) {
                if (project.hasOwnProperty(field) && typeof field === "string") {
                    var regex = fn.getTemplateRegex(field);
                    var value = project[field];
                    template = template.replace(regex, value);
                }
            }
            global.projectsElem.append(template);

            fn.addSkills(project, projectSelector);
            fn.addLinks(project, projectSelector);
            fn.addProjectImages(project, projectSelector);

            jpi.main.resetFooter();
        },

        openProjectsExpandModal: function() {
            var projectId = jQuery(this).attr("data-project-id"),
                project = global.projects[projectId],
                modal = global.modal;

            // Stops all the slide shows
            jpi.slideShow.stopSlideShows();

            modal.addClass("open").show();
            global.body.css("overflow", "hidden");

            modal.find(".project__links, .project__skills, .slide-show__slides-container, .slide-show__bullets").text("");

            modal.find(".modal__heading").text(project.name);
            modal.find(".project__date").text(project.date);
            modal.find(".project__description").html(project.long_description);

            var projectTypeElem = modal.find(".project__type");

            projectTypeElem.text(project.type);

            var classList = projectTypeElem.attr("class");
            classList = classList.replace(global.typeColourRegex, "project__type--" + project.colour);
            projectTypeElem.attr("class", classList);

            fn.addSkills(project, global.modalSelector);
            fn.addLinks(project, global.modalSelector);
            fn.addProjectImages(project, global.modalSelector);

            modal.find(".slide-show__nav").each(function() {
                var slideShowNav = jQuery(this);
                var classList = slideShowNav.attr("class");
                classList = classList.replace(global.navColourRegex, "slide-show__nav--" + project.colour);
                slideShowNav.attr("class", classList);
            });
        },

        closeProjectsExpandModal: function(e) {
            var modal = global.modal;
            if (!jQuery(e.target).closest(".modal__content").length && modal.hasClass("open")) {
                modal.removeClass("open").hide();

                global.body.css("overflow", "auto");

                var viewpoint = global.modalSlideShowViewpoint[0];
                viewpoint.removeEventListener("mousedown", jpi.slideShow.dragStart);
                viewpoint.removeEventListener("touchstart", jpi.slideShow.dragStart);

                // Reset slide show
                global.modalSlides.css("left", "0px");
                clearInterval(jpi.slideShow.slideShows["#detailed-project__slide-show"]);
                global.modalSlideShow.removeClass("js-has-slide-show");

                jpi.slideShow.startSlideShows();
            }
        },

        // Adds pagination buttons/elements to the page
        addPagination: function(totalItems) {
            var paginationElem = global.pagination;

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
            global.errorElem.text("").hide(600);
            global.loading.hide(600);
            global.projectsElem.text("");
            global.pagination.text("");

            // Send the data, the function to do if data is valid
            jpi.ajax.renderRowsOrFeedback(
                response, fn.renderProject, fn.renderError, "No Projects Found."
            );

            if (response && response.meta && response.meta.total_count) {
                fn.addPagination(response.meta.total_count);
            }

            jpi.main.resetFooter();

            fn.bottomAlignProjectFooters();
        },

        getProjects: function() {
            var page = fn.getCurrentPageNum(),
                search = global.searchInput.val(),
                query = {
                    page: page,
                    search: search,
                    limit: 6,
                };

            // Stops all the slide shows
            jpi.slideShow.stopSlideShows();

            // Send request to get projects for page and search
            jpi.ajax.sendRequest({
                method: "GET",
                url: jpi.config.jpiAPIEndpoint + "/projects/",
                params: query,
                onSuccess: fn.gotProjects,
                onError: fn.renderError,
            });
        },

        getNewURL: function(page) {
            var url = "/projects/",

                searchValue = global.searchInput.val();

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
                searchValue = global.searchInput.val();

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
            var searchValue = global.searchInput.val(),
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
            global.pageNum = 1;

            fn.storeLatestSearch();

            fn.getProjects();
            return false;
        },

        scrollToProjects: function() {
            var projectsPos = global.projectsElem.offset().top,
                navHeight = global.nav.height();

            global.htmlElem.animate({
                scrollTop: projectsPos - navHeight - 20,
            }, 2000);
        },

        // Set up page
        initListeners: function() {
            jQuery(window).on("orientationchange resize", jpi.helpers.debounce(fn.bottomAlignProjectFooters, 200));

            jQuery(".search-form").on("submit", fn.doSearch);

            global.projectsElem.on("click", ".js-open-modal", fn.openProjectsExpandModal);

            global.modal.on("click", fn.closeProjectsExpandModal);

            global.body.on("click", ".project__skill", function(e) {
                e.preventDefault();
            });

            global.body.on("click", ".js-searchable-skill", function(e) {
                global.modal.trigger("click");
                global.searchInput.val(e.target.innerHTML);
                fn.scrollToProjects();
                fn.doSearch();
            });

            global.pagination.on("click", ".js-pagination-item", function(e) {
                e.preventDefault();
                e.stopPropagation();

                fn.scrollToProjects();

                var page = jQuery(this).attr("data-page");
                if (!page) {
                    page = 1;
                }

                global.pageNum = page;

                fn.storeLatestSearch();
                fn.getProjects();
            });

            window.addEventListener("popstate", function(e) {
                var page = e.state.page;

                document.title = fn.getNewTitle(page);

                global.pageNum = page;
                global.searchInput.val(e.state.search);

                fn.scrollToProjects();
                fn.getProjects();
            });
        },

        init: function() {
            if (!jQuery(".js-all-projects").length) {
                return
            }

            global.url = new URL(window.location);

            global.htmlElem = jQuery("html, body");
            global.body = jQuery("body");

            global.nav = jQuery(".nav");

            global.loading = jQuery(".projects__loading-img");
            global.errorElem = jQuery(".feedback--error");
            global.searchInput = jQuery(".search-form__input");
            global.projectsElem = jQuery(".projects");
            global.pagination = jQuery(".pagination");

            global.modal = jQuery(global.modalSelector);

            global.modalSlideShow = jQuery(global.modalSelector + " .slide-show");
            global.modalSlideShowViewpoint = jQuery(global.modalSelector + " .slide-show__viewpoint");
            global.modalSlides = jQuery(global.modalSelector + " .slide-show__slides-container");

            global.pageNum = jQuery(".js-projects-page");

            global.projectTemplate = jQuery("#tmpl-project-template").text();
            global.slideTemplate = jQuery("#tmpl-slide-template").text();
            global.bulletTemplate = jQuery("#tmpl-slide-bullet-template").text();

            global.dateFormat = new Intl.DateTimeFormat(undefined, {month: "long", year: "numeric"});

            global.navColourRegex = new RegExp("slide-show__nav--[\\w-]*", "g");
            global.typeColourRegex = new RegExp("project__type--[\\w-]*", "g");

            fn.initListeners();
            fn.getProjects();
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

    return {};

})(jQuery, jpi);
