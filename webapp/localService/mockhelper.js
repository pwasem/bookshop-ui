sap.ui.define([], () => {
  let mockserver = null

  const init = ms => {
    mockserver = ms
  }

  const fireEvent = (xhr, hook, options = {}) => {
    const { entitySet = '', urlParams = {} } = options
    const event = `${xhr.method}${entitySet}:${hook}`
    mockserver.fireEvent(event, {
      oXhr: xhr,
      sUrlParams: urlParams
    })
  }

  // e.g. "GETEntity:before")
  const fireBefore = (xhr, options) => fireEvent(xhr, 'before', options)

  // e.g. "GETEntity:after")
  const fireAfter = (xhr, options) => fireEvent(xhr, 'after', options)

  const respondJSON = (xhr, data, options = {}) => {
    fireBefore(xhr)
    const { status = 200, headers = {} } = options
    const response = data.d ? data : { d: data }
    xhr.respondJSON(status, headers, response)
    fireAfter(xhr)
    return true // no additional request handlers should be checked for that request
  }

  const respondError = (xhr, { code = 500, message = 'Error message', fireEvents = true }) => {
    if (fireEvents) {
      fireBefore(xhr)
    }
    xhr.respondJSON(code, {}, {
      error: {
        code,
        message: {
          lang: 'en',
          value: message
        }
      }
    })
    if (fireEvents) {
      fireAfter(xhr)
    }
    return true
  }

  const getEntities = (entitySet, query) => {
    const entities = mockserver.getEntitySetData(entitySet)
    if (!query) {
      return entities
    }
    const properties = Object.keys(query)
    return entities.filter(entity => properties.every(property => entity[property] === query[property]))
  }

  const setEntities = (entitySet, entities) => mockserver.setEntitySetData(entitySet, entities)

  const addRequest = request => {
    mockserver.setRequests([
      ...mockserver.getRequests(),
      request
    ])
  }

  const httpRequest = ({ method, url, headers = {}, data = null, json = true }) => {
    const request = new XMLHttpRequest()
    request.open(method, url, false) // sync!
    if (json) {
      headers['Content-Type'] = 'application/json'
    }
    for (const [key, value] of Object.entries(headers)) {
      request.setRequestHeader(key, value)
    }
    const body = data ? JSON.stringify(data) : null
    request.send(body)
    const { responseText = '' } = request
    return (json && responseText) ? JSON.parse(responseText) : responseText
  }

  const createEntity = (entitySet, entity) => {
    return httpRequest({
      method: 'POST',
      url: `${mockserver.getRootUri()}${entitySet}`,
      data: entity
    })
  }

  const updateEntities = (entitySet, query, data) => {
    const entities = getEntities(entitySet, query)
    return entities.map(entity => httpRequest({
      method: 'MERGE',
      url: entity.__metadata.uri,
      data
    }))
  }

  const deleteEntities = (entitySet, query) => {
    const entities = getEntities(entitySet, query)
    return entities.map(entity => httpRequest({
      method: 'DELETE',
      url: entity.__metadata.uri
    }))
  }

  return {
    init,
    fireBefore,
    fireAfter,
    respondJSON,
    respondError,
    getEntities,
    setEntities,
    addRequest,
    httpRequest,
    createEntity,
    updateEntities,
    deleteEntities
  }
})
