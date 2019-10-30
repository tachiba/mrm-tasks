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
  // SEE: https://prettier.io/docs/en/integrating-with-linters.html
  // https://github.com/prettier/eslint-plugin-prettier/blob/master/eslint-plugin-prettier.js
  "plugin:prettier/recommended",
  // https://github.com/prettier/eslint-config-prettier/blob/master/%40typescript-eslint.js
  "prettier/@typescript-eslint"
];
const eslintIgnores = ["node_modules/"];
const eslintDefaultRules = {

};
const overrides = [
  {
    // TypeScript
    files: ["*.ts", "*.tsx"],
    rules: {
      // https://github.com/typescript-eslint/typescript-eslint/issues/291
      "no-dupe-class-members": "off",

      // False positive?
      // `treatUndefinedAsUnspecified` is not working with TypeScript
      "consistent-return": ["off", {
        "treatUndefinedAsUnspecified": false
      }],

      // False positive?
      // SEE: https://github.com/typescript-eslint/typescript-eslint/issues/342
      "no-undef": "off",

      // Allow an empty constructor with parameter properties
      "no-empty-function": [
        "error",
        {
          "allow": [
            "constructors"
          ]
        }
      ],
      "@typescript-eslint/no-parameter-properties": "off",
      "no-useless-constructor": "off",
      "@typescript-eslint/no-useless-constructor": "error",
    }
  },
  {
    // JSON
    "files": ["*.json"],
    "rules": {
      "no-unused-expressions": "off"
    }
  },
  {
    // Test
    "files": ["*.test.ts"],
    "rules": {
      "@typescript-eslint/camelcase": "off"
    }
  }
];

function task(config: { values: () => { env?: string, eslintRules?: any } }) {
  const { eslintRules, env } = config.values();

  const eslintrc = json(configFile);
  eslintrc.merge({
    extends: eslintExtends,
    parserOptions: { project: "./tsconfig.json" },
    rules: Object.assign({}, eslintDefaultRules, eslintRules),
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
