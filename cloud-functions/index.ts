import { install } from "mrm-core";
import { Config } from "../lib/config";

const packages = ["@google-cloud/functions-framework"];
const devPackages = ["@types/express"];

function task(config: Config) {
  install(packages, {
    dev: false
  });

  install(devPackages, {
    dev: true
  });
}

task.description = "Add Cloud Function (runtime>=nodejs10)";

module.exports = task;
