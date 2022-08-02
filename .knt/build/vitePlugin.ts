import { Plugin } from 'vite'
import { AddressInfo } from 'net'
import { handleBuild } from './build'
import { handleDev } from './dev'


export default (): Plugin => {
  return {
    name: 'vite-plugin-knt',
    config(config, env) {
      process.env['NODE_ENV'] = env.mode
    },
    async configureServer(server) {
      server.httpServer.on('listening', async () => {
        const address = server.httpServer.address() as AddressInfo
        process.env['DEV_URL'] = `http://${address.address}:${address.port}`

        handleDev()
      })
    },
    closeBundle() {
      if (process.env['NODE_ENV'] === 'development') return

      handleBuild()
    }
  }
}