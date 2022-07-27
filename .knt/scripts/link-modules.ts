import fs from 'fs'
import path from 'path'
import { appPath, srcElectronPath } from '../paths'

const srcElectronModulesPath = path.join(srcElectronPath, 'node_modules')
const srcElectronPackagePath = path.join(srcElectronPath, 'package.json')
const appModulesPath = path.join(appPath, 'node_modules')
const appPackagePath = path.join(appPath, 'package.json')

try {
  if (!fs.statSync(srcElectronModulesPath).isSymbolicLink()) {
    fs.rmSync(srcElectronModulesPath)
  }

  if (!fs.statSync(srcElectronPackagePath).isSymbolicLink()) {
    fs.rmSync(srcElectronPackagePath)
  }
} catch {
  fs.rmSync(srcElectronModulesPath)
  fs.rmSync(srcElectronPackagePath)
}

if (!fs.existsSync(srcElectronModulesPath) && fs.existsSync(appModulesPath)) {
  fs.symlinkSync(appModulesPath, srcElectronModulesPath, 'junction')
}

if (!fs.existsSync(srcElectronPackagePath) && fs.existsSync(appPackagePath)) {
  fs.symlinkSync(appPackagePath, srcElectronPackagePath, 'file')
}