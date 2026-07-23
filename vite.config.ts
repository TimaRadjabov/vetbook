/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    // fetch в Node требует абсолютный URL; MSW-хендлеры матчатся по пути.
    env: { VITE_API_URL: 'http://localhost:3000/api' },
  },
});
