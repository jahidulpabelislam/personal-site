const env = process.env.NODE_ENV || "production";
if (env === "production") {
    return;
}

const gulp = require("gulp");

const rename = require("gulp-rename");

const concat = require("gulp-concat");
const uglify = require("gulp-uglify");

const cleanCss = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");

const sass = require("gulp-sass");

const { jsDir, cssDir } = require("../config");

let defaultTasks = [];

// Concatenate & minify JS
defaultTasks.push("scripts");
gulp.task("scripts", function(callback) {
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
        "social-links": [
            `${jsDir}/third-party/jquery.min.js`,
            `${jsDir}/third-party/sticky-footer.min.js`,
            `${jsDir}/jpi/helpers.js`,
        ],
    };
    const scriptNames = Object.keys(scripts);

    scriptNames.forEach(function(key) {
        gulp.src(scripts[key])
            .pipe(concat(`${key}.min.js`))
            .pipe(uglify())
            .pipe(gulp.dest(`${jsDir}/`));
    });

    callback();
});

defaultTasks.push("sass");
gulp.task("sass", function() {
    return gulp.src([`${cssDir}/jpi/*.scss`])
               .pipe(sass().on("error", sass.logError))
               .pipe(gulp.dest(`${cssDir}/jpi/`));
});

// Watch scss file changes to compile to css
gulp.task("watch-scss", function() {
    gulp.watch(`${cssDir}/jpi/**/*.scss`, gulp.parallel("sass"));
});

// Watch files For changes
gulp.task("watch", gulp.series("sass", "watch-scss"));

// Minify stylesheets
defaultTasks.push("stylesheets");
gulp.task("stylesheets", function(callback) {
    gulp.src([`${cssDir}/jpi/*.css`])
        .pipe(rename({suffix: ".min"}))
        .pipe(autoPrefix({
            browsers: ["> 0.1%", "ie 8-11"],
            remove: false,
        }))
        .pipe(cleanCss({
            compatibility: "ie8",
        }))
        .pipe(gulp.dest(`${cssDir}/`));

    callback();
});

gulp.task("default", gulp.series(defaultTasks));
