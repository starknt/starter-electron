import { join, resolve, sep } from 'path'
import fs from 'fs'
import nodeAbi from 'node-abi'

const { devDependencies } = JSON.parse(fs.readFileSync(join(process.cwd(), 'package.json'), 'utf-8'))

const node_modules = resolve(process.cwd(), 'release', 'app', 'node_modules')

const modules = fs.readdirSync(node_modules, { withFileTypes: true })
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

function deleteThings(p: string) {
  if (fs.existsSync(p)) {
    fs.lstat(p, (err, stats) => {
      if (err)
        return

      stats.isDirectory() && fs.rmSync(p, { recursive: true, force: true })
      stats.isFile() && fs.rmSync(p)
    })
  }
}

modules.forEach((module) => {
  const p = join(node_modules, module)
  const binPath = join(p, 'bin')
  const buildPath = join(p, 'build')
  const ReleasePath = join(buildPath, 'Release')

  if (fs.existsSync(binPath)) {
    const abi = nodeAbi.getAbi(/\d/.test(devDependencies.electron[0]) ? devDependencies.electron : devDependencies.electron.slice(1), 'electron')
    if (fs.existsSync(join(binPath, `${process.platform}-${process.arch}-${abi}`)))
      fs.rmSync(buildPath, { recursive: true, force: true })
    fs.mkdirSync(buildPath)
    const m = module.split(sep)
    fs.copyFileSync(join(binPath, `${process.platform}-${process.arch}-${abi}`, `${m[m.length - 1]}.node`), join(buildPath, `${m[m.length - 1]}.node`))
    fs.rmSync(binPath, { recursive: true, force: true })
    return
  }

  if (!fs.existsSync(join(p, 'build')) || !fs.existsSync(ReleasePath))
    return

  const des = fs.readdirSync(ReleasePath)

  des.forEach((de) => {
    if (!de.endsWith('.node'))
      deleteThings(join(ReleasePath, de))
  })
})

