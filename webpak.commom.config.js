const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV || 'development';
const webpackMerge = require('webpack-merge');
const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        home: ['./js/calculator', './scss/add-list.scss']
    },
    output: {
        path: __dirname + '/public',
        filename: 'js/calculator.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {presets: ['es2015']}
            },

            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader', "sass-loader"]}),
            },

        ]
    },
    stats: {
        colors: true
    },

    plugins: [
        new ExtractTextPlugin('css/styles.css'),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
    ],
};
