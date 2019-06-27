"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
function task(config) {
    mrm_core_1.packageJson()
        .appendScript("deploy", "firebase deploy --only hosting")
        .save();
}
task.description = "Add Firebase Hosting";
module.exports = task;
