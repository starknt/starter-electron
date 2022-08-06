import { resolve } from 'path'

const r = (...paths: string[]) => resolve(__dirname, 'packages', ...paths)

export const alias = {
  '@starter/shared': r('shared', 'src', 'index.ts'),
}
