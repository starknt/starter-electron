import path, { join } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    root: path.join(process.cwd(), './src/pages'),
    build: {
        rollupOptions: {
            input: {
                main: join(process.cwd(), './src/pages/index.html'),
                setting: join(process.cwd(), './src/setting/index.html'),
            }
        }
    }
})