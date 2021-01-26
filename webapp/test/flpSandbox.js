sap.ui.define([
  'sap/base/Log'
], async (Log) => {
  try {
    sap.ushell.Container
      .createRenderer()
      .placeAt('content')
  } catch (oError) {
    Log.error(oError.message, oError.name, 'flpSandbox')
  }
})
