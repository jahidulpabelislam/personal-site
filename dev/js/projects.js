var JPI = JPI || {};

//=include ./jpi/plugins/templating.js
//=include ./jpi/plugins/ajax.js
//=include ./jpi/plugins/modal.js
//=include ./jpi/plugins/slide-show.js
//=include ./jpi/plugins/expanded-slide-show.js
//=include ./jpi/api.js

;/**
 * Holds all the functions needed for the projects page
 * e.g. display projects
 */
(new (function() {

    "use strict";

    var projects = this;

    this.url = new URL(window.location);

    this.$body = jQuery("body");

    this.$projects = jQuery(".projects__items");

    this.$loading = jQuery(".projects__loading");
    this.$error = jQuery(".projects__error");
    this.$search = jQuery(".search-form__input");
    this.$pagination = jQuery(".pagination");

    this.modalSelector = ".detailed-project";

    this.$modal = jQuery(this.modalSelector);
    this.modal = new JPI.modal(this.$modal);
    this.$modalSlidesContainer = this.$modal.find(".slide-show__slides");
    this.modalSlideShow = new JPI.SlideShow({
        selector: "#detailed-project-slide-show",
    });

    this.page = JPI.getInt(jQuery(".js-page").val(), 1);

    this.projectTemplate = jQuery("#project-template").text();
    this.slideTemplate = jQuery("#slide-template").text();
    this.bulletTemplate = jQuery("#slide-bullet-template").text();

    this.projects = {};
    this.slideShows = [];

    this.bottomAlignProjectFooters = function() {
        var $projects = jQuery(".project");
        if (!$projects.length) {
            return;
        }

        jQuery(".project .project__description").css("min-height", "");

        if (window.innerWidth < JPI.getInt(JPI.breakpoints.tablet)) {
            return;
        }

        $projects.each(function(i, project) {
            var $project = jQuery(project);
            var height = $project.height();

            var $projectDescription = $project.children(".project__description");

            var $others = $project.children().not($projectDescription);
            var totalAllHeight = 0;
            $others.each(function(j, elem) {
                totalAllHeight += jQuery(elem).outerHeight(true);
            });

            // Expand the description element to fit remaining space
            var maxHeight = $projectDescription.outerHeight(true);
            var innerHeight = $projectDescription.height();
            var padding = maxHeight - innerHeight;

            var newHeight = height - totalAllHeight - padding;
            $projectDescription.css("min-height", newHeight);
        });
    };

    this.renderError = function(error) {
        this.$error.text(error).show(600);
        this.$pagination.text("").hide(600);
        this.$loading.hide(600);
    };

    this.renderPaginationItem = function(page, $container, isCurrent) {
        var url = this.getNewURL(page);
        url += this.url.search;

        var classes = ["pagination__link"];
        if (isCurrent) {
            classes.push("pagination__link--active");
        }
        var $link = JPI.createElement("a", {
            "class": classes.join(" "),
            "text": page,
            "href": url,
        });

        JPI.renderNewElement("li", $container, {
            class: "pagination__item",
            html: $link,
        });
    };

    // Adds pagination buttons/elements to the page
    this.renderPagination = function(totalProjects) {
        if (totalProjects > JPI.projects.perPage) {
            var currentPage = this.page;

            var totalPages = Math.ceil(totalProjects / JPI.projects.perPage);
            for (var page = 1; page <= totalPages; page++) {
                var isCurrent = page === currentPage;
                this.renderPaginationItem(page, this.$pagination, isCurrent);
            }

            this.$pagination.css("display", "inline-block");
        }
    };

    this.renderProjectSkills = function(project, containerSelector) {
        var $skills = jQuery(containerSelector).find(".project__skills");
        if (!$skills.length) {
            return;
        }

        var search = this.$search.val().trim().toLowerCase();
        var searches = search.split(" ");

        var skills = project.skills;
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

            var classes = ["project__skill"];
            if (isInSearch) {
                classes.push("project__skill--searched");
            }

            JPI.renderNewElement("a", $skills, {
                text: skill,
                class: classes.join(" "),
                href: "/projects/" + skill + "/",
            });
        }
    };

    this.renderProjectLinks = function(project, containerSelector) {
        var $links = jQuery(containerSelector).find(".project__links");

        if (!project.url && !project.download_url && !project.github_url) {
            if (containerSelector !== this.modalSelector) {
                $links.remove();
            }
            return;
        }

        var defaultAttributes = {
            target: "_blank",
            rel: "noopener",
            classes: ["project__link"],
        };

        defaultAttributes.class = defaultAttributes.classes.join(" ");
        delete defaultAttributes.classes;

        if (project.url) {
            defaultAttributes.href = project.url;
            defaultAttributes.title = "Link to " + project.name;
            defaultAttributes.html = "<i class='fas fa-link fa-2x'></i>";
            JPI.renderNewElement("a", $links, defaultAttributes);
        }

        if (project.download_url) {
            defaultAttributes.href = project.download_url;
            defaultAttributes.title = "Link to download " + project.name;
            defaultAttributes.html = "<i class='fas fa-download fa-2x'></i>";
            JPI.renderNewElement("a", $links, defaultAttributes);
        }

        if (project.github_url) {
            defaultAttributes.href = project.github_url;
            defaultAttributes.title = "Link to " + project.name + " code on GitHub";
            defaultAttributes.html = "<i class='fab fa-github fa-2x'></i>";
            JPI.renderNewElement("a", $links, defaultAttributes);
        }
    };

    this.renderProjectImages = function(project, containerSelector) {
        var $slideShow = jQuery(containerSelector).find(".slide-show");
        var slideShowId = "#" + $slideShow.attr("id");

        if (!project.images || !project.images.length) {
            if (containerSelector !== this.modalSelector) {
                $slideShow.remove();
            }
            return;
        }

        var $slidesContainer = $slideShow.find(".slide-show__slides");
        var $slideShowBullets = $slideShow.find(".slide-show__bullets");

        // Loop through each image in project
        var images = project.images;
        for (var i = 0; i < images.length; i++) {
            if (!{}.hasOwnProperty.call(images, i)) {
                continue;
            }

            var slideTemplate = new JPI.Template(this.slideTemplate);
            var bulletTemplate = new JPI.Template(this.bulletTemplate);

            var image = images[i];
            for (var field in image) {
                if ({}.hasOwnProperty.call(image, field)) {
                    var value = image[field];
                    slideTemplate.replace(field, value);
                    bulletTemplate.replace(field, value);
                }
            }

            slideTemplate.renderIn($slidesContainer);

            bulletTemplate.replace("slideShowId", slideShowId);
            bulletTemplate.renderIn($slideShowBullets);
        }

        // Realign the project footers when the first (displayed) image is loaded
        $slideShow.find("img:first").on("load", function() {
            projects.bottomAlignProjectFooters();
        });

        if (containerSelector !== this.modalSelector) {
            var slidesShow = new JPI.SlideShow({
                selector: slideShowId,
            });
            this.slideShows.push(slidesShow);
            slidesShow.start();
        }
    };

    this.renderProject = function(project) {
        var projectSelector = "#project-" + project.id;
        if (jQuery(projectSelector).length) {
            return;
        }

        project = JPI.api.formatProjectData(project);

        this.projects[project.id] = project;

        (new JPI.Template(this.projectTemplate, project)).renderIn(this.$projects);

        this.renderProjectImages(project, projectSelector);
        this.renderProjectLinks(project, projectSelector);
    };

    // Sets up events when projects were received
    this.gotProjects = function(response) {
        this.slideShows = [];

        this.$error.text("").hide(600);
        this.$loading.hide(600);
        this.$projects.text("");
        this.$pagination.text("").hide();

        // Send the data, the function to do if data is valid
        JPI.ajax.renderRowsOrError(
            response,
            this.renderProject.bind(this),
            this.renderError.bind(this),
            "No Projects Found."
        );

        if (response && response._total_count) {
            this.renderPagination(JPI.getInt(response._total_count));
        }
    };

    this.getProjects = function() {
        var query = {
            page: this.page,
            search: this.$search.val(),
            limit: JPI.projects.perPage,
        };

        JPI.ajax.request({
            method: "GET",
            url: JPI.projects.apiEndpoint + "/projects/",
            data: query,
            onSuccess: this.gotProjects.bind(this),
            onError: this.renderError.bind(this),
        });
    };

    this.pauseSlideShows = function() {
        for (var i = 0; i < this.slideShows.length; i++) {
            if ({}.hasOwnProperty.call(this.slideShows, i)) {
                this.slideShows[i].pause();
            }
        }
    };

    this.resumeSlideShows = function() {
        for (var i = 0; i < this.slideShows.length; i++) {
            if ({}.hasOwnProperty.call(this.slideShows, i)) {
                this.slideShows[i].resume();
            }
        }
    };

    this.openProjectModal = function(e) {
        var projectId = jQuery(e.target).attr("data-project-id");
        var project = this.projects[projectId];
        var $modal = this.$modal;

        $modal.find(".project__links, .project__skills, .slide-show__slides, .slide-show__bullets").text("");

        $modal.find(".modal__heading").text(project.name);
        $modal.find(".project__date").text(project.date);
        $modal.find(".project__description").html(project.long_description);

        var $projectType = $modal.find(".project__type");

        $projectType.text(project.type);

        this.renderProjectSkills(project, this.modalSelector);
        this.renderProjectLinks(project, this.modalSelector);
        this.renderProjectImages(project, this.modalSelector);

        this.pauseSlideShows();

        this.modal.open();

        this.modalSlideShow.start();
    };

    this.onProjectModalClose = function() {
        this.modalSlideShow.stop();
        this.$modalSlidesContainer.css({
            width: "",
            left: "",
        });

        this.resumeSlideShows();
    };

    this.getNewURL = function(page) {
        var urlParts = ["projects"];

        var search = this.$search.val();
        if (search.trim() !== "") {
            urlParts.push(search);
        }

        if (page > 1) {
            urlParts.push(page);
        }

        return  "/" + urlParts.join("/") + "/";
    };

    this.getNewTitle = function(page) {
        var title = JPI.projects.titleStart;
        var search = this.$search.val();

        if (search.trim() !== "") {
            title += " with " + search;
        }

        if (page > 1) {
            title += " - Page " + page;
        }

        title += JPI.projects.titleEnd;

        return title;
    };

    this.storeLatestSearch = function() {
        var search = this.$search.val();
        var page = this.page;
        var title = this.getNewTitle(page);
        var url = this.getNewURL(page);
        var state = {
            search: search,
            page: page,
        };

        this.url.pathname = url;
        document.title = title;
        history.pushState(state, title, this.url.toString());

        if (typeof ga !== "undefined") {
            ga("set", "page", url);
            ga("send", "pageview");
        }
    };

    // Sends request when the user has done a search
    this.doSearch = function() {
        this.page = 1;
        this.storeLatestSearch();
        this.getProjects();
        return false;
    };

    this.scrollToProjects = function() {
        JPI.scrollTo(this.$projects, 20);
    };

    this.initListeners = function() {
        jQuery(".search-form").on("submit", this.doSearch.bind(this));

        this.$projects.on("click", ".project__read-more", this.openProjectModal.bind(this));

        this.$modal.on("closed", this.onProjectModalClose.bind(this));

        var expandedSlideShow = jQuery(".expanded-slide-show");
        expandedSlideShow.on("opened", this.pauseSlideShows.bind(this));
        expandedSlideShow.on("closed", this.resumeSlideShows.bind(this));

        this.$body.on("click", ".project__skill", function(e) {
            projects.modal.close();
            e.preventDefault();
            projects.scrollToProjects();

            var skill = e.target.innerHTML;

            if (skill === projects.$search.val() && projects.page === 1) {
                return;
            }

            projects.$search.val(skill);
            projects.doSearch();
        });

        this.$pagination.on("click", ".pagination__link", function(e) {
            e.preventDefault();
            e.stopPropagation();

            var page = jQuery(e.target).text();
            page = JPI.getInt(page, 1);

            if (projects.page === page) {
                return;
            }

            projects.page = page;
            projects.scrollToProjects();
            projects.storeLatestSearch();
            projects.getProjects();
        });

        window.addEventListener("popstate", function(e) {
            var state = e.state || {};
            var page = state.page || 1;

            document.title = projects.getNewTitle(page);

            projects.page = JPI.getInt(page, 1);
            projects.$search.val(state.search || "");

            projects.scrollToProjects();
            projects.getProjects();
        });

        jQuery(window).on("orientationchange resize", JPI.debounce(this.bottomAlignProjectFooters, 200));
    };

    this.init = function() {
        this.initListeners();

        this.gotProjects(JPI.projects.apiResponse);

        this.$body.on("click", ".js-expandable-image", function(e) {
            projects.modal.close();
            var expandedSlideShow = new JPI.ExpandedSlideShow();
            expandedSlideShow.open(e.target, '.js-expandable-image-group');
        });
    };

    jQuery(window).on("jpi-css-loaded", this.init.bind(this));
}));
