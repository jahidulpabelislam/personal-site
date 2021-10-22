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

    this.$projectType = jQuery(".js-project-type");

    this.$projects = jQuery(".projects__items");

    this.$loading = jQuery(".projects__loading");
    this.$error = jQuery(".projects__error");
    this.$pagination = jQuery(".projects__pagination");

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

        var skills = project.skills;
        for (var i = 0; i < skills.length; i++) {
            var skill = skills[i].trim();

            if (skill === "") {
                continue;
            }

            JPI.renderNewElement("span", $skills, {
                text: skill,
                class: "project__skill",
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
        if (!project.images || !project.images.length) {
            return;
        }

        var $slideShow = jQuery(containerSelector).find(".slide-show");
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
            bulletTemplate.renderIn($slideShowBullets);
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
            filters: {
                type_id: this.$projectType.filter(":checked").val(),
            },
            page: this.page,
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

        this.modal.open();

        this.modalSlideShow.start();
    };

    this.onProjectModalClose = function() {
        this.modalSlideShow.stop();
        this.$modalSlidesContainer.css({
            width: "",
            left: "",
        });
    };

    this.getNewURL = function(page) {
        var urlParts = ["projects"];

        if (page > 1) {
            urlParts.push(page);
        }

        return  "/" + urlParts.join("/") + "/";
    };

    this.getNewTitle = function(page) {
        var title = JPI.projects.titleStart;

        if (page > 1) {
            title += " - Page " + page;
        }

        title += JPI.projects.titleEnd;

        return title;
    };

    this.storeLatestSearch = function() {
        var page = this.page;
        var title = this.getNewTitle(page);
        var url = this.getNewURL(page);
        var state = {
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

    this.scrollToProjects = function() {
        JPI.scrollTo(this.$projects, 20);
    };

    this.initListeners = function() {
        this.$projectType.on("change", function(e) {
            projects.getProjects();
        });

        this.$projects.on("click", ".project__read-more", this.openProjectModal.bind(this));

        this.$modal.on("closed", this.onProjectModalClose.bind(this));

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

            projects.scrollToProjects();
            projects.getProjects();
        });
    };

    this.init = function() {
        this.initListeners();

        this.gotProjects(JPI.projects.apiResponse);

        this.$body.on("click", ".js-expandable-image", function(e) {
            var expandedSlideShow = new JPI.ExpandedSlideShow();
            expandedSlideShow.open(e.target, '.js-expandable-image-group');
        });
    };

    jQuery(window).on("jpi-css-loaded", this.init.bind(this));
}));
