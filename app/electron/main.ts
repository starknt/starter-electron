import { join, resolve } from 'path'
import fs from 'fs'
import { BrowserWindow, app, ipcMain, protocol, Tray, nativeImage, Menu } from 'electron'
import { add } from '@starter/shared'
import { macOS, production, web, windows } from 'eevi-is'
import Database from 'better-sqlite3'

const rootPath = production() ? process.resourcesPath : process.cwd()

function getIconPath() {
  if (windows())
    return join(rootPath, 'assets', 'icons', 'icon.ico')
  if (macOS())
    return join(rootPath, 'assets', 'icons', '32x32.png')

  return join(rootPath, 'assets', 'icons', '32x32.png')
}

async function bootstrap() {
  protocol.registerSchemesAsPrivileged([
    {
      scheme: 'app',
      privileges: {
        secure: true,
        standard: true,
        stream: true,
        bypassCSP: true,
        supportFetchAPI: true,
        corsEnabled: true,
      },
    },
  ])

  // sqlite 3 code test
  if (production()) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dbInstance = new Database(join(process.resourcesPath, 'sqlite.db'))
  }
}

async function beforeReady() {

}

async function setupTray() {
  const tray = new Tray(nativeImage.createFromPath(getIconPath()))

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'about',
        click: () => app.showAboutPanel()
      },
      {
        label: 'quit',
        click: () => app.quit()
      }
    ])
  )

  tray.on('double-click', () => app.show())
}

async function setupWindow() {
  const main = new BrowserWindow({
    webPreferences: {
      preload: resolve(__dirname, './preload/common.js'),
    },
    show: false,
  })

  const other = new BrowserWindow({
    webPreferences: {
      preload: resolve(__dirname, './preload/common.js'),
    },
    show: false,
  })

  const isMpa = () => process.env.MODE === 'mpa'

  const resolvePage = (page?: string) => {
    if (process.env.NODE_ENV === 'development')
      return isMpa() ? new URL(`pages/${page ?? 'main'}/`, process.env.URL).toString() : process.env.URL

    return isMpa() ? new URL(`${process.env.URL}/${page}/index.html`, `file:///${__dirname}`).toString() : new URL(process.env.URL, `file:///${__dirname}`).toString()
  }

  main.once('ready-to-show', () => {
    main.show()
    main.webContents.openDevTools({ mode: 'detach' })
  })

  other.once('ready-to-show', () => {
    other.show()
  })

  // eslint-disable-next-line no-console
  console.log(process.env.MODE, resolvePage('main'))

  main.loadURL(resolvePage('main'))
  other.loadURL(resolvePage('other'))
}

async function afterReady() {
  protocol.registerStreamProtocol('app', (request, cb) => {
    const url = new URL(request.url)
    cb(fs.createReadStream(join(rootPath, 'assets', url.hostname, url.pathname)))
  })

  // eslint-disable-next-line no-console
  ipcMain.on('sayHello', (e, message) => console.log(e.sender.id, message))

  // eslint-disable-next-line no-console
  console.log(add(1, 2), web())

  setupTray()
  setupWindow()
}

bootstrap()
  .then(async () => await beforeReady())
  .then(async () => await app.whenReady())
  .then(async () => await afterReady())
  .catch((err) => {
    console.error(err)
    process.exit(0)
  })
