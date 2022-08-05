/// <reference types="vitest" />
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { alias } from './alias'

export default defineConfig({
  plugins: [
    Vue({ reactivityTransform: true }),
    Unocss({ configFile: 'unocss.config.ts' }),
  ],
  resolve: {
    alias,
  },
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
