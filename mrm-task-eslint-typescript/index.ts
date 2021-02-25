import { json, packageJson, lines, install } from "mrm-core";

const configFile = ".eslintrc.json";
const packages = [
  "eslint",
  "@typescript-eslint/eslint-plugin",
  "@typescript-eslint/parser",

  "eslint-config-airbnb-base",
  "eslint-config-prettier",
  "eslint-plugin-import",
  "eslint-plugin-prettier",

  "prettier"
];
const eslintExtends = [
  "airbnb-base",
  // SEE: https://github.com/benmosher/eslint-plugin-import#typescript
  // https://github.com/benmosher/eslint-plugin-import/tree/master/config
  "plugin:import/errors",
  "plugin:import/warnings",
  "plugin:import/typescript",
  // SEE: https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#usage-with-prettier
  // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.json
  "plugin:@typescript-eslint/recommended",
  "plugin:@typescript-eslint/recommended-requiring-type-checking",
  // SEE: https://prettier.io/docs/en/integrating-with-linters.html
  // https://github.com/prettier/eslint-plugin-prettier/blob/master/eslint-plugin-prettier.js
  // https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21
  "plugin:prettier/recommended"
];
const eslintIgnores = ["*.config.js", "node_modules/", "coverage/"];
const eslintDefaultRules = {};
const overrides = [
  {
    // TypeScript
    files: ["*.ts", "*.tsx"],
    rules: {
      // Allow omitting TypeScript file extension
      // https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb-base/rules/imports.js#L139
      // https://stackoverflow.com/questions/59265981/typescript-eslint-missing-file-extension-ts-import-extensions
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          mjs: "never",
          jsx: "never",
          ts: "never",
          tsx: "never"
        }
      ],

      //
      // Extension rules
      //

      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-dupe-class-members.md
      // Fixed https://github.com/typescript-eslint/typescript-eslint/issues/291
      "no-dupe-class-members": "off",
      "@typescript-eslint/no-dupe-class-members": ["error"],

      // False positive with TypeScript
      // https://github.com/typescript-eslint/typescript-eslint/issues/1277
      "consistent-return": [
        "off",
        {
          treatUndefinedAsUnspecified: false
        }
      ],

      // False positive with TypeScript optional chaining
      // https://github.com/typescript-eslint/typescript-eslint/issues/1220
      "no-unused-expressions": "off",
      "@typescript-eslint/no-unused-expressions": "error",

      // https://github.com/typescript-eslint/typescript-eslint/blob/bfe255fde0cb5fe5e32c02eb5ba35d27fb23d9ea/packages/eslint-plugin/docs/rules/no-shadow.md
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": [
        "error",
        { ignoreTypeValueShadow: true }
      ],

      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],

      //
      // Opinionated rules
      //

      // Allow an empty constructor with parameter properties
      "no-empty-function": [
        "error",
        {
          allow: ["constructors"]
        }
      ],
      "@typescript-eslint/no-parameter-properties": "off",
      "no-useless-constructor": "off",
      "@typescript-eslint/no-useless-constructor": "error",

      // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/naming-convention.md
      camelcase: "off",
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variableLike",
          format: ["camelCase", "UPPER_CASE", "PascalCase"],
          leadingUnderscore: "allow"
        }
      ]
    }
  },
  {
    // JSON
    files: ["*.json"],
    rules: {
      "no-unused-expressions": "off"
    }
  }
];

function task(config: { values: () => { env?: string; eslintRules?: any } }) {
  const { eslintRules, env } = config.values();

  const eslintrc = json(configFile);
  eslintrc.merge({
    extends: eslintExtends,
    parserOptions: { project: "./tsconfig.json" },
    rules: { ...eslintDefaultRules, ...eslintRules },
    overrides
  });
  if (typeof env !== "undefined") {
    eslintrc.merge({
      env: {
        [env]: true
      }
    });
  }
  eslintrc.save();

  lines(".eslintignore")
    .add(eslintIgnores)
    .save();

  packageJson()
    .setScript("lint", "eslint ./src --cache --fix --ext .ts,.tsx")
    .prependScript("pretest", "npm run lint")
    .save();

  install(packages);
}

task.description = "Add ESLint";

module.exports = task;
