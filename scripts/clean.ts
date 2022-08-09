import fs from 'fs'
import { join } from 'path'
import rimraf from 'rimraf'
import { appPath, rootPath } from './paths'

if (fs.existsSync(join(appPath, 'dist'))) {
  rimraf(join(appPath, 'dist'), (err) => {
    if (err)
      console.error(err)
  })
}

if (fs.existsSync(join(rootPath, 'release', 'build'))) {
  rimraf(join(rootPath, 'release', 'build'), (err) => {
    if (err)
      console.error(err)
  })
}

if (fs.existsSync(join(rootPath, 'coverage'))) {
  rimraf(join(rootPath, 'coverage'), (err) => {
    if (err)
      console.error(err)
  })
}
