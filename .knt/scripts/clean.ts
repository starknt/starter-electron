import fs from 'fs'
import path from 'path'
import rimraf from 'rimraf'
import { appPath } from '../paths'

if (fs.existsSync(path.join(appPath, 'dist'))) {
  rimraf(path.join(appPath, 'dist'), (err) => {
    console.error(err)
  })
}