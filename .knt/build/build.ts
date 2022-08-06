import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { esbuildPluginAliasPath } from 'esbuild-plugin-alias-path'
import { builtinModules } from 'module'
import { join, resolve } from 'path'
import type { ResolvedConfig } from '../knt'

export async function handleBuild(config: ResolvedConfig) {
  const plugins = [
    esbuildDecorators({ tsconfig: config.tsconfig }),
    esbuildPluginAliasPath({
      alias: config.resolve.alias,
      cwd: config.resolve.cwd
    }),
    ...(config.plugin ?? [])
  ]

  const minify = !!process.env['DEBUG']
  const tsconfig = config.tsconfig
  const define =  {
    'process.env.NODE_ENV': process.env['DEBUG'] ?'\'debug\'': '\'production\'',
    'process.env.URL': process.env['MODE'] === 'mpa' ? '\'./dist/pages\'' : '\'./dist/index.html\'',
      'process.env.MODE': process.env['MODE'] === 'mpa' ? "\'mpa\'" : "\'spa\'",
        'process.env.RESOURCE': '\'\''
  }
  const external = ["electron", ...builtinModules, ...(config.external ?? [])]

  // main process
  await esbuild.build({
    entryPoints: [resolve(config.base, config.entry)],
    plugins,
    bundle: true,
    platform: 'node',
    external,
    outdir: config.outDir,
    sourcemap: !!process.env['DEBUG'],
    tsconfig,
    minify,
    color: true,
    define,
    inject: ["./.knt/injects/inject-main.ts"],
    logLevel: 'info',
  })

  const preloadOutDir = join(config.outDir, 'preload')
  // preload (renderer process)
  await esbuild.build({
    entryPoints: (config.preloadEntries ?? []).map((preloadEntry) => resolve(config.base, preloadEntry)),
    outdir: preloadOutDir,
    plugins,
    bundle: true,
    platform: 'node',
    tsconfig,
    minify,
    color: true,
    external,
    define,
    inject: ["./.knt/injects/inject-renderer.ts"],
    logLevel: 'info'
  })
}
