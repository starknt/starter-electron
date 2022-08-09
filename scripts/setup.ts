import { join, resolve } from 'path'
import fs from 'fs'
import { execSync } from 'child_process'

const gitDirectoryPath = resolve(process.cwd(), '.git')
const preCommitFilePath = join(gitDirectoryPath, 'hooks', 'pre-commit')

// no git
if (!fs.existsSync(gitDirectoryPath))
  process.exit(0)

// no setup simple-git-hooks
if (!fs.existsSync(preCommitFilePath))
  execSync('npx simple-git-hooks')

