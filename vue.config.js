const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

/*const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default

module.exports = {
  configureWebpack: {
    plugins: [
      // new MiniCssExtractPlugin(),
      new HTMLInlineCSSWebpackPlugin({
        styleTagFactory({ style }) {
          return `<style amp-custom>${style.replace(/\!important/g, '')}</style>`;
        },
      }),
    ],
  },
};*/

/*const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default

module.exports = {
  css: {
    extract: false
  },
  configureWebpack: {
    plugins: [
      // new MiniCssExtractPlugin(),
      new HTMLInlineCSSWebpackPlugin({
        styleTagFactory({ style }) {
          return `<style amp-custom>${style}</style>`;
        },
      }),
    ],
  }
};*/

// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin');
/*const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
  configureWebpack: {
    plugins: [
      // new MiniCssExtractPlugin(),
      new HTMLInlineCSSWebpackPlugin({
        styleTagFactory({ style }) {
          return `<style amp-custom>${style}</style>`;
        },
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          loader: "css-loader",
          options: {
            import: true,
          },
        }
      ]
    }
  }
}*/
