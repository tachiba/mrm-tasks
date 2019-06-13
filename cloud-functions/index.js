"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const packages = ["@google-cloud/functions-framework", "@types/express"];
function task(config) {
    mrm_core_1.install(packages);
}
task.description = "Add Cloud Function (runtime>=nodejs10)";
module.exports = task;
