/**
 * Created by xuanjinliang on 2019/06/23.
 */

const TerserPlugin = require('terser-webpack-plugin')
const webpack = require('webpack')

const minimizer =
  process.env.NODE_ENV === 'production'
    ? [
        new TerserPlugin({
          terserOptions: {
            output: {
              beautify: false
            },
            warnings: false
          }
        })
      ]
    : []

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',

  devServer: {
    disableHostCheck: true,
    port: 9001
    /* proxy: {
      '/api': {
        target: 'http://107.21.162.31:8088',
        pathRewrite: {
          '^/api': ''
        }
      }
    } */
  },

  css: {
    loaderOptions: {
      css: {
        localIdentName: '[local]_[hash:base64:8]',
        camelCase: 'only'
      },
      less: {
        javascriptEnabled: true
      }
    }
  },

  productionSourceMap: process.env.NODE_ENV !== 'production',

  configureWebpack: {
    optimization: {
      minimizer,
      splitChunks: {
        cacheGroups: {
          components: {
            name: `chunk-components`,
            test: /[\\/]components[\\/]/,
            priority: 0,
            chunks: 'async',
            enforce: true
          },
          commonStyle: {
            name: `chunk-style`,
            test: /\.less$/,
            minChunks: 2,
            priority: 0,
            chunks: 'async',
            enforce: true
          }
        }
      }
    },
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
  },

  pluginOptions: {
    i18n: {
      locale: 'cn',
      fallbackLocale: 'cn',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
