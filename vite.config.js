import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path for GitHub Pages: https://<username>.github.io/<repo>/
// Change '<repo>' if your repository name is different.
export default defineConfig({
  base: '/LinkPad/',
  plugins: [react()],
})
