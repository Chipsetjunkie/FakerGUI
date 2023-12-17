import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve, relative, extname } from 'path'
import dts from "vite-plugin-dts"
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import { fileURLToPath } from 'node:url'
import { glob } from 'glob'


export default defineConfig({
  plugins: [react(), libInjectCss(), dts({ include: ['lib'] })],
  build: {
    copyPublicDir: false,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      formats:["es"]
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'react', 'react/jsx-runtime', 'react-dom'],
      input: Object.fromEntries(
        glob.sync('lib/**/*.{ts,tsx}').map(file => [
          // The name of the entry point
          // lib/nested/foo.ts becomes nested/foo
          relative(
            'lib',
            file.slice(0, file.length - extname(file).length)
          ),
          // The absolute path to the entry file
          // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
          fileURLToPath(new URL(file, import.meta.url))
        ])
      ),
      output: {
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
  resolve:{
    alias:{
      "@lib":fileURLToPath(new URL('./lib', import.meta.url))
    }
  }
})