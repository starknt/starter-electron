/* eslint-disable @typescript-eslint/no-var-requires */
const { join, resolve, sep } = require('path')
const { promisify } = require('util')
const fs = require('fs-extra')
const nodeAbi = require('node-abi')
const consola = require('consola')
const rm = require('rimraf')

// const files = [
//   {
//     name: 'readme',
//     ext: ['.md', '.html', '.txt'],
//   },
//   {
//     name: 'license',
//     ext: [],
//   },
// ]

const internalRimraf = promisify(rm)

const rimraf = async function remove(path) {
  try {
    await internalRimraf(path)
    consola.success(`remove ${path} successfully`)
  }
  catch (err) {
    consola.error(`remove ${path} failed, error: ${err}`)
  }
}

function sequence(promiseFactories) {
  const results = []
  let index = 0
  const len = promiseFactories.length

  function next() {
    return index < len ? promiseFactories[index++] : null
  }

  function thenHandler(result) {
    if (result !== undefined && result !== null)
      results.push(result)

    const n = next()
    if (n)
      return n.then(thenHandler)

    return Promise.resolve(results)
  }

  return Promise.resolve(null).then(thenHandler)
}

module.exports = () => {
  const { devDependencies } = JSON.parse(fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))
  const node_modules = resolve(process.cwd(), 'release', 'app', 'node_modules')

  const nativeModules = fs.readdirSync(node_modules, { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name !== '.pnpm')
    .map(d => d.name)
    .map((d) => {
      if (!d.includes('@'))
        return d

      return fs.readdirSync(join(node_modules, d), { withFileTypes: true })
        .filter(dd => dd.isDirectory())
        .map(dd => join(d, dd.name))
    })
    .flat(3)
    .filter(d => fs.existsSync(join(node_modules, d, 'binding.gyp')))

  nativeModules.forEach(async (module) => {
    const p = join(node_modules, module)
    const binPath = join(p, 'bin')
    const buildPath = join(p, 'build')
    const releasePath = join(buildPath, 'Release')
    const depsPath = join(buildPath, 'deps')
    const tasks = []

    if (fs.existsSync(binPath)) {
      const abi = nodeAbi.getAbi(/\d/.test(devDependencies.electron[0]) ? devDependencies.electron : devDependencies.electron.slice(1), 'electron')

      if (fs.existsSync(join(binPath, `${process.platform}-${process.arch}-${abi}`)))
        tasks.push(rimraf(buildPath))

      tasks.push(fs.mkdir(buildPath))
      const m = module.split(sep)
      tasks.push(fs.copyFile(join(binPath, `${process.platform}-${process.arch}-${abi}`, `${m[m.length - 1]}.node`), join(buildPath, `${m[m.length - 1]}.node`)))
      tasks.push(rimraf(binPath))
      tasks.push(rimraf(depsPath))

      await sequence(tasks)
      return
    }

    if (!fs.existsSync(join(p, 'build')) || !fs.existsSync(releasePath))
      return

    const des = fs.readdirSync(releasePath)

    tasks.push(rimraf(depsPath))

    des.forEach((de) => {
      if (!de.endsWith('.node'))
        tasks.push((rimraf(join(releasePath, de))))
    })

    await Promise.all(tasks)
  })
}

