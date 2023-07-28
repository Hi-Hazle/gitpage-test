const { merge } = require("webpack-merge")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const commonConfig = require("./webpack.common.js")

module.exports = merge(commonConfig, {
   mode: "development",
   devtool: "inline-source-map",
   devServer: {
      static: path.resolve(__dirname, "../public"),
      hot: true,
      port: 3000
   },
   optimization: {
      minimize: false, // 개발 환경에서는 최소화(minimize)하지 않습니다.
      splitChunks: {
         chunks: "all",
         cacheGroups: {
            common: {
               name: "common",
               chunks: "initial",
               minChunks: 2,
               priority: 10,
               reuseExistingChunk: true
            }
         }
      }
   }
})
