import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

if (!global.__dirname) {
  global.__dirname = fileURLToPath(dirname(import.meta.url))
  global.__filename = fileURLToPath(import.meta.url)
}

const r = (...paths: string[]) => resolve(__dirname, 'app', 'compat', ...paths)

export const alias: Record<string, string> = {
  '@app/compat-common': r('common'),
  '@app/compat-browser': r('browser'),
  '@app/compat-node': r('node'),
  '@app/compat-i18n': r('i18n', 'index.ts'),
}
