import { join } from 'path'
import { rimraf } from './utils'

const releasePath = join(process.cwd(), 'release')
const releaseAppPath = join(releasePath, 'app')

function taskFactory(paths: string[]) {
  const r: Promise<void>[] = []

  for (const task of paths)
    r.push(rimraf(task))

  return r
}

const tasks = taskFactory([
  join(releaseAppPath, 'dist'),
  join(releasePath, 'build'),
  join(process.cwd(), 'coverage'),
])

Promise.allSettled(tasks)
