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
        modalSlidesContainer: null,

        searchInput: null,
        pageNumber: 1,

        slideTemplate: "",
        bulletTemplate: "",

        projects: {},

        dateFormat: false,
    };

    var fn = {

        bottomAlignProjectFooters: function() {
            var projects = jQuery(".project");
            var numOfProjects = projects.length;
            if (!numOfProjects) {
                return;
            }

            jQuery(".project .project__description").css("min-height", "");

            if (window.innerWidth < 768) {
                return;
            }

            for (var i = 0; i < numOfProjects; i++) {
                var project = jQuery(projects[i]);
                var height = project.height();

                var projectDesc = project.children(".project__description");

                var otherElems = project.children().not(projectDesc);
                var totalAllHeight = 0;
                otherElems.each(function(j, elem) {
                    totalAllHeight += jQuery(elem).outerHeight(true);
                });

                // Expand the description element to fit remaining space
                var maxHeight = projectDesc.outerHeight(true);
                var innerHeight = projectDesc.height();
                var padding = maxHeight - innerHeight;

                var newHeight = height - totalAllHeight - padding;
                projectDesc.css("min-height", newHeight);
            }
        },

        renderError: function(error) {
            global.errorElem.text(error).show(600);
            global.pagination.text("").hide(600);
            global.loading.hide(600);
            jpi.main.resetFooter();
        },

        renderPaginationItem: function(page, containerElem, isCurrent) {
            var item = jpi.helpers.createElement("li", containerElem, {class: "pagination__item"});

            var url = fn.getNewURL(page);
            url += global.url.search;

            jpi.helpers.createElement("a", item, {
                "class": "pagination__link " + (isCurrent ? "active": ""),
                "innerHTML": page,
                "data-page": page,
                "href": url,
            });
        },

        // Adds pagination buttons/elements to the page
        renderPagination: function(totalProjects) {
            totalProjects = jpi.helpers.getInt(totalProjects);
            if (totalProjects > jpi.config.projectsPerPage) {
                var paginationElem = global.pagination;

                var ul = paginationElem[0];
                var currentPage = global.pageNumber;

                var totalPages = Math.ceil(totalProjects / jpi.config.projectsPerPage);

                for (var page = 1; page <= totalPages; page++) {
                    var isCurrent = page === currentPage;
                    fn.renderPaginationItem(page, ul, isCurrent);
                }

                paginationElem.css("display", "inline-block");
            }
        },

        renderProjectSkills: function(project, containerSelector) {
            var skills = project.skills;

            var skillsContainer = jQuery(containerSelector).find(".project__skills")[0];
            if (!skillsContainer) {
                return;
            }

            var search = global.searchInput.val().trim().toLowerCase();
            var searches = search.split(" ");

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

                var classes = ["project__skill", "project__skill--" + project.colour];
                if (isInSearch) {
                    classes.push("searched");
                }

                jpi.helpers.createElement("a", skillsContainer, {
                    innerHTML: skill,
                    class: classes.join(" "),
                    href: "/projects/" + skill + "/",
                });
            }
        },

        renderProjectLinks: function(project, containerSelector) {
            var linksContainer = jQuery(containerSelector).find(".project__links");

            if (!project.link && !project.download && !project.github) {
                if (containerSelector !== global.modalSelector) {
                    linksContainer.remove();
                }
                return;
            }

            linksContainer = linksContainer[0];

            if (project.link) {
                jpi.helpers.createElement("a", linksContainer, {
                    href: project.link,
                    title: "Link to " + project.name,
                    target: "_blank",
                    rel: "noopener",
                    innerHTML: "<i class='fas fa-link fa-2x'></i>",
                    class: "project__link project__link--" + project.colour,
                });
            }

            if (project.download) {
                jpi.helpers.createElement("a", linksContainer, {
                    href: project.download,
                    title: "Link to download " + project.name,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    innerHTML: "<i class='fas fa-download fa-2x'></i>",
                    class: "project__link project__link--" + project.colour,
                });
            }

            if (project.github) {
                jpi.helpers.createElement("a", linksContainer, {
                    href: project.github,
                    title: "Link to " + project.name + " code on GitHub",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    innerHTML: "<i class='fab fa-github fa-2x'></i>",
                    class: "project__link project__link--" + project.colour,
                });
            }
        },

        renderProjectImages: function(project, containerSelector) {
            var slideShow = jQuery(containerSelector).find(".slide-show");
            var slideShowId = "#" + slideShow.attr("id");

            if (!project.images || !project.images.length) {
                if (containerSelector !== global.modalSelector) {
                    slideShow.remove();
                }
                return;
            }

            var slidesContainer = slideShow.find(".slide-show__slides");
            var slideShowBullets = slideShow.find(".slide-show__bullets");

            var colourRegex = jpi.helpers.getTemplatingRegex("colour");
            var slideShowIdRegex = jpi.helpers.getTemplatingRegex("slide-show-id");

            // Loop through each image in project
            for (var i = 0; i < project.images.length; i++) {
                if (!project.images.hasOwnProperty(i)) {
                    continue;
                }

                var slide = global.slideTemplate;
                var bullet = global.bulletTemplate;

                for (var field in project.images[i]) {
                    if (typeof field === "string" && project.images[i].hasOwnProperty(field)) {
                        var regex = jpi.helpers.getTemplatingRegex(field);
                        var data = project.images[i][field];
                        slide = slide.replace(regex, data);
                        bullet = bullet.replace(regex, data);
                    }
                }

                slide = slide.replace(colourRegex, project.colour);
                slidesContainer.append(slide);

                bullet = bullet.replace(colourRegex, project.colour);
                bullet = bullet.replace(slideShowIdRegex, slideShowId);
                slideShowBullets.append(bullet);
            }

            jpi.slideShow.start(slideShowId);
        },

        renderProject: function(project) {
            var projectSelector = "#project--" + project.id;
            if (jQuery(projectSelector).length) {
                return;
            }

            if (project.date) {
                var date = new Date(project.date);
                project.date = global.dateFormat.format(date);
            }

            // Make sure colour placeholders are replaced in content
            var colourRegex = jpi.helpers.getTemplatingRegex("colour");
            var fields = ["short_description", "long_description"];
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                project[field] = project[field].replace(colourRegex, project.colour);
            }

            global.projects[project.id] = project;

            var template = global.projectTemplate;
            for (var field in project) {
                if (project.hasOwnProperty(field) && typeof field === "string") {
                    var regex = jpi.helpers.getTemplatingRegex(field);
                    var value = project[field];
                    template = template.replace(regex, value);
                }
            }
            global.projectsElem.append(template);

            fn.renderProjectImages(project, projectSelector);
            fn.renderProjectLinks(project, projectSelector);
        },

        // Sets up events when projects were received
        gotProjects: function(response) {
            jpi.slideShow.pauseAll();

            global.errorElem.text("").hide(600);
            global.loading.hide(600);
            global.projectsElem.text("");
            global.pagination.text("").hide();

            // Send the data, the function to do if data is valid
            jpi.ajax.renderRowsOrError(
                response,
                fn.renderProject,
                fn.renderError,
                "No Projects Found."
            );

            if (response && response.meta && response.meta.total_count) {
                fn.renderPagination(response.meta.total_count);
            }

            fn.bottomAlignProjectFooters();
            jpi.main.resetFooter();
        },

        getProjects: function() {
            var page = global.pageNumber;
            var search = global.searchInput.val();
            var query = {
                page: page,
                search: search,
                limit: jpi.config.projectsPerPage,
            };

            jpi.ajax.request({
                method: "GET",
                url: jpi.config.jpiAPIEndpoint + "/projects/",
                data: query,
                onSuccess: fn.gotProjects,
                onError: fn.renderError,
            });
        },

        openProjectModal: function() {
            var projectId = jQuery(this).attr("data-project-id");
            var project = global.projects[projectId];
            var modal = global.modal;

            modal.find(".project__links, .project__skills, .slide-show__slides, .slide-show__bullets").text("");

            modal.find(".modal__heading").text(project.name);
            modal.find(".project__date").text(project.date);
            modal.find(".project__description").html(project.long_description);

            var projectTypeElem = modal.find(".project__type");

            projectTypeElem.text(project.type);

            var classList = projectTypeElem.attr("class");
            classList = classList.replace(global.typeColourRegex, "project__type--" + project.colour);
            projectTypeElem.attr("class", classList);

            fn.renderProjectSkills(project, global.modalSelector);
            fn.renderProjectLinks(project, global.modalSelector);
            fn.renderProjectImages(project, global.modalSelector);

            modal.find(".slide-show__nav").attr("data-colour", project.colour);

            jpi.modal.open(modal);
            jpi.slideShow.start("#detailed-project__slide-show");
        },

        onProjectModalClose: function() {
            jpi.slideShow.stop("#detailed-project__slide-show");
            global.modalSlidesContainer.css({
                "width": "",
                "left": "",
            });
        },

        getNewURL: function(page) {
            var url = "/projects/";

            var search = global.searchInput.val();
            if (search.trim() !== "") {
                url += search + "/";
            }

            if (page > 1) {
                url += page + "/";
            }

            return url;
        },

        getNewTitle: function(page) {
            var title = global.titleStart;
            var search = global.searchInput.val();

            if (search.trim() !== "") {
                title += " with " + search;
            }

            if (page > 1) {
                title += " - Page " + page;
            }

            title += global.titleEnd;

            return title;
        },

        storeLatestSearch: function() {
            var search = global.searchInput.val();
            var page = global.pageNumber;
            var title = fn.getNewTitle(page);
            var url = fn.getNewURL(page);
            var state = {
                search: search,
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
            global.pageNumber = 1;
            fn.storeLatestSearch();
            fn.getProjects();
            return false;
        },

        scrollToProjects: function() {
            var projectsPos = global.projectsElem.offset().top;
            var navHeight = global.nav.height();

            global.htmlElem.animate({
                scrollTop: projectsPos - navHeight - 20,
            }, 2000);
        },

        initListeners: function() {
            jQuery(window).on("orientationchange resize", jpi.helpers.debounce(fn.bottomAlignProjectFooters, 200));

            jQuery(".search-form").on("submit", fn.doSearch);

            global.projectsElem.on("click", ".project__read-more", fn.openProjectModal);

            global.modal.on("closed", fn.onProjectModalClose);

            global.body.on("click", ".project__skill", function(e) {
                e.preventDefault();
                jpi.modal.close();
                fn.scrollToProjects();

                if (e.target.innerHTML === global.searchInput.val() && global.pageNumber === 1) {
                    return;
                }

                global.searchInput.val(e.target.innerHTML);
                fn.doSearch();
            });

            global.pagination.on("click", ".pagination__link", function(e) {
                e.preventDefault();
                e.stopPropagation();

                var page = jQuery(this).attr("data-page");
                page = jpi.helpers.getInt(page, 1);

                if (global.pageNumber === page) {
                    return;
                }

                fn.scrollToProjects();
                global.pageNumber = page;
                fn.storeLatestSearch();
                fn.getProjects();
            });

            window.addEventListener("popstate", function(e) {
                var state = e.state || {};
                var page = state.page || 1;

                document.title = fn.getNewTitle(page);

                global.pageNumber = jpi.helpers.getInt(page, 1);
                global.searchInput.val(state.search || "");

                fn.scrollToProjects();
                fn.getProjects();
            });
        },

        init: function() {
            global.projectsElem = jQuery(".projects__items");
            if (!global.projectsElem.length) {
                return
            }

            global.url = new URL(window.location);

            global.htmlElem = jQuery("html, body");
            global.body = jQuery("body");

            global.nav = jQuery(".nav");

            global.loading = jQuery(".projects__loading");
            global.errorElem = jQuery(".projects__error");
            global.searchInput = jQuery(".search-form__input");
            global.pagination = jQuery(".pagination");

            global.modal = jQuery(global.modalSelector);
            global.modalSlidesContainer = global.modal.find(".slide-show__slides");

            global.pageNumber = jpi.helpers.getInt(jQuery(".js-page").val(), 1);

            global.projectTemplate = jQuery("#tmpl-project-template").text();
            global.slideTemplate = jQuery("#tmpl-slide-template").text();
            global.bulletTemplate = jQuery("#tmpl-slide-bullet-template").text();

            global.dateFormat = new Intl.DateTimeFormat(undefined, {month: "long", year: "numeric"});

            global.typeColourRegex = /project__type--[\w-]*/g;

            var state = {
                search: global.searchInput.val(),
                page: global.pageNumber,
            };

            history.replaceState(state, document.title);

            fn.initListeners();
            fn.getProjects();
        },
    };

    jQuery(window).on("jpi-css-loaded", fn.init);

    return {};

})(jQuery, jpi);
