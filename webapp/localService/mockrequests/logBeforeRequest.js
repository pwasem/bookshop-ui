sap.ui.define([
  'sap/ui/core/util/MockServer'
], (MockServer) => {
  const parse = any => {
    let parsed = null
    try {
      parsed = JSON.parse(any)
    } catch (error) {
      // parse failed
    }
    return parsed
  }
  return (mockserver, { rootUri }) => {
    for (const httpMethod in MockServer.HTTPMETHOD) {
      mockserver.attachBefore(httpMethod, event => {
        const xhr = event.getParameter('oXhr')
        const url = decodeURIComponent(xhr.url.replace(rootUri, ''))
        const requestBody = parse(xhr.requestBody)
        console.log(`Before ${httpMethod} ${url}`, requestBody)
      })
    }
  }
})
