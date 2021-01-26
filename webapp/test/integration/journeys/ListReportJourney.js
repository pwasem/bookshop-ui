sap.ui.define([
  'sap/ui/test/opaQunit'
], (opaTest) => {
  QUnit.module('ListReport')

  opaTest('Should see the list report with items', (Given, When, Then) => {
    Given
      .iStartTheApp()

    When
      .onTheListReport
      .iPressTheGoButton()

    Then
      .onTheListReport
      .iShouldSeeTheResponsiveTableWithItems(20)

    Then
      .iStopTheApp()
  })
})
