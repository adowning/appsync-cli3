// const path = require('path');
const fs = require('fs')

module.exports = {
    baseUrl: '/',
    outputDir: 'server/www/dist',
    lintOnSave: true,
    runtimeCompiler: false,
    configureWebpack: {
        devtool: 'source-map',
    },
    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        hot: true,
        // https: true,
        //  https: {
        //   key: fs.readFileSync('/home/ash/aa/localcerts/server.key'),
        //   cert: fs.readFileSync('/home/ash/aa/localcerts/server.crt'),
        //   ca: fs.readFileSync('/home/ash/aa/localcerts/ca.pem'),
        // }
    },
}
