var gulp = require("gulp");

var concat = require("gulp-concat");
var minifyCss = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");

// Minify Stylesheets
var stylesheets = {
    main: [
        "lib/css/main.css",
        "lib/css/admin.css",
        "lib/css/animate.min.css"
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

gulp.task("default", ["styles"]);