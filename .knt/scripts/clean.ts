import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { appPath, rootPath } from '../paths'

if (fs.existsSync(path.join(appPath, 'dist'))) {
  rimraf(path.join(appPath, 'dist'), (err) => {
    if (err) console.error(err)
  })
}

if (fs.existsSync(path.join(rootPath, 'release', 'build'))) {
  rimraf(path.join(rootPath, 'release', 'build'), (err) => {
    if (err) console.error(err)
  })
}