import path from "path";

const rootPath = process.cwd()
const appPath = path.resolve(rootPath, 'release', 'app')
const srcPath = path.join(rootPath, 'src')
const srcElectronPath = path.join(rootPath, 'src-electron')
const distPath = path.join(appPath, 'dist')
const buildPath = path.join(rootPath, 'release', 'build')

export {
  rootPath,
  appPath,
  srcElectronPath,
  srcPath,
  distPath,
  buildPath
}