import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { builtinModules } from 'module'
import path from 'path'
import { appPath, srcElectronPath } from '../paths'
import fs from 'fs'

const { dependencies } = fs.readFileSync(path.resolve(process.cwd(), 'release/app/package.json')) as any

export async function handleBuild() {
  await esbuild.build({
    plugins: [
      esbuildDecorators()
    ],
    bundle: true,
    platform: 'node',
    target: ['node16'],
    external: ["electron", ...builtinModules, ...Object.keys(dependencies || {})],
    outdir: path.join(appPath, 'main'),
    entryPoints: [path.join(srcElectronPath, 'main/main.ts')]
  })
}
