const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    context: __dirname + '/frontend',

    entry: {
        home: ['./js/calculator', './scss/add-list.scss']
    },
    output: {
        path: __dirname + '/public',
        filename: 'js/calculator.js'
    },
    watch: NODE_ENV == 'development',


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
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 9000,
        watchContentBase: true,
    },
    devtool: NODE_ENV == 'development' ? 'cheap-inline-module-source-map' : null,

};

if (NODE_ENV == 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}