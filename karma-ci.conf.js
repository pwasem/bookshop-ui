const karmaUi5Helper = require('karma-ui5/helper')
const karmaConf = require('./karma.conf')
module.exports = config => {
  karmaConf(config)
  config.set({
    preprocessors: {
      '{webapp,webapp/!(test)}/*.js': ['coverage'] // TODO exclude localService
    },
    reporters: ['progress', 'coverage']
    // captureTimeout: 120000, // default: 60000
    // browserNoActivityTimeout: 60000, // default: 30000
    // pingTimeout: 60000, // default: 5000
    // browserDisconnectTimeout: 30000, // default: 2000
    // proxyValidateSSL: false
  })
  karmaUi5Helper.configureIframeCoverage(config)
}
