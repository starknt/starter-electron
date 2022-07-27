import path from "path";

const rootPath = path.join(__dirname, '..')
const appPath = path.join(rootPath, 'release', 'app')
const srcPath = path.join(rootPath, 'src')
const srcElectronPath = path.join(rootPath, 'src-electron')

export {
  rootPath,
  appPath,
  srcElectronPath,
  srcPath
}