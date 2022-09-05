import { join, resolve } from 'path'
import fs from 'fs-extra'

const rootPath = resolve(process.cwd(), '../../')
const srcElectronPath = join(rootPath, 'app', 'electron')
const appPath = join(process.cwd())
const srcElectronModulesPath = join(srcElectronPath, 'node_modules')
const srcElectronPackagePath = join(srcElectronPath, 'package.json')
const appModulesPath = join(appPath, 'node_modules')
const appPackagePath = join(appPath, 'package.json')

// if dependencies is {}, pnpm can't generate `node_modules`
if (!fs.existsSync(appModulesPath))
  fs.mkdirSync(appModulesPath)

if (fs.existsSync(srcElectronPackagePath)) {
  if (!fs.lstatSync(srcElectronPackagePath).isSymbolicLink())
    fs.rmSync(srcElectronPackagePath)
}

if (fs.existsSync(srcElectronModulesPath)) {
  if (!fs.lstatSync(srcElectronModulesPath).isSymbolicLink())
    fs.rmSync(srcElectronModulesPath)
}

if (!fs.existsSync(srcElectronModulesPath) && fs.existsSync(appModulesPath))
  fs.symlinkSync(appModulesPath, srcElectronModulesPath, 'junction')

try {
  if (!fs.existsSync(srcElectronPackagePath) && fs.existsSync(appPackagePath))
    fs.symlinkSync(appPackagePath, srcElectronPackagePath, 'file')
}
catch (error) {
  if (!fs.existsSync(srcElectronPackagePath) && fs.existsSync(appPackagePath))
    fs.copyFileSync(appPackagePath, srcElectronPackagePath)
}

