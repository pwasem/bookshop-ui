sap.ui.define([
  'sap/ui/test/Opa5',
  'bookshop/ui/test/integration/pages/Base'
], (Opa5, Base) => Opa5.createPageObjects({
  onTheListReport: {

    baseClass: Base,

    actions: {
      iPressTheGoButton: function () {
        return this.press({
          id: /^.*btnGo$/,
          controlType: 'sap.m.Button'
        })
      }
    },

    assertions: {
      iShouldSeeTheResponsiveTableWithItems: function (length) {
        return this.waitForControlWithProperties({
          id: /^.*responsiveTable$/,
          controlType: 'sap.m.Table',
          aggregationLengthEquals: {
            name: 'items',
            length
          }
        })
      }
    }
  }
}))
