import { install, copyFiles } from "mrm-core";

const COPY_FILES = [
  "release.config.js", "tachiba/semantic-release-angular-emoji-config"
];

const packages = ["semantic-release"];

function task() {
  copyFiles(__dirname, COPY_FILES);

  install(packages);
}
task.description = "Add semantic-release";

module.exports = task;
