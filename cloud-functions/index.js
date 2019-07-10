"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const COPY_FILES = [
    // Cloud Function may create a default file which ignores dist/
    ".gcloudignore",
];
const packages = ["@google-cloud/functions-framework"];
const devPackages = ["@types/express"];
function task(config) {
    mrm_core_1.copyFiles(__dirname, COPY_FILES);
    mrm_core_1.json("tsconfig.json")
        .merge({
        compilerOptions: {
            module: "commonjs"
        }
    })
        .save();
    mrm_core_1.install(packages, {
        dev: false
    });
    mrm_core_1.install(devPackages, {
        dev: true
    });
}
task.description = "Add Cloud Function (runtime>=nodejs10)";
module.exports = task;
