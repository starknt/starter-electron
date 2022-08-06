import { Plugin } from 'vite'

function generateModuleCode() {
  return `
    let _IsWindow = false
    let _IsMac = false
    let _IsLinux = false
    let _IsWeb = false
    let _IsDev = false
    let _IsX64 = false
    let _IsX86 = false

    const isElectronRenderer
      = typeof window.process?.versions?.electron === 'string'
      && window.process.type === 'renderer'
    export const isElectronSandboxed = isElectronRenderer && window.process?.sandboxed

    // In NativeEnvironment
    if (typeof process === 'object') {
      _IsWeb = false
      _IsWindow = process.platform === 'win32'
      _IsMac = process.platform === 'darwin'
      _IsLinux = process.platform === 'linux'
      _IsX64 = process.arch === 'x64'
      _IsX86 = process.arch === 'ia32'

      _IsDev = '${process.env.NODE_ENV}' === 'development'
    }

    // In Web Environment
    if (typeof navigator !== 'undefined' && !isElectronRenderer) {
      _IsWeb = true
      _IsWindow = navigator.userAgent.includes('Windows')
      _IsMac = navigator.userAgent.includes('Macintosh')
      _IsLinux = navigator.userAgent.includes('Linux')
      _IsX64 = navigator.userAgent.includes('x64')
      _IsX86 = navigator.userAgent.includes('x86')

      _IsDev = '${process.env.NODE_ENV}' === 'development'
    }

    export const windows = () => _IsWindow
    export const osx = () => _IsMac
    export const macOS = () => osx()
    export const linux = () => _IsLinux
    export const web = () => _IsWeb
    export const sandbox = () => isElectronSandboxed
    export const renderer = () => isElectronRenderer && !web()
    export const main = () => !isElectronRenderer && !web()
    export const dev = () => _IsDev
    export const production = () => !_IsDev

    const is = {
      windows: () => windows(),
      osx: () => osx(),
      macOS: () => osx(),
      linux: () => linux(),
      web: () => web(),
      sandbox: () => sandbox(),
      renderer: () => renderer(),
      main: () => main(),
      dev: () => dev(),
      production: () => production(),
    }

    export default is
  `
}

/**
 * Inject knt-is module, like electron-is module
 * @see https://www.npmjs.com/package/electron-is
 */
export default (): Plugin => {
  const MODULE_ID = 'knt-is'
  return {
    name: 'vite-plugin-knt-is',
    enforce: 'post',
    resolveId(source) {
      if(source === MODULE_ID) {

        return MODULE_ID
      }
    },
    load(id) {
      if(id === MODULE_ID) {
        return generateModuleCode()
      }
    }
  }
}