import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import path from 'path'
import { builtinModules } from 'module'

const rootPath = process.cwd()

esbuild.build({
    platform: 'node',
    plugins: [esbuildDecorators()],
    entryPoints: [path.join(rootPath, 'src/main.ts')],
    outdir: rootPath,
    external: [...builtinModules, "electron"],
    bundle: true,
    sourcemap: true,
    watch: {
        onRebuild(error, result) {
            console.log('rebuild')
        }
    }
})