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
			jQuery(".projects__loading-img").hide("fast");
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
			if (project.images[0]) {
				var imageReg = new RegExp("{{file}}", "g");
				slideTemplate = slideTemplate.replace(imageReg, project.images[0].file);
			}

			jQuery(".slide-show__slides-container").append(slideTemplate);
			jQuery(".js-slide-show-bullets").append(bulletTemplate);

			if (!project.images[0]) {
				jQuery("#slide-" + project.id + " .slide-show__img").remove();
			}

			var projectLinks = jQuery("#slide-" + project.id + " .project-info__links")[0];

			if (project.link) {
				jpi.helpers.createElement(projectLinks, "a", {
					href: project.link,
					innerHTML: "<i class='fa fa-external-link fa-2x'></i>",
					class: "btn btn--clear",
					target: "_blank"
				});
			}

			jpi.helpers.createElement(projectLinks, "a", {
				href: project.github,
				innerHTML: "<i class='fa fa-github fa-2x'></i>",
				class: "btn btn--clear",
				target: "_blank"
			});
		},

		//sets up events when projects is received
		gotProjects: function (response) {
			jQuery(".feedback--error, .projects__loading-img").text("").hide("fast");

			//send the data, the function to do if data is valid
			var dataValid = jpi.ajax.loopThroughData(response, fn.renderProject, fn.renderError, "Error Getting the Projects.");

			if (dataValid) {
				jpi.slideShow.setUp("#slide-show--home");
			}

			jpi.footer.delayExpand();
		},

		init: function () {
			if (jQuery("#slide-show--home").length > 0) {

				fn.initSecondsCounter();

				jQuery(".projects__loading-img").show("fast");
				jpi.ajax.sendRequest({
					method: "GET",
					url: jpi.config.jpiAPIEndpoint + "projects/",
					query: {limit: 3},
					load: fn.gotProjects,
					error: fn.renderError
				});
			}
		}
	};

	jQuery(document).on("ready", fn.init);

}(jQuery));