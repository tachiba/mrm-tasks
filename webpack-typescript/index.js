"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const packages = [
    "webpack",
    "webpack-cli",
    "webpack-dev-server",
    "ts-loader",
    "html-webpack-plugin",
    "clean-webpack-plugin",
    "postcss",
    "postcss-flexbugs-fixes",
    "postcss-preset-env",
    "style-loader",
    "postcss-loader",
    "css-loader"
];
const WEBPACK_CONFIG_FILE_NAME = "webpack.config.js";
const POST_CSS_CONFIG_FILE_NAME = "postcss.config.js";
function task(config) {
    mrm_core_1.copyFiles(__dirname, [
        WEBPACK_CONFIG_FILE_NAME,
        POST_CSS_CONFIG_FILE_NAME,
    ]);
    mrm_core_1.install(packages);
    mrm_core_1.packageJson()
        .setScript("build", "npx webpack --mode production")
        .setScript("start", "node_modules/.bin/webpack-dev-server --open")
        .set("sideEffects", false)
        .save();
}
task.description = "Add Webpack";
module.exports = task;
