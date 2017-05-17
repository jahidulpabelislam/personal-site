angular.module('projectsAdmin', [])
    .controller('projectsAdminController', function($scope, $http) {

        $scope.projects = $scope.pages = [];
        $scope.currentPage = 1;

        $scope.selectedProject = undefined;

        $scope.userFormFeedback = $scope.selectProjectFeedback = $scope.projectFormFeedback = "";

        //render a project image delete
        var deletedProjectImage = function(result) {
            $scope.projectFormFeedback = "";
            //check if the deletion of project image has been processed
            if (result.data.rows && result.data.rows.file) {

                var i = 0, found = false;
                //find and remove the comment
                for (i = 0; i < $scope.selectedProject.pictures.length; i++) {
                    if ($scope.selectedProject.pictures[i]["File"] === result.data.rows.file) {
                        delete $scope.selectedProject.pictures[i];
                        found = true;
                        return;
                    }
                }

                if (found === false) {
                    $scope.projectFormFeedback = "Error deleting the Project Image.";
                }
            }
            else {
                //else check if there if feedback to print
                $scope.projectFormFeedback = result.data.meta.feedback || "Error deleting the Project Image.";
            }

            delayExpand();
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
                $scope.projectFormFeedback = result.data.meta.feedback || "Error deleting the Project Image.";
            });
        };

        $scope.submitProject = function() {

            $scope.projectFormFeedback = "";

            var validDatePattern = /\b[\d]{4}-[\d]{2}-[\d]{2}\b/im,
                projectNameValidation = checkInputField($("#projectName")[0]),
                skillsValidation = checkInputField($("#skills")[0]),
                longDescriptionValidation = checkInputField($("#longDescription")[0]),
                shortDescriptionValidation = checkInputField($("#shortDescription")[0]),
                githubValidation = checkInputField($("#github")[0]),
                dateValidation = checkInputField($("#date")[0]) && validDatePattern.test($("#date").val());

            if (projectNameValidation && skillsValidation && longDescriptionValidation && shortDescriptionValidation && githubValidation && dateValidation) {
                if (!$scope.selectedProject.ID) {
                    $scope.selectedProject.ID = "";
                }

                $http({
                    url: "/admin/api/1/projects/" + $scope.selectedProject.ID,
                    method: "POST",
                    params: {
                        username: $scope.username,
                        password: $scope.password,
                        projectName: $scope.selectedProject.Name,
                        skills: $scope.selectedProject.Skills,
                        longDescription: $scope.selectedProject.LongDescription,
                        shortDescription: $scope.selectedProject.ShortDescription,
                        link: $scope.selectedProject.Link,
                        github: $scope.selectedProject.GitHub,
                        download: $scope.selectedProject.Download,
                        date: $scope.selectedProject.Date
                    }
                }).then(function(result) {
                    result.data.rows[0].Date = new Date(result.data.rows[0].Date);
                    $scope.selectedProject = result.data.rows[0];
                }, function(result) {
                    $scope.projectFormFeedback = result.data.meta.feedback || "Error sending the project.";
                });

            } else {
                $scope.projectFormFeedback = "Fill in Required Inputs Fields.";
            }
        };

        $scope.setUpProjectForm = function() {

            $("#projectFormContainer").show();
            $("#selectProjectContainer").hide();

            $("#projectName, #skills, #description, #github, #date").removeClass("invalid");

            delayExpand();
        };

        $scope.setUpAddProject = function() {
            $scope.selectProjectFeedback = "";
            $scope.setUpProjectForm();

            $scope.selectedProject = undefined;
        };

        $scope.setUpEditProject = function() {
            $scope.selectProjectFeedback = "";

            if ($scope.selectedProject.ID) {
                // dragNDropSetUp();
                $scope.setUpProjectForm();
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
                $scope.selectProjectFeedback = result.data.meta.feedback || "Error deleting your project.";
            }

            delayExpand();
        };

        $scope.deleteProject = function() {
            $scope.selectProjectFeedback = "";
            if ($scope.selectedProject.ID) {
                $http({
                    url: "/admin/api/1/projects/" + $scope.selectedProject.ID,
                    method: "POST",
                    params: {username: $scope.username, password: $scope.password, method: "DELETE"}
                }).then(renderProjectDelete, function(result) {
                    $scope.selectProjectFeedback = result.data.meta.feedback || "Error deleting your project.";
                });
            } else {
                $scope.selectProjectFeedback = "Select A Project To Delete.";
            }

            delayExpand();
        };

        $scope.selectProject = function(project) {
            $scope.selectedProject = project;
            $scope.selectedProject.Date = new Date(project.Date);
        };

        var gotProjects = function(result) {
            $("#projectFormContainer").hide();
            $("#selectProjectContainer").show();

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

            delayExpand();
        };

        $scope.getProjectList = function(page) {

            $scope.selectProjectFeedback = "";

            $scope.currentPage = page;

            // dragNDropStop();

            //Sends a object with necessary data to XHR
            $http({
                url: "/admin/api/1/projects",
                method: "GET",
                params: {page: $scope.currentPage}
            }).then(gotProjects, function(result) {
                $scope.selectProjectFeedback = result.data.meta.feedback || "Error getting projects."
            });
        };

        //after user has attempted to log in
        var loggedIn = function(result) {

            //check if data was valid
            if (result.data.rows && result.data.rows.username && result.data.rows.password) {
                //make the log in/sign up form not visible
                $("#userFormDiv").hide();

                $scope.getProjectList(1);
            }
            //check if feedback was provided or generic error message
            else {
                $scope.userFormFeedback = result.data.meta.feedback || "Error logging you in.";
            }
        };

        $scope.logIn = function() {

            //checks if inputs both are empty
            if (!checkInputField($("#username")[0]) && !checkInputField($("#password")[0])) {
                $scope.userFormFeedback = "Input fields needs to be filled.";
            }
            //else checks if username input is empty
            else if (!checkInputField($("#username")[0])) {
                $scope.userFormFeedback = "Username field needs to be filled.";
            }
            //else checks if password input is empty
            else if (!checkInputField($("#password")[0])) {
                $scope.userFormFeedback = "Password field needs to be filled.";
            }
            //else inputs are filled
            else {
                $http({
                    url: "/admin/api/1/login",
                    method: "POST",
                    params: {username: $scope.username, password: $scope.password}
                }).then(loggedIn, function(result) {
                    $scope.userFormFeedback = result.data.meta.feedback || "Error logging you in."
                });
            }
        };
    });