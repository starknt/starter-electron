import test from 'node:test';
import type { ElectronApplication } from 'playwright';
import { _electron as electron } from 'playwright'
import { afterAll, beforeAll } from 'vitest';

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