const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const CompressionPlugin = require("compression-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: __dirname + "/dist/static",
    publicPath: "/static/"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      "@actions": __dirname + "/src/redux/actions",
      "@components": __dirname + "/src/components",
      "@pages": __dirname + "/src/pages"
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i
    }),
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: __dirname + "/dist/index.html"
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: "./src/service-worker.js",
      importWorkboxFrom: "local"
    }),
    new WebpackPwaManifest({
      name: "Ecommerce Web App",
      short_name: "Ecommerce",
      description:
        "An e-commerce web application built in with Django and React",
      background_color: "#f4f4f4",
      icons: [
        {
          src: "./icon.png",
          destination: "icons",
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }
      ]
    })
  ]
};
