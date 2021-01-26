sap.ui.define([
  'sap/base/Log',
  'bookshop/ui/localService/mockserver'
], async (Log, mockserver) => {
  try {
    await mockserver.start()
    sap.ushell.Container
      .createRenderer()
      .placeAt('content')
  } catch (oError) {
    Log.error(oError.message, oError.name, 'flpSandboxMockServer')
  }
})
