import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'lib/main.js'),
      name: 'formdesigner',
      fileName: (format) => `formdesigner.${format}.js`
    }
  },
  resolve: {
    dedupe: ['vue']
  }
})
