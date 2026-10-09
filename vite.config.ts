import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import fluidType from './postcss-fluid-type.mjs'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  css: { postcss: { plugins: [fluidType()] } },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
