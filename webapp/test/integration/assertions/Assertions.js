sap.ui.define([
  'sap/ui/test/Opa5'
], Opa5 => Opa5.extend('bookshop.ui.test.integration.assertions.Assertions', {
  iStopTheApp: function () {
    return this.iTeardownMyAppFrame()
  }
}))
