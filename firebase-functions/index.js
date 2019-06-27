"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const packages = ["firebase-admin", "firebase-functions"];
const devPackages = ["firebase-functions-test"];
function task(config) {
    mrm_core_1.packageJson()
        .merge({
        name: "functions",
        engines: {
            node: "10"
        },
    })
        .appendScript("build", "npx tsc")
        .appendScript("serve", "yarn build && firebase serve --only functions")
        .appendScript("shell", "yarn build && firebase functions:shell")
        .appendScript("start", "npm run shell")
        .appendScript("deploy", "firebase deploy --only functions")
        .appendScript("logs", "firebase functions:log")
        .save();
    mrm_core_1.install(packages, { dev: false });
    mrm_core_1.install(devPackages, { dev: true });
}
task.description = "Add Firebase Functions";
module.exports = task;
