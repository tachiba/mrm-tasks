"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mrm_core_1 = require("mrm-core");
const configFile = '.eslintrc.json';
const packages = [
    "eslint",
    "@typescript-eslint/eslint-plugin",
    "eslint-config-airbnb-base",
    "eslint-config-prettier",
    "eslint-plugin-import",
    "eslint-plugin-prettier",
    "prettier"
];
const eslintExtends = [
    "airbnb-base",
    "plugin:import/typescript",
    // SEE: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage-with-prettier
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
    "plugin:@typescript-eslint/recommended",
    // SEE: https://prettier.io/docs/en/integrating-with-linters.html
    // https://github.com/prettier/eslint-plugin-prettier/blob/master/eslint-plugin-prettier.js
    "plugin:prettier/recommended",
    // https://github.com/prettier/eslint-config-prettier/blob/master/%40typescript-eslint.js
    "prettier/@typescript-eslint"
];
const eslintGitIgnores = [
    ".eslintcache"
];
const eslintIgnores = [
    "**/__tests__/*.ts",
    "node_modules/"
];
function task(config) {
    const { eslintRules } = config.values();
    const eslintrc = mrm_core_1.json(configFile);
    eslintrc.merge({
        extends: eslintExtends,
        parserOptions: { project: "./tsconfig.json" },
        env: {
            node: true
        },
        rules: eslintRules || {
            // TypeScript
            // False positive?
            "consistent-return": "off",
            // False positive?
            // SEE: https://github.com/typescript-eslint/typescript-eslint/issues/342
            "no-undef": "off",
            // eslint-plugin-node is not works properly??
            "import/no-unresolved": "off"
        },
    });
    eslintrc.save();
    mrm_core_1.lines('.eslintignore')
        .add(eslintIgnores)
        .save();
    mrm_core_1.lines('.gitignore')
        .add(eslintGitIgnores)
        .save();
    mrm_core_1.packageJson()
        .setScript('lint', 'eslint . --cache --fix --ext .ts,.tsx')
        .prependScript('pretest', 'npm run lint')
        .save();
    mrm_core_1.install(packages);
}
task.description = 'Adds ESLint';
module.exports = task;
