const { version } = require("./package.json");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtensionReloader = require("webpack-extension-reloader");
const path = require("path");

const config = {
  mode: process.env.NODE_ENV,
  context: path.join(__dirname, "/src"),
  entry: {
    background: "./background.ts",
    content: "./content.ts",
    options: "./options.ts",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "dist/"),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "all",
    },
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: "icons", to: "icons" },
      { from: "options/options.html", to: "options/options.html" },
      { from: "options/css/bulma.css", to: "options/css/bulma.css" },
      {
        from: "manifest.json",
        to: "manifest.json",
        transform: content => {
          const jsonContent = JSON.parse(content);
          jsonContent.version = version;
          return JSON.stringify(jsonContent, null, 2);
        },
      },
    ]),
  ],
};

if (process.env.HMR === "true") {
  config.plugins = (config.plugins || []).concat([
    new ExtensionReloader({
      manifest: path.join(__dirname, "/src/manifest.json"),
    }),
  ]);
}

module.exports = config;
