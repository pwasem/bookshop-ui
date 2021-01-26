module.exports = config => {
  config.set({
    logLevel: config.LOG_ERROR,
    browserConsoleLogOptions: {
      level: 'error'
    },
    frameworks: ['ui5'],
    browsers: ['CustomChromeHeadless'],
    customLaunchers: {
      CustomChromeHeadless: {
        base: 'ChromeHeadless',
        flags: [
          '--window-size=1280,1024',
          // Running as root without --no-sandbox is not supported. See https://crbug.com/638180
          '--no-sandbox'
        ]
      }
    },
    concurrency: 1,
    singleRun: true
  })
}
