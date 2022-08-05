import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoImportComponent from 'unplugin-vue-components/vite'
import Knt from '../../.knt/build/vitePlugin'

export default defineConfig({
  base: './',
  root: 'app/web',
  plugins: [
    Vue({ reactivityTransform: true }),
    Unocss(),
    AutoImport({
      dts: './auto-imports.d.ts',
      dirs: [
        './composable',
      ],
      imports: [
        'vue',
        'vue/macros',
        '@vueuse/core',
      ],
    }),
    AutoImportComponent({
      dts: './components.d.ts',
      dirs: [
        './components',
      ],
    }),
    Knt(),
  ],
  build: {
    rollupOptions: {
      external: ['electron'],
      // SPA remove it and pages dir, MPA require it
      input: {
        main: path.resolve(__dirname, 'pages', 'main', 'index.html'),
        other: path.resolve(__dirname, 'pages', 'other', 'index.html'),
      },
    },
    outDir: path.join(process.cwd(), 'release', 'app', 'dist'),
    emptyOutDir: false,
  },
})
