module.exports = {
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        // https://github.com/semantic-release/commit-analyzer#releaserules
        // https://github.com/semantic-release/commit-analyzer/blob/master/lib/default-release-rules.js
        releaseRules: [
          { type: "✨", release: "minor" },
          { type: "🐛", release: "patch" },
          { type: "🚀", release: "patch" },
        ],
        // https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser
        parserOpts: {
          headerPattern: /^(.*?)(?:\((.*)\))?:?\s(.*)$/,
          referenceActions: [
            "✨",
            "🐛",
            "📒",
            "👕",
            "♻️",
            "🚀",
            "💚",
            "⚙️",
            "🚮",
            "Revert"
          ]
        }
      }
    ],
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/github",
      {
        successComment: false,
        failComment: false,
        labels: false
      }
    ]
  ]
};
