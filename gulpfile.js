const gulp = require("gulp");

const HubRegistry = require("gulp-hub");

let srcs = ["./dev/tasks/!(config).js"];

const env = process.env.NODE_ENV || "production";
if (env !== "production") {
    srcs.push("./dev/tasks/dev/*.js");
}

const hub = new HubRegistry(srcs);

gulp.registry(hub);
