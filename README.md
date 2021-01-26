# bookshop.ui

Fiori Elements (V2) - List Report application based on [cloud-cap-samples](https://github.com/SAP-samples/cloud-cap-samples) `bookshop` service.

Showcase for modern [UI5 Tooling](https://sap.github.io/ui5-tooling/) and building apps with latest [ECMAScript](https://www.ecma-international.org/publications-and-standards/standards/ecma-262/).

## Features

- Livereload using [@sap/ux-ui5-tooling](https://www.npmjs.com/package/@sap/ux-ui5-tooling) `Application Reload`
- Live transpile at runtime using [ui5-middleware-babel](https://github.com/pwasem/ui5-middleware-babel)
- Reverse proxy using [ui5-middleware-http-proxy](https://github.com/pwasem/ui5-middleware-http-proxy)
- Transpile at build time using [ui5-task-babel](https://github.com/pwasem/ui5-task-babel)
- Copy project shims (e.g. for polyfills) at build time using [ui5-task-copy-shim-resources](https://github.com/pwasem/ui5-task-copy-shim-resources)
- `*.change` files (UI Adaption) support using [ui5-middleware-lrep-flex](https://github.com/pwasem/ui5-middleware-lrep-flex)
- [.devcontainer](https://code.visualstudio.com/docs/remote/containers) support
- Use [UI5 TypeScript signatures](https://github.com/SAP/ui5-typescript)
- Ensure [JavaScript Standard Style](https://standardjs.com/)

## Run the app

Simply run

```sh
yarn
yarn start
```

### Mockserver

Browse to http://localhost:8080/test/flpSandboxMockServer.html

### Bookshop Service

Make sure to run [cloud-cap-samples](https://github.com/SAP-samples/cloud-cap-samples) `bookshop` service locally using [@sap/cds-odata-v2-adapter-proxy](https://cap.cloud.sap/docs/advanced/odata#using-the-v2-proxy-with-nodejs-apps).

and browse to http://localhost:8080/test/flpSandbox.html.

## Build the app

Simply run

```sh
yarn build
```

The built and transpiled application including all polyfills will be available in the `dist` folder.

