/**
 * LIMITATION: No EcmaScript features which require
 *  - core-js-bundle
 *  - regenerator-runtime
 * can be used in this file directly.
 * This file serves as the central entry point for loading these polyfills:
 * Please see manifest.json sap.ui5 / resources / js
 */
sap.ui.define([
  'sap/suite/ui/generic/template/lib/AppComponent'
], AppComponent => AppComponent.extend('bookshop.ui.Component', {
  metadata: {
    manifest: 'json'
  }
}))
