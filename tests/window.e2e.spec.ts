import { join, resolve } from 'path'
import type { ElectronApplication } from 'playwright'
import { _electron as electron } from 'playwright'

let electronApplication: ElectronApplication

beforeAll(async () => {
  // TODO: bundle file path
  electronApplication = await electron.launch({ args: [join(process.cwd(), 'release', 'app', 'dist', 'main.js')], cwd: resolve(process.cwd(), 'release', 'app') })
})

afterAll(async () => {
  // may cause e2e error
  // await electronApplication.close()
})

test('Main window state', async () => {
  const windowState: { isVisible: boolean; isDevToolsOpened: boolean; isCrashed: boolean }
    = await electronApplication.evaluate(({ BrowserWindow }) => {
      const mainWindow = BrowserWindow.getAllWindows()[0]

      const getState = () => ({
        isVisible: mainWindow.isVisible(),
        isDevToolsOpened: mainWindow.webContents.isDevToolsOpened(),
        isCrashed: mainWindow.webContents.isCrashed(),
      })

      return new Promise((resolve) => {
        if (mainWindow.isVisible())
          resolve(getState())

        else
          mainWindow.once('ready-to-show', () => setTimeout(() => resolve(getState()), 0))
      })
    })

  expect(windowState.isCrashed, 'The app has crashed').toBeFalsy()
  expect(windowState.isVisible, 'The main window was not visible').toBeTruthy()
  expect(windowState.isDevToolsOpened, 'The DevTools panel was open').toBeFalsy()
})

test('Main window web content', async () => {
  const page = await electronApplication.firstWindow()

  const element = page.locator('div[id=app]')

  expect(element, 'Was unable to find the root element').toBeTruthy()

  expect((await element.innerHTML()).trim(), 'Window content was empty').not.equal('')
})
