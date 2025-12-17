const puppeteer = require('puppeteer');
process.env.CHROME_BIN = puppeteer.executablePath();

module.exports = function(config) {
  const isUiMode = process.env.KARMA_MODE === 'ui';

  config.set({
    frameworks: ['jasmine'],
    files: [
      { pattern: 'test-karma/**/*.spec.js', watched: false }
    ],
    preprocessors: {
      'test-karma/**/*.spec.js': ['esbuild']
    },
    esbuild: {
      target: 'es2020',
      jsx: 'automatic',
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx',
        '.css': 'empty',
        '.png': 'dataurl',
        '.jpg': 'dataurl',
        '.svg': 'dataurl'
      },
      define: {
        'process.env.NODE_ENV': '"test"'
      }
    },
    browsers: isUiMode ? ['Chrome'] : ['ChromeHeadless'],
    singleRun: !isUiMode,
    reporters: isUiMode ? ['progress', 'kjhtml'] : ['progress'],
    client: {
      clearContext: false
    }
  });
};
