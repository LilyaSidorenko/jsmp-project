const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: ['frontend/test/calculator.test.js', 'frontend/js/calculator.js'],
        preprocessors: {
            'frontend/js/calculator.test.js': ['webpack']
        },
        webpack: webpackConfig,
        plugins: [
            require("karma-jasmine"),
            require("karma-webpack"),
            require("karma-coverage"),
            require("babel-loader"),
            require("karma-phantomjs-launcher"),
            require("karma-babel-preprocessor"),
            require("babel-preset-es2015"),
        ],
        exclude: [],

        reporters: ['progress', 'coverage'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],

        singleRun: true,

        concurrency: Infinity
    })
};
