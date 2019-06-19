"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
function task(config) {
    mrm_core_1.lines(".gitignore")
        .add([
        "# Firebase",
        ".firebase"
    ])
        .save();
    mrm_core_1.packageJson()
        .appendScript("deploy", "yarn build && firebase deploy")
        .save();
}
task.description = "Add Firebase";
module.exports = task;
