const path = require("path");

const main = {
  mode: "development",
  target: "electron-main",
  entry: path.join(__dirname, "src", "main"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "__dist"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};

const renderer = {
  mode: "development",
  target: "electron-renderer",
  devtool: "inline-source-map",
  entry: path.join(__dirname, "src", "renderer", "index"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "__dist", "scripts"),
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{ loader: "ts-loader" }],
      },
    ],
  },
};

module.exports = [main, renderer];
