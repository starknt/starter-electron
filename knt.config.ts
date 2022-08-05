import { defineConfig } from './.knt/knt'

export default defineConfig({
  entry: 'app/electron/main.ts',
  resolve: {
    alias: {
      '@shared': '',
    },
  },
})
