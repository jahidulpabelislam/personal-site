angular.module('projectsAdmin', ['ui.sortable'])
    .directive("fileUpload", function() {
        return {
            restrict: 'A',
            scope: true,
            link: function($scope, $element, $attr) {

                $element.bind("change", function() {
                    for (var i = 0; i < $element[0].files.length; i++) {
                        $scope.checkFile($element[0].files[i]);
                    }
                });
            }
        };
    })
    .controller('projectsAdminController', function($scope, $http) {

        var addFeedback = function(result, genericFeedback) {
            if (result && result.data && result.data.meta && result.data.meta.feedback) {
	            return result.data.meta.feedback;
            }
            else {
	            return genericFeedback;
            }
        };

        $scope.hideErrorMessage = function () {
	        jQuery(".feedback--project-form").addClass("hide");

	        window.setTimeout(function () {
		        jQuery(".feedback--project-form").removeClass("feedback--error feedback--success");
		        $scope.projectFormFeedback = '';
	        }, 500);
        };

	    $scope.showErrorMessage = function (message, classToAdd) {
		    jQuery(".feedback--project-form").removeClass("feedback--error feedback--success hide").addClass(classToAdd);
		    $scope.projectFormFeedback = message;
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

        //send a image to API with the username and password of user
        $scope.sendImage = function(picture) {

            var form = new FormData();
            //add the picture
            form.append("picture", picture);
            //add the username of user
            form.append("username", $scope.username);
            //add the password of user
            form.append("password", $scope.password);

            $http.post("/admin/api/1/pictures/" + $scope.selectedProject.ID, form, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined,'Process-Data': false}
            }).then(function(result) {
                $scope.selectedProject.pictures.push(result.data.rows[0]);
            }, function(result) {
                var message = addFeedback(result, "Error uploading the Project Image.");
	            $scope.showErrorMessage(message, "feedback--error");
            });
        };

        //set image as failed upload div to display error
        var renderFailedUpload = function(errorMessage) {
            $scope.uploads.push({ok: false, text: errorMessage});
            $scope.$apply();
            jpi.footer.delayExpand();
        };

        $scope.checkFile = function(file) {

            var fileReader;

            //checks if file is a image
            if (file.type.includes("image/")) {

                //gets image
                fileReader = new FileReader();

                fileReader.onload = function(e) {
                    $scope.uploads.push({ok: true, text: file.name, image: e.target.result, file: file});
                    $scope.$apply();
                    jpi.footer.delayExpand();
                };

                fileReader.onerror = function() {
                    renderFailedUpload("Error getting " + file.name);
                };

                fileReader.readAsDataURL(file);
            }
            //else it isn't a image so show its failed
            else {
                renderFailedUpload(file.name + " isn't a image.");
            }
        };

        //read item dropped
        var readItem = function(item) {
                //creates variable for later
                var directoryReader, i;

                //checks if item is file
                if (item.isFile) {

                    //gets file
                    item.file(function(file) {
                        $scope.checkFile(file);
                    });
                }
                //checks if its a directory
                else if (item.isDirectory) {

                    //Get folder content
                    directoryReader = item.createReader();
                    directoryReader.readEntries(function(entries) {
                        //loop through each directory item
                        for (i = 0; i < entries.length; i++) {
                            readItem(entries[i]);
                        }
                    });

                }
                //else drop of item has failed therefore show its failed
                else {
                    renderFailedUpload("Error processing upload - " + item.name);
                }
            },

            //when a drag over starts
            dragOver = function(e) {

                //stop default events
                e.preventDefault();
                e.stopPropagation();

                //make drop zone visible
                jQuery(".drop-zone")[0].style.zIndex = "10";
                jQuery(".drop-zone")[0].style.opacity = "1";
            },

            removeDropZone = function(e) {
                //stop default events
                e.preventDefault();
                e.stopPropagation();

                //make drop zone invisible
                jQuery(".drop-zone")[0].style.opacity = "0";
                setTimeout(function() {
                    jQuery(".drop-zone")[0].style.zIndex = "-10";
                }, 1000);
            },

            //when drop of item (file/directory) has occurred
            drop = function(e) {

                var items, i;

                removeDropZone(e);

                //gets the items (files/directories) dropped
                items = e.dataTransfer.items;

                //loop through each item (file/directory) dropped
                for (i = 0; i < items.length; i++) {
                    //send a item (file/directory) to be read
                    readItem(items[i].webkitGetAsEntry());
                }
            },

            //stop drag and drop to work
            dragNDropStop = function() {
                window.removeEventListener("dragover", dragOver);
                window.removeEventListener("drop", drop);
            },

            //this allows drag and drop to work, sets up all listeners needed
            dragNDropSetUp = function() {

                //sets up listener for when a drag occurs
                window.addEventListener("dragover", dragOver);

                //sets up listener for when a drop happens
                window.addEventListener("drop", drop);

                //when user leaves the area, make drop zone invisible
                jQuery(".drop-zone")[0].addEventListener("dragleave", removeDropZone);
            };

        //render a project image delete
        var deletedProjectImage = function(result) {
	        $scope.projectFormFeedback = '';

	        var message = "Error deleting the Project Image.";
	        var feedbackClass = "feedback--error";

            //check if the deletion of project image has been processed
            if (result.data.rows && result.data.rows.file) {

                var i = 0, found = false;
                //find and remove the image
                for (i = 0; i < $scope.selectedProject.pictures.length; i++) {
                    if ($scope.selectedProject.pictures[i]["File"] === result.data.rows.file) {
                        delete $scope.selectedProject.pictures[i];
                        found = true;
                        return;
                    }
                }

                if (found){
	                message = "Successfully deleted the Project Image.";
	                feedbackClass = "feedback--success"
                }
            }

	        $scope.showErrorMessage(message, feedbackClass);

            jpi.footer.delayExpand();
        };

        //send a request to delete a project image
        $scope.deleteProjectImage = function(projectImage) {
            $http({
                url: "/admin/api/1/pictures/" + projectImage.ProjectID,
                method: "POST",
                params: {
                    username: $scope.username,
                    password: $scope.password,
                    file: projectImage.File
                }
            }).then(deletedProjectImage, function(result) {
	            var message = addFeedback(result, "Error deleting the Project Image.");
	            $scope.showErrorMessage(message, "feedback--error");
            });
        };

        $scope.addSkill = function() {
            $scope.selectedProject.Skills.push($scope.skillInput);
	        $scope.skillInput = "";
        };

        $scope.deleteSkill = function(skill) {
            var index =  $scope.selectedProject.Skills.indexOf(skill);
            $scope.selectedProject.Skills.splice(index, 1);
        };

        $scope.submitProject = function() {
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

                $scope.selectedProject.pictures.forEach(function(picture, i) {
                    picture.Number = i+1;
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
                }).then(function(result) {
                    result.data.rows[0].Date = new Date(result.data.rows[0].Date);
                    if (typeof  result.data.rows[0].Skills == "string")
                        result.data.rows[0].Skills =  result.data.rows[0].Skills.split(",");
                    $scope.selectedProject = result.data.rows[0];

	                var message = addFeedback(result, "Successfully saved project.");
	                $scope.showErrorMessage(message, "feedback--success");
                }, function(result) {
	                var message = addFeedback(result, "Error sending the project.");
	                $scope.showErrorMessage(message, "feedback--error");
                });

            } else {
	            var message = "Fill in Required Inputs Fields.";
	            $scope.showErrorMessage(message, "feedback--error");
            }
        };

        $scope.setUpProjectForm = function() {
            $scope.skillInput = "";

            jQuery(".project-form-container").show();
            jQuery(".select-project-container").hide();

            jQuery("#projectName, #skills, #description, #github, #date").removeClass("invalid");

            jpi.footer.delayExpand();
        };

        $scope.setUpAddProject = function() {
            $scope.selectProjectFeedback = "";
            $scope.setUpProjectForm();

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

        $scope.setUpEditProject = function() {
            $scope.selectProjectFeedback = "";

            if ($scope.selectedProject && $scope.selectedProject.ID) {
                dragNDropSetUp();
                $scope.setUpProjectForm();
                $(".project-images-uploads").sortable();
                $(".project-images-uploads").disableSelection();
            } else {
                $scope.selectProjectFeedback = "Select A Project To Update.";
            }

        };

        var renderProjectDelete = function(result) {
            $scope.selectProjectFeedback = "";
            //check if project delete has been processed
            if (result.data.rows && result.data.rows.projectID) {

                $scope.getProjectList(1);
            } else {
                //else check if there if feedback to print
                $scope.selectProjectFeedback = addFeedback(result, "Error deleting your project.");
            }

            jpi.footer.delayExpand();
        };

        $scope.deleteProject = function() {
            $scope.selectProjectFeedback = "";
            if ($scope.selectedProject && $scope.selectedProject.ID) {
                $http({
                    url: "/admin/api/1/projects/" + $scope.selectedProject.ID,
                    method: "POST",
                    params: {username: $scope.username, password: $scope.password, method: "DELETE"}
                }).then(renderProjectDelete, function(result) {
                    $scope.selectProjectFeedback = addFeedback(result, "Error deleting your project.");
                });
            } else {
                $scope.selectProjectFeedback = "Select A Project To Delete.";
            }

            jpi.footer.delayExpand();
        };

        $scope.selectProject = function(project) {
            $scope.selectedProject = project;

            if (typeof project.Skills == "string")
                $scope.selectedProject.Skills = project.Skills.split(",");

            $scope.selectedProject.Date = new Date(project.Date);
        };

        var gotProjects = function(result) {
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
        };

        $scope.getProjectList = function(page) {

            $scope.selectProjectFeedback = "";

            $scope.currentPage = page;

            dragNDropStop();

            //Sends a object with necessary data to XHR
            $http({
                url: "/admin/api/1/projects",
                method: "GET",
                params: {page: $scope.currentPage}
            }).then(gotProjects, function(result) {
                $scope.selectProjectFeedback = addFeedback(result, "Error getting projects.");
            });
        };

        //after user has attempted to log in
        var loggedIn = function(result) {

            //check if data was valid
            if (result.data.rows && result.data.rows.username && result.data.rows.password) {
                //make the log in/sign up form not visible
                jQuery(".login-form-container").hide();

                $scope.getProjectList(1);
            }
            //check if feedback was provided or generic error message
            else {
                $scope.userFormFeedback = addFeedback(result, "Error logging you in.");
            }
        };

        $scope.logIn = function() {
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
                    url: "/admin/api/1/login",
                    method: "POST",
                    params: {username: $scope.username, password: $scope.password}
                }).then(loggedIn, function(result) {
                    $scope.userFormFeedback = addFeedback(result, "Error logging you in.");
                });
            }
        };

        jQuery(".js-hide-error").on("click",  $scope.hideErrorMessage);
    });

