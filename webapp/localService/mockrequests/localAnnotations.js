sap.ui.define([
  'sap/ui/core/util/MockServer',
  'sap/base/util/ObjectPath'
], (MockServer, ObjectPath) => async (mockserver, { manifest, appBasePath }) => {
  const annotationNames = ObjectPath.get([
    'sap.app',
    'dataSources',
    'service',
    'settings',
    'annotations'
  ], manifest)

  if (!annotationNames) {
    return
  }

  const annotations = annotationNames.map(name => ObjectPath.get([
    'sap.app',
    'dataSources',
    name
  ], manifest))

  for (const annotation of annotations) {
    const localUri = ObjectPath.get([
      'settings',
      'localUri'
    ], annotation)

    const localUrl = sap.ui.require.toUrl(`${appBasePath}/${localUri}`)

    const mockserver = new MockServer({
      rootUri: annotation.uri,
      requests: [{
        method: 'GET',
        // path: new RegExp('([?#].*)?'),
        path: /([?#].*)?/,
        response: xhr => {
          const request = new XMLHttpRequest()
          request.open('GET', localUrl, false)
          request.send(null)
          xhr.respondXML(200, {}, request.responseText)
          return true
        }
      }]
    })

    mockserver.start()
  }
})
