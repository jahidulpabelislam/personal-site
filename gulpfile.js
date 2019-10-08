const gulp = require("gulp");

const HubRegistry = require("gulp-hub");

const hub = new HubRegistry("./tasks/**/!(config).js");

gulp.registry(hub);
