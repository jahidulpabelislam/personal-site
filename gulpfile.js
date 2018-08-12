var gulp = require("gulp");

var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var autoprefixer = require("gulp-autoprefixer");
var sass = require('gulp-sass');

// Concatenate & Minify JS
var scripts = {
	main: [
		"assets/js/jpi/expandedSlideShow.js",
		"assets/js/jpi/slideShow.js",
		"assets/js/jpi/helpers.js",
		"assets/js/jpi/ajax.js",
		"assets/js/jpi/projects.js",
		"assets/js/jpi/home.js",
		"assets/js/jpi/form.js",
		"assets/js/jpi/stickyFooter.js",
		"assets/js/third-party/waypoint.min.js",
		"assets/js/third-party/jquery.countTo.js",
		"assets/js/jpi/nav.js",
		"assets/js/jpi/main.js"
	],
	admin: [
		"assets/js/jpi/helpers.js",
		"assets/js/jpi/stickyFooter.js",
		"assets/js/jpi/dragNDrop.js",
		"assets/js/jpi/nav.js",
		"assets/js/third-party/jquery-ui.min.js",
		"assets/js/third-party/sortable.js"
	]
};
var scriptNames = Object.keys(scripts);
scriptNames.forEach(function (key, i) {
	gulp.task("scripts-" + key, function () {
		return gulp.src(scripts[key])
				.pipe(concat(key + ".min.js"))
				.pipe(uglify())
				.pipe(gulp.dest("assets/js"));
	});
});
gulp.task("scripts", ["scripts-main", "scripts-admin"]);

// Minify Stylesheets
var stylesheets = {
	main: [
		"assets/css/style.css"
	]
};
var stylesheetNames = Object.keys(stylesheets);
stylesheetNames.forEach(function (key) {
	gulp.task("styles-" + key, function () {
		return gulp.src(stylesheets[key])
				.pipe(concat(key + ".min.css"))
				.pipe(autoprefixer({
					browsers: ["> 0.5%", "ie 8-11"],
					remove: false
				}))
				.pipe(minifyCss({
					compatibility: "ie8"
				}))
				.pipe(gulp.dest("assets/css"));
	});
});
gulp.task("styles", ["styles-main"]);

gulp.task('sass', function () {
	return gulp.src('assets/css/style.scss')
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('assets/css/'));
});
// Watch Files For Changes
gulp.task('watch', function () {
	gulp.watch('assets/css/**/*.scss', ['sass']);
});

gulp.task("default", ["scripts", "styles"]);