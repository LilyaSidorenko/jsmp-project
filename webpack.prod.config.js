const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.commom.config.js');

module.exports = function () {
    return webpackMerge(commonConfig, {
        context: __dirname + '/public',


        plugins: [
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/,
            cssProcessorOptions: {discardComments: {removeAll: true}}
        }),
        new webpack.optimize.UglifyJsPlugin()
    ],
    })
};
