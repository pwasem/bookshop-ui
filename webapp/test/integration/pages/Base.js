sap.ui.define([
  'sap/ui/test/Opa5',
  'sap/ui/test/matchers/Properties',
  'sap/ui/test/actions/Press',
  'sap/ui/test/actions/EnterText'
], (Opa5, Properties, Press, EnterText) => Opa5.extend('bookshop.ui.test.integration.pages.Base', {
  waitForControlWithProperties: function (options = {}, properties = {}) {
    const { visible = true, enabled = true } = properties
    const { autoWait = (visible && enabled), matchers = [] } = options
    matchers.push(new Properties(properties))
    return this.waitFor({
      success: function (controls) {
        const control = Array.isArray(controls) ? controls[0] : controls
        Opa5.assert.ok(!!control, `Did see the control ${control.getId()} with properties: ${JSON.stringify(properties)}`)
      },
      errorMessage: `Did not see the control with properties: ${JSON.stringify(properties)}`,
      ...options,
      visible,
      autoWait,
      matchers
    })
  },

  press: function (options) {
    return this.waitFor({
      actions: [
        new Press()
      ],
      success: function (controls) {
        const control = Array.isArray(controls) ? controls[0] : controls
        Opa5.assert.ok(!!control, `Did press: ${JSON.stringify(options)}`)
      },
      errorMessage: `Did not press: ${JSON.stringify(options)}`,
      ...options
    })
  },

  enterText: function (options, text) {
    const { clearTextFirst = true } = options
    return this.waitFor({
      actions: [
        new EnterText({
          clearTextFirst,
          text
        })
      ],
      success: function (controls) {
        const control = Array.isArray(controls) ? controls[0] : controls
        Opa5.assert.ok(!!control, `Did enter text: ${JSON.stringify(options)} - ${text}`)
      },
      errorMessage: `Did not enter text: ${JSON.stringify(options)} - ${text}`,
      ...options
    })
  }
}))
