import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import path from 'path'
import { builtinModules } from 'module'
import { ChildProcess, spawn } from 'child_process'
import electron from 'electron'
import { rootPath } from '../paths'

let cp: ChildProcess

export async function handleDev() {
    await esbuild.build({
        platform: 'node',
        plugins: [esbuildDecorators({ tsconfig: path.join(process.cwd(), 'src-electron', 'tsconfig.json') })],
        entryPoints: [path.join(rootPath, 'src-electron/main/main.ts')],
        outdir: path.join(rootPath, 'release', 'app', 'dist'),
        external: [...builtinModules, "electron"],
        bundle: true,
        sourcemap: true,
        color: true,
        tsconfig: path.join(process.cwd(), 'src-electron', 'tsconfig.json'),
        watch: {
            onRebuild(error) {
                if (error) {
                    console.error(error)
                    return
                }

                if (cp) {
                    cp.off('exit', exitProcess)

                    cp.kill()
                }

                cp = spawn(electron as any, [path.join(rootPath, 'release', 'app', 'dist', 'main.js')], {
                    stdio: 'inherit'
                })
                    .on('exit', exitProcess)
            }
        }
    })

    cp = spawn(electron as any, [path.join(rootPath, 'release', 'app', 'dist', 'main.js')])
        .on('exit', exitProcess)
}

function exitProcess(): any {
    process.exit(0)
}
