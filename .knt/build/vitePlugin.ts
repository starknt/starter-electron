import { PluginOption as VitePlginOption } from 'vite'
import esbuild from 'esbuild'
import { esbuildDecorators } from '@anatine/esbuild-decorators'
import path from 'path'
import { builtinModules } from 'module'
import { ChildProcess, spawn, } from 'child_process'
import electron from 'electron'

let cp: ChildProcess

function exitProcess() {
  process.exit(0)
}

export default (): VitePlginOption => {
  return {
    name: 'vite-plugin-knt',
    async configureServer() {
      const rootPath = process.cwd()

      await esbuild.build({
        platform: 'node',
        plugins: [esbuildDecorators()],
        entryPoints: [path.join(rootPath, 'src-electron/main.ts')],
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

            cp = spawn(electron as any, [path.join(rootPath, 'release', 'app', 'dist', 'main.js')], {
              stdio: 'inherit'
            })
              .on('exit', () => {
                process.exit(0)
              })

            console.log('rebuild')
          }
        }
      })

      cp = spawn(electron as any, [path.join(rootPath, 'release', 'app', 'dist', 'main.js')])
        .on('exit', exitProcess)
    },
    closeBundle() {

    }
  }
}