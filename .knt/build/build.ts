import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { esbuildPluginAliasPath } from 'esbuild-plugin-alias-path'
import { builtinModules } from 'module'
import path from 'path'
import type { ResolvedConfig } from '../knt'


export async function handleBuild(config: ResolvedConfig) {
  await esbuild.build({
    plugins: [
      esbuildDecorators({ tsconfig: config.tsconfig }),
      esbuildPluginAliasPath({
        alias: config.resolve.alias,
        cwd: config.resolve.cwd
      })
    ],
    bundle: true,
    platform: 'node',
    external: ["electron", ...builtinModules, ...(config.external ?? [])],
    outdir: config.outDir,
    entryPoints: [path.resolve(config.base, config.entry)],
    sourcemap: !!process.env['DEBUG'],
    tsconfig: config.tsconfig,
    minify: !!process.env['DEBUG'],
    color: true,
    define: {
      'process.env.NODE_ENV': '\'production\'',
      'process.env.URL': process.env['MODE'] === 'mpa' ? '\'./dist/pages\'' : '\'./dist/index.html\'',
      'process.env.MODE': process.env['MODE'] === 'mpa' ? "\'mpa\'" : "\'spa\'"
    },
    logLevel: 'info',
  })
}
