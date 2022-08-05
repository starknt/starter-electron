import { readFileSync, readdirSync, existsSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const dependencies = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8') || "{}")

if (dependencies) {
  const dependenciesKeys = Object.keys(dependencies)

  const nativeDeps = readdirSync('node_modules')
    .filter((folder) => existsSync(`node_modules/${folder}/binding.gyp`));

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

      console.log(`Vite does not works with native module`)

      process.exit(-1)
    }
  } catch (error) {

  }
}
