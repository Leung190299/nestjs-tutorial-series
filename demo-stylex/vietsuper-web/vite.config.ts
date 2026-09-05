import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import stylexVite from '@stylexjs/unplugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // StyleX plugin PHẢI đứng TRƯỚC react() trong mảng plugins.
    stylexVite({
      useCSSLayers: true,
      dev: process.env.NODE_ENV === 'development',
      runtimeInjection: false,
    }),
    react(),
  ],
})
