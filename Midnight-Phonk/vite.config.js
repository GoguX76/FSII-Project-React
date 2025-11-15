import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
    },
    test: {
        globals: true,
        environment: 'jsdom',
        include: ['test__/**/*.test.{js,jsx,ts,tsx}'],
        setupFiles: 'test__/setupTests.js',
    },
})