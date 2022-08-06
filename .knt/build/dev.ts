import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import { esbuildPluginAliasPath } from 'esbuild-plugin-alias-path'
import { builtinModules } from 'module'
import { ChildProcess, spawn } from 'child_process'
import electron from 'electron'
import { rootPath } from '../paths'
import { ResolvedConfig } from '../knt'
import { join, resolve } from 'path'

let cp: ChildProcess

function handleRebuild(error?: Error) {
    if (error) {
        console.error(error)
        return
    }

    restartMainProcess()
}

function restartMainProcess() {
    if (cp) {
        cp.off('exit', exitProcess)

        cp.kill()
    }

    cp = spawn(electron as any, [join(rootPath, 'release', 'app', 'dist', 'main.js')], {
        stdio: 'inherit'
    })
        .on('exit', exitProcess)
}

async function handleDevPreloadBuild(config: ResolvedConfig) {
    const outdir = join(config.outDir, 'preload')

    await esbuild.build({
        entryPoints: (config.preloadEntries ?? []).map((preloadEntry) => resolve(config.base, preloadEntry)),
        platform: 'node',
        plugins: [
            esbuildDecorators({ tsconfig: config.tsconfig }),
            esbuildPluginAliasPath({
                alias: config.resolve.alias
            }),
            ...(config.plugin ?? [])
        ],
        external: [...builtinModules, "electron"],
        outdir,
        bundle: true,
        sourcemap: true,
        color: true,
        logLevel: 'info',
        tsconfig: config.tsconfig,
        watch: {
            onRebuild: handleRebuild
        }
    })
}

async function handleMainProcessbuild(config: ResolvedConfig) {
    await esbuild.build({
        platform: 'node',
        plugins: [
            esbuildDecorators({ tsconfig: config.tsconfig }),
            esbuildPluginAliasPath({
                alias: config.resolve.alias
            }),
            ...(config.plugin ?? [])
        ],
        entryPoints: [resolve(config.base, config.entry)],
        outdir: config.outDir,
        external: [...builtinModules, "electron", ...(config.external ?? [])],
        bundle: true,
        sourcemap: true,
        color: true,
        tsconfig: config.tsconfig,
        inject: ["./.knt/injects/inject-main.ts"],
        watch: {
            onRebuild: handleRebuild
        },
        logLevel: 'info'
    })
}

export async function handleDev(config: ResolvedConfig) {
    await handleDevPreloadBuild(config)
    await handleMainProcessbuild(config)

    cp = spawn(electron as any, [join(rootPath, 'release', 'app', 'dist', 'main.js')], {
        stdio: 'inherit'
    })
        .on('exit', exitProcess)
}

function exitProcess() {
    process.exit(0)
}
