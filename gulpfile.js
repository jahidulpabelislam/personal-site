const gulp = require("gulp");

const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cleanCss = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const sass = require("gulp-sass");

const fs = require("fs");
const exec = require("child_process").exec;

// Concatenate & Minify JS
const scripts = {
    main: [
        "assets/js/third-party/jquery.min.js",
        "assets/js/third-party/waypoint.min.js",
        "assets/js/third-party/jquery.countTo.js",
        "assets/js/jpi/expanded-slide-show.js",
        "assets/js/jpi/slide-show.js",
        "assets/js/jpi/helpers.js",
        "assets/js/jpi/ajax.js",
        "assets/js/jpi/projects.js",
        "assets/js/jpi/home.js",
        "assets/js/jpi/form.js",
        "assets/js/jpi/sticky-footer.js",
        "assets/js/jpi/nav.js",
        "assets/js/jpi/cookie-banner.js",
        "assets/js/jpi/main.js",
    ],
};
const scriptNames = Object.keys(scripts);
let scriptTasks = [];
scriptNames.forEach(function(key) {
    var scriptTask = "scripts-" + key;
    scriptTasks.push(scriptTask);
    gulp.task(scriptTask, function() {
        return gulp.src(scripts[key])
                   .pipe(concat(key + ".min.js"))
                   .pipe(uglify())
                   .pipe(gulp.dest("assets/js"));
    });
});
gulp.task("scripts", scriptTasks);

// Minify Stylesheets
const stylesheets = {
    main: [
        "assets/css/main.css",
    ],
};
const stylesheetNames = Object.keys(stylesheets);
let stylesheetTasks = [];
stylesheetNames.forEach(function(key) {
    var stylesheetTask = "styles-" + key;
    stylesheetTasks.push(stylesheetTask);
    gulp.task(stylesheetTask, function() {
        return gulp.src(stylesheets[key])
                   .pipe(concat(key + ".min.css"))
                   .pipe(
                       autoprefixer({
                           browsers: ["> 0.1%", "ie 8-11"],
                           remove: false,
                       })
                   )
                   .pipe(
                       cleanCss({
                           compatibility: "ie8",
                       })
                   )
                   .pipe(gulp.dest("assets/css"));
    });
});
gulp.task("styles", stylesheetTasks);

gulp.task("sass", function() {
    return gulp.src("assets/css/main.scss")
               .pipe(sass().on("error", sass.logError))
               .pipe(gulp.dest("assets/css/"));
});
// Watch Files For Changes
gulp.task("watch", function() {
    gulp.watch("assets/css/**/*.scss", ["sass"]);
});

gulp.task("store-version", function() {
    var fileName = "assets/version.txt";

    var githubBaseUrl = "https://github.com/jahidulpabelislam/portfolio/";

    var errorCallback = function(err) {
        if (err) {
            console.log(err);
        }
    };

    // Try to get current branch name
    exec("git branch | grep \\* | cut -d ' ' -f2", function(branchNameErr, branchName, branchNameStderr) {
        // If name found store in text file
        // If current branch if master we used use tags (As most likely this is in production environment)
        // Else it is one of dev branches so display branch name
        if (branchName && branchName !== "null" && branchName.trim() !== "master") {
            var string = "<a href='" + githubBaseUrl + "tree/" + branchName.trim() + "/' class='link-styled' target='_blank'>" + branchName.trim() + "</a>";
            fs.writeFile(fileName, string, errorCallback);
        }
        else {
            // Else just log errors & try to store latest tag name string in text file
            console.log(branchNameErr);
            console.log(branchName);
            console.log(branchNameStderr);

            // Try and get the latest tag on current branch
            exec("git describe --abbrev=0 --tags\n", function(tagNameErr, tagName, tagNameStderr) {
                var versionText = "";

                // If found store in text file
                if (tagName && tagName !== "null") {
                    versionText = "<a href='" + githubBaseUrl + "releases/tag/" + tagName.trim() + "/' class='link-styled' target='_blank'>" + tagName.trim() + "</a>";
                }
                else {
                    // Else log any errors
                    console.log(tagNameErr);
                    console.log(tagName);
                    console.log(tagNameStderr);

                    // Else drop back to branch name if exists else remove version value from file
                    if (branchName && branchName !== "null") {
                        versionText = "<a href='" + githubBaseUrl + "tree/" + branchName.trim() + "/' class='link-styled' target='_blank'>" + branchName.trim() + "</a>";
                    }
                }

                fs.writeFile(fileName, versionText, errorCallback);
            });
        }
    });
});

gulp.task("default", ["scripts", "styles", "store-version"]);
