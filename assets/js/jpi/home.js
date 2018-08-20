//holds all functions needed to display latest 3 project on the home page
window.jpi = window.jpi || {};
window.jpi.home = (function (jQuery) {

	"use strict";

	var fn = {

		initSecondsCounter: function () {
			var secsElem = jQuery(".js-seconds-on-site");
			if (secsElem.length > 0) {
				setTimeout(function () {
					setInterval(function () {
						var lastSec = secsElem.text();
						lastSec = parseInt(lastSec);
						secsElem.text(lastSec + 1);
					}, 1000);
				}, 1000);
			}
		},

		//prints out a error message provided
		renderError: function (error) {
			jQuery(".feedback--error").text(error).show("fast");
			jQuery(".projects-loading-img").hide("fast");
			jpi.footer.delayExpand();
		},

		//renders a project
		renderProject: function (project) {
			var slideTemplate = jQuery('#tmpl-slide-template').text();
			var bulletTemplate = jQuery('#tmpl-slide-bullet-template').text();

			for (var data in project) {
				if (project.hasOwnProperty(data)) {
					if (typeof data === "string") {
						var reg = new RegExp("{{" + data + "}}", "g");
						slideTemplate = slideTemplate.replace(reg, project[data]);
						bulletTemplate = bulletTemplate.replace(reg, project[data]);
					}
				}
			}
			if (project.Pictures[0]) {
				var imageReg = new RegExp("{{File}}", "g");
				slideTemplate = slideTemplate.replace(imageReg, project.Pictures[0].File);
			}

			jQuery(".slide-show__slides-container").append(slideTemplate);
			jQuery(".js-slide-show-bullets").append(bulletTemplate);

			if (!project.Pictures[0]) {
				jQuery("#slide--" + project.ID + " .slide").remove();
			}

			var projectLinks = jQuery("#slide--" + project.ID + " .project-description__links")[0];

			if (project.Link) {
				jpi.helpers.createElement(projectLinks, "a", {
					href: project.Link,
					innerHTML: "<i class='fa fa-external-link fa-2x'></i>",
					class: "btn btn--clear",
					target: "_blank"
				});
			}

			jpi.helpers.createElement(projectLinks, "a", {
				href: project.GitHub,
				innerHTML: "<i class='fa fa-github fa-2x'></i>",
				class: "btn btn--clear",
				target: "_blank"
			});
		},

		//sets up events when projects is received
		gotProjects: function (result) {
			jQuery(".feedback--error, .projects-loading-img").text("").hide("fast");

			//send the data, the function to do if data is valid
			var dataValid = jpi.ajax.loopThroughData(result, fn.renderProject, fn.renderError, "Error Getting the Projects.");

			if (dataValid) {
				jpi.slideShow.setUp("#slide-show--projects-preview");
			}

			jpi.footer.delayExpand();
		},

		init: function () {
			if (jQuery("#slide-show--projects-preview").length > 0) {

				fn.initSecondsCounter();

				jQuery(".projects-loading-img").show("fast");
				jpi.ajax.sendRequest({
					method: "GET",
					url: "/api/2/projects/",
					query: {limit: 3},
					load: fn.gotProjects,
					error: fn.renderError
				});
			}
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));