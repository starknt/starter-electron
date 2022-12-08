import { join } from 'path'
import { macOS, production, windows } from 'eevi-is'

export const rootPath = production() ? process.resourcesPath : process.cwd()

export function getIconPath() {
  if (windows())
    return join(rootPath, 'assets', 'icons', 'icon.ico')
  if (macOS())
    return join(rootPath, 'assets', 'icons', '32x32.png')

  return join(rootPath, 'assets', 'icons', '32x32.png')
}
