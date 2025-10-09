import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import icons from './pwa/icons.json'

// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3001/',
                changeOrigin: true,
                secure: false,
            },
        }
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./tests/setupTests.ts",
    },
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            manifest: {
                name: 'vevIT v4',
                short_name: 'vevIT',
                description: ' The third (and hopfully final) version of the booking applicaiton to book vev in the Sandlådan ',
                theme_color: '#17421c',
                background_color: '#232323',
                icons: icons,
                start_url: '.',
                display: 'fullscreen',
            }
        })
    ],
})
