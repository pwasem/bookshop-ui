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

  const logResponse = ({ httpMethod, xhr, rootUri }) => {
    const url = decodeURIComponent(xhr.url.replace(rootUri, ''))
    const response = parse(xhr.responseText)
    console.log(`After ${httpMethod} ${url}`, response)
  }

  return (mockserver, { rootUri }) => {
    for (const httpMethod in MockServer.HTTPMETHOD) {
      mockserver.attachAfter(httpMethod, event => {
        const xhr = event.getParameter('oXhr')
        if (xhr.readyState < 4) {
          const onReadyStateChange = typeof xhr.onreadystatechange === 'function' ? xhr.onreadystatechange : () => { }
          xhr.onreadystatechange = (...args) => {
            onReadyStateChange.apply(xhr, ...args)
            if (xhr.readyState === 4) {
              logResponse({ httpMethod, xhr, rootUri })
            }
          }
        } else {
          logResponse({ httpMethod, xhr, rootUri })
        }
      })
    }
  }
})
