import { join } from 'path'
import { execSync } from 'child_process'
import fs from 'fs'

const { dependencies } = JSON.parse(fs.readFileSync('package.json', 'utf-8') || '{}')
const appModulesPath = join(process.cwd(), 'node_modules')
const rootPath = join(process.cwd(), '../../')

if (Object.keys(dependencies || {}).length > 0 && fs.existsSync(appModulesPath)) {
  const electronRebuildCmd = join(rootPath, 'node_modules/.bin/electron-rebuild').concat(' --force --types prod,dev,optional --module-dir .')

  const cmd = process.platform === 'win32' ? electronRebuildCmd.replace(/\//, '\\') : electronRebuildCmd

  execSync(cmd, {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: process.env,
  })
}
