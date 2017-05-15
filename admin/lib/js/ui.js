angular.module('projectsAdmin', [])
    .controller('projectsAdminController', function($scope, $http) {

        $scope.userFormFeedback = "";

        //after user has attempted to log in
        var loggedIn = function(result) {

            //check if data was valid
            if (result.data.rows && result.data.rows.username && result.data.rows.password) {
                //sets a variable with users username for later use

                adminUsername = result.data.rows.username;
                adminPassword = result.data.rows.password;

                //make the log in/sign up form not visible
                $("#userFormDiv").hide();

                // $scope.getProjectList();
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
                    params: {username: $("#username").val(), password: $("#password").val()}
                }).then(loggedIn, function(result) {
                    $scope.userFormFeedback = result.data.meta.feedback || "Error logging you in."
                });
            }
        };
    });