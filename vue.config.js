const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

/*module.exports = {
  configureWebpack: {
    resolve: {
      fallback: {
        util: require.resolve("util/"),
        path: require.resolve("path-browserify")
      }
    }
  }
}*/

const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default

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
  },
};

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
