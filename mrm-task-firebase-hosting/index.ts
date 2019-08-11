import { packageJson } from "mrm-core";
import { Config } from "../lib/config";

function task(config: Config) {
  packageJson()
    .appendScript("deploy", "firebase deploy --only hosting")
    .save();
}
task.description = "Add Firebase Hosting";

module.exports = task;
