import { join, resolve } from 'path'
import fs from 'fs'
import type { UserConfigExport } from 'eevi'
import { defineConfig } from 'eevi'
import { esbuildIsPlugin } from 'eevi/esbuild'
import { alias } from './alias'

const appPath = resolve(__dirname, 'release', 'app')
const packagePath = resolve(appPath, 'package.json')
const { dependencies } = JSON.parse(fs.readFileSync(packagePath, 'utf-8') || '{}')

const define = {
  'process.env.URL': process.env.MODE === 'mpa' ? '\'./dist/pages\'' : '\'./dist/index.html\'',
  'process.env.MODE': process.env.MODE === 'mpa' ? '\'mpa\'' : '\'spa\'',
}

if (process.env.NODE_ENV === 'development')
  delete define['process.env.URL']

export default defineConfig({
  root: 'app/electron',
  entry: 'app/electron/main.ts',
  outDir: join(appPath, 'dist'),
  preloadEntries: [
    'app/electron/preload/*.ts' // eevi v0.3.3
  ],
  resolve: {
    alias,
  },
  external: [...Object.keys(dependencies || {})],
  tsconfig: 'tsconfig.json',
  define,
  plugin: [esbuildIsPlugin()],
}) as UserConfigExport
