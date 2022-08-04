export interface UserConfig {
  /**
   * Project root path
   * @default `/`
   */
  base?: string
  /**
   * Main Process Entry
   * @default `src-electron/main.ts`
   */
  entry: string
  preloadFile?: string[]
  outDir?: string
  tsconfig?: string
  rawTsconfig?: string
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
