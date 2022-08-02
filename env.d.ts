/// <reference types="vite/client" />

interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly DEV_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}