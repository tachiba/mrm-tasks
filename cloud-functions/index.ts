import { install } from "mrm-core";
import { Config } from "../lib/config";

const packages = ["@google-cloud/functions-framework", "@types/express"];

function task(config: Config) {
  install(packages);
}

task.description = "Add Cloud Function (runtime>=nodejs10)";

module.exports = task;
