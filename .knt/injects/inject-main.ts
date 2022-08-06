import { resolve } from 'path'

export const main = () => true
export const web = () => false
export const renderer = () => false

export const win = () => process.platform === 'win32'
export const windows = () => win()
export const mac = () => process.platform === 'darwin'
export const macOS = () => mac()
export const linux = () => process.platform === 'linux'
export const dev = () => process.env.NODE_ENV === 'development'
export const production = () => process.env.NODE_ENV === 'production'
export const debug = () => process.env.NODE_ENV === 'debug'


export const __static = (() => {
  if(dev()) {
    return resolve(__dirname, 'buildResources')
  }

  // @ts-ignore
  return resolve(process.resourcesPath, 'buildResources')
})()