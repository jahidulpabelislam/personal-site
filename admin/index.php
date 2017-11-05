<!DOCTYPE html>
<html lang="en" ng-app="projectsAdmin">
    <head>
        <meta charset="UTF-8">
        <meta name="author" content="Jahidul Pabel Islam">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Admin</title>

        <?php if (!isset($_GET["debug"])):?>
        <link href="/lib/css/main.min.css" rel="stylesheet" title="style" media="all" type="text/css">
        <?php else: ?>
        <link href="/lib/css/style.css" rel="stylesheet" title="style" media="all" type="text/css">
        <?php endif; ?>

        <!-- The favicon for the site -->
        <link rel="icon" href="/images/favicon.png">
    </head>

    <body ng-controller="projectsAdminController" id="admin">

        <section>
            <div class="container">

                <div id="selectProjectContainer">

                    <div id="selectProjectForm">
                        <div ng-repeat="project in projects">
                            <label ng-click="selectProject(project)" for="{{project.ID}}">{{project.Name}}</label>
                            <input ng-click="selectProject(project)" type="radio" id="{{project.ID}}" name="project" value="{{project.ID}}">
                        </div>
                    </div>

                    <p id="selectProjectFeedback" class="feedback error" ng-if="selectProjectFeedback">{{selectProjectFeedback}}</p>

                    <div id="selectProjectButtons">
                        <button ng-if="projects.length > 0" ng-click="setUpEditProject()" id="editButton" type="button" value="Edit" class="btn btn--blue" tabindex="3">Edit</button>
                        <button ng-if="projects.length > 0" ng-click="deleteProject()" id="deleteButton" type="button" value="Delete" class="btn btn--red" tabindex="4">Delete</button>
                        <button ng-click="setUpAddProject()" id="addButton" type="button" value="Add Another Project" class="btn btn--green" tabindex="5">Add A Project</button>
                    </div>
                    <ul class="pagination pagination--admin" ng-show="pages.length > 1">
                        <li ng-repeat="page in pages" ng-class="{'active': page == currentPage}"><a ng-click="getProjectList(page)">{{page}}</a></li>
                    </ul>
                </div>

                <div id="projectFormContainer">
                    <button ng-click="getProjectList(1)" id="backButton" type="button" value="Back" class="btn btn--orange" tabindex="6">Back
                    </button>

                    <form id="projectForm" ng-submit="submitProject()">
                        <label for="projectName">Project Name <span class="required">*</span></label>
                        <input ng-model="selectedProject.Name" type="text" name="projectName" id="projectName" class="input" placeholder="myproject" tabindex="7" oninput="checkInputField(this);" required>
                        <label for="skills">Skills <span class="required">*</span></label>
                        <input ng-model="selectedProject.Skills" type="text" name="skills" id="skills" class="input" placeholder="skill1, skill2" tabindex="8" oninput="checkInputField(this);" required>
                        <label for="longDescription">Long Description <span class="required">*</span></label>
                        <textarea ng-model="selectedProject.LongDescription" name="description" id="longDescription" class="input" placeholder="description" tabindex="9" oninput="checkInputField(this);" required rows="10"></textarea>
                        <label for="shortDescription">Short Description <span class="required">*</span></label>
                        <textarea ng-model="selectedProject.ShortDescription" name="description" id="shortDescription" class="input" placeholder="description" tabindex="9" oninput="checkInputField(this);" required rows="10"></textarea>

                        <label for="link">Link</label>
                        <input ng-model="selectedProject.Link" type="text" name="link" id="link" class="input" placeholder="link" tabindex="10">
                        <label for="github">GitHub <span class="required">*</span></label>
                        <input ng-model="selectedProject.GitHub" type="url" name="github" id="github" class="input" placeholder="github" tabindex="11" oninput="checkInputField(this);" required>
                        <label for="download">Download</label>
                        <input ng-model="selectedProject.Download" type="text" name="download" id="download" class="input" placeholder="download" tabindex="12">
                        <label for="date">Date <span class="required">*</span></label>
                        <input ng-model="selectedProject.Date" type="date" name="date" id="date" class="input" placeholder="2016-01-30" tabindex="13" oninput="checkInputField(this);" required>

                        <label for="colour">Colour </label>
                        <select ng-model="selectedProject.Colour" name="colour" id="colour" class="input" tabindex="14">
                            <option value="">Default</option>
                            <option value="blue">Blue</option>
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="lime-green">Lime green</option>
                            <option value="green">Green</option>
                            <option value="purple">Purple</option>
                        </select>

                        <p id="projectFormFeedback" class="feedback error" ng-if="projectFormFeedback">{{projectFormFeedback}}</p>

                        <button id="projectButton" type="submit" value="Add Project" class="btn btn--green" tabindex="14">{{selectedProject.ID ? 'Update Project' : 'Add Project'}}</button>
                    </form>

                    <ul id="projectImages" ui-sortable ng-model="selectedProject.pictures" class="ui-state-default">
                        <li ng-repeat="picture in selectedProject.pictures" id="{{picture.File}}">
                            <img src="{{picture.File}}">
                            <button ng-click="deleteProjectImage(picture)" class="btn btn--red deleteProjectImg">X</button>
                        </li>
                    </ul>

                    <input ng-if="selectedProject.ID" data-file-Upload type="file" name="imageUpload" id="imageUpload" class="input" multiple accept="image/*" tabindex="15">

                    <!-- Div containing the uploads -->
                    <div id="uploads">
                        <div ng-repeat="upload in uploads" ng-class="upload.ok == true ? 'aUpload' : 'failedUpload'">
                            <p>{{upload.text}}</p>
                            <img ng-if="upload.ok == true" src="{{upload.image}}">
                            <button ng-if="upload.ok == true" ng-click="sendImage(upload.file)" class="btn btn--red">Upload This Picture</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- The drag and drop area -->
        <section id="dropZone"><h1 class="dropZone__text">Drag And Drop Image Here To Upload A Slide for Project</h1></section>

        <section id="userFormDiv">
            <div class="container">
                <form id="userForm" ng-submit="logIn()">
                    <label for="username">Username</label>
                    <input ng-model="username" type="text" name="username" id="username" placeholder="myusername" autofocus class="input" tabindex="1" oninput="checkInputField(this);" required>
                    <label for="password">Password</label>
                    <input ng-model="password" type="password" name="password" id="password" placeholder="mypassword" class="input" tabindex="2" oninput="checkInputField(this);" required>
                    <!-- Where the feedback will go if any error -->
                    <p id="userFormFeedback" class="feedback error" ng-if="userFormFeedback">{{userFormFeedback}}</p>
                    <button id="logInButton" type="submit" value="Log In" class="btn btn--green">Log In</button>
                </form>
            </div>
        </section>

        <!-- The Scripts -->

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <?php if (!isset($_GET["debug"])):?>
        <script src="/lib/js/main.min.js" type="text/javascript"></script>
        <?php else: ?>
        <script src="/lib/js/helperFunctions.js" type="text/javascript"></script>
        <script src="/lib/js/stickyFooter.js" type="text/javascript"></script>
        <?php endif; ?>

        <!-- The third party script needed for the page for the sorting of pictures -->
        <script type="text/javascript" src="/lib/js/third-party/jquery-ui.min.js"></script>

        <!-- The third party script needed for the page for the sorting of pictures -->
        <script type="text/javascript" src="/lib/js/third-party/sortable.js"></script>

        <!-- the script for the page -->
        <script type="text/javascript" src="/lib/js/admin.js"></script>
    </body>
</html>