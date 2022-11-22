# Document

[中文](./README.md) | [English](./README_en.md)

<h1 align="center">Starter Electron</h1>

<p align="center">A template for quickly building Electron applications based on Vite and Esbuild.</p>

<div align="center">

![node-current](https://img.shields.io/node/v/vite)
![npm type definitions](https://img.shields.io/npm/types/typescript)
![GitHub](https://img.shields.io/github/license/starknt/starter-electron)

</div>

## Feature

- Fast
- Main process reload
- minify
- Two `package.json` structure, [See more](https://www.electron.build/tutorials/two-package-structure)

## Get Started

```bash
  degit starknt/starter-electron projectName
  cd projectName && pnpm install
  pnpm dev
```

or [click here](https://github.com/starknt/starter-electron/generate)

## Project structure

```bash
  .-- root path
  |-- .github
  |   |-- workflows # Github Actions
  |-- .vscode
  |-- app
  |   |-- electron # electron
  |   |   |-- tests # unit test files
  |   |-- web # web ui
  |   |   |-- tests # unit test files
  |-- buildResources # build resources
  |-- packages # like monore
  |-- release # release application
  |   |-- app # install application native module
  |   |   |-- .npmrc
  |   |   |-- package.json
  |   |-- build # packaged application
  |-- scripts # build application script
  |-- tests # e2e test files
  |-- $electron-builder.json # electron-builder configuration
  |-- alias.ts # vite and esbuild  alias file
  |-- eevi.config.ts # eevi config file
  |-- .eslintignore # eslint ignore files
  |-- .eslintrc # eslintrc
  |-- .gitignore # gitignore
  |-- .npmrc # 
  |-- tsconfig.json # tsconfig.json
  |-- tsconfig.node.json # tsconfig.node.json
  |-- tsconfig.test.json # tsconfig.test.json
  |-- LICENSE # MIT LICENSE
  |-- README_en.md
  |-- README.md
  |-- vite.config.ts
  |------------------------------------------------------------------------------------------------
```

## Changelog

see more [Changelog](./CHANGELOG.md)

## License

[MIT](./LICENSE)
