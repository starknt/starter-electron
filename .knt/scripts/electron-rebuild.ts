import path from "path";
import { execSync } from "child_process";
import fs from 'fs'
import { dependencies } from '../../release/app/package.json'
import { appPath, rootPath } from '../paths'

const appModulesPath = path.join(appPath, 'node_modules')

if (Object.keys(dependencies || {}).length > 0 && fs.existsSync(appModulesPath)) {
  const electronRebuildCmd = path.join(rootPath, 'node_modules/.bin/electron').concat(' --parallel --force --types prod,dev,optional --module-dir .')

  const cmd = process.platform === 'win32' ? electronRebuildCmd.replace(/\//, '\\') : electronRebuildCmd

  execSync(cmd, {
    cwd: appPath,
    stdio: 'inherit',
    env: process.env
  })
}