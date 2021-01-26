(() => {
  const component = 'bookshop.ui'
  const semanticObject = 'Books'
  const action = 'manage'
  const rootIntent = `${semanticObject}-${action}`
  Object.assign(window, {
    'sap-ushell-config': {
      defaultRenderer: 'fiori2',
      bootstrapPlugins: {
        RuntimeAuthoringPlugin: {
          component: 'sap.ushell.plugins.rta',
          config: {
            validateAppVersion: false
          }
        }
      },
      renderers: {
        fiori2: {
          componentData: {
            config: {
              rootIntent,
              search: 'hidden'
            }
          }
        }
      },
      applications: {
        [rootIntent]: {
          additionalInformation: `SAPUI5.Component=${component}`,
          applicationType: 'URL',
          url: '../',
          title: semanticObject,
          description: action
        }
      }
    }
  })
})()
