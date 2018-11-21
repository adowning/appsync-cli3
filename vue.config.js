// const path = require('path');

module.exports = {
  baseUrl: '/',
  outputDir: 'server/www/dist',
  lintOnSave: true,
  runtimeCompiler: false,
  configureWebpack: {
    devtool: 'source-map'
  },
  devServer: {
    host: "0.0.0.0",
    hot: true,
    disableHostCheck: true
  }
}
