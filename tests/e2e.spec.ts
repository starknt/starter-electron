import type { ElectronApplication } from 'playwright'
import { _electron as electron } from 'playwright'

let electronApplication: ElectronApplication

beforeAll(async () => {
  // TODO: bundle file path
  electronApplication = await electron.launch({ args: [] })
})

afterAll(async () => {
  await electronApplication.close()
})

test('', () => {

})
