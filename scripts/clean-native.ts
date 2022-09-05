import { join, resolve, sep } from 'path'
import fs from 'fs-extra'
import nodeAbi from 'node-abi'
import { rimraf, sequence } from './utils'

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
  const tasks: Promise<void>[] = []

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

