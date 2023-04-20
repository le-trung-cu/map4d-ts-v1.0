import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dynamicImport from 'vite-plugin-dynamic-import'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dynamicImport(/* options */)],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@features': path.resolve(__dirname, 'src/features'),
    },
  },
})
