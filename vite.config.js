import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const rootDir = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [react()],
  base: '/Quiz-AI/',
  build: {
    rollupOptions: {
      input: fileURLToPath(new URL('./index.vite.html', import.meta.url)),
    },
  },
})
