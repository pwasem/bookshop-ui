sap.ui.define([
  'sap/ui/core/util/MockServer'
], MockServer => async (mockserver, { urlParams, entitySet, mockhelper }) => {
  if (urlParams.get('metadataError') === 'true') {
    for (const request of mockserver.getRequests()) {
      if (request.path.toString().includes('$metadata')) {
        request.response = xhr => mockhelper.respondError(xhr, { message: 'simulated metadata error', fireEvents: false })
      }
    }
  }
  const serviceError = parseInt(urlParams.get('serviceError') || '0')
  if (serviceError) {
    for (const request of mockserver.getRequests()) {
      if (request.path.toString().includes(entitySet)) {
        request.response = xhr => mockhelper.respondError(xhr, { message: 'simulated service error' })
      }
    }
  }
})
