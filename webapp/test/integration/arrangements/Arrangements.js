sap.ui.define([
  'sap/ui/test/Opa5'
], (Opa5) => Opa5.extend('bookshop.ui.test.integration.arrangements.Arrangements', {
  _getSource: function ({ hash, urlParams }) {
    // start with base url
    let source = sap.ui.require.toUrl('bookshop/ui/test/flpSandboxMockServer.html')
    // append url params
    if (urlParams) {
      source += `?${urlParams}`
    }
    // append hash
    if (hash) {
      source += `#${hash.startsWith('/') ? hash.substring(1) : hash}`
    }
    return source
  },

  iStartTheApp: function (options = {}) {
    const { params = {}, hash = '', width = 1280, height = 1024 } = options
    const urlParams = new URLSearchParams({
      serverDelay: 100, // Start the app with a minimal delay to make tests run fast but still async to discover basic timing issues
      ...params
    })
    const source = this._getSource({ hash, urlParams })
    return this.iStartMyAppInAFrame({
      source,
      width,
      height
    })
  }
}))
