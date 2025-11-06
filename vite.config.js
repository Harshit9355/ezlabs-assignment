import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '', // ✅ leave empty for Vercel or GitHub Pages auto-path
  build: {
    outDir: 'dist', // ensures build goes to dist
  },
  server: {
    open: true,
  },
})
