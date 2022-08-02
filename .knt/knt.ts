export interface UserConfig {
  /**
   * Project root path
   * @default `/`
   */
  base?: string
  mainEntry?: string
  renderEntry?: string[]
  preloadFile?: string[]
  outDir?: string
  mainTsConfig?: string
  renderTsConfig?: string
}

export function defineConfig(config: UserConfig): UserConfig {
  return {
    ...config
  }
}
