import fs from 'fs'
import { execSync } from 'child_process'
import { dependencies } from '../../package.json'
import { debug } from 'debug'

const $ = debug('knt')

$('check native module')

if (dependencies) {
  const dependenciesKeys = Object.keys(dependencies)

  const nativeDeps = fs.readdirSync('node_modules')
    .filter((folder) => fs.existsSync(`node_modules/${folder}/binding.gyp`));

  if (nativeDeps.length === 0) {
    process.exit(0)
  }

  try {
    const { dependencies: dependenciesObject } = JSON.parse(
      execSync(`npm ls ${nativeDeps.join(' ')} --json`).toString()
    );
    const rootDependencies = Object.keys(dependenciesObject);
    const filteredRootDependencies = rootDependencies.filter((rootDependency) =>
      dependenciesKeys.includes(rootDependency)
    );

    if (filteredRootDependencies.length > 0) {
      const plural = filteredRootDependencies.length > 1;

      $(`Vite does not works with native module`)

      process.exit(-1)
    }
  } catch (error) {

  }
}
