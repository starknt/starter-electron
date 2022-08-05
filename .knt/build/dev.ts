import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { esbuildPluginAliasPath } from 'esbuild-plugin-alias-path'
import path from 'path'
import { builtinModules } from 'module'
import { ChildProcess, spawn } from 'child_process'
import electron from 'electron'
import { rootPath } from '../paths'
import { UserConfig } from '../knt'

let cp: ChildProcess

export async function handleDev(config: UserConfig) {
    await esbuild.build({
        platform: 'node',
        plugins: [
            esbuildDecorators({ tsconfig: config.tsconfig }),
            esbuildPluginAliasPath({
                alias: config.resolve.alias
            })
        ],
        entryPoints: [path.resolve(config.base, config.entry)],
        outdir: config.outDir,
        external: [...builtinModules, "electron", ...(config.external ?? [])],
        bundle: true,
        sourcemap: true,
        color: true,
        tsconfig: config.tsconfig,
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
        },
        logLevel: 'info'
    })

    cp = spawn(electron as any, [path.join(rootPath, 'release', 'app', 'dist', 'main.js')], {
        stdio: 'inherit'
    })
        .on('exit', exitProcess)
}

function exitProcess(): any {
    process.exit(0)
}
