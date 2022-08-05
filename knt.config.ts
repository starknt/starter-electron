import { join, resolve } from 'path'
import fs from 'fs'
import { defineConfig } from './.knt/knt'
import { alias } from './alias'

const appPath = resolve(__dirname, 'release', 'app')
const packagePath = resolve(appPath, 'package.json')
const { dependencies } = JSON.parse(fs.readFileSync(packagePath, 'utf-8') || '{}')

export default defineConfig({
  entry: resolve(__dirname, 'app/electron/main.ts'),
  resolve: {
    alias,
  },
  outDir: join(appPath, 'dist'),
  external: Object.keys(dependencies || {}),
  tsconfig: resolve(__dirname, 'app', 'electron', 'tsconfig.json'),
})
