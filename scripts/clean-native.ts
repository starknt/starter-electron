import { join, resolve, sep } from 'path'
import fs from 'fs-extra'
import nodeAbi from 'node-abi'
import { rimraf, sequence } from './utils'

const { devDependencies } = JSON.parse(fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))

const node_modules = resolve(process.cwd(), 'release', 'app', 'node_modules')

export const cleanNativeModule = async () => {
  const tasks: Promise<void>[] = []
  let mode: 'sequence' | 'parallel' = 'sequence'

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

    tasks.push(rimraf(join(p, 'deps')))

    if (fs.existsSync(binPath)) {
      const abi = nodeAbi.getAbi(/\d/.test(devDependencies.electron[0]) ? devDependencies.electron : devDependencies.electron.slice(1), 'electron')

      if (fs.existsSync(join(binPath, `${process.platform}-${process.arch}-${abi}`)))
        tasks.push(rimraf(buildPath))

      tasks.push(fs.mkdir(buildPath))
      const m = module.split(sep)
      tasks.push(fs.copyFile(join(binPath, `${process.platform}-${process.arch}-${abi}`, `${m[m.length - 1]}.node`), join(buildPath, `${m[m.length - 1]}.node`)))
      tasks.push(rimraf(binPath))
      tasks.push(rimraf(depsPath))

      mode = 'sequence'

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

    mode = 'parallel'
  })
  if (mode === 'sequence')
    await sequence(tasks)
  else
    await Promise.all(tasks)
}

export const cleanFiles = async () => {
  interface IMarkFile {
    name: string
    ext?: string[]
    type?: 'dir' | 'file'
  }

  const tasks: Promise<void>[] = []
  const files: IMarkFile[] = [
    {
      name: 'readme',
      ext: ['md', 'html', 'txt'],
    },
    {
      name: 'license',
      ext: [],
    },
    {
      name: 'changelog',
      ext: ['md', 'html'],
    },
    {
      name: 'history',
      ext: ['md', 'html'],
    },
    {
      name: '.github',
      type: 'dir',
    },
    {
      name: 'CONTRIBUTING',
      ext: ['md', 'html'],
    },
    {
      name: 'GOVERNANCE',
      ext: ['md', 'html'],
    },
    {
      name: '.travis',
      ext: ['yml', 'yaml'],
    },
    {
      name: 'test',
      type: 'dir',
    },
    {
      name: 'examples?',
      type: 'dir',
    },
  ]

  const findMarkFile = (p: string, markFile: IMarkFile) => {
    if (!markFile.ext)
      markFile.ext = []
    if (!markFile.type)
      markFile.type = 'file'
    markFile.ext.push('')
    const files = fs.readdirSync(p, { withFileTypes: true }).filter(Boolean)

    for (const file of files) {
      for (const ext of markFile.ext) {
        if (
          (file.isDirectory() && markFile.type !== 'dir')
          || (file.isFile() && markFile.type !== 'file')
        )
          break

        const regexp = new RegExp(`${markFile.name}${!ext ? ext : ext.startsWith('.') ? ext : `.${ext}`}\$`, 'ig')
        if (file.name.match(regexp))
          return join(p, file.name)
      }
    }
  }

  const modules = fs.readdirSync(node_modules, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .filter(Boolean)
    .map(d => join(node_modules, d.name))

  for (const file of files) {
    modules.forEach((module) => {
      const markFile = findMarkFile(module, file)

      if (markFile)
        tasks.push(rimraf(markFile))
    })
  }

  await Promise.allSettled(tasks)
}
