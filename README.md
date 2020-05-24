# `@logofx/aurelia-mvvm-plugin`

This library contains a plugin that provides foundational MVVM types.

![GitHub](https://img.shields.io/github/license/LogoFX/aurelia-mvvm-plugin)
![npm](https://img.shields.io/npm/dt/@logofx/aurelia-mvvm-plugin?logo=npm)
![npm (scoped)](https://img.shields.io/npm/v/@logofx/aurelia-mvvm-plugin)
![node-current](https://img.shields.io/node/v/@logofx/aurelia-mvvm-plugin)

[![CircleCI](https://circleci.com/gh/LogoFX/aurelia-mvvm-plugin.svg?style=shield)](https://circleci.com/gh/LogoFX/aurelia-mvvm-plugin)
![GitHub search hit counter](https://img.shields.io/github/search/logofx/aurelia-mvvm-plugin/aurelia)

## What it does

The Aurelia framework provides two well-known approaches to create robust WEB applications, which are the component-oriented approach and the approach based on MVVM design pattern. Anyway, the Aurelia lacks implementation of some infrastructures for clean implementation of the MVVM pattern.

In order to facilitate Aurelia as MVVM framework, the plugin provides base types for implementation of application Models and View-Models. In addition the plugin contains implementation of the Window Manager, as a view-model service allowing to open modal (HTML) dialogs from a view-model in clean VM-First manner.

## Consume Plugin

Install the plugin:

```shell
npm i @logofx/aurelia-mvvm-plugin
```

Then load the plugin in app's `main.ts` like this.

```js
aurelia.use.plugin('@logofx/aurelia-mvvm-plugin');
// for webpack user, use PLATFORM.moduleName wrapper
aurelia.use.plugin(PLATFORM.moduleName('@logofx/aurelia-mvvm-plugin'));
```

## Manage dependencies

![npm peer dependency version](https://img.shields.io/npm/dependency-version/@logofx/aurelia-mvvm-plugin/peer/aurelia-dialog)
![npm peer dependency version](https://img.shields.io/npm/dependency-version/@logofx/aurelia-mvvm-plugin/peer/aurelia-validation)

If your application hasn't depended on those packages, please add them manually as your dependencies.

## How to use the code

This Aurelia plugin project has a built-in dev app (with CLI built-in bundler and RequireJS) to simplify development.

1. The local `src/` folder, is the source code for the plugin.
2. The local `dev-app/` folder, is the code for the dev app, just like a normal app bootstrapped by aurelia-cli.
3. You can use normal `au run` and `au test` in development just like developing an app.
4. You can use aurelia-testing to test your plugin, just like developing an app.
5. To ensure compatibility to other apps, always use `PLATFORM.moduleName()` wrapper in files inside `src/`. You don't need to use the wrapper in `dev-app/` folder as CLI built-in bundler supports module name without the wrapper.

Note aurelia-cli doesn't provide a plugin skeleton with Webpack setup (not yet), but this plugin can be consumed by any app using Webpack, or CLI built-in bundler, or jspm.

The usage of `PLATFORM.moduleName` wrapper is mandatory. It's needed for your plugin to be consumed by any app using webpack, CLI built-in bundler, or jspm.

## Building the Code

Run `au build-plugin`. This will transpile all files from `src/` folder to `dist/native-modules/` and `dist/commonjs/`.

For example, `src/index.ts` will become `dist/native-modules/index.js` and `dist/commonjs/index.js`.

Note all other files in `dev-app/` folder are for the dev app, they would not appear in the published npm package.

## Run dev app

Change the current folder `cd dev-app`

Run `au run`, then open `http://localhost:8080`

To open browser automatically, do `au run --open`.

To change dev server port, do `au run --port 9000`.

To change dev server host, do `au run --host 127.0.0.1`

**PS:** You could mix all the flags as well, `au run --host 127.0.0.1 --port 7070 --open`

## Unit tests

Run `au test` (or `au jest`).

To run in watch mode, `au test --watch` or `au jest --watch`.

## Acknowledges

This project is bootstrapped by [aurelia-cli](https://github.com/aurelia/cli).
