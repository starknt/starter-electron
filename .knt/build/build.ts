import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { builtinModules } from 'module'
import path from 'path'
import { appPath, srcElectronPath } from '../paths'
import fs from 'fs'

const { dependencies } = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'release/app/package.json'), 'utf-8').toString()) as any

export async function handleBuild() {
  await esbuild.build({
    plugins: [
      esbuildDecorators({ tsconfig: path.join(process.cwd(), 'src-electron', 'tsconfig.json') })
    ],
    bundle: true,
    platform: 'node',
    target: ['node16'],
    external: ["electron", ...builtinModules, ...Object.keys(dependencies || {})],
    outdir: path.join(appPath, 'dist'),
    entryPoints: [path.join(srcElectronPath, 'main/main.ts')],
    sourcemap: !!process.env['DEBUG'],
    tsconfig: path.join(process.cwd(), 'src-electron', 'tsconfig.json'),
    color: true
  })
}
