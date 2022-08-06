import { resolve } from "path";
import { Plugin } from "vite";

export interface MpaOptions {
  /**
   * page dir
   * @default `src/pages`
   */
  scanPage?: string

  /**
   * entry file name
   * @default `index.html`
   */
  filename?: string
}

export default (userConfig?: MpaOptions): Plugin => {
  return {
    name: 'vite-plugin-knt-mpa',
    config(config, env) {
      const base = config.base!
      const root = config.root!

      const projectRoot = resolve(base, root)

      console.log(projectRoot)
    }
  }
}