import fs from 'fs'
import path from 'path'

const rootPath = path.resolve(process.cwd(), '../../')
const srcElectronPath = path.join(rootPath, 'app', 'electron')
const appPath = path.join(process.cwd())
const srcElectronModulesPath = path.join(srcElectronPath, 'node_modules')
const srcElectronPackagePath = path.join(srcElectronPath, 'package.json')
const appModulesPath = path.join(appPath, 'node_modules')
const appPackagePath = path.join(appPath, 'package.json')

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

