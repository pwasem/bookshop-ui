sap.ui.define([
  'bookshop/ui/localService/mockrequests/logBeforeRequest',
  'bookshop/ui/localService/mockrequests/localAnnotations',
  'bookshop/ui/localService/mockrequests/simulateError',
  'bookshop/ui/localService/mockrequests/logAfterRequest'
], (...mockrequests) => async (mockserver, options) => {
  for (const mockrequest of mockrequests) {
    await mockrequest(mockserver, options)
  }
})
