var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {

    entry: {
        files: ['./scss/bubble.scss', './js/bubble.js']
    },
    output: {
        filename: "js/main.min.js",
        path: __dirname + '/build',
    },

    module: {

        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader",
                ],
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' }),
            },


        ]
    },

    plugins: [
        new ExtractTextPlugin('css/styles.min.css'),
        new UglifyJSPlugin({
            compress: { warnings: false },
            include: /\.min\.js$/
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css$/,
            cssProcessorOptions: { discardComments: { removeAll: true } }
        })
    ],

    stats: {
        colors: true
    },
    devtool: 'source-map'
};