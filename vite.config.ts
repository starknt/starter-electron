/// <reference types="vitest" />
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import Knt from './.knt/build/vitePlugin'

export default defineConfig({
    root: 'src',
    plugins: [
        Vue({ reactivityTransform: true }),
        Unocss({ configFile: 'unocss.config.ts' }),
        Knt()
    ],
    test: {
        environment: 'happy-dom',
        globals: true
    }
})