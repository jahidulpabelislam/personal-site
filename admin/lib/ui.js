"use strict";

//set up username & password variable for later use
var adminUsername = "",
    adminPassword = "",

    //get elements for later use
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
    renderError = function(error) {
        //create the error message
        var errorMessage = createElement(errors, "p", {className: "formFeedback error", innerHTML: error}),

            //create a button to delete error message
            errorDeleteButton = createElement(errorMessage, "span", {className: "errorDeleteButton", innerHTML: "X"});

        //add listener for when user clicks the button
        errorDeleteButton.addEventListener("click", function() {
            //remove the error message when clicked
            errorMessage.remove();
        });
    },

    //render a project image delete
    deletedProjectImage = function(result) {
        //check if the deletion of project image has been processed
        if (result.rows && result.rows.file) {

            //find and remove the comment
            document.getElementById(result.rows.file).remove();
        }
        else {
            //else check if there if feedback to print
            checkFeedback(result.meta.feedback, renderError, "Error deleting your Project Image.");
        }

        delayExpand();
    },

    //send a request to delete a project image
    deleteProjectImage = function(projectImage) {
        sendRequest({
            method: "POST",
            url: "pictures/" + projectImage.ProjectID,
            query: {username: adminUsername, password: adminPassword, file: projectImage.File},
            load: deletedProjectImage,
            error: renderError
        });
    },

    //render a project image
    renderProjectImage = function(projectImage) {
        var imageContainer = createElement(projectImages, "li", {id: projectImage.File}),

            imageDeleteButton = createElement(imageContainer, "button", {
                className: "btn btn-danger deleteProjectImg",
                innerHTML: "X"
            });

        createElement(imageContainer, "img", {src: projectImage.File});

        imageDeleteButton.addEventListener("click", function() {
            console.log(projectImage);
            deleteProjectImage(projectImage);
        });

        delayExpand();
    },

    //
    projectImageUploaded = function(result) {
        //send the data, the function to do if data is valid and generic error message
        loopThroughData(result, renderProjectImage, renderError, "Error uploading image.");
    },

    //
    gotProjectImages = function(result) {
        //send the data, the function to do if data is valid
        loopThroughData(result, renderProjectImage, renderError);
    },

    //send request to get project images
    getProjectImages = function() {
        sendRequest({
            method: "GET",
            url: "pictures/" + projectID.value,
            load: gotProjectImages,
            error: renderError
        });
    },

    //send event to render image upload preview
    renderProjectImageUploadPreview = function() {
        for (var i = 0; i < imageUpload.files.length; i++) {
            checkFile(imageUpload.files[i]);
        }
    },

    gotProjectUpdate = function(result) {
        //send the data, the function to do if data is valid
        loopThroughData(result, renderProject, renderError, "Error Updating the Project");
    },

    sendProjectUpdate = function(e) {
        sendProject(e, "POST", gotProjectUpdate, projectID.value);
    },

    setUpProjectForm = function() {

        projectFormContainer.style.display = "block";
        selectProjectContainer.style.display = "none";

        backButton.addEventListener("click", getProjectList);

        projectName.classList.remove("invalid");
        skills.classList.remove("invalid");
        description.classList.remove("invalid");
        github.classList.remove("invalid");
        date.classList.remove("invalid");

        projectImages.innerHTML = "";

        delayExpand();
    },

    renderProject = function(project) {
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
        dragNDropSetUp();

        getProjectImages();

        projectForm.removeEventListener("submit", addProject);
        projectForm.addEventListener("submit", sendProjectUpdate);

        setUpProjectForm();
    },

    gotProject = function(result) {
        projectImages.innerHTML = "";
        //send the data, the function to do if data is valid
        loopThroughData(result, renderProject, renderError, "Error Getting the Project");
    },

    getProject = function() {
        if (document.querySelector('input[name = "project"]:checked')) {
            sendRequest({
                method: "GET",
                url: "projects/" + document.querySelector('input[name = "project"]:checked').value,
                load: gotProject,
                error: renderError
            });
            projectFormFeedback.innerHTML = "";
        } else {
            selectProjectFeedback.innerHTML = "<span class='formFeedback error'>Select A Project to Edit.</span>";
        }
    },

    addedProject = function(result) {
        //send the data, the function to do if data is valid
        loopThroughData(result, renderProject, renderError, "Error Adding the Project");
    },

    sendProject = function(e, method, load, projectID) {
        e.preventDefault();
        e.stopPropagation();

        var validDatePattern = /\b[\d]{4}-[\d]{2}-[\d]{2}\b/im,
            projectNameValidation = checkInputField(projectName),
            skillsValidation = checkInputField(skills),
            descriptionValidation = checkInputField(description),
            githubValidation = checkInputField(github),
            dateValidation = checkInputField(date) && validDatePattern.test(date.value);

        if (projectNameValidation && skillsValidation && descriptionValidation && githubValidation && dateValidation) {
            if (!projectID) {
                projectID = "";
            }
            sendRequest({
                method: method,
                url: "projects/" + projectID,
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
                load: load,
                error: renderError,
            });
        } else {
            projectFormFeedback.innerHTML = "<span class='formFeedback error'>Fill in Required Inputs Fields.</span>";
        }

    },

    addProject = function(e) {
        sendProject(e, "POST", addedProject);
    },

    setUpAddProject = function() {
        setUpProjectForm();

        projectID.value = projectName.value = skills.value = description.value = "";
        link.value = github.value = download.value = date.value = "";

        projectButton.innerHTML = "Add Project";
        projectForm.removeEventListener("submit", sendProjectUpdate);
        projectForm.addEventListener("submit", addProject);
    },

    renderProjectDelete = function(result) {
        //check if project delete has been processed
        if (result.rows && result.rows.projectID) {

            //find and remove the project
            document.getElementById(result.rows.projectID).remove();
            document.querySelector('label[for="' + result.rows.projectID + '"]').remove();
        } else {
            //else check if there if feedback to print
            checkFeedback(result.meta.feedback, renderError, "Error deleting your project.");
        }

        delayExpand();
    },

    deleteProject = function() {
        if (document.querySelector('input[name = "project"]:checked')) {
            sendRequest({
                method: "POST",
                url: "projects/" + document.querySelector('input[name = "project"]:checked').value,
                query: {username: adminUsername, password: adminPassword, method: "DELETE"},
                load: renderProjectDelete
            });
            selectProjectFeedback.innerHTML = "";
        } else {
            selectProjectFeedback.innerHTML = "<span class='formFeedback error'>Select A Project To Delete.</span>";
        }

        delayExpand();
    },

    //render a project selection
    renderProjectSelection = function(project) {

        var div = createElement(selectProjectForm, "div");

        createElement(div, "label", {innerHTML: project.Name, htmlFor: project.ID});

        createElement(div, "input", {id: project.ID, type: "radio", name: "project", value: project.ID});
    },

    addPagination = function(count) {
        if ((parseInt(count)) > 10) {

            var ul = createElement(pagination, "ul", {className: "pagination"}),
                page = parseInt(currentPage.value),
                pageNum = 1,
                i,
                attributes = {};

            if (page !== 1) {
                var previousLi = createElement(ul, "li"),

                    previousA = createElement(previousLi, "a", {innerHTML: "Previous"});

                previousA.addEventListener("click", function() {
                    sendRequest({
                        method: "GET",
                        url: "projects/",
                        load: gotProjects,
                        query: {page: page - 1}
                    });
                    currentPage.value = page - 1;
                });
            }

            for (i = 0; i < count; i += 10, pageNum++) {
                if (pageNum === page) {
                    attributes = {className: "active"};
                } else {
                    attributes = {};
                }
                var li = createElement(ul, "li", attributes),

                    a = createElement(li, "a", {innerHTML: pageNum});
                a.addEventListener("click", function(e) {
                    sendRequest({
                        method: "GET",
                        url: "projects/",
                        load: gotProjects,
                        query: {page: e.target.innerHTML}
                    });
                    currentPage.value = e.target.innerHTML;
                });
            }

            if (page < (pageNum - 1)) {
                var nextLi = createElement(ul, "li"),

                    nextA = createElement(nextLi, "a", {innerHTML: "Next"});

                nextA.addEventListener("click", function() {
                    sendRequest({
                        method: "GET",
                        url: "projects/",
                        load: gotProjects,
                        query: {page: page + 1}
                    });
                    currentPage.value = page + 1;
                });
            }

            pagination.style.display = "block";
        } else {
            pagination.style.display = "none";
        }
    },

    //
    gotProjects = function(result) {
        selectProjectForm.innerHTML = pagination.innerHTML = "";

        //send the data, the function to do if data is valid
        var dataExists = loopThroughData(result, renderProjectSelection, renderError);

        //check if data doesn't exist check there's no feedback
        if (dataExists === false && !result.meta.feedback) {

            //assume there's no error and no projects to show
            selectProjectFeedback.innerHTML = "<span class='formFeedback error'>Sorry, no Projects to show.</span>";

            editButton.style.display = deleteButton.style.display = "none";

            addButton.innerHTML = "Add A Project.";

        } else {
            editButton.addEventListener("click", getProject);
            deleteButton.addEventListener("click", deleteProject);
            editButton.style.display = deleteButton.style.display = "inline-block";

            if (result.count) {
                addPagination(result.count);
            }
        }

        addButton.addEventListener("click", setUpAddProject);

        delayExpand();
    },

    getProjectList = function() {
        dragNDropStop();
        selectProjectForm.innerHTML = selectProjectFeedback.innerHTML = "";
        projectFormContainer.style.display = "none";
        selectProjectContainer.style.display = "block";

        imageUpload.value = projectFormFeedback.innerHTML = uploads.innerHTML = "";
        imageUpload.style.display = "none";

        //sends a object with necessary data to XHR
        sendRequest({method: "GET", url: "projects", load: gotProjects});
    },

    //after user has attempted to log in
    loggedIn = function(result) {

        //check if data was valid
        if (result.rows && result.rows.username && result.rows.password) {
            //sets a variable with users username for later use

            adminUsername = result.rows.username;
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
    logIn = function(e) {
        e.preventDefault();
        e.stopPropagation();

        //checks if inputs both are empty
        if (!checkInputField(username) && !checkInputField(password)) {
            userFormFeedback.innerHTML = "<span class='formFeedback error'>Input fields needs to be filled.</span>";
        }
        //else checks if username input is empty
        else if (!checkInputField(username)) {
            userFormFeedback.innerHTML = "<span class='formFeedback error'>Username field needs to be filled.</span>";
        }
        //else checks if password input is empty
        else if (!checkInputField(password)) {
            userFormFeedback.innerHTML = "<span class='formFeedback error'>Password field needs to be filled.</span>";
        }
        //else inputs are filled
        else {
            userFormFeedback.innerHTML = "";
            //sends a object with necessary data to XHR
            sendRequest({
                method: "POST",
                url: "login",
                query: {username: username.value, password: password.value},
                load: loggedIn
            });
        }

    },

    //set up site
    adminUISetup = function() {
        userForm.addEventListener("submit", logIn);
    };

window.addEventListener("load", adminUISetup);