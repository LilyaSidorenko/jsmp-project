const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpak.commom.config.js');

module.exports = function () {
    return webpackMerge(commonConfig, {

        watch: true,

        devtool: 'cheap-inline-module-source-map',


        devServer: {
            contentBase: path.join(__dirname, "public"),
            compress: true,
            port: 8000,
            watchContentBase: true,
        }
    })
};
