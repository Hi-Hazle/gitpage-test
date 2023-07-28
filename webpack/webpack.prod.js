const { merge } = require("webpack-merge")
const commonConfig = require("./webpack.common.js")
const TerserPlugin = require("terser-webpack-plugin")
const { EsbuildPlugin } = require("esbuild-loader")

module.exports = merge(commonConfig, {
   mode: "production",
   devtool: false,
   optimization: {
      minimize: true,
      minimizer: [
         new EsbuildPlugin({
            target: "es2015",
            css: true
         }),
         new TerserPlugin()
      ],
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
