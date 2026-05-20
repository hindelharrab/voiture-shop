import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    proxy: {
      '/auth': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false
      },
      '/voitures': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false
      },
      '/ai': {
        target: 'http://localhost:9090',
        changeOrigin: true,
        secure: false
      }
    }
  }
})