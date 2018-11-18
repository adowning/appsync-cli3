// const path = require('path');

module.exports = {
  baseUrl: "/",
  outputDir: "server/www/dist",
  lintOnSave: true,
  runtimeCompiler: false,
  configureWebpack: {
    devtool: "source-map"
  }
};
