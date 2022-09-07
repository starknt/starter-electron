/// <reference types="eevi/eevi-is" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

interface Api {
  sayHello(): void
}

declare global {
  var $api: Api
}

export {}