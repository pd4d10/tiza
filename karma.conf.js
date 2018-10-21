// Karma configuration
// Generated on Sun Oct 14 2018 17:47:46 GMT+0800 (China Standard Time)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'karma-typescript'],

    // list of files / patterns to load in the browser
    files: [
      // Watch src files for changes but
      // don't load them into the browser.
      'src/**/*.ts',
      'test/**/*.ts',
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      '**/*.ts': 'karma-typescript', // *.tsx for React Jsx
      // 'src/**/*.ts': ['rollup'],
      // 'test/**/*.ts': ['rollup'],
    },

    // rollupPreprocessor: {
    //   plugins: [require('rollup-plugin-typescript2')()],
    //   output: {
    //     format: 'iife', // Helps prevent naming collisions.
    //     moduleName: 'tiza', // Required for 'iife' format.
    //     sourceMap: 'inline', // Sensible for testing.
    //   },
    // },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage', 'karma-typescript'],

    // https://github.com/codecov/example-node#istanbul
    // Configure code coverage reporter
    coverageReporter: {
      reporters: [
        // generates ./coverage/lcov.info
        { type: 'lcovonly', subdir: '.' },
        // generates ./coverage/coverage-final.json
        { type: 'json', subdir: '.' },
      ],
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'Safari'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,
  })
}
