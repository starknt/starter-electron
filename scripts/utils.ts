import { promisify } from 'util'
import rm from 'rimraf'
import consola from 'consola'

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

export function sequence<T>(promiseFactories: Promise<T>[]): Promise<T[]> {
  const results: T[] = []
  let index = 0
  const len = promiseFactories.length

  function next(): Promise<T> | null {
    return index < len ? promiseFactories[index++] : null
  }

  function thenHandler(result: any): Promise<any> {
    if (result !== undefined && result !== null)
      results.push(result)

    const n = next()
    if (n)
      return n.then(thenHandler)

    return Promise.resolve(results)
  }

  return Promise.resolve(null).then(thenHandler)
}
