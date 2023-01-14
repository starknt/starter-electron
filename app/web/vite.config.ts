import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import AutoImportComponent from 'unplugin-vue-components/vite'
import ElectronVitePlugin from 'eevi'
import { ElectronRendererPlugin } from '@eevi/elexpose/vite'
import ViteMpaPlugin from '@eevi/vite-plugin-mpa'
import { alias } from '../../alias'

export default defineConfig({
  clearScreen: false,
  base: './',
  root: 'app/web',
  resolve: {
    alias,
  },
  plugins: [
    Vue({ reactivityTransform: true }),
    UnoCSS(),
    AutoImport({
      dts: './auto-imports.d.ts',
      dirs: [
        './composable',
      ],
      imports: [
        'vue',
        'vue/macros',
      ],
    }),
    AutoImportComponent({
      dts: './components.d.ts',
      dirs: [
        './components',
      ],
    }),
    ElectronVitePlugin(),
    ElectronRendererPlugin([
      'test1',
      'common',
    ]),
    // SPA remove it and pages dir, MPA require it
    ViteMpaPlugin({
      template: './public/index.html',
      pages: [
        {
          name: 'main',
          entry: './pages/main.ts',
          data: {
            title: 'Main Page',
          },
        },
        {
          name: 'other',
          entry: './pages/other.ts',
          data: {
            title: 'Other Page',
          },
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      external: ['electron'],
    },
    outDir: path.join(process.cwd(), 'release', 'app', 'dist'),
    emptyOutDir: false,
  },
})
