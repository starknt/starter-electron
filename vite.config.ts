/// <reference types="vitest" />
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'

export default defineConfig({
  plugins: [
    Vue({ reactivityTransform: true }),
    Unocss({ configFile: 'unocss.config.ts' }),
  ],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
})
