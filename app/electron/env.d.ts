declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'debug'
      MODE: 'mpa' | 'spa'
      URL: string
    }
  }

  const __static: string
}

export {}