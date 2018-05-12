<!DOCTYPE html>
<html lang="en" ng-app="projectsAdmin">
    <head>
        <meta charset="UTF-8"/>
        <meta name="author" content="Jahidul Pabel Islam"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <title>Admin</title>

        <?php if (!isset($_GET["debug"])):?>
        <link href="/assets/css/main.min.css?v=1" rel="stylesheet" title="style" media="all" type="text/css">
        <?php else: ?>
        <link href="/assets/css/style.css?v=1" rel="stylesheet" title="style" media="all" type="text/css">
        <?php endif; ?>

        <!-- Favicons/Icons for devices -->
        <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png?v=1"/>
        <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png?v=1"/>
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png?v=1"/>
        <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png?v=1"/>
        <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png?v=1"/>
        <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png?v=1"/>
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png?v=1"/>
        <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png?v=1"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png?v=1"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png?v=1"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png?v=1"/>
        <link rel="manifest" href="/favicons/site.webmanifest?v=1"/>
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg?v=1" color="#0375b4"/>
        <link rel="shortcut icon" href="/favicons/favicon.ico?v=1"/>
        <meta name="msapplication-TileColor" content="#f5f5f5"/>
        <meta name="msapplication-TileImage" content="/favicons/mstile-144x144.png?v=1"/>
        <meta name="msapplication-config" content="/favicons/browserconfig.xml?v=1"/>
        <meta name="theme-color" content="#337ab7"/>
    </head>

    <body ng-controller="projectsAdminController" class="admin-page">

        <section>
            <div class="container">

                <div class="select-project-container">

                    <div class="select-project-form">
                        <div ng-repeat="project in projects">
                            <label ng-click="selectProject(project)" for="{{project.ID}}">{{project.Name}}</label>
                            <input ng-click="selectProject(project)" type="radio" id="{{project.ID}}" name="project" value="{{project.ID}}">
                        </div>
                    </div>

                    <p class="feedback feedback--select-project feedback--error" ng-if="selectProjectFeedback">{{selectProjectFeedback}}</p>

                    <div id="selectProjectButtons">
                        <button ng-if="projects.length > 0" ng-click="setUpEditProject()" type="button" value="Edit" class="btn btn--blue btn--edit-project" tabindex="3">Edit</button>
                        <button ng-if="projects.length > 0" ng-click="deleteProject()" type="button" value="Delete" class="btn btn--red btn--delete-project" tabindex="4">Delete</button>
                        <button ng-click="setUpAddProject()" type="button" value="Add Another Project" class="btn btn--green btn--add-project" tabindex="5">Add A Project</button>
                    </div>
                    <ul class="pagination pagination--admin" ng-show="pages.length > 1">
                        <li ng-repeat="page in pages" ng-click="getProjectList(page)" class="pagination__item" ng-class="{'active': page == currentPage}">{{page}}</li>
                    </ul>
                </div>

                <div class="project-form-container">
                    <button ng-click="getProjectList(1)" type="button" value="Back" class="btn btn--orange btn--back" tabindex="6">Back
                    </button>

                    <form id="projectForm" ng-submit="submitProject()">
                        <label for="projectName">Project Name <span class="required">*</span></label>
                        <input ng-model="selectedProject.Name" type="text" name="projectName" id="projectName" class="input" placeholder="myproject" tabindex="7" oninput="jpi.helpers.checkInputField(this);" required>

                        <label for="skills">Skills <span class="required">*</span></label>

                        <div ng-model="selectedProject.Skills" ui-sortable class="ui-state-default">
                            <p ng-repeat="skill in selectedProject.Skills" class="admin-project-skill admin-project-skill--{{selectedProject.Colour}}">{{skill}} <button class="btn delete-skill" ng-click="deleteSkill(skill)">x</button></p>
                        </div>

                        <div class="skill-input-group">
                            <label for="skill-input" class="screen-reader-text">Add skills for project.</label>
                            <input type="text" class="input skill-input"id="skill-input" placeholder="HTML5" ng-model="skillInput">
                            <button class="btn btn--green skill-add" type="button" id="skill-add" ng-click="addSkill()">Add</button>
                        </div>

                        <label for="longDescription">Long Description <span class="required">*</span></label>
                        <textarea ng-model="selectedProject.LongDescription" name="description" id="longDescription" class="input" placeholder="description" tabindex="9" oninput="jpi.helpers.checkInputField(this);" required rows="10"></textarea>
                        <label for="shortDescription">Short Description <span class="required">*</span></label>
                        <textarea ng-model="selectedProject.ShortDescription" name="description" id="shortDescription" class="input" placeholder="description" tabindex="9" oninput="jpi.helpers.checkInputField(this);" required rows="10"></textarea>

                        <label for="link">Link</label>
                        <input ng-model="selectedProject.Link" type="text" name="link" id="link" class="input" placeholder="link" tabindex="10">
                        <label for="github">GitHub <span class="required">*</span></label>
                        <input ng-model="selectedProject.GitHub" type="url" name="github" id="github" class="input" placeholder="github" tabindex="11" oninput="jpi.helpers.checkInputField(this);" required>
                        <label for="download">Download</label>
                        <input ng-model="selectedProject.Download" type="text" name="download" id="download" class="input" placeholder="download" tabindex="12">
                        <label for="date">Date <span class="required">*</span></label>
                        <input ng-model="selectedProject.Date" type="date" name="date" id="date" class="input" placeholder="2016-01-30" tabindex="13" oninput="jpi.helpers.checkInputField(this);" required>

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

                        <p class="feedback feedback--project-form feedback--error" ng-if="projectFormFeedback">{{projectFormFeedback}}</p>

                        <button type="submit" value="Add Project" class="btn btn--green btn--send-project" tabindex="14">{{selectedProject.ID ? 'Update Project' : 'Add Project'}}</button>
                    </form>

                    <ul ui-sortable ng-model="selectedProject.pictures" class="project-images ui-state-default">
                        <li class="project-image" ng-repeat="picture in selectedProject.pictures" id="{{picture.File}}">
                            <img src="{{picture.File}}">
                            <button ng-click="deleteProjectImage(picture)" class="btn btn--red btn--delete-project-img">X</button>
                        </li>
                    </ul>

                    <input ng-if="selectedProject.ID" data-file-Upload type="file" name="imageUpload" id="imageUpload" class="input" multiple accept="image/*" tabindex="15">

                    <!-- Div containing the uploads -->
                    <div class="project-images-uploads">
                        <div ng-repeat="upload in uploads" class="upload" ng-class="upload.ok == true ? 'upload--success' : 'upload--failed'">
                            <p>{{upload.text}}</p>
                            <img ng-if="upload.ok == true" src="{{upload.image}}">
                            <button ng-if="upload.ok == true" ng-click="sendImage(upload.file)" class="btn btn--red">Upload This Picture</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- The drag and drop area -->
        <section class="drop-zone"><h1 class="drop-zone__text">Drag And Drop Image Here To Upload A Slide for Project</h1></section>

        <section class="login-form-container">
            <div class="container">
                <form class="login-form" ng-submit="logIn()">
                    <label for="username">Username</label>
                    <input ng-model="username" type="text" name="username" id="username" placeholder="myusername" autofocus class="input" tabindex="1" oninput="jpi.helpers.checkInputField(this);" required>
                    <label for="password">Password</label>
                    <input ng-model="password" type="password" name="password" id="password" placeholder="mypassword" class="input" tabindex="2" oninput="jpi.helpers.checkInputField(this);" required>
                    <!-- Where the feedback will go if any error -->
                    <p class="feedback feedback--user-form feedback--error" ng-if="userFormFeedback">{{userFormFeedback}}</p>
                    <button type="submit" value="Log In" class="btn btn--green">Log In</button>
                </form>
            </div>
        </section>

        <!-- The Scripts -->

        <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>

        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.4/angular.min.js"></script>

        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <?php if (!isset($_GET["debug"])):?>
        <!-- the script for the page -->
        <script type="text/javascript" src="/assets/js/admin.min.js?v=1"></script>
        <?php else: ?>
        <script src="/assets/js/jpi/helperFunctions.js?v=1" type="text/javascript"></script>
        <script src="/assets/js/jpi/stickyFooter.js?v=1" type="text/javascript"></script>
        <!-- The third party script needed for the page for the sorting of pictures -->
        <script type="text/javascript" src="/assets/js/third-party/jquery-ui.min.js?v=1"></script>

        <!-- The third party script needed for the page for the sorting of pictures -->
        <script type="text/javascript" src="/assets/js/third-party/sortable.js?v=1"></script>
        <?php endif; ?>

        <!-- the script for the page -->
        <script type="text/javascript" src="/assets/js/jpi/admin.js?v=1"></script>
    </body>
</html>