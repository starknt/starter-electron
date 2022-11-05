import { promisify } from 'util'
import { join, resolve } from 'path'
import rm from 'rimraf'
import consola from 'consola'

export const rootPath = process.cwd().includes('app') ? resolve(process.cwd(), '../../') : process.cwd()

export const srcElectronPath = join(rootPath, 'app', 'electron')
export const srcElectronModulesPath = join(srcElectronPath, 'node_modules')
export const srcElectronPackagePath = join(srcElectronPath, 'package.json')
export const releasePath = join(rootPath, 'release')
export const appPath = join(releasePath, 'app')
export const appModulesPath = join(appPath, 'node_modules')
export const appPackagePath = join(appPath, 'package.json')

const internalRimraf = promisify(rm)

export const rimraf = async function remove(path: string): Promise<void> {
  try {
    await internalRimraf(path)
    consola.success(`remove ${path} successfully`)
  }
  catch (err) {
    consola.error(`remove ${path} failed, error: ${err}`)
  }
}

export function taskFactory(paths: (string | null)[]) {
  const r: Promise<any>[] = []

  for (const task of paths) {
    if (task)
      r.push(rimraf(task))
  }

  return r
}

export async function sequence<T>(promiseFactories: Promise<T>[]): Promise<T[]> {
  const results: T[] = []
  let index = 0
  const len = promiseFactories.length

  function next(): Promise<T> | null {
    return index < len ? promiseFactories[index++] : null
  }

  async function thenHandler(result: any): Promise<any> {
    if (result !== undefined && result !== null)
      results.push(result)

    const n = next()
    if (n)
      return n.then(thenHandler)

    return results
  }

  return thenHandler(null)
}