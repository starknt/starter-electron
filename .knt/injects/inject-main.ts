import { resolve } from 'path'

export const is = {
 main: () => true,
 web: () => false,
 renderer: () => false,
 win: () => process.platform === 'win32',
 windows: () => is.win(),
 mac: () => process.platform === 'darwin',
 macOS: () => is.mac(),
 linux: () => process.platform === 'linux',
 dev: () => process.env.NODE_ENV === 'development',
 production: () => process.env.NODE_ENV === 'production',
 debug: () => process.env.NODE_ENV === 'debug',
}

export const __static = (() => {
  if(is.dev()) {
    return resolve(__dirname, 'buildResources')
  }

  // @ts-ignore
  return resolve(process.resourcesPath, 'buildResources')
})()
