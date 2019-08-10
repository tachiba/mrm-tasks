"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const COPY_FILES = [
    "commitlint.config.js"
];
const packages = ["@commitlint/cli", "@commitlint/config-conventional"];
function task() {
    mrm_core_1.copyFiles(__dirname, COPY_FILES);
    mrm_core_1.packageJson()
        .merge({
        husky: {
            hooks: {
                "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
            },
        }
    })
        .save();
    mrm_core_1.install(packages);
}
task.description = "Add commitlint";
module.exports = task;
