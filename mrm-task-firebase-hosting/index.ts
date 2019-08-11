import { packageJson } from "mrm-core";

function task() {
  packageJson()
    .appendScript("deploy", "firebase deploy --only hosting")
    .save();
}
task.description = "Add Firebase Hosting";

module.exports = task;
