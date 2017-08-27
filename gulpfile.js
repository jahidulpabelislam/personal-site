var gulp = require("gulp");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");

// Concatenate & Minify JS
var scripts = {
    main: [
        "lib/js/expandImage.js",
        "lib/js/slideShow.js",
        "lib/js/helperFunctions.js",
        "lib/js/xhr.js",
        "lib/js/projects.js",
        "lib/js/projectsPreview.js",
        "lib/js/form.js",
        "lib/js/third-party/bootstrap.min.js",
        "lib/js/stickyFooter.js",
        "lib/js/third-party/wow.min.js"
    ]
};
var scriptNames = Object.keys(scripts);
scriptNames.forEach(function(key, i){
    gulp.task("scripts-"+key, function() {
        return gulp.src(scripts[key])
            .pipe(concat(key+".min.js"))
            .pipe(uglify())
            .pipe(gulp.dest("lib/js"));
    });
});
gulp.task("scripts", ["scripts-main"]);

// Minify Stylesheets
var stylesheets = {
    main: [
        "lib/css/third-party/bootstrap.min.css",
        "lib/css/main.css",
        "lib/css/admin.css",
        "lib/css/third-party/animate.min.css"
    ]
};
var stylesheetNames = Object.keys(stylesheets);
stylesheetNames.forEach(function(key, i){
    gulp.task("styles-"+key, function() {
        return gulp.src(stylesheets[key])
            .pipe(concat(key+".min.css"))
            .pipe(autoprefixer({
                browsers: ["> 0.5%", "ie 8-11"],
                remove: false
            }))
            .pipe(minifyCss({
                compatibility: "ie8"
            }))
            .pipe(gulp.dest("lib/css"));
    });
});
gulp.task("styles", ["styles-main"]);

gulp.task("default", ["scripts", "styles"]);