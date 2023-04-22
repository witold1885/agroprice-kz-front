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

// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const postcssAmpCustom = require('postcss-amp-custom');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default
// const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
// const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
// const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
// const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.scss$/,
          chunks: 'all',
          enforce: true,
        },
      },
    });
  },
  css: {
    extract: false,
  },
  filenameHashing: false,
  runtimeCompiler: true,
  productionSourceMap: false,
  configureWebpack: {
    // target: 'node',
    /*output: {
      // ...
      libraryTarget: 'commonjs2'
    },*/
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'amp-index.html',
        template: 'public/index.html',
        minify: true,
        inject: true,
        scriptLoading: 'blocking',
      }),
      // new VueSSRServerPlugin(),
      // new VueSSRClientPlugin(),
    ],
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  },
};

/*module.exports = {
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        inlineSource: '.(css)$',
      }),
      new HTMLInlineCSSWebpackPlugin({
        filter: (filename) => {
          return filename.endsWith('.scss');
        },
        replace: {
          target: '<link rel="stylesheet" href="[path]">',
          remove: true,
        },
      }),
      new HTMLWebpackInlineSourcePlugin()
    ],
  },
};*/

/*module.exports = {
    chainWebpack: config => {
      config.module
        .rule('scss')
        .oneOf('vue')
        .use('vue-style-loader')
        .before('css-loader')
        .loader('vue-style-loader')
        .end()
        .use('css-loader')
        .loader('css-loader')
        .end()
        .use('sass-loader')
        .loader('sass-loader')
        .end()
        .end()
        .oneOf('normal')
        .use('mini-css-extract-plugin')
        .loader(MiniCssExtractPlugin.loader)
        .end()
        .use('css-loader')
        .loader('css-loader')
        .end()
        .use('sass-loader')
        .loader('sass-loader')
        .end()
    },
  configureWebpack: {
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
      }),
    ],
  }
};*/

// module.exports = {
  // configureWebpack: {
    // target: 'web',
    // module: {
      // rules: [
        // {
          // test: /\.scss$/,
          // use: [
            // 'vue-style-loader',
            // 'css-loader',
            // MiniCssExtractPlugin.loader,
            /*{
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    postcssAmpCustom({
                      strict: true,
                      // додайте наступний параметр, якщо використовуєте SCSS
                      compileSCSS: true,
                      // додайте наступний параметр, якщо використовуєте PostCSS
                      compilePostCSS: true,
                      // додайте наступний параметр, якщо використовуєте CSS Modules
                      compileCssModules: true,
                    })
                  ]
                }
              }
            },*/
            // 'sass-loader',
            /*{
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            },*/
            /*{
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sassOptions: {
                  fiber: require('fibers'),
                  indentedSyntax: true
                }
              }
            },
            {
              loader: 'null-loader', // лоадер, який не робить нічого
            }*/
          // ]
        // }
      // ]
    // },
    /*plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css'
      }),
      new HtmlWebpackPlugin({
        filename: 'amp-index.html',
        template: 'public/index.html',
        inject: true,
        scriptLoading: 'defer'
      })
    ]*/
  // }
// };

/*const postcssAmpCustom = require('postcss-amp-custom');

module.exports = {
  configureWebpack: {
    css: {
      loaderOptions: {
        sass: {
          implementation: require('sass')
        },
        postcss: {
          plugins: [
            postcssAmpCustom()
          ]
        }
      }
    }
  }
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
