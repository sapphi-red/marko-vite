<h1 align="center">
  <!-- Logo -->
  <img src="https://user-images.githubusercontent.com/4985201/115444712-ca550500-a1c9-11eb-9897-238ece59129c.png" height="118"/>
  <br/>
  @marko/vite
	<br/>

  <!-- Language -->
  <a href="http://typescriptlang.org">
    <img src="https://img.shields.io/badge/%3C%2F%3E-typescript-blue.svg" alt="TypeScript"/>
  </a>
  <!-- Format -->
  <a href="https://github.com/prettier/prettier">
    <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" alt="Styled with prettier"/>
  </a>
  <!-- CI -->
  <a href="https://github.com/marko-js/vite/actions/workflows/ci.yml">
    <img src="https://github.com/marko-js/vite/actions/workflows/ci.yml/badge.svg" alt="Build status"/>
  </a>
  <!-- Coverage -->
  <a href="https://codecov.io/gh/marko-js/vite">
    <img src="https://codecov.io/gh/marko-js/vite/branch/main/graph/badge.svg?token=3VFGDEC7G7"/>
  </a>
  <!-- NPM Version -->
  <a href="https://npmjs.org/package/@marko/vite">
    <img src="https://img.shields.io/npm/v/@marko/vite.svg" alt="NPM Version"/>
  </a>
  <!-- Downloads -->
  <a href="https://npmjs.org/package/@marko/vite">
    <img src="https://img.shields.io/npm/dm/@marko/vite.svg" alt="Downloads"/>
  </a>
</h1>

A Marko plugin for [Vite](https://vitejs.dev/).

# Installation

```console
npm install @marko/vite
```

# Example config

```javascript
import { defineConfig } from "vite";
import marko from "@marko/vite";
export default defineConfig({
  plugins: [marko()],
});
```

# Linked Mode

By default this plugin operates in `linked` mode (you can disabled this by passing [`linked: false` as an option](#options.linked)). In `linked` mode the plugin automatically discovers all of the entry `.marko` files while compiling the server, and tells `Vite` which modules to load in the browser.

With this you _do not_ create `.html` files for `Vite`, it's Marko all the way down!
Scripts, styles and other content that _would have_ been injected into the `.html` files is instead automatically injected into your `.marko` templates.

In this mode you must use the [Vite SSR API](https://vitejs.dev/guide/ssr.html#setting-up-the-dev-server).

Here's an example using `express`.

```js
import { createServer } from "vite";

const app = express();
let loadTemplate;

if (process.env.NODE_ENV === "production") {
  // Use Vite's built asset in prod mode.
  loadTemplate = () => import("./dist");
} else {
  // Hookup the vite dev server.
  const vite = await createViteServer({
    server: { middlewareMode: true }
  });

  app.use(vite.middlewares);
  loadTemplate = () => vite.ssrLoadModule("./template.marko");
}

app.get("/", async (req, res) => {
  const template = (await loadTemplate()).default;
  // When the template is loaded, it will automaticall have `vite` assets inlined.
  template.render({ hello: "world" }, res);
);

app.listen(3000);
```

> For a more real world setup check out our [vite express](https://github.com/marko-js/examples/tree/master/examples/vite-express) example app.

# Options

### options.babelConfig

You can manually override Marko's Babel configuration by passing a `babelConfig` object to the `@marko/vite` plugin. By default Babel's regular [config file resolution](https://babeljs.io/docs/en/config-files) will be used.

```javascript
marko({
  babelConfig: {
    presets: ["@babel/preset-env"],
  },
});
```

### options.runtimeId

In some cases you may want to embed multiple isolated copies of Marko on the page. Since Marko relies on some `window` properties to initialize this can cause issues. For example, by default Marko will read the server rendered hydration code from `window.$components`. In Marko you can change these `window` properties by rendering with `{ $global: { runtimeId: "MY_MARKO_RUNTIME_ID" } }` as input on the server side.

This plugin exposes a `runtimeId` option produces output that automatically sets `$global.runtimeId` on the server side and initializes properly in the browser.

```js
marko({ runtimeId: "MY_MARKO_RUNTIME_ID" });
```

### options.linked

Set this to `false` to opt out of [linked mode](#linked-mode). When this is false, the plugin will only handle resolving and transforming `.marko` files.

### options.store

Storage mechanism to preserve data between SSR and client builds when building in linked mode. Two implementations are available:

- FileStore _(default)_

  ```js
  import { FileStore } from "@marko/vite";
  const store = new FileStore();
  ```

  Reads/writes data to the file system. Use this when running the SSR and client builds in seperate processes such as when using Vite from the command line or npm scripts.

- MemoryStore
  ```js
  import { MemoryStore } from "@marko/vite";
  const store = new MemoryStore();
  ```
  Reads/writes data to memory. This option can be used when building with Vite programatically.

## Code of Conduct

This project adheres to the [eBay Code of Conduct](./.github/CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.
