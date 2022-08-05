import { resolve } from 'path'

const r = (...paths: string[]) => resolve(__dirname, 'packages', ...paths)

export const alias = {
  '@starter/share': r('share', 'src', 'index.ts'),
}
