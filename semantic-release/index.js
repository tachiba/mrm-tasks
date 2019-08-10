"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const COPY_FILES = [
    "release.config.js"
];
const packages = ["semantic-release"];
function task() {
    mrm_core_1.copyFiles(__dirname, COPY_FILES);
    mrm_core_1.install(packages);
}
task.description = "Add semantic-release";
module.exports = task;
