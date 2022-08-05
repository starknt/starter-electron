import { Plugin } from 'vite'
import { AddressInfo } from 'net'
import { handleBuild } from './build'
import { handleDev } from './dev'
import { UserConfig } from '../knt'
import path, { resolve } from 'path'
import fs from 'fs'
import { createConfigLoader, LoadConfigResult } from 'unconfig'


async function loadConfig<U extends UserConfig>(cwd = process.cwd(), configOrPath: string | U = cwd): Promise<LoadConfigResult<U>> {
  let inlineConfig = {} as U
  if (typeof configOrPath !== 'string') {
    inlineConfig = configOrPath
    return {
      config: inlineConfig,
      sources: []
    }
  } else {
    configOrPath = inlineConfig.configFile || process.cwd()
  }

  const resolved = path.resolve(configOrPath)
  let isFile = false
  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
    isFile = true
    cwd = path.dirname(resolved)
  }

  const loader = createConfigLoader<U>({
    sources: isFile
      ? [{
        files: resolved
      }] : [{
        files: 'knt.config',
      }],
    cwd,
    defaults: inlineConfig
  })

  const result = await loader.load()
  result.config = result.config || inlineConfig

  return result
}

export default (userConfig?: UserConfig): Plugin => {
  return {
    name: 'vite-plugin-knt',
    async config(config, env) {
      userConfig = (await loadConfig()).config
      userConfig.base = resolve(config.base!)
      process.env['NODE_ENV'] = env.mode
      process.env['MODE'] = 'spa'
      if (Object.keys(config?.build?.rollupOptions?.input || {}).length > 1) {
        process.env['MODE'] = 'mpa'
      }
    },
    configureServer(server) {
      server.httpServer!.on('listening', () => {
        const address = server.httpServer!.address() as AddressInfo
        process.env['URL'] = `http://${address.address}:${address.port}`

        handleDev(userConfig!)
      })
    },
    async closeBundle() {
      if (process.env['NODE_ENV'] === 'development') return

      await handleBuild(userConfig)
    }
  }
}