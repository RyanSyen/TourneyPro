// const path = require("path");
// const webpack = require("webpack");
// const dotenv = require("dotenv");
// // const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = (e) => {
//   // call dotenv and it will return an Object with a parsed key
//   const env = dotenv.config().parsed;
//   console.log(e.REACT_APP_FIREBASE_API_KEY);

//   // reduce it to a nice object, the same as before
//   const envKeys = Object.keys(env).reduce((prev, next) => {
//     prev[`process.env.${next}`] = JSON.stringify(env[next]);
//     return prev;
//   }, {});

//   return {
//     entry: path.join(__dirname, "src", "main.jsx"),
//     output: {
//       path: path.resolve(__dirname, "dist"),
//     },
//     module: {
//       // rules: [
//       //   {
//       //     test: /\.m?js$/,
//       //     exclude: /(node_modules)/,
//       //     use: {
//       //       // `.swcrc` can be used to configure swc
//       //       loader: "swc-loader",
//       //     },
//       //   },
//       // ],
//     },
//     plugins: [
//       // new HtmlWebpackPlugin({
//       //   template: path.join(__dirname, "index.html"),
//       // }),
//       new webpack.DefinePlugin(envKeys),
//     ],
//   };
// };
