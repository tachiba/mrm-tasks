import { packageJson } from "mrm-core";
import { Config } from "../lib/config";

function task(config: Config) {
  packageJson()
    .appendScript("deploy", "yarn build && firebase deploy")
    .save();
}
task.description = "Add Firebase";

module.exports = task;
