import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Listen on all network interfaces, this is important in order to be able to access the frontend from the host machine, if launched with docker-compose
    port: 5173,
    // Proxy API requests to backend in development
    // This allows to use relative URLs in the frontend
    // This is mostly useful if in the future more apis feed this frontend application
    // And it can all be centralized in this file, then in the definition of api services
    // It's easier to use different relative urls for each api
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3003',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
