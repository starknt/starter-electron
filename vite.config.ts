/// <reference types="vitest" />
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoImportComponent from 'unplugin-vue-components/vite'

import { alias } from './alias'

export default defineConfig({
  resolve: {
    alias: {
      ...alias,
      '@app-electron': resolve(process.cwd(), 'app', 'electron'),
      '@app-web': resolve(process.cwd(), 'app', 'web'),
    },
  },
  test: {
    environment: 'happy-dom',
    testTimeout: 5000 * 3,
    hookTimeout: 10000,
    globals: true,
  },
  plugins: [
    AutoImport({
      dts: './app/web/auto-imports.d.ts',
      dirs: [
        './app/web/composable',
      ],
      imports: [
        'vue',
        'vue/macros',
      ],
    }),
    AutoImportComponent({
      dts: './app/web/components.d.ts',
      dirs: [
        './app/web/components',
      ],
    }),
  ],
})
