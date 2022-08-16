import fs from 'fs'
import { join, resolve } from 'path'

const rootPath = resolve(process.cwd(), '../../')
const srcElectronPath = join(rootPath, 'app', 'electron')
const appPath = join(process.cwd())
const srcElectronModulesPath = join(srcElectronPath, 'node_modules')
const srcElectronPackagePath = join(srcElectronPath, 'package.json')
const appModulesPath = join(appPath, 'node_modules')
const appPackagePath = join(appPath, 'package.json')

try {
  if (!fs.statSync(srcElectronModulesPath).isSymbolicLink())
    fs.rmdirSync(srcElectronModulesPath)

  if (!fs.statSync(srcElectronPackagePath).isSymbolicLink())
    fs.rmSync(srcElectronPackagePath)
}
catch {
  if (fs.existsSync(srcElectronModulesPath))
    fs.rmdirSync(srcElectronModulesPath)
  if (fs.existsSync(srcElectronPackagePath))
    fs.rmSync(srcElectronPackagePath)
}

// if dependencies is {}, pnpm can't generate `node_modules`
if (!fs.existsSync(appModulesPath))
  fs.mkdirSync(appModulesPath)

if (!fs.existsSync(srcElectronModulesPath) && fs.existsSync(appModulesPath))
  fs.symlinkSync(appModulesPath, srcElectronModulesPath, 'junction')

if (!fs.existsSync(srcElectronPackagePath) && fs.existsSync(appPackagePath))
  fs.symlinkSync(appPackagePath, srcElectronPackagePath, 'file')

