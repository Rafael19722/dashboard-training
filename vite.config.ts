import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanstackRouterVite } from '@tanstack/router-vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanstackRouterVite(),
  ],
})
