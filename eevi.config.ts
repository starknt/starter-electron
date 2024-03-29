import { join, resolve } from 'path'
import fs from 'fs'
import type { UserConfigExport } from 'eevi'
import { defineConfig } from 'eevi'
import { ElectronPreloadPlugin } from '@eevi/elexpose/esbuild'
import { alias } from './alias'

const appPath = resolve(process.cwd(), 'release', 'app')
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
  entry: 'main.ts',
  outDir: join(appPath, 'dist'),
  preloadEntries: [
    '../compat/preload/*.ts', // eevi v0.7.0
  ],
  preloadPlugins: [ElectronPreloadPlugin()],
  resolve: {
    alias,
  },
  external: [...Object.keys(dependencies || {})],
  tsconfig: 'tsconfig.json',
  define,
}) as UserConfigExport
