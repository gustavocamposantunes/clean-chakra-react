import react from '@vitejs/plugin-react'
import tsConfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths({
    projects: ['./tsconfig.json']
  })],
  test: {
    environment: 'happy-dom',
    coverage: {
      reportsDirectory: './coverage',
      reporter: 'html',
      exclude: [
        'stories',
        'src/main',
        '.storybook',
        'src/presentation/contexts',
        'src/presentation/navigation',
        '**/index.ts',
        'eslint.config.js',
        'vite.config.ts'
      ]
    }
  }
})
