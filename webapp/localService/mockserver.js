sap.ui.define([
  'sap/ui/core/util/MockServer',
  'sap/base/util/ObjectPath',
  'sap/base/Log',
  'bookshop/ui/localService/config',
  'bookshop/ui/localService/mockhelper',
  'bookshop/ui/localService/mockrequests'
], (MockServer, ObjectPath, Log, config, mockhelper, mockrequests) => {
  const { appBasePath, entitySet } = config

  const getUrlParams = () => new URLSearchParams(window.location.search)

  const getLogger = urlParams => {
    const logLevel = urlParams.get('logLevel') || Log.Level.INFO
    return Log.getLogger('mockserver', logLevel)
  }

  const getManifest = async () => {
    const manifestUrl = sap.ui.require.toUrl(`${appBasePath}/manifest.json`)
    const response = await fetch(manifestUrl)
    const manifest = await response.json()
    return manifest
  }

  const getRootUri = manifest => {
    const rootUri = ObjectPath.get([
      'sap.app',
      'dataSources',
      'mainService',
      'uri'
    ], manifest)
    return rootUri.endsWith('/') ? rootUri : `${rootUri}/`
  }

  const getMetadataUrl = manifest => {
    const localUri = ObjectPath.get([
      'sap.app',
      'dataSources',
      'mainService',
      'settings',
      'localUri'
    ], manifest)
    return sap.ui.require.toUrl(`${appBasePath}/${localUri}`)
  }

  const getMockdataBaseUrl = () => {
    return sap.ui.require.toUrl(`${appBasePath}/localService/mockdata`)
  }

  return {
    async start () {
      const urlParams = getUrlParams()
      const log = getLogger(urlParams)
      const manifest = await getManifest()
      const rootUri = getRootUri(manifest)

      const mockserver = new MockServer({
        rootUri
      })

      MockServer.config({
        autoRespond: true,
        autoRespondAfter: urlParams.get('serverDelay') || 500
      })

      const metadataUrl = getMetadataUrl(manifest)
      const mockdataBaseUrl = getMockdataBaseUrl()
      mockserver.simulate(metadataUrl, {
        sMockdataBaseUrl: mockdataBaseUrl,
        bGenerateMissingMockData: true
      })

      mockhelper.init(mockserver)

      await mockrequests(mockserver, {
        mockhelper,
        log,
        urlParams,
        manifest,
        appBasePath,
        rootUri,
        entitySet
      })

      mockserver.start()
    },

    stop: () => MockServer.stopAll()
  }
})
