import fs from 'fs'
import { join } from 'path'
import rimraf from 'rimraf'

const releasePath = join(process.cwd(), 'release')
const releaseAppPath = join(releasePath, 'app')

if (fs.existsSync(join(releaseAppPath, 'dist'))) {
  rimraf(join(releaseAppPath, 'dist'), (err) => {
    if (err)
      console.error(err)
  })
}

if (fs.existsSync(join(releasePath, 'build'))) {
  rimraf(join(releasePath, 'build'), (err) => {
    if (err)
      console.error(err)
  })
}

if (fs.existsSync(join(process.cwd(), 'coverage'))) {
  rimraf(join(process.cwd(), 'coverage'), (err) => {
    if (err)
      console.error(err)
  })
}
