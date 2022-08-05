import { resolve } from 'path'
import type { AliasOptions } from 'vite'

const r = (...paths: string[]) => resolve(__dirname, 'packages', ...paths)

export const alias: AliasOptions = {
  '@starter/share': r('share', 'src', 'index.ts'),
}
