const gulp = require("gulp");

const HubRegistry = require("gulp-hub");

let srcs = ["./tasks/!(config).js"];

const env = process.env.NODE_ENV || "production";
if (env !== "production") {
    srcs.push("./tasks/dev/*.js");
}

const hub = new HubRegistry(srcs);

gulp.registry(hub);
