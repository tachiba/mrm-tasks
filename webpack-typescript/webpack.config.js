const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// TODO Minify CSS if you need

module.exports = (env, options) => {
  const defaults = {
    entry: {
      app: "./src/index.ts"
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({ template: "./src/index.html" })
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader"
            }
          ]
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    output: {
      filename: "[name].[contenthash].js",
      path: path.resolve(__dirname, "dist")
    }
  };

  if (options.mode === "production") {
    return Object.assign(
      {
        mode: "production",
        devtool: "source-map"
      },
      defaults
    );
  }
  return Object.assign(
    {
      mode: "development",
      devtool: "inline-source-map",
      devServer: {
        contentBase: "./dist"
      }
    },
    defaults
  );
};
