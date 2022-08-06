/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { alias } from './alias'

export default defineConfig({
  resolve: {
    alias,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
