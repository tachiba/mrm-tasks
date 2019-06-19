import { packageJson, lines } from "mrm-core";
import { Config } from "../lib/config";

function task(config: Config) {
  lines(".gitignore")
    .add([
      "# Firebase",
      ".firebase"
    ])
    .save();

  packageJson()
    .appendScript("deploy", "yarn build && firebase deploy")
    .save();
}
task.description = "Add Firebase";

module.exports = task;
