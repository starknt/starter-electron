import { join } from 'path'
import fs from 'fs'

const appPath = join(process.cwd(), 'app')
const srcElectronModulesPath = join(appPath, 'electron', 'node_modules')
const srcElectronPackagePath = join(appPath, 'electron', 'package.json')
const releaseAppPath = join(process.cwd(), 'release', 'app')
const appPackagePath = join(releaseAppPath, 'package.json')
const appModulesPath = join(releaseAppPath, 'node_modules')

// execSync('npm install', { cwd: releaseAppPath })

// if dependencies is {}, pnpm can't generate `node_modules`
if (!fs.existsSync(appModulesPath))
  fs.mkdirSync(appModulesPath)

if (!fs.existsSync(srcElectronModulesPath) && fs.existsSync(appModulesPath))
  fs.symlinkSync(appModulesPath, srcElectronModulesPath, 'junction')

if (!fs.existsSync(srcElectronPackagePath) && fs.existsSync(appPackagePath))
  fs.symlinkSync(appPackagePath, srcElectronPackagePath, 'file')

