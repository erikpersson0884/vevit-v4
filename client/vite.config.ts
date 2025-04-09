import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3001/api',
                changeOrigin: true,
                secure: true,
            },
        }
    },
    plugins: [react()],
})
