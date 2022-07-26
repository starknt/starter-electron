import { PluginOption as VitePlginOption } from 'vite'

export default (): VitePlginOption => {
  return {
    name: 'vite-plugin-knt',
    transform(code, id) {

    },
    closeBundle() {

    }
  }
}