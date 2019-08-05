import { copyFiles, install, json } from "mrm-core";
import { Config } from "../lib/config";

const COPY_FILES = [
  // Cloud Function may create a default file which ignores dist/
  ".gcloudignore"
];

const packages = ["@google-cloud/functions-framework"];
const devPackages = ["@types/express"];

function task(config: Config) {
  copyFiles(__dirname, COPY_FILES);

  json("tsconfig.json")
    .merge({
      compilerOptions: {
        module: "commonjs"
      }
    })
    .save();

  install(packages, {
    dev: false
  });

  install(devPackages, {
    dev: true
  });
}

task.description = "Add Cloud Function (runtime>=nodejs10)";

module.exports = task;
