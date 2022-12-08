# Document

[中文](./README.md) | [English](./README_en.md)

<h1 align="center">Starter Electron</h1>

<p align="center">A template for quickly building Electron applications based on Vite and ESbuild.</p>

<div align="center">

![node-current](https://img.shields.io/node/v/vite)
![npm type definitions](https://img.shields.io/npm/types/typescript)
![GitHub](https://img.shields.io/github/license/starknt/starter-electron)

</div>

## HighLights

- 🚀 Fast
- ⚡ Main process reload
- ✈ Multi platform build, based on Github Actions
- 🎉 Minify product size
- 🍛 Two `package.json` structure, [Click here see more](https://www.electron.build/tutorials/two-package-structure)

## Get Started

```bash
  degit starknt/starter-electron projectName
  cd projectName && pnpm install
  pnpm dev
```

or [click here](https://github.com/starknt/starter-electron/generate)

## Project structure

```txt
  .-- root path
  |-- .github
  |   |-- workflows # Github Actions
  |-- .vscode
  |-- app
  |   |-- compat # web and electron environment compat code
  |   |-- electron # electron code
  |   |-- web # web ui
  |-- buildResources # build resources
  |-- packages # like monore
  |-- release # release application
  |   |-- app # install application native module
  |   |   |-- .npmrc
  |   |   |-- package.json
  |   |-- build # packaged application
  |-- scripts # build application script
  |-- tests # tests files
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

## License

[MIT](./LICENSE)
