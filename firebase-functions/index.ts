import { install, json, packageJson } from "mrm-core";
import { Config } from "../lib/config";

const packages = ["firebase-admin", "firebase-functions"];
const devPackages = ["firebase-functions-test"];

function task(config: Config) {
  packageJson()
    .merge({
      name: "functions",
      engines: {
        node: "10"
      }
    })
    .appendScript("build", "npx tsc")
    .appendScript("serve", "yarn build && firebase serve --only functions")
    .appendScript("shell", "yarn build && firebase functions:shell")
    .appendScript("start", "npm run shell")
    .appendScript("deploy", "firebase deploy --only functions")
    .appendScript("logs", "firebase functions:log")
    .save();

  json("tsconfig.json")
    .merge({
      compilerOptions: {
        module: "commonjs"
      }
    })
    .save();

  install(packages, { dev: false });
  install(devPackages, { dev: true });
}
task.description = "Add Firebase Functions";

module.exports = task;
