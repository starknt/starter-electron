import { join, resolve } from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

const gitDirectoryPath = resolve(process.cwd(), '.git')
const preCommitFilePath = join(gitDirectoryPath, 'hooks', 'pre-commit')
const srcElectronModulesPath = join(process.cwd(), 'app', 'electron', 'node_modules')
const srcElectronPackagePath = join(process.cwd(), 'app', 'electron', 'package.json')
const appPackagePath = join(process.cwd(), 'release', 'app', 'package.json')
const appModulesPath = join(process.cwd(), 'release', 'app', 'node_modules')

// if dependencies is {}, pnpm can't generate `node_modules`
if (!fs.existsSync(appModulesPath))
  fs.mkdirSync(appModulesPath)

if (!fs.existsSync(srcElectronModulesPath) && fs.existsSync(appModulesPath))
  fs.symlinkSync(appModulesPath, srcElectronModulesPath, 'junction')

if (!fs.existsSync(srcElectronPackagePath) && fs.existsSync(appPackagePath))
  fs.symlinkSync(appPackagePath, srcElectronPackagePath, 'file')

// no git
if (!fs.existsSync(gitDirectoryPath))
  process.exit(0)

// no setup simple-git-hooks
if (!fs.existsSync(preCommitFilePath))
  execSync('npx simple-git-hooks')

