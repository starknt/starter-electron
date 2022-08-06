import { join, resolve } from 'path'
import type { ElectronApplication } from 'playwright'
import { _electron as electron } from 'playwright'

let electronApplication: ElectronApplication

beforeAll(async () => {
  // TODO: bundle file path
  electronApplication = await electron.launch({ args: [join(process.cwd(), 'release', 'app', 'dist', 'main.js')], cwd: resolve(process.cwd(), 'release', 'app') })
})

afterAll(async () => {
  await electronApplication.close()
})

test('Main window web content', async () => {
  const page = await electronApplication.firstWindow()
  page.on('domcontentloaded', async () => {
    const element = await page.$('#app', { strict: true })
    expect(element, 'Was unable to find the root element').toBeDefined()

    const innerHTML = await element.innerHTML()
    expect(innerHTML.trim(), 'Window content was empty').not.equal('')
  })
})
