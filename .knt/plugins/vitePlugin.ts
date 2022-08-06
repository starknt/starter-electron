import { Plugin } from 'vite'
import { AddressInfo } from 'net'
import { handleBuild } from '../build/build'
import { handleDev } from '../build/dev'
import { loadConfig, resolveConfig, UserConfig, UserConfigExport } from '../knt'
import { isAbsolute, resolve } from 'path'

export default (userConfig?: UserConfigExport): Plugin => {
  let internalConfig = {
    ...(userConfig || {}),
    configFile: !!userConfig ? userConfig.configFile ? isAbsolute(userConfig.configFile) ? userConfig.configFile : resolve(userConfig.base ?? process.cwd(), userConfig.configFile) : true : resolve(process.cwd(), 'knt.config.ts')
  } as Required<UserConfig>

  return {
    name: 'vite-plugin-knt',
    async config(config, env) {
      process.env['NODE_ENV'] = env.mode
      process.env['MODE'] = 'spa'
      if (Object.keys(config?.build?.rollupOptions?.input ?? {}).length > 1) {
        process.env['MODE'] = 'mpa'
      }

      console.log(config?.build?.rollupOptions?.input)

      const loadedConfigResult = await loadConfig(resolve(internalConfig.base ?? config.base!), internalConfig)
      internalConfig = resolveConfig(loadedConfigResult.config)
    },
    configureServer(server) {
      server.httpServer!.on('listening', () => {
        const address = server.httpServer!.address() as AddressInfo
        process.env['URL'] = `http://${address.address}:${address.port}`

        handleDev(internalConfig)
      })
    },
    async closeBundle() {
      if (process.env['NODE_ENV'] === 'development') return

      await handleBuild(internalConfig)
    }
  }
}