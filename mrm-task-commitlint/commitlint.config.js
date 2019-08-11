module.exports = {
  // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-api.md
  parserPreset: {
    parserOpts: {
      headerPattern: /^(.*?)(?:\((.*)\))?:?\s(.*)$/,
      headerCorrespondence: ["type", "scope", "subject"]
    }
  },
  // https://github.com/conventional-changelog/commitlint/blob/master/docs/reference-rules.md
  rules: {
    "body-leading-blank": [1, "always"],
    "footer-leading-blank": [1, "always"],
    "header-max-length": [2, "always", 72],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [2, "always", ["sentence-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [0],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      ["✨", "🐛", "📒", "👕", "♻️", "🚀", "💚", "⚙️", "🚮", "Revert"]
    ]
  }
};
