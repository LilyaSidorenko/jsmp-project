const webpack = require('webpack');

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        preprocessors: {
            'frontend/js/calculator.js': ['babel', 'coverage'],
            'frontend/test/*.js': ['babel', 'webpack']


        },
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
                sourceMap: 'inline'
            },
            filename: function (file) {
                return file.originalPath.replace(/\.js$/, '.es5.js');
            },
            sourceFileName: function (file) {
                return file.originalPath;
            }
        },
        webpack: {

        },

        files: [
            'frontend/js/calculator.js',
            'frontend/test/*.js'
        ],

        plugins: [
            require("karma-jasmine"),
            require("karma-webpack"),
            require("karma-coverage"),
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
