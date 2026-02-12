import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Use VITE_BASE_URL env var if set (for Squarespace embed), otherwise '/'
  const base = process.env.VITE_BASE_URL || '/'

  return {
    base: base,
    plugins: [react()],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      // Ensure one main JS file for easier embedding if possible, though splitting is better for perf.
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  }
})
