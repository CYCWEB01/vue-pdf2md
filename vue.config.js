const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify")
        }
    },
    plugins: [
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
        path: 'path-browserify'
      })
    ]
  }
})
