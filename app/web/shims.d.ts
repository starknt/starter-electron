declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

declare module 'knt-is' {
  export const windows: () => boolean
  export const osx: () => boolean
  export const macOS: () => boolean
  export const linux: () => boolean
  export const web: () => boolean
  export const sandbox: () => boolean
  export const renderer: () => boolean
  export const main: () => boolean
  export const dev: () => boolean
  export const production: () => boolean
  export const x64: () => boolean
  export const x86: () => boolean
}

declare global {
  interface Window {

  }
}