/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { alias } from './alias'

export default defineConfig({
  resolve: {
    alias,
  },
  test: {
    environment: 'happy-dom',
    hookTimeout: 10000 * 3,
    globals: true,
    coverage: {
      reporter: ['html'],
    },
  },
})
