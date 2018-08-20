//holds all the functions needed to display project in the projects page
window.jpi = window.jpi || {};
window.jpi.projects = (function (jQuery) {

	"use strict";

	//grabs elements for later use
	var global = {
		url: new URL(window.location)
	};

	var fn = {
		//prints out a error message provided
		renderError: function (error) {
			jQuery(".feedback--error").text(error).show("fast");
			jQuery(".projects-loading-img, .pagination").text("").hide("fast");
			jpi.footer.delayExpand();
		},

		addSkills: function (project, divID) {
			var skills = project.Skills.split(","),
					skillsContainer = jQuery(divID + " .project__skills")[0];

			for (var i = 0; i < skills.length; i++) {
				if (skills[i].trim() !== "") {

					var skill = jpi.helpers.createElement(skillsContainer, "p", {
								innerHTML: skills[i],
								class: "js-searchable-skill skill skill--" + project.Colour
							}),
							searches = jQuery(".search-input")[0].value.split(" ");

					for (var j = 0; j < searches.length; j++) {
						if (searches[j].trim() !== "" && skills[i].toLowerCase().includes(searches[j].toLowerCase())) skill.className += " searched";
					}
				}
			}
		},

		addLinks: function (project, divID) {
			var linksp = jQuery(divID + " .project__links")[0];

			if (project.Link) {
				jpi.helpers.createElement(linksp, "a", {
					href: project.Link,
					title: "Link to " + project.Name + " Site",
					target: "_blank",
					innerHTML: "<i class='fa fa-external-link fa-2x'></i>",
					class: "project__link project__link--" + project.Colour
				});
			}

			if (project.Download) {
				jpi.helpers.createElement(linksp, "a", {
					href: project.Download,
					title: "Link to Download " + project.Name,
					target: "_blank",
					innerHTML: "<i class='fa fa-download fa-2x'></i>",
					class: "project__link project__link--" + project.Colour
				});
			}

			jpi.helpers.createElement(linksp, "a", {
				href: project.GitHub,
				title: "Link to " + project.Name + "  Code On GitHub",
				target: "_blank",
				innerHTML: "<i class='fa fa-github fa-2x'></i>",
				class: "project__link project__link--" + project.Colour
			});
		},

		addProjectPictures: function (project, slideShowId) {
			var slidesContainer = jQuery(slideShowId + " .slide-show__slides-container"),
					slideShowBullets = jQuery(slideShowId + " .js-slide-show-bullets");

			//loop through each row of data in rows
			for (var i = 0; i < project.Pictures.length; i++) {

				if (project.Pictures.hasOwnProperty(i)) {

					var slideTemplate = jQuery('#tmpl-slide-template').text();
					var bulletTemplate = jQuery('#tmpl-slide-bullet-template').text();

					for (var data in project.Pictures[i]) {
						if (project.Pictures[i].hasOwnProperty(data)) {
							if (typeof data === "string") {
								var reg = new RegExp("{{" + data + "}}", "g");
								slideTemplate = slideTemplate.replace(reg, project.Pictures[i][data]);
								bulletTemplate = bulletTemplate.replace(reg, project.Pictures[i][data]);
							}
						}
					}
					var colourReg = new RegExp("{{Colour}}", "g");
					slideTemplate = slideTemplate.replace(colourReg, project.Colour);
					bulletTemplate = bulletTemplate.replace(colourReg, project.Colour);

					var idReg = new RegExp("{{Slide-Show-ID}}", "g");
					bulletTemplate = bulletTemplate.replace(idReg, slideShowId);

					slidesContainer.append(slideTemplate);
					slideShowBullets.append(bulletTemplate);
				}
			}

			if (project.Pictures.length > 0) {
				jpi.slideShow.setUp(slideShowId);
			}
		},

		openProjectsExpandModal: function () {
			var project = jQuery(this).data("projectData");

			jQuery(".modal--detailed-project").addClass("open").show();
			document.body.style.overflow = "hidden";

			//stops all the slide shows
			jpi.slideShow.loopThroughSlideShows(jpi.slideShow.stopSlideShow);

			jQuery(".modal--detailed-project .project__links, .modal--detailed-project .project__skills, .modal--detailed-project .slide-show__slides-container, .modal--detailed-project .js-slide-show-bullets").text("");

			jQuery(".modal--detailed-project .project-title").text(project.Name);
			jQuery(".modal--detailed-project .project-date").text(project.Date);

			fn.addSkills(project, ".modal--detailed-project");

			jQuery(".modal--detailed-project .description").html(project.LongDescription);

			fn.addLinks(project, ".modal--detailed-project");

			fn.addProjectPictures(project, "#detailed-project__slide-show");

			var regx = new RegExp("slide-show__nav--\\w*", 'g');

			jQuery(".modal--detailed-project .slide-show__nav").each(function () {
				var classList = jQuery(this).attr("class");
				classList = classList.replace(regx, 'slide-show__nav--' + project.Colour);
				jQuery(this).attr("class", classList);
			});
		},

		closeProjectsExpandModal: function (event) {
			if (!jQuery(event.target).closest('.modal__content').length && jQuery(".modal--detailed-project").hasClass("open")) {
				jQuery(".modal--detailed-project").removeClass("open").hide();
				document.body.style.overflow = "auto";
				jQuery("#detailed-project__slide-show .slide-show__viewpoint")[0].removeEventListener("mousedown", jpi.slideShow.dragStart);
				jQuery("#detailed-project__slide-show .slide-show__viewpoint")[0].removeEventListener("touchstart", jpi.slideShow.dragStart);
				jQuery("#detailed-project__slide-show .slide-show__slides-container").css("left", "0px");
				clearInterval(autoSlide["#detailed-project__slide-show"]);
				jQuery("#detailed-project__slide-show").removeClass("hasSlideShow");
				jpi.slideShow.loopThroughSlideShows(jpi.slideShow.startSlideShow);
			}
		},

		//renders a project
		renderProject: function (project) {

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
				jQuery(".projects").append(template);

				fn.addSkills(project, "#project--" + project.ID);
				fn.addLinks(project, "#project--" + project.ID);
				fn.addProjectPictures(project, "#slide-show--" + project.ID);

				jQuery("#project--" + project.ID + " .js-open-modal").data("projectData", project);
			}

			jpi.footer.delayExpand();
		},

		scrollToProjects: function () {
			jQuery('html, body').animate({
				scrollTop: jQuery(".projects").offset().top - jQuery(".nav").height()
			}, 2000);
		},

		//adds pagination to the page
		addPagination: function (count) {
			if ((parseInt(count)) > 10) {

				var page = 1,
						ul = jQuery(".pagination")[0],
						path = global.url.pathname.substring(1).split('/');

				if (Number.isInteger(parseInt(path[1]))) {
					var currentPage = parseInt(path[1]);
				}

				if (!currentPage) currentPage = 1;

				for (var i = 0; i < count; i += 10, page++) {
					var attributes = {"class": "pagination__item"};

					var item = jpi.helpers.createElement(ul, "li", attributes);

					attributes = {innerHTML: page, "class": "pagination__item-link js-pagination-item", "data-page": page, "href": "/projects/"+page+"/"+global.url.search};
					if (page === currentPage) {
						attributes.class = "pagination__item-link active";
					}
					var link = jpi.helpers.createElement(item, "a", attributes);
				}

				jQuery(".pagination").show();
			} else {
				jQuery(".pagination").hide();
			}
		},

		//set up events when projects were received
		gotProjects: function (result) {
			jQuery(".feedback--error, .projects-loading-img").text("").hide("fast");
			jQuery(".projects, .pagination").text("");

			//send the data, the function to do if data is valid
			jpi.ajax.loopThroughData(result, fn.renderProject, fn.renderError, "No Projects Found.");

			if (result.count) {
				fn.addPagination(result.count);
			}

			jpi.footer.delayExpand();
		},

		getProjects: function (query) {
			//stops all the slide shows
			jpi.slideShow.loopThroughSlideShows(jpi.slideShow.stopSlideShow);

			jQuery(".projects-loading-img").show("fast");

			//send request to get projects
			jpi.ajax.sendRequest({
				method: "GET",
				url: "/api/2/projects/",
				query: query,
				load: fn.gotProjects,
				error: fn.renderError
			});
		},

		//send request when the user has done a search
		doSearch: function () {
			var query = {};

			global.url.pathname = "/projects/";
			if (jQuery(".search-input")[0].value.trim() !== "") {
				global.url.search = "?search=" + jQuery(".search-input")[0].value;
				query.search = jQuery(".search-input")[0].value;
			} else {
				jQuery(".search-input")[0].value = global.url.search = "";
			}

			history.pushState(null, null, global.url.toString());

			fn.getProjects(query);
			return false;
		},

		//get the search query from URL if any
		getSearch: function () {
			var searches = global.url.search.substring(1).split('&'),

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
		load: function () {

			var query = {},
					path = global.url.pathname.substring(1).split('/');

			//check if pagination is involved
			if (path[1] && Number.isInteger(parseInt(path[1]))) {
				query.page = parseInt(path[1]);
			}

			//check if search in involved
			var search = fn.getSearch();
			if (search) {
				query.search = jQuery(".search-input")[0].value = search;
			} else {
				jQuery(".search-input").val("");
			}

			fn.getProjects(query);
		},

		//set up page
		initListeners: function () {
			jQuery(".search-form").on("submit", fn.doSearch);

			jQuery("body").on("click", ".js-searchable-skill", function (e) {
				jQuery(".search-input")[0].value = e.target.innerHTML;
				fn.doSearch();
			});

			jQuery(".pagination--projects").on("click", ".js-pagination-item", function (e) {
				e.preventDefault();
				e.stopPropagation();

				fn.scrollToProjects();

				var page = jQuery(this).attr("data-page");
				if (!page) {
					page = 1;
				}

				global.url.pathname = "/projects/" + page + "/";
				history.pushState(null, null, global.url.toString());
				fn.load();
			});

			jQuery(".projects").on("click", ".js-open-modal", fn.openProjectsExpandModal);

			window.addEventListener('popstate', function () {
				global.url = new URL(window.location);
				fn.scrollToProjects();
				fn.load();
			});

			//Close the modal
			jQuery(".modal--detailed-project").on("click", fn.closeProjectsExpandModal);
		},

		init: function () {
			if (jQuery(".projects").length > 0) {
				fn.initListeners();
				fn.load();
			}
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));