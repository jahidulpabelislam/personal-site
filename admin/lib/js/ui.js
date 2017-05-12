"use strict";

//set up username & password variable for later use
var adminUsername = "",
    adminPassword = "",

    //prints out a error message provided
    renderError = function(error) {
        //create the error message
        var errorMessage = createElement($("#errors")[0], "p", {className: "formFeedback error", innerHTML: error}),

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
            url: "api/1/pictures/" + projectImage.ProjectID,
            query: {username: adminUsername, password: adminPassword, file: projectImage.File},
            load: deletedProjectImage,
            error: renderError
        });
    },

    //render a project image
    renderProjectImage = function(projectImage) {
        var imageContainer = createElement($("#projectImages")[0], "li", {id: projectImage.File}),

            imageDeleteButton = createElement(imageContainer, "button", {
                className: "btn btn-danger deleteProjectImg",
                innerHTML: "X"
            });

        createElement(imageContainer, "img", {src: projectImage.File});

        imageDeleteButton.addEventListener("click", function() {
            deleteProjectImage(projectImage);
        });

        delayExpand();
    },

    //send the data, the function to do if data is valid and generic error message
    projectImageUploaded = function(result) {
        loopThroughData(result, renderProjectImage, renderError, "Error uploading image.");
    },

    //send event to render image upload preview
    renderProjectImageUploadPreview = function() {
        for (var i = 0; i < $("#imageUpload")[0].files.length; i++) {
            checkFile($("#imageUpload")[0].files[i]);
        }
    },

    //send the data, the function to do if data is valid
    gotProjectUpdate = function(result) {
        loopThroughData(result, renderProject, renderError, "Error Updating the Project");
    },

    sendProjectUpdate = function(e) {
        sendProject(e, "POST", gotProjectUpdate, $("#projectID").val());
    },

    setUpProjectForm = function() {
        $("#projectFormContainer").show();
        $("#selectProjectContainer").hide();

        $("#backButton").off();
        $("#backButton").click(getProjectList);

        $("#projectName, #skills, #description, #github, #date").removeClass("invalid");

        $("#projectImages").text("");

        delayExpand();
    },

    renderProject = function(project) {
        setUpProjectForm();

        $("#projectFormFeedback").hide("fast");

        $("#projectID").val(project.ID);
        $("#projectName").val(project.Name);
        $("#skills").val(project.Skills);
        $("#shortDescription").val(project.ShortDescription);
        $("#longDescription").val(project.LongDescription);
        $("#link").val(project.Link);
        $("#github").val(project.GitHub);
        $("#download").val(project.Download);
        $("#date").val(project.Date);

        $("#imageUpload").show();
        $("#imageUpload").off();
        $("#imageUpload").change(renderProjectImageUploadPreview);

        $("#projectButton").text("Update Project");
        dragNDropSetUp();

        //loop through each row of data in rows
        for (var i = 0; i < project.pictures.length; i++) {

            if (project.pictures.hasOwnProperty(i)) {

                renderProjectImage(project.pictures[i]);
            }
        }

        $("#projectForm").off();
        $("#projectForm").submit(sendProjectUpdate);
    },

    gotProject = function(result) {
        $("#projectImages").text("");
        //send the data, the function to do if data is valid
        loopThroughData(result, renderProject, renderError, "Error Getting the Project");
    },

    getProject = function() {
        if (document.querySelector('input[name = "project"]:checked')) {
            sendRequest({
                method: "GET",
                url: "api/1/projects/" + document.querySelector('input[name = "project"]:checked').value,
                load: gotProject,
                error: renderError
            });
            $("#selectProjectFeedback").hide("fast");
        } else {
            $("#selectProjectFeedback").text("Select A Project to Edit.").show("fast");
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
            projectNameValidation = checkInputField($("#projectName")[0]),
            skillsValidation = checkInputField($("#skills")[0]),
            longDescriptionValidation = checkInputField($("#longDescription")[0]),
            shortDescriptionValidation = checkInputField($("#shortDescription")[0]),
            githubValidation = checkInputField($("#github")[0]),
            dateValidation = checkInputField($("#date")[0]) && validDatePattern.test($("#date").val());

        if (projectNameValidation && skillsValidation && longDescriptionValidation && shortDescriptionValidation && githubValidation && dateValidation) {
            if (!projectID) {
                projectID = "";
            }

            sendRequest({
                method: method,
                url: "api/1/projects/" + projectID,
                query: {
                    username: adminUsername,
                    password: adminPassword,
                    projectName: $("#projectName").val(),
                    skills: $("#skills").val(),
                    longDescription: $("#longDescription").val(),
                    shortDescription: $("#shortDescription").val(),
                    link: $("#link").val(),
                    github: $("#github").val(),
                    download: $("#download").val(),
                    date: $("#date").val()
                },
                load: load,
                error: renderError
            });
        } else {
            $("#projectFormFeedback").text("Fill in Required Inputs Fields.").show("fast");
        }

    },

    addProject = function(e) {
        sendProject(e, "POST", addedProject);
    },

    setUpAddProject = function() {
        setUpProjectForm();

        $("#projectID, #projectName, #skills, #longDescription, #shortDescription, #link, #github, #download, #date").val("");

        $("#projectButton").text("Add Project");
        $("#projectForm").off();
        $("#projectForm").submit(addProject);
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
                url: "api/1/projects/" + document.querySelector('input[name = "project"]:checked').value,
                query: {username: adminUsername, password: adminPassword, method: "DELETE"},
                load: renderProjectDelete
            });
            $("#selectProjectFeedback").hide("fast");
        } else {
            $("#selectProjectFeedback").text("Select A Project To Delete.").show("fast");
        }

        delayExpand();
    },

    //render a project selection
    renderProjectSelection = function(project) {

        var div = createElement($("#selectProjectForm")[0], "div");

        createElement(div, "label", {innerHTML: project.Name, htmlFor: project.ID});

        createElement(div, "input", {id: project.ID, type: "radio", name: "project", value: project.ID});
    },

    addPagination = function(count) {
        if ((parseInt(count)) > 10) {

            var ul = createElement($("#pagination")[0], "ul", {className: "pagination"}),
                page = parseInt($("#currentPage").val()),
                pageNum = 1,
                i,
                attributes = {};

            if (page !== 1) {
                var previousLi = createElement(ul, "li"),

                    previousA = createElement(previousLi, "a", {innerHTML: "Previous"});

                previousA.addEventListener("click", function() {
                    $("#currentPage").val(page - 1);
                    getProjectList();
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

                    $("#currentPage").val(e.target.innerHTML);
                    getProjectList();
                });
            }

            if (page < (pageNum - 1)) {
                var nextLi = createElement(ul, "li"),

                    nextA = createElement(nextLi, "a", {innerHTML: "Next"});

                nextA.addEventListener("click", function() {
                    $("#currentPage").val(page + 1);
                    getProjectList();
                });
            }

            $("#pagination").show();
        } else {
            $("#pagination").hide();
        }
    },

    //
    gotProjects = function(result) {
        $("#selectProjectForm, #pagination").text("");
        $("#selectProjectFeedback").hide("fast");
        $("#projectFormContainer").hide();
        $("#selectProjectContainer").show();
        $("#addButton, #editButton, #deleteButton").off();

        //send the data, the function to do if data is valid
        var dataExists = loopThroughData(result, renderProjectSelection, renderError);

        //check if data doesn't exist check there's no feedback
        if (dataExists === false && !result.meta.feedback) {

            //assume there's no error and no projects to show
            $("#selectProjectFeedback").text("Sorry, no Projects to show.").show("fast");

            $("#editButton, #deleteButton").hide();

            $("#addButton").text("Add A Project.");

        } else {
            $("#editButton").click(getProject);
            $("#deleteButton").click(deleteProject);
            $("#editButton, #deleteButton").css("display", "inline-block");

            if (result.count) {
                addPagination(result.count);
            }
        }

        $("#addButton").click(setUpAddProject);

        delayExpand();
    },

    getProjectList = function() {
        dragNDropStop();

        //sends a object with necessary data to XHR
        sendRequest({
            method: "GET",
            url: "api/1/projects/",
            load: gotProjects,
            query: {page: $("#currentPage").val() || 1}
        });
    },

    //after user has attempted to log in
    loggedIn = function(result) {

        //check if data was valid
        if (result.rows && result.rows.username && result.rows.password) {
            //sets a variable with users username for later use

            adminUsername = result.rows.username;
            adminPassword = result.rows.password;

            //make the log in/sign up form not visible
            $("#userFormDiv").hide();

            getProjectList();
        }
        //check if feedback was provided
        else if (result.meta.feedback) {
            $("#userFormFeedback").text(result.meta.feedback).show("fast");
        }
        //else print generic error message
        else {
            $("#userFormFeedback").text("Error logging you in.").show("fast");
        }
    };

//post a new user or log in user

//set up site
$(window).load(function() {
    $("#userForm").submit(function(e) {
        e.preventDefault();
        e.stopPropagation();

        //checks if inputs both are empty
        if (!checkInputField($("#username")[0]) && !checkInputField($("#password")[0])) {
            $("#userFormFeedback").text("Input fields needs to be filled.").show("fast");
        }
        //else checks if username input is empty
        else if (!checkInputField($("#username")[0])) {
            $("#userFormFeedback").text("Username field needs to be filled.").show("fast");
        }
        //else checks if password input is empty
        else if (!checkInputField($("#password")[0])) {
            $("#userFormFeedback").text("Password field needs to be filled.").show("fast");
        }
        //else inputs are filled
        else {
            $("#userFormFeedback").hide("fast");
            //sends a object with necessary data to XHR
            sendRequest({
                method: "POST",
                url: "api/1/login",
                query: {username: $("#username").val(), password: $("#password").val()},
                load: loggedIn
            });
        }
    });
});