// Karma configuration
// Generated on Tue Jun 12 2018 09:38:27 GMT+0800 (CST)

var webpackConfig = require('../../build/webpack.test.conf');

module.exports = function karmaConfig (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],

    customLaunchers: {
      Chrome_travis_ci: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'sinon-chai', 'phantomjs-shim'],
    // frameworks: ['mocha', 'sinon-chai'],

    // test results reporter to use
    reporters: ['spec', 'coverage'],

    files: ['./index.js'],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './index.js': ['webpack', 'sourcemap', 'coverage']
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      noInfo: true
    },

    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' }
      ]
    },

    // enable / disable colors in the output (reporters and logs)
    colors: true
  });
};
