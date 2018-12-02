// const path = require('path');
const fs = require('fs')

module.exports = {
    baseUrl: '/',
    outputDir: 'dist',
    lintOnSave: true,
    runtimeCompiler: false,
    configureWebpack: {
        devtool: 'source-map',
    },
    devServer: {
        host: 'localhost',
        disableHostCheck: true,
        port: 8085,
        // hot: true,
        https: true,
         https: {
          key: fs.readFileSync('/home/ash/aa/localcerts/ash.key'),
          cert: fs.readFileSync('/home/ash/aa/localcerts/ash.crt'),
          ca: fs.readFileSync('/home/ash/aa/localcerts/ca.pem'),
        }
    },
}
