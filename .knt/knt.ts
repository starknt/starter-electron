interface AliasOptions {
  [key: string]: string

  cwd?: string
}

export interface UserConfig {
  /**
   * Project root path
   * @default `/`
   */
  base?: string
  /**
   * Main process project root path
   * @default `src-electron`
   */
  root?: string
  /**
   * Main Process Entry
   * @default `src-electron/main.ts`
   */
  entry?: string
  preloadEntries?: string[]
  /**
   * If preloadEntries.length > 0, it will be invalided, you should set `outDir`
   */
  outFile?: string
  outDir?: string
  alias?: AliasOptions
  tsconfig?: string
  rawTsconfig?: string
  minify?: boolean
  sourcemap?: boolean
  external?: string[]
  /**
   * `knt` plugin config file path
   * @default `${base}knt.config.ts`
   */
  configFile?: string
}

export function resolveConfig(config: UserConfig): UserConfig {
  return {
    ...config,
    base: config.base ?? '/',
    entry: config.entry ?? 'src-electron/main.ts',
  }
}

export function defineConfig(config: UserConfig): UserConfig {
  return resolveConfig(config)
}
