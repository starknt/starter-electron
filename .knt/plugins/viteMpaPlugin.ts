import { join, resolve } from "path";
import { Plugin } from "vite";
import fs from 'fs'

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

interface Page {
  name: string
  entry: string
}

function getMpaPage(root: string, options: MpaOptions) {
  const pages: Page[] = []
  const pagesDirectory = join(root, options.scanPage)

  if (fs.existsSync(pagesDirectory)) {
    const scans = fs.readdirSync(pagesDirectory, { withFileTypes: true })
    .filter((v) => v.isDirectory())
    .filter((v) => fs.existsSync(join(pagesDirectory, v.name, options.filename)))

    scans.map((v) => {
      pages.push({
        name: v.name,
        entry: join(pagesDirectory, v.name, options.filename)
      })
    })
  }

  return pages
}

export default (userConfig?: MpaOptions): Plugin => {
  const options: Required<MpaOptions> = {
    scanPage: 'src/pages',
    filename: 'index.html'
  }

  return {
    name: 'vite-plugin-knt-mpa',
    config(config, env) {
      const base = config.base!
      const root = config.root!

      const projectRoot = resolve(base, root)
      userConfig = Object.assign(options, userConfig)

      const mpa = getMpaPage(projectRoot, userConfig)
      const rollupInput: Record<string, string> = {}
      mpa.map((page) => {
        rollupInput[page.name] = page.entry
      })

      config.build.rollupOptions.input = rollupInput

      console.log(config.build.rollupOptions.input)
    }
  }
}