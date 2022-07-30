import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoImportComponent from 'unplugin-vue-components/vite'
import Knt from '../.knt/build/vitePlugin'

export default defineConfig({
  root: 'src',
  plugins: [
    Vue({ reactivityTransform: true }),
    Unocss({ configFile: 'unocss.config.ts' }),
    AutoImport({
      dts: './auto-import.d.ts',
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
      dts: './component.d.ts',
      dirs: [
        './components',
      ],
    }),
    Knt(),
  ],
  build: {
    rollupOptions: {
      external: ['electron'],
    },
    outDir: path.join(process.cwd(), 'release', 'app', 'dist'),
    emptyOutDir: false,
  },
})
