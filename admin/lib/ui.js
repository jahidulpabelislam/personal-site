window.portfolio = window.portfolio || {};
window.portfolio.admin = window.portfolio.admin || {};
window.portfolio.admin.ui = (function () {

    "use strict";

    //set up username & password variable for later use
    var adminUsername = "",
        adminPassword = "",
        userForm = document.getElementById("userForm"),
        password = document.getElementById("password"),
        username = document.getElementById("username"),
        userFormDiv = document.getElementById("userFormDiv"),
        userFormFeedback = document.getElementById("userFormFeedback"),
        addButton = document.getElementById("addButton"),
        deleteButton = document.getElementById("deleteButton"),
        editButton = document.getElementById("editButton"),
        selectProjectForm = document.getElementById("selectProjectForm"),
        selectProjectContainer = document.getElementById("selectProjectContainer"),
        selectProjectFeedback = document.getElementById("selectProjectFeedback"),
        projectFormFeedback = document.getElementById("projectFormFeedback"),
        projectButton = document.getElementById("projectButton"),
        imageUpload = document.getElementById("imageUpload"),
        projectFormContainer = document.getElementById("projectFormContainer"),
        backButton = document.getElementById("backButton"),
        errors = document.getElementById("errors"),
        uploads = document.getElementById("uploads"),
        projectImages = document.getElementById("projectImages"),
        projectID = document.getElementById("projectID"),
        projectName = document.getElementById("projectName"),
        skills = document.getElementById("skills"),
        description = document.getElementById("description"),
        link = document.getElementById("link"),
        github = document.getElementById("github"),
        download = document.getElementById("download"),
        date = document.getElementById("date"),
        projectForm = document.getElementById("projectForm"),
        currentPage = document.getElementById("currentPage"),
        pagination = document.getElementById("pagination"),

        //prints out a error message provided
        renderError = function (error) {
            //create the error message
            var errorMessage = window.portfolio.helperFunctions.createElement(errors, "p", {className: "formFeedback error", innerHTML: error}),

            //create a button to delete error message
            errorDeleteButton = window.portfolio.helperFunctions.createElement(errorMessage, "span", {className: "errorDeleteButton", innerHTML: "X"});

            //add listener for when user clicks the button
            errorDeleteButton.addEventListener("click", function () {
                //remove the error message when clicked
                errorMessage.remove();
            });
        },

        deletedProjectImage = function (result) {
            //check if comment delete has been processed
            if (result.rows && result.rows.file) {

                //find and remove the comment
                document.getElementById(result.rows.file).remove();
            }
            //else check if there if feedback to print
            else {
                window.portfolio.xhr.checkFeedback(result.meta.feedback, renderError, "Error deleting your Project Image.");
            }

            window.portfolio.height.delayExpand();
        },

        deleteProjectImage = function (projectImage) {
            window.portfolio.xhr.sendRequests({
                method: "DELETE",
                url: "/admin/api/1/pictures/" + projectImage.projectID,
                query: {username: adminUsername, password: adminPassword, file: projectImage.File},
                load: deletedProjectImage
            });
        },

        renderProjectImage = function (projectImage) {
            var li = window.portfolio.helperFunctions.createElement(projectImages, "li", {id: projectImage.File});

                window.portfolio.helperFunctions.createElement(li, "img", {src: projectImage.File});

                var button = window.portfolio.helperFunctions.createElement(li, "button", {className: "btn btn-danger deleteProjectImg", innerHTML: "X"});

            button.addEventListener("click", function () {
                deleteProjectImage(projectImage);
            });

            window.portfolio.height.delayExpand();
        },

        //for when user update their profile picture
        projectImageUploaded = function (result) {
            //send the data, the function to do if data is valid and generic error message
            window.portfolio.xhr.loopThroughData(result, renderProjectImage, renderError, "Error uploading image.");
        },

        gotProjectImages = function (result) {
            //send the data, the function to do if data is valid
            window.portfolio.xhr.loopThroughData(result, renderProjectImage, renderError);
        },

        getProjectImages = function () {
            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/pictures/" + projectID.value, load: gotProjectImages});
        },

        renderProjectImageUploadPreview = function () {
            for (var i = 0; i < imageUpload.files.length; i++) {

                window.portfolio.admin.dragNDrop.checkFile(imageUpload.files[i]);
            }
        },

        gotProjectUpdate = function (result) {
            //send the data, the function to do if data is valid
            window.portfolio.xhr.loopThroughData(result, renderProject, renderError, "Error Updating the Project");
        },

        sendProjectUpdate = function (e) {
            sendProject(e, "PATCH", gotProjectUpdate, projectID.value);
        },

        setUpProjectForm = function () {

            projectFormContainer.style.display = "block";
            selectProjectContainer.style.display = "none";

            backButton.addEventListener("click", getProjectList);

            projectName.classList.remove("invalid");
            skills.classList.remove("invalid");
            description.classList.remove("invalid");
            github.classList.remove("invalid");
            date.classList.remove("invalid");

            projectImages.innerHTML = "";

            window.portfolio.height.delayExpand();
        },

        renderProject = function (project) {
            projectID.value = project.ID;
            projectName.value = project.Name;
            skills.value = project.Skills;
            description.value = project.Description;
            link.value = project.Link;
            github.value = project.GitHub;
            download.value = project.Download;
            date.value = project.Date;

            imageUpload.style.display = "block";
            imageUpload.addEventListener("change", renderProjectImageUploadPreview);

            projectButton.innerHTML = "Update Project";
            window.portfolio.admin.dragNDrop.setup();

            getProjectImages();

            projectForm.removeEventListener("submit", addProject);
            projectForm.addEventListener("submit", sendProjectUpdate);

            setUpProjectForm();
        },

        gotProject = function (result) {
            projectImages.innerHTML = "";
            //send the data, the function to do if data is valid
            window.portfolio.xhr.loopThroughData(result, renderProject, renderError, "Error Getting the Project");
        },

        getProject = function () {
            if (document.querySelector('input[name = "project"]:checked')) {
                window.portfolio.xhr.sendRequests({
                    method: "GET",
                    url: "/admin/api/1/projects/" + document.querySelector('input[name = "project"]:checked').value,
                    load: gotProject
                });
                projectFormFeedback.innerHTML = "";
            } else {
                selectProjectFeedback.innerHTML = "<span class='formFeedback error'>Select A Project to Edit.</span>";
            }
        },

        addedProject = function (result) {
            //send the data, the function to do if data is valid
            window.portfolio.xhr.loopThroughData(result, renderProject, renderError, "Error Adding the Project");
        },

        sendProject = function (e, method, load, projectID) {
            e.preventDefault();
            e.stopPropagation();

            var validDatePattern = /\b[\d]{4}-[\d]{2}-[\d]{2}\b/im,
                projectNameValidation = window.portfolio.helperFunctions.checkInputField(projectName),
                skillsValidation = window.portfolio.helperFunctions.checkInputField(skills),
                descriptionValidation = window.portfolio.helperFunctions.checkInputField(description),
                githubValidation = window.portfolio.helperFunctions.checkInputField(github),
                dateValidation = window.portfolio.helperFunctions.checkInputField(date) && validDatePattern.test(date.value);

            if (projectNameValidation && skillsValidation && descriptionValidation && githubValidation && dateValidation) {
                if (!projectID) {
                    projectID = "";
                }
                window.portfolio.xhr.sendRequests({
                    method: method,
                    url: "/admin/api/1/projects/" +projectID,
                    query: {
                        username: adminUsername,
                        password: adminPassword,
                        projectName: projectName.value,
                        skills: skills.value,
                        description: description.value,
                        link: link.value,
                        github: github.value,
                        download: download.value,
                        date: date.value
                    },
                    load: load
                });
            } else {
                projectFormFeedback.innerHTML = "<span class='formFeedback error'>Fill in Required Inputs Fields.</span>";
            }

        },

        addProject = function (e) {
           sendProject(e, "POST", addedProject);
        },

        setUpAddProject = function () {
            setUpProjectForm();

            projectID.value = "";
            projectName.value = "";
            skills.value = "";
            description.value = "";
            link.value = "";
            github.value = "";
            download.value = "";
            date.value = "";

            projectButton.innerHTML = "Add Project";
            projectForm.removeEventListener("submit", sendProjectUpdate);
            projectForm.addEventListener("submit", addProject);
        },

        renderProjectDelete = function (result) {
            //check if project delete has been processed
            if (result.rows && result.rows.projectID) {

                //find and remove the project
                document.getElementById(result.rows.projectID).remove();
                document.querySelector('label[for="' + result.rows.projectID + '"]').remove();
            }
            //else check if there if feedback to print
            else {
                window.portfolio.xhr.checkFeedback(result.meta.feedback, renderError, "Error deleting your project.");
            }

            window.portfolio.height.delayExpand();
        },

        deleteProject = function () {
            if (document.querySelector('input[name = "project"]:checked')) {
                window.portfolio.xhr.sendRequests({
                    method: "DELETE",
                    url: "/admin/api/1/projects/" + document.querySelector('input[name = "project"]:checked').value,
                    query: {username: adminUsername, password: adminPassword},
                    load: renderProjectDelete
                });
                selectProjectFeedback.innerHTML = "";
            } else {
                selectProjectFeedback.innerHTML = "<span class='formFeedback error'>Select A Project To Delete.</span>";
            }

            window.portfolio.height.delayExpand();
        },

        //render a project selection
        renderProjectSelection = function (project) {

            var div = window.portfolio.helperFunctions.createElement(selectProjectForm, "div");

            window.portfolio.helperFunctions.createElement(div, "label", {innerHTML: project.Name, htmlFor: project.ID});

            window.portfolio.helperFunctions.createElement(div, "input", {id: project.ID, type: "radio", name: "project", value: project.ID});

        },


        addPagination = function (result) {
            if ((parseInt(result.Count)) > 10) {

                var ul = window.portfolio.helperFunctions.createElement(pagination, "ul", {className: "pagination"}),
                    page = parseInt(currentPage.value),
                    pageNum = 1,
                    i,
                    attributes = {};

                if (page != 1) {
                    var previousLi = window.portfolio.helperFunctions.createElement(ul, "li"),

                        previousA = window.portfolio.helperFunctions.createElement(previousLi, "a", {innerHTML: "Previous"});

                    previousA.addEventListener("click", function () {
                        window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/projects/", load: gotProjects, query: {page: page - 1}});
                        currentPage.value = page -1;
                    });
                }

                for (i = 0; i < result.Count; i+= 10, pageNum++) {
                    if (pageNum == page) {
                        attributes = {className: "active"};
                    }
                    else {
                        attributes = {};
                    }
                    var li = window.portfolio.helperFunctions.createElement(ul, "li", attributes),

                    a = window.portfolio.helperFunctions.createElement(li, "a", {innerHTML: pageNum});
                    a.addEventListener("click", function (e) {
                        window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/projects/", load: gotProjects, query: {page: e.target.innerHTML}});
                        currentPage.value = e.target.innerHTML;
                    });
                }

                if (page < (pageNum - 1)) {
                    var nextLi = window.portfolio.helperFunctions.createElement(ul, "li"),

                        nextA = window.portfolio.helperFunctions.createElement(nextLi, "a", {innerHTML: "Next"});
                    nextA.addEventListener("click", function () {
                        window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/projects/", load: gotProjects, query: {page: page + 1}});
                        currentPage.value = page + 1;
                    });
                }

                pagination.style.display = "block";
            }
            else {
                pagination.style.display = "none";
            }
        },

        getPagination = function (result) {
            window.portfolio.xhr.loopThroughData(result, addPagination, renderError);
        },

        //
        gotProjects = function (result) {
            selectProjectForm.innerHTML = "";
            pagination.innerHTML = "";
            var
                //send the data, the function to do if data is valid
                dataExists = window.portfolio.xhr.loopThroughData(result, renderProjectSelection, renderError);

            //check if data doesn't exist check theres no feedback
            if (dataExists === false && !result.meta.feedback) {
                //assume there's no error and no projects to show
                selectProjectFeedback.innerHTML = "<span class='formFeedback error'>Sorry, no Projects to show.</span>";
                editButton.style.display = "none";
                deleteButton.style.display = "none";

                addButton.innerHTML = "Add A Project.";

            }
            else {
                editButton.addEventListener("click", getProject);
                editButton.style.display = "inline-block";

                deleteButton.addEventListener("click", deleteProject);
                deleteButton.style.display = "inline-block";

                window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/countProjects/", load: getPagination, error: renderError});

            }

            addButton.addEventListener("click", setUpAddProject);

            window.portfolio.height.delayExpand();
        },

        getProjectList = function () {
            window.portfolio.admin.dragNDrop.stop();
            selectProjectForm.innerHTML = "";
            selectProjectFeedback.innerHTML = "";
            projectFormContainer.style.display = "none";
            selectProjectContainer.style.display = "block";

            imageUpload.value = "";
            imageUpload.style.display = "none";
            uploads.innerHTML = "";
            projectFormFeedback.innerHTML = "";

            //sends a object with necessary data to XHR
            window.portfolio.xhr.sendRequests({method: "GET", url: "/admin/api/1/projects", load: gotProjects});
        },

        //after user has attempted to log in
        loggedIn = function (result) {

            //check if data was valid
            if (result.rows && result.rows.username && result.rows.password) {
                //sets a variable with users username for later use
                window.portfolio.admin.ui.adminUsername = result.rows.username;
                adminUsername = result.rows.username;
                window.portfolio.admin.ui.adminPassword = result.rows.password;
                adminPassword = result.rows.password;

                userFormFeedback.innerHTML = "";

                //make the log in/sign up form not visible
                userFormDiv.style.display = "none";

                getProjectList();
            }
            //check if feedback was provided
            else if (result.meta.feedback) {
                userFormFeedback.innerHTML = "<span class='formFeedback error'>" + result.meta.feedback + "</span>";
            }
            //else print generic error message
            else {
                userFormFeedback.innerHTML = "<span class='formFeedback error'>Error logging you in.</span>";
            }
        },

        //post a new user or log in user
        logIn = function (e) {
            e.preventDefault();
            e.stopPropagation();

            //checks if inputs both are empty
            if (!window.portfolio.helperFunctions.checkInputField(username) && !window.portfolio.helperFunctions.checkInputField(password)) {
                userFormFeedback.innerHTML = "<span class='formFeedback error'>Input fields needs to be filled.</span>";
            }
            //else checks if username input is empty
            else if (!window.portfolio.helperFunctions.checkInputField(username)) {
                userFormFeedback.innerHTML = "<span class='formFeedback error'>Username field needs to be filled.</span>";
            }
            //else checks if password input is empty
            else if (!window.portfolio.helperFunctions.checkInputField(password)) {
                userFormFeedback.innerHTML = "<span class='formFeedback error'>Password field needs to be filled.</span>";
            }
            //else inputs are filled
            else {
                userFormFeedback.innerHTML = "";
                //sends a object with necessary data to XHR
                window.portfolio.xhr.sendRequests({
                    method: "POST",
                    url: "/admin/api/1/login",
                    query: {username: username.value, password: password.value},
                    load: loggedIn
                });
            }

        },

        //set up site
        setUp = function () {
            userForm.addEventListener("submit", logIn);
        };

    return {
        setup: setUp,
        projectImageUploaded: projectImageUploaded,
        renderError: renderError,
        adminUsername: adminUsername,
        adminPassword: adminPassword
    };

}());

window.addEventListener("load", window.portfolio.admin.ui.setup);