angular.module('projectsAdmin', ['ui.sortable'])
		.directive("fileUpload", function () {
			return {
				restrict: 'A',
				scope: true,
				link: function ($scope, $element) {

					$element.bind("change", function () {
						for (var i = 0; i < $element[0].files.length; i++) {
							$scope.checkFile($element[0].files[i]);
						}
					});
				}
			};
		})
		.controller('projectsAdminController', function ($scope, $http) {

			var global = {
				apiBase: "/admin/api/1/"
			};
			var fn = {
				addFeedback: function (result, genericFeedback) {
					if (result && result.data && result.data.meta && result.data.meta.feedback) {
						return result.data.meta.feedback;
					}
					else {
						return genericFeedback;
					}
				},

				showErrorMessage: function (message, classToAdd) {
					jQuery(".feedback--project-form").removeClass("feedback--error feedback--success hide").addClass(classToAdd);
					$scope.projectFormFeedback = message;
				},

				//set image as failed upload div to display error
				renderFailedUpload: function (errorMessage) {
					$scope.uploads.push({ok: false, text: errorMessage});
					$scope.$apply();
					jpi.footer.delayExpand();
				},

				//render a project image delete
				deletedProjectImage: function (result) {
					$scope.projectFormFeedback = '';

					var message = "Error deleting the Project Image.";
					var feedbackClass = "feedback--error";

					//check if the deletion of project image has been processed
					if (result.data.rows && result.data.rows.file) {

						var i = 0, found = false;
						//find and remove the image
						for (i = 0; i < $scope.selectedProject.pictures.length; i++) {
							if ($scope.selectedProject.pictures[i]["File"] === result.data.rows.file) {
								var pictureToDelete = $scope.selectedProject.pictures[i];
								var index = $scope.selectedProject.pictures.indexOf(pictureToDelete);
								if (index > -1) {
									$scope.selectedProject.pictures.splice(index, 1);
								}
								found = true;
								break;
							}
						}

						if (found) {
							message = "Successfully deleted the Project Image.";
							feedbackClass = "feedback--success"
						}
					}

					fn.showErrorMessage(message, feedbackClass);

					jpi.footer.delayExpand();
				},

				renderProjectDelete: function (result) {
					$scope.selectProjectFeedback = "";
					//check if project delete has been processed
					if (result.data.rows && result.data.rows.projectID) {

						$scope.getProjectList(1);
					} else {
						//else check if there if feedback to print
						$scope.selectProjectFeedback = fn.addFeedback(result, "Error deleting your project.");
					}

					jpi.footer.delayExpand();
				},

				setUpProjectForm: function () {
					$scope.skillInput = "";

					jQuery(".project-form-container").show();
					jQuery(".select-project-container").hide();

					jQuery("#projectName, #skills, #description, #github, #date").removeClass("invalid");

					jpi.footer.delayExpand();
				},

				gotProjects: function (result) {
					jQuery(".project-form-container").hide();
					jQuery(".select-project-container").show();

					$scope.selectedProject = undefined;

					//check if data doesn't exist check there's no feedback
					if (result.data.meta.ok && result.data.rows.length <= 0 && !result.data.meta.feedback) {

						//assume there's no error and no projects to show
						$scope.selectProjectFeedback = "Sorry, no Projects to show.";
						$scope.projects = [];
					} else if (result.data.rows.length > 0) {
						$scope.projects = result.data.rows;
						$scope.pages = [];

						var pages = Math.ceil(result.data.count / 10);

						for (var i = 1; i <= pages; i++) {
							$scope.pages.push(i);
						}
					}

					jpi.footer.delayExpand();
				},

				//after user has attempted to log in
				loggedIn: function (result) {

					//check if data was valid
					if (result.data.rows && result.data.rows.username && result.data.rows.password) {
						//make the log in/sign up form not visible
						jQuery(".login-form-container").hide();

						$scope.getProjectList(1);
					}
					//check if feedback was provided or generic error message
					else {
						$scope.userFormFeedback = fn.addFeedback(result, "Error logging you in.");
					}
				}
			};

			$scope.projects = $scope.pages = $scope.uploads = [];
			$scope.currentPage = 1;

			$scope.selectedProject = {
				Name: "",
				Skills: [],
				LongDescription: "",
				ShortDescription: "",
				Link: "",
				GitHub: "",
				Download: "",
				Date: "",
				Colour: "",
				pictures: []
			};

			$scope.userFormFeedback = $scope.selectProjectFeedback = $scope.projectFormFeedback = $scope.skillInput = "";

			$scope.hideErrorMessage = function () {
				jQuery(".feedback--project-form").addClass("hide");

				window.setTimeout(function () {
					jQuery(".feedback--project-form").removeClass("feedback--error feedback--success");
					$scope.projectFormFeedback = '';
				}, 500);
			};

			//send a image to API with the username and password of user
			$scope.sendImage = function (upload) {

				var form = new FormData();
				//add the picture
				form.append("picture", upload.file);
				//add the username of user
				form.append("username", $scope.username);
				//add the password of user
				form.append("password", $scope.password);

				$http.post(global.apiBase + "pictures/" + $scope.selectedProject.ID, form, {
					transformRequest: angular.identity,
					headers: {'Content-Type': undefined, 'Process-Data': false}
				}).then(function (result) {
					$scope.selectedProject.pictures.push(result.data.rows[0]);
					var index = $scope.uploads.indexOf(upload);
					if (index > -1) {
						$scope.uploads.splice(index, 1);
					}

					var message = "Successfully added a new project image";
					fn.showErrorMessage(message, "feedback--success");
				}, function (result) {
					var message = fn.addFeedback(result, "Error uploading the Project Image.");
					fn.showErrorMessage(message, "feedback--error");
				});
			};

			$scope.checkFile = function (file) {

				var fileReader;

				//checks if file is a image
				if (file.type.includes("image/")) {

					//gets image
					fileReader = new FileReader();

					fileReader.onload = function (e) {
						$scope.uploads.push({ok: true, text: file.name, image: e.target.result, file: file});
						$scope.$apply();
						jpi.footer.delayExpand();
					};

					fileReader.onerror = function () {
						fn.renderFailedUpload("Error getting " + file.name);
					};

					fileReader.readAsDataURL(file);
				}
				//else it isn't a image so show its failed
				else {
					fn.renderFailedUpload(file.name + " isn't a image.");
				}
			};

			//send a request to delete a project image
			$scope.deleteProjectImage = function (projectImage) {
				$http({
					url: global.apiBase + "pictures/" + projectImage.ProjectID,
					method: "POST",
					params: {
						username: $scope.username,
						password: $scope.password,
						file: projectImage.File
					}
				}).then(fn.deletedProjectImage, function (result) {
					var message = fn.addFeedback(result, "Error deleting the Project Image.");
					fn.showErrorMessage(message, "feedback--error");
				});
			};

			$scope.addSkill = function () {
				$scope.selectedProject.Skills.push($scope.skillInput);
				$scope.skillInput = "";
			};

			$scope.deleteSkill = function (skill) {
				var index = $scope.selectedProject.Skills.indexOf(skill);
				$scope.selectedProject.Skills.splice(index, 1);
			};

			$scope.submitProject = function () {
				$scope.projectFormFeedback = '';

				var validDatePattern = /\b[\d]{4}-[\d]{2}-[\d]{2}\b/im,
						projectNameValidation = jpi.helpers.checkInputField(jQuery("#projectName")[0]),
						longDescriptionValidation = jpi.helpers.checkInputField(jQuery("#longDescription")[0]),
						shortDescriptionValidation = jpi.helpers.checkInputField(jQuery("#shortDescription")[0]),
						githubValidation = jpi.helpers.checkInputField(jQuery("#github")[0]),
						dateValidation = jpi.helpers.checkInputField(jQuery("#date")[0]) && validDatePattern.test(jQuery("#date").val());

				if (projectNameValidation && longDescriptionValidation && shortDescriptionValidation && githubValidation && dateValidation) {
					if (!$scope.selectedProject.ID) {
						$scope.selectedProject.ID = "";
					}

					$scope.selectedProject.pictures.forEach(function (picture, i) {
						picture.Number = i + 1;
					});

					$http({
						url: "/admin/api/1/projects/" + $scope.selectedProject.ID,
						method: "POST",
						params: {
							username: $scope.username,
							password: $scope.password,
							projectName: $scope.selectedProject.Name,
							skills: $scope.selectedProject.Skills.join(","),
							longDescription: $scope.selectedProject.LongDescription,
							shortDescription: $scope.selectedProject.ShortDescription,
							link: $scope.selectedProject.Link,
							github: $scope.selectedProject.GitHub,
							download: $scope.selectedProject.Download,
							date: $scope.selectedProject.Date,
							colour: $scope.selectedProject.Colour,
							pictures: angular.toJson($scope.selectedProject.pictures)
						}
					}).then(function (result) {
						result.data.rows[0].Date = new Date(result.data.rows[0].Date);
						if (typeof  result.data.rows[0].Skills == "string")
							result.data.rows[0].Skills = result.data.rows[0].Skills.split(",");
						$scope.selectedProject = result.data.rows[0];

						var message = fn.addFeedback(result, "Successfully saved project.");
						fn.showErrorMessage(message, "feedback--success");
					}, function (result) {
						var message = fn.addFeedback(result, "Error sending the project.");
						fn.showErrorMessage(message, "feedback--error");
					});

				} else {
					var message = "Fill in Required Inputs Fields.";
					fn.showErrorMessage(message, "feedback--error");
				}
			};

			$scope.setUpAddProject = function () {
				$scope.selectProjectFeedback = "";
				fn.setUpProjectForm();

				$scope.selectedProject = {
					Name: "",
					Skills: [],
					LongDescription: "",
					ShortDescription: "",
					Link: "",
					GitHub: "",
					Download: "",
					Date: "",
					Colour: "",
					pictures: []
				};
			};

			$scope.setUpEditProject = function () {
				$scope.selectProjectFeedback = "";

				if ($scope.selectedProject && $scope.selectedProject.ID) {
					window.jpi.dnd.setUp();
					fn.setUpProjectForm();
					$(".project-images-uploads").sortable();
					$(".project-images-uploads").disableSelection();
				} else {
					$scope.selectProjectFeedback = "Select A Project To Update.";
				}
			};

			$scope.deleteProject = function () {
				$scope.selectProjectFeedback = "";
				if ($scope.selectedProject && $scope.selectedProject.ID) {
					$http({
						url: global.apiBase + "projects/" + $scope.selectedProject.ID,
						method: "POST",
						params: {username: $scope.username, password: $scope.password, method: "DELETE"}
					}).then(fn.renderProjectDelete, function (result) {
						$scope.selectProjectFeedback = fn.addFeedback(result, "Error deleting your project.");
					});
				} else {
					$scope.selectProjectFeedback = "Select A Project To Delete.";
				}

				jpi.footer.delayExpand();
			};

			$scope.selectProject = function (project) {
				$scope.selectedProject = project;

				if (typeof project.Skills == "string")
					$scope.selectedProject.Skills = project.Skills.split(",");

				$scope.selectedProject.Date = new Date(project.Date);
			};

			$scope.getProjectList = function (page) {

				$scope.selectProjectFeedback = "";

				$scope.currentPage = page;

				window.jpi.dnd.stop();

				//Sends a object with necessary data to XHR
				$http({
					url: global.apiBase + "projects",
					method: "GET",
					params: {page: $scope.currentPage}
				}).then(fn.gotProjects, function (result) {
					$scope.selectProjectFeedback = fn.addFeedback(result, "Error getting projects.");
				});
			};

			$scope.logIn = function () {
				var usernameValid = jpi.helpers.checkInputField(jQuery("#username")[0]),
						passwordValid = jpi.helpers.checkInputField(jQuery("#password")[0]);

				//checks if inputs both are empty
				if (!usernameValid && !passwordValid) {
					$scope.userFormFeedback = "Input fields needs to be filled.";
				}
				//else checks if username input is empty
				else if (!usernameValid) {
					$scope.userFormFeedback = "Username field needs to be filled.";
				}
				//else checks if password input is empty
				else if (!passwordValid) {
					$scope.userFormFeedback = "Password field needs to be filled.";
				}
				//else inputs are filled
				else {
					$http({
						url: global.apiBase + "login",
						method: "POST",
						params: {username: $scope.username, password: $scope.password}
					}).then(fn.loggedIn, function (result) {
						$scope.userFormFeedback = fn.addFeedback(result, "Error logging you in.");
					});
				}
			};

			jQuery(".js-hide-error").on("click", $scope.hideErrorMessage);

			window.jpi = window.jpi || {};
			window.jpi.admin = {
				checkFile: $scope.checkFile,
				renderFailedUpload: fn.renderFailedUpload
			};
		});