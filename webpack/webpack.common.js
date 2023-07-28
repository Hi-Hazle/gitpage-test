const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")
const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const dotenv = require("dotenv")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")

dotenv.config()

module.exports = {
   output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "../build")
   },
   module: {
      rules: [
         {
            test: /\.(js|jsx)$/,
            loader: "esbuild-loader",
            options: {
               loader: "jsx",
               target: "es2015"
            }
         },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: "babel-loader",
               options: {
                  presets: ["@babel/preset-react", "@babel/preset-env"],
                  plugins: [
                     // Styled Components의 babel 플러그인 추가
                     ["babel-plugin-styled-components", { displayName: true }]
                  ]
               }
            }
         },
         {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
               "file-loader?name=assets/images/[name].[ext]",
               {
                  loader: "image-webpack-loader",
                  options: {
                     mozjpeg: {
                        progressive: true,
                        quality: 65
                     },
                     optipng: {
                        enabled: false
                     },
                     pngquant: {
                        quality: [0.65, 0.9],
                        speed: 4
                     },
                     gifsicle: {
                        interlaced: false
                     },
                     webp: {
                        quality: 75
                     }
                  }
               }
            ]
         }
      ]
   },
   resolve: {
      alias: {
         pages: path.resolve(__dirname, "../src/pages"),
         components: path.resolve(__dirname, "../src/components"),
         routes: path.resolve(__dirname, "../src/routes"),
         provider: path.resolve(__dirname, "../src/provider"),
         utils: path.resolve(__dirname, "../src/utils"),
         stores: path.resolve(__dirname, "../src/stores"),
         styles: path.resolve(__dirname, "../src/styles"),
         hooks: path.resolve(__dirname, "../src/hooks")
      }
   },
   plugins: [
      new webpack.DefinePlugin({
         "process.env.TEST_ENV": JSON.stringify(process.env.TEST_ENV)
      }),
      new webpack.EnvironmentPlugin(["TEST_ENV"]),
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin({
         template: `${path.resolve(__dirname, "../public")}/index.html`
      }),
      new webpack.ProvidePlugin({
         React: "react"
      }),
      new CopyPlugin({
         patterns: [
            {
               from: path.resolve(__dirname, "../public/images"),
               to: path.resolve(__dirname, "../build/images")
            }
         ]
      }),
      new CleanWebpackPlugin()
   ],
   performance: {
      hints: false
   }
}
