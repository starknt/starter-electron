import fs from 'fs-extra'
import consola from 'consola'
import { appModulesPath, appPackagePath, srcElectronModulesPath, srcElectronPackagePath } from './utils'

// if dependencies is {}, pnpm can't generate `node_modules`
if (!fs.existsSync(appModulesPath))
  fs.mkdirSync(appModulesPath)

// delete electron package, try link file
if (fs.existsSync(srcElectronPackagePath)) {
  if (!fs.lstatSync(srcElectronPackagePath).isSymbolicLink())
    fs.rmSync(srcElectronPackagePath)
}

async function linkModules() {
  return await fs.symlink(appModulesPath, srcElectronModulesPath, 'junction')
}

async function linkPackageFile() {
  return await fs.symlink(appPackagePath, srcElectronPackagePath, 'file')
}

fs.lstat(srcElectronModulesPath)
  .then(stat => stat.isSymbolicLink())
  .then(v => !v && linkModules())
  .catch(consola.error)

fs.lstat(srcElectronPackagePath)
  .then(stat => stat.isSymbolicLink())
  .then(v => !v && linkPackageFile())
  .catch((e) => {
    if (!fs.existsSync(srcElectronPackagePath))
      return fs.copyFile(appPackagePath, srcElectronPackagePath)
    else
      return fs.writeFile(srcElectronPackagePath, fs.readFileSync(appPackagePath, 'utf-8'))
  })
  .catch(consola.error)

