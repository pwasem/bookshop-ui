(() => {
  const merge = sap.ui.requireSync('sap/base/util/merge')
  merge(QUnit.config, sap.ui.requireSync('bookshop/ui/test/integration/config/qunit'))
  sap.ui.getCore().attachInit(function () {
    sap.ui.require([
      'sap/ui/test/Opa5',
      'bookshop/ui/test/integration/config/opa5',
      'bookshop/ui/test/integration/pages/AllPages',
      'bookshop/ui/test/integration/journeys/AllJourneys'
    ], function (Opa5, opa5Config, AllPages, AllJourneys) {
      Opa5.extendConfig(opa5Config)
      QUnit.start()
    })
  })
})()
