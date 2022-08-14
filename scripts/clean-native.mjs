import { join, resolve } from 'path'
import fs from 'fs'

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

function deleteThings(p) {
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
  const ReleasePath = join(p, 'build', 'Release')
  if (!fs.existsSync(join(p, 'build')) || !fs.existsSync(ReleasePath))
    return

  const des = fs.readdirSync(ReleasePath)

  des.forEach((de) => {
    if (!de.endsWith('.node'))
      deleteThings(join(ReleasePath, de))
  })
})

