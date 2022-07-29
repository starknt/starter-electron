import { PluginOption as VitePluginOption } from 'vite'
import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import path from 'path'
import { builtinModules } from 'module'
import { ChildProcess, spawn, } from 'child_process'
import electron from 'electron'
import { AddressInfo } from 'net'
import debug from 'debug'

const $ = debug('knt')

let cp: ChildProcess

function exitProcess() {
  process.exit(0)
}

const rootPath = process.cwd()

async function handleDev() {

  await esbuild.build({
    platform: 'node',
    plugins: [esbuildDecorators()],
    entryPoints: [path.join(rootPath, 'src-electron/main/main.ts')],
    outdir: path.join(rootPath, 'release', 'app', 'dist'),
    external: [...builtinModules, "electron"],
    bundle: true,
    sourcemap: true,
    watch: {
      onRebuild(error, result) {
        if (error) {
          console.error(error)
        }

        if (cp) {
          cp.off('exit', exitProcess)

          cp.kill()
        }

        $('rebuild')


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

async function handleBuild() {
  await esbuild.build({
    platform: 'node',
    plugins: [esbuildDecorators()],
    entryPoints: [path.join(rootPath, 'src-electron/main/main.ts')],
    outdir: path.join(rootPath, 'release', 'app', 'dist'),
    external: [...builtinModules, "electron"],
    bundle: true,
    sourcemap: false
  })

  // package
}

export default (): VitePluginOption => {
  return {
    name: 'vite-plugin-knt',
    config(config, env) {
      process.env['NODE_ENV'] = env.mode
    },
    async configureServer(server) {
      server.httpServer.on('listening', async () => {
        const address = server.httpServer.address() as AddressInfo
        process.env['URL'] = `http://${address.address}:${address.port}`

        handleDev()
      })
    },
    closeBundle() {
      if (process.env['NODE_ENV'] === 'development') return

      handleBuild()
    }
  }
}