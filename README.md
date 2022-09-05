# 文档

[中文](./README.md) | [English](./README_en.md)

## starter-electron

基于 `Vite` 和 `Esbuild` 用于快速构建 Electron 应用的模板。

## 特性

- 🚀 极速启动
- ⚡ 主进程快速重载
- ✈ 多平台构建
- 🎉 减少构建产物体积(PS: 自动清理 `Native Module` 的无效文件)
- 🍛 双 `package.json` 结构, 分离原生模块和非原生模块

## 快速开始

```bash
  degit starknt/starter-electron projectName
```

或者 [点击此处](https://github.com/starknt/starter-electron/generate)

## 项目结构

```bash
  .
  |-- .github
  |   |-- workflows # Github Actions 工作流
  |-- .vscode
  |-- app
  |   |-- electron # electron 相关代码
  |   |   |-- tests # 主进程单元测试文件
  |   |-- web # web 界面相关代码
  |   |   |-- tests # 组件单元测试文件
  |-- buildResources # 用于构建应用的资源
  |-- packages # 一个类似于 monorepo 的结构, 用于分享 `electron` 和 `web` 环境中能共享代码
  |-- release # 应用发布相关
  |   |-- app # 应用的原生模块和应用的`package.json`
  |   |   |-- .npmrc
  |   |   |-- package.json
  |   |-- build # 应用打包后, 安装包存放处
  |-- scripts # 存放构建应用的脚本文件
  |-- tests # 通常用于存放应用的 `e2e` 测试文件
  |-- $electron-builder.json # electron-builder 的配置文件
  |-- alias.ts # 用于生成 vite 和 esbuild 的 Alias 的配置文件
  |-- eevi.config.ts # eevi 插件配置文件
  |-- .eslintignore # eslint ignore files
  |-- .eslintrc # eslintrc 配置文件
  |-- .gitignore # gitignore
  |-- .npmrc # gitignore
  |-- tsconfig.json # tsconfig.json
  |-- tsconfig.node.json # tsconfig.node.json
  |-- tsconfig.test.json # tsconfig.test.json
  |-- LICENSE # MIT LICENSE
  |-- README_en.md # 英文文档
  |-- README.md # 中文文档
  |-- vite.config.ts # vitest 的配置文件
  |------------------------------------------------------------------------------------------------
```

## 开源许可 <img src="https://img.shields.io/badge/license-MIT-green" />

[MIT](./LICENSE)
