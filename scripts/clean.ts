import { join } from 'path'
import rimraf from 'rimraf'

const releasePath = join(process.cwd(), 'release')
const releaseAppPath = join(releasePath, 'app')

function rimrafTask(p: string) {
  return new Promise<void>((resolve, reject) => {
    rimraf(p, (e) => {
      if (e)
        reject(e)
      resolve()
    })
  })
}

function taskFactory(paths: string[]) {
  const r: Promise<void>[] = []

  for (const task of paths)
    r.push(rimrafTask(task))

  return r
}

const tasks = taskFactory([
  join(releaseAppPath, 'dist'),
  join(releasePath, 'build'),
  join(process.cwd(), 'coverage'),
])

Promise.allSettled(tasks)
