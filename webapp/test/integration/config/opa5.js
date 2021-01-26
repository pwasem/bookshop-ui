sap.ui.define([
  'bookshop/ui/test/integration/arrangements/Arrangements',
  'bookshop/ui/test/integration/actions/Actions',
  'bookshop/ui/test/integration/assertions/Assertions'
], (Arrangements, Actions, Assertions) => {
  /*
   * config to be passed to Opa5.extendConfig()
   * @see https://sapui5.hana.ondemand.com/#/api/sap.ui.test.Opa5%23methods/sap.ui.test.Opa5.extendConfig
   */
  return {
    arrangements: new Arrangements(),
    actions: new Actions(),
    assertions: new Assertions(),
    pollingInterval: 1, // default: 400
    autoWait: true,
    // timeout: 120, // default: 15
    appParams: {
      'sap-ui-language': 'en-US',
      'sap-ui-animation': false
    }
  }
})
