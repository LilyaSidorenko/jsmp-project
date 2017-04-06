// Karma configuration
// Generated on Thu Apr 06 2017 17:09:23 GMT+0300 (EEST)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],

    files: [
        'public/js/*.js',
        'frontend/test/*.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],

    singleRun: true,

    concurrency: Infinity
  })
}
