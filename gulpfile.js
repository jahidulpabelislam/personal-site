const gulp = require("gulp"),

    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),

    cleanCss = require("gulp-clean-css"),
    autoPrefix = require("gulp-autoprefixer"),
    sass = require("gulp-sass"),

    fs = require("fs"),
    exec = require("child_process").exec;

const assetsDir = "./assets";
const jsDir = `${assetsDir}/js`;
const cssDir = `${assetsDir}/css`;

let defaultTasks = [];

// Concatenate & Minify JS
const scripts = {
    "main": [
        `${jsDir}/third-party/jquery.min.js`,
        `${jsDir}/third-party/waypoint.min.js`,
        `${jsDir}/third-party/jquery.countTo.js`,
        `${jsDir}/third-party/sticky-footer.min.js`,
        `${jsDir}/jpi/expanded-slide-show.js`,
        `${jsDir}/jpi/slide-show.js`,
        `${jsDir}/jpi/helpers.js`,
        `${jsDir}/jpi/ajax.js`,
        `${jsDir}/jpi/projects.js`,
        `${jsDir}/jpi/home.js`,
        `${jsDir}/jpi/form.js`,
        `${jsDir}/jpi/nav.js`,
        `${jsDir}/jpi/cookie-banner.js`,
        `${jsDir}/jpi/main.js`,
    ],
    "social-links" : [
        `${jsDir}/third-party/jquery.min.js`,
        `${jsDir}/third-party/sticky-footer.min.js`,
        `${jsDir}/jpi/helpers.js`,
    ],
};
const scriptNames = Object.keys(scripts);

let scriptTasks = [];
scriptNames.forEach(function(key) {
    const scriptTask = "scripts-" + key;
    scriptTasks.push(scriptTask);
    gulp.task(scriptTask, function() {
        return gulp.src(scripts[key])
                   .pipe(concat(key + ".min.js"))
                   .pipe(uglify())
                   .pipe(gulp.dest(jsDir));
    });
});
gulp.task("scripts", gulp.parallel(scriptTasks));
defaultTasks.push("scripts");

gulp.task("sass", function() {
    return gulp.src([`${cssDir}/jpi/*.scss`])
               .pipe(sass().on("error", sass.logError))
               .pipe(gulp.dest(`${cssDir}/jpi/`));
});
defaultTasks.push("sass");

// Watch Files For Changes
gulp.task("watch", function() {
    gulp.watch(`${cssDir}/jpi/**/*.scss`, gulp.parallel("sass"));
});

// Minify Stylesheets
const stylesheets = {
    "above-the-fold": [
        `${cssDir}/jpi/above-the-fold.css`,
    ],
    "main": [
        `${cssDir}/jpi/main.css`,
    ],
    "links": [
        `${cssDir}/jpi/links.css`,
    ],
};
const stylesheetNames = Object.keys(stylesheets);

let stylesheetTasks = [];
stylesheetNames.forEach(function(key) {
    const stylesheetTask = "styles-" + key;
    stylesheetTasks.push(stylesheetTask);
    gulp.task(stylesheetTask, function() {
        return gulp.src(stylesheets[key])
                   .pipe(concat(key + ".min.css"))
                   .pipe(autoPrefix({
                       browsers: ["> 0.1%", "ie 8-11"],
                       remove: false,
                   }))
                   .pipe(cleanCss({
                       compatibility: "ie8",
                   }))
                   .pipe(gulp.dest(cssDir));
    });
});
gulp.task("styles", gulp.parallel(stylesheetTasks));
defaultTasks.push("styles");

const errorCallback = function(err) {
    if (err) {
        console.log(err);
    }
};

const runCommand = function(command, callback) {
    return exec(command, function(err, res, stdErr) {
        // If found store in text file
        if (res && res.trim() !== "null") {
            callback(res.trim());
            return;
        }
        // Else log any errors
        console.log(err, res, stdErr);
        callback(null);
    });
};

defaultTasks.push("store-version");
gulp.task("store-version", function() {
    const githubBaseUrl = "https://github.com/jahidulpabelislam/portfolio";
    const fileName = `${assetsDir}/version.txt`;
    let versionText = "";

    // Try to get current branch name
    return runCommand("git branch | grep \\* | cut --complement -d ' ' -f1", function(branchName) {
        /**
         * We only use branch name as the 'version' if current branch is a dev branch (i.e. not master and not a detached tag state)
         * Else if production, find and get the current running tag to use as the current 'version'
         */
        if (branchName && branchName !== "master" && !branchName.startsWith("(HEAD detached at v")) {
            versionText = `<a href="${githubBaseUrl}/tree/${branchName}/" class="link-styled" target="_blank" rel="noopener noreferrer">${branchName}</a>`;
            return fs.writeFile(fileName, versionText, errorCallback);
        }

        // Try and get the currently running tag
        return runCommand("git describe --abbrev=0 --tags", function(tagName) {
            // If found store in text file
            if (tagName) {
                versionText = `<a href="${githubBaseUrl}/releases/tag/${tagName}/" class="link-styled" target="_blank" rel="noopener noreferrer">${tagName}</a>`;
            }
            // Else drop back to branch name if exists else remove version value from file
            else if (branchName) {
                versionText = `<a href="${githubBaseUrl}/tree/${branchName}/" class="link-styled" target="_blank" rel="noopener noreferrer">${branchName}</a>`;
            }

            fs.writeFile(fileName, versionText, errorCallback);
        });
    });
});

gulp.task("default", gulp.series(defaultTasks));
