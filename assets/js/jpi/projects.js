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
			jQuery(".projects__loading-img, .pagination").text("").hide("fast");
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
						searches = jQuery(".search-form__input").val().split(" ");

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

			jQuery(".detailed-project").addClass("open").show();
			document.body.style.overflow = "hidden";

			//stops all the slide shows
			jpi.slideShow.loopThroughSlideShows(jpi.slideShow.stopSlideShow);

			jQuery(".detailed-project .project__links, .detailed-project .project__skills, .detailed-project .slide-show__slides-container, .detailed-project .js-slide-show-bullets").text("");

			jQuery(".detailed-project .project__title").text(project.Name);
			jQuery(".detailed-project .project__date").text(project.Date);

			fn.addSkills(project, ".detailed-project");

			jQuery(".detailed-project .project__description").html(project.LongDescription);

			fn.addLinks(project, ".detailed-project");

			fn.addProjectPictures(project, "#detailed-project__slide-show");

			var regx = new RegExp("slide-show__nav--\\w*", 'g');

			jQuery(".detailed-project .slide-show__nav").each(function () {
				var classList = jQuery(this).attr("class");
				classList = classList.replace(regx, 'slide-show__nav--' + project.Colour);
				jQuery(this).attr("class", classList);
			});
		},

		closeProjectsExpandModal: function (event) {
			if (!jQuery(event.target).closest('.modal__content').length && jQuery(".detailed-project").hasClass("open")) {

				jQuery(".detailed-project").removeClass("open").hide();

				document.body.style.overflow = "auto";

				jQuery("#detailed-project__slide-show .slide-show__viewpoint")[0].removeEventListener("mousedown", jpi.slideShow.dragStart);
				jQuery("#detailed-project__slide-show .slide-show__viewpoint")[0].removeEventListener("touchstart", jpi.slideShow.dragStart);

				jQuery("#detailed-project__slide-show .slide-show__slides-container").css("left", "0px");

				clearInterval(jpi.slideShow.slideShows["#detailed-project__slide-show"]);

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
					ul = jQuery(".pagination")[0];
				
				var currentPage = jQuery(".js-projects-page").val();
				currentPage = Number.isInteger(parseInt(currentPage)) ? parseInt(currentPage) : 1;

				for (var i = 0; i < count; i += 10, page++) {
					var attributes = {"class": "pagination__item"};

					var item = jpi.helpers.createElement(ul, "li", attributes);
					
					var url = "/projects/";
					
					var searchValue = jQuery(".search-form__input").val();
					
					if (searchValue.trim() !== "") {
						url += searchValue + "/";
					}
					
					if (page > 1) {
						url += page + "/";
					}
					
					url += global.url.search;

					attributes = {innerHTML: page, "class": "pagination__item-link js-pagination-item", "data-page": page, "href": url};
					if (page === currentPage) {
						attributes.class = "pagination__item-link active";
					}
					jpi.helpers.createElement(item, "a", attributes);
				}

				jQuery(".pagination").show();
			}
			else {
				jQuery(".pagination").hide();
			}
		},

		//set up events when projects were received
		gotProjects: function (result) {
			jQuery(".feedback--error, .projects__loading-img").text("").hide("fast");
			jQuery(".projects, .pagination").text("");

			//send the data, the function to do if data is valid
			jpi.ajax.loopThroughData(result, fn.renderProject, fn.renderError, "No Projects Found.");

			if (result.count) {
				fn.addPagination(result.count);
			}

			jpi.footer.delayExpand();
		},

		getProjects: function () {
			
			var page = jQuery(".js-projects-page").val();
			page = Number.isInteger(parseInt(page)) ? parseInt(page) : 1;
			
			var search = jQuery(".search-form__input").val();
			
			var query = {
				page: page,
				search: search
			};
			
			//stops all the slide shows
			jpi.slideShow.loopThroughSlideShows(jpi.slideShow.stopSlideShow);

			//send request to get projects
			jpi.ajax.sendRequest({
				method: "GET",
				url: jpi.config.apiEndpoint + "projects/",
				query: query,
				load: fn.gotProjects,
				error: fn.renderError
			});
		},
		
		storeLatestSearch: function () {
			var url = "/projects/";
			
			var searchValue = jQuery(".search-form__input").val();
			
			if (searchValue.trim() !== "") {
				url += searchValue + "/";
			}
			
			var page = jQuery(".js-projects-page").val();
			page = Number.isInteger(parseInt(page)) ? parseInt(page) : 1;
			
			if (page > 1) {
				url += page + "/";
			}
			
			global.url.pathname = url;
			
			var state = {
				search: searchValue,
				page: page
			};
			
			history.pushState(state, null, global.url.toString());
		},

		//send request when the user has done a search
		doSearch: function () {
			jQuery(".js-projects-page").val(1);

			fn.storeLatestSearch();

			fn.getProjects();
			return false;
		},

		//set up page
		initListeners: function () {
			jQuery(".search-form").on("submit", fn.doSearch);

			jQuery("body").on("click", ".js-searchable-skill", function (e) {
				jQuery(".detailed-project").trigger("click");
				jQuery(".search-form__input").val(e.target.innerHTML);
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
				
				jQuery(".js-projects-page").val(page);
				
				fn.storeLatestSearch();
				fn.getProjects();
			});

			jQuery(".projects").on("click", ".js-open-modal", fn.openProjectsExpandModal);

			window.addEventListener('popstate', function (event) {
				jQuery(".js-projects-page").val(event.state.page);
				jQuery(".search-form__input").val(event.state.search);
				
				fn.scrollToProjects();
				fn.getProjects();
			});

			//Close the modal
			jQuery(".detailed-project").on("click", fn.closeProjectsExpandModal);
		},

		init: function () {
			if (jQuery(".js-all-projects").length > 0) {
				fn.initListeners();
				fn.getProjects();
			}
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));