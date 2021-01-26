(() => {
  Object.assign(window, {
    suite: () => {
      // @ts-ignore
      const jsUnitTestSuite = new parent.jsUnitTestSuite() // eslint-disable-line new-cap
      const basePath = window.location.pathname.substring(0, location.pathname.lastIndexOf('/') + 1)
      // jsUnitTestSuite.addTestPage(`${basePath}unit/unitTests.qunit.html`)
      jsUnitTestSuite.addTestPage(`${basePath}integration/opaTests.qunit.html`)
      return jsUnitTestSuite
    }
  })
})()
