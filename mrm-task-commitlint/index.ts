import { packageJson, install, copyFiles } from "mrm-core";

const COPY_FILES = [
  "commitlint.config.js",
  "tachiba/commitlint-config-emoji"
];

const packages = ["@commitlint/cli", "@commitlint/config-conventional"];

function task() {
  copyFiles(__dirname, COPY_FILES);

  packageJson()
    .merge({
      husky: {
        hooks: {
          "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
        },
      }
    })
    .save();

  install(packages);
}
task.description = "Add commitlint";

module.exports = task;
