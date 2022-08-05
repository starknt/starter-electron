import { createConfigLoader, LoadConfigResult } from 'unconfig'
import fs from 'fs'
import { dirname, resolve } from 'path'
import { Plugin } from 'esbuild'

export interface ResolveOption {
  alias?: Record<string, string>
  cwd?: string
}

export interface UserConfigExport {
  /**
   * Project root path
   * @default `/`
   */
  base?: string
  /**
   * Main process project root path
   * @default `app/electron`
   */
  root?: string
  /**
   * Main Process Entry
   */
  entry: string
  /**
   * Preload files entry
   */
  preloadEntries?: string[]
  /**
   * esbuild plugin
   */
  plugin?: Plugin[]
  /**
   * If preloadEntries.length > 0, it will be invalided, you should set `outDir`
   */
  outFile?: string
  /**
   * bundle file out dir
   */
  outDir?: string
  /**
   * like vite alias path
   * @default `undefined`
   */
  resolve?: ResolveOption
  /**
   * tsconfig file path
   * @default `tsconfig.json`
   */
  tsconfig?: string
  rawTsconfig?: string
  /**
   * `NODE_ENV` production `true`, development `false`, debug `false`
   * @default NODE_ENV === 'production'
   */
  minify?: boolean
  /**
   * `NODE_ENV` production `true`, development `false`, debug `false`
   * @default @default NODE_ENV === 'production'
   */
  sourcemap?: boolean
  /**
   * external module name, default include `electron` and node `builtinModules`
   * @default ["electron", ...builtinModules]
   */
  external?: string[]
  /**
   * `knt` plugin config file path
   * @default `knt.config.ts`
   */
  configFile?: string
}
/** @internal */
export interface UserConfig {
  /**
   * Project root path
   * @default `/`
   */
  base: string
  /**
   * Main process project root path
   * @default `app/electron/main.ts`
   */
  root: string
  /**
   * Main Process Entry
   */
  entry: string
  preloadEntries: string[]
  /**
   * esbuild plugin
   */
  plugin?: Plugin[]
  /**
   * If preloadEntries.length > 0, it will be invalided, you should set `outDir`
   */
  outFile: string
  /**
   * bundle file out dir
   */
  outDir: string
  /**
   * like vite alias path
   * @default `undefined`
   */
  resolve: ResolveOption
  /**
   * tsconfig file path
   * @default `tsconfig.json`
   */
  tsconfig: string
  rawTsconfig: string
  /**
   * `NODE_ENV` production `true`, development `false`, debug `false`
   * @default NODE_ENV === 'production'
   */
  minify: boolean
  /**
   * `NODE_ENV` production `true`, development `false`, debug `false`
   * @default @default NODE_ENV === 'production'
   */
  sourcemap: boolean
  /**
   * external module name, default include `electron` and node `builtinModules`
   * @default ["electron", ...builtinModules]
   */
  external: string[]
  configFile: string | false
}

export type ResolvedConfig = Required<UserConfig>

export async function loadConfig<U extends UserConfig>(cwd = process.cwd(), configOrPath: string | U = cwd): Promise<LoadConfigResult<U>> {
  let inlineConfig = {} as U
  if (typeof configOrPath !== 'string') {
    inlineConfig = configOrPath

    if (inlineConfig.configFile === false) {
      return {
        config: inlineConfig,
        sources: []
      }
    } else {
      configOrPath = inlineConfig.configFile || process.cwd()
    }
  } 

  const resolved = resolve(configOrPath)
  let isFile = false
  if (fs.existsSync(resolved) && fs.statSync(resolved).isFile()) {
    isFile = true
    cwd = dirname(resolved)
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

export function resolveConfig<T extends UserConfig>(config: T): T {
  return {
    ...config,
    base: config.base ?? '/',
    root: config.root ?? 'app/electron',
    entry: config.entry ?? 'app/electron/main.ts',
  }
}

export function defineConfig(config: UserConfigExport): UserConfigExport {
  return config
}
